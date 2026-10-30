
import { randomUUID } from "node:crypto";
import { Resend } from "resend";
import { NextResponse } from "next/server";
import data from "@/data/products.json";

function escapeHtml(value: unknown) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[char];
  });
}

function money(value: number) {
  return `ETB ${value.toLocaleString("en-US", {
    maximumFractionDigits: 2,
  })}`;
}

type RequestItem = {
  productId: string;
  quantity: number;
  size?: string;
};

type Customer = {
  fullName?: string;
  email?: string;
  phone?: string;
  country?: string;
  region?: string;
  city?: string;
  subCity?: string;
  woreda?: string;
  kebele?: string;
  area?: string;
  address?: string;
  landmark?: string;
  mapsLink?: string;
  instructions?: string;
};

export async function POST(request: Request) {
  try {
    // Send order notifications to the store owner, not the customer.
    const apiKey = process.env.RESEND_API_KEY;
    const ownerEmail = process.env.ORDERS_TO_EMAIL?.trim();
    console.log(apiKey,ownerEmail)
    if (!apiKey || !ownerEmail) {
      console.error(

        "Order email is not configured. Check RESEND_API_KEY and ORDERS_TO_EMAIL.",
      );
    console.log(apiKey,ownerEmail)


      return NextResponse.json(
        { error: "Order notification email is not configured." },
        { status: 500 },
      );
    }

    const body = await request.json();
    const customer = body?.customer as Customer | undefined;
    const items = body?.items as RequestItem[];

    // Validate the submitted customer and order details.
    if (
      typeof customer?.fullName !== "string" ||
      !customer.fullName.trim() ||
      typeof customer.email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email.trim()) ||
      typeof customer.phone !== "string" ||
      !customer.phone.trim() ||
      !Array.isArray(items) ||
      items.length === 0 ||
      items.length > 50
    ) {
      return NextResponse.json(
        { error: "Please provide valid customer and order details." },
        { status: 400 },
      );
    }

    const lines: {
      product: (typeof data)[number];
      quantity: number;
      size?: string;
    }[] = [];

    for (const item of items) {
      if (
        !item ||
        typeof item.productId !== "string" ||
        !Number.isSafeInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > 100 ||
        (item.size !== undefined && typeof item.size !== "string")
      ) {
        return NextResponse.json(
          { error: "Invalid order item." },
          { status: 400 },
        );
      }

      // Look up products and prices on the server.
      const product = data.find((p) => p.id === item.productId);

      if (!product) {
        return NextResponse.json(
          { error: "An item in this order could not be found." },
          { status: 400 },
        );
      }

      lines.push({
        product,
        quantity: item.quantity,
        size: item.size,
      });
    }

    // UUID makes accidental tracking-code collisions extraordinarily unlikely.
    // Save orders in a database with a unique constraint when persistence is added.
    const trackingCode = `GW-${randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase()}`;

    const subtotal = lines.reduce(
      (sum, line) => sum + line.product.priceEtb * line.quantity,
      0,
    );

    const customerName = customer.fullName.trim();
    const customerEmail = customer.email.trim();
    const customerPhone = customer.phone.trim();

    const itemRows = lines
      .map(
        ({ product, quantity, size }) => `
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #e8dfd1;font-size:13px;color:#30271f;">
              <strong>${escapeHtml(product.name)}</strong>
              ${
                size
                  ? `<div style="font-size:11px;color:#8b7c6b;margin-top:4px;">Size: ${escapeHtml(size)}</div>`
                  : ""
              }
              <div style="font-size:11px;color:#8b7c6b;margin-top:4px;">
                Quantity: ${quantity}
              </div>
            </td>
            <td align="right" style="padding:12px 0;border-bottom:1px solid #e8dfd1;font-size:13px;white-space:nowrap;color:#30271f;">
              ${money(product.priceEtb * quantity)}
            </td>
          </tr>
        `,
      )
      .join("");

    const address = [
      customer.address,
      customer.area,
      customer.subCity,
      customer.woreda ? `Woreda ${customer.woreda}` : "",
      customer.kebele ? `Kebele ${customer.kebele}` : "",
      customer.city,
      customer.region,
      customer.country,
    ]
      .filter((part) => typeof part === "string" && part.trim())
      .map(escapeHtml)
      .join(", ");

    // Only display a map link when it matches a supported HTTPS maps URL.
    const mapsLink =
      typeof customer.mapsLink === "string" &&
      /^https:\/\/(www\.)?(google\.[a-z.]+\/maps|maps\.app\.goo\.gl\/)/i.test(
        customer.mapsLink,
      )
        ? customer.mapsLink
        : "";

    const safeCustomerName = escapeHtml(customerName);
    const safeCustomerEmail = escapeHtml(customerEmail);
    const safeCustomerPhone = escapeHtml(customerPhone);
    const storePublicUrl = process.env.STORE_PUBLIC_URL?.replace(/\/+$/, "");
    // const brandImageUrl = storePublicUrl
    //   ? `/og.png`
    //   : "";
  
    // This email is for the store owner, not the customer.
    const html = `
      <div style="margin:0;background:#f7f1e7;padding:32px 12px;font-family:Arial,Helvetica,sans-serif;color:#30271f;">
        <div style="max-width:560px;margin:0 auto;background:#fffdf9;padding:32px 28px;">

          <div style="text-align:center;padding-bottom:24px;border-bottom:1px solid #eee4d5;">
            <div style="font-family:Georgia,serif;font-size:23px;letter-spacing:1px;color:#6b4b2a;">
              Elevate Collectives
            </div>
            
            
            <div style="font-size:9px;letter-spacing:4px;color:#a88454;margin-top:8px;">
              NEW ORDER NOTIFICATION
            </div>
          </div>

          <div style="padding-top:28px;">
            <h1 style="font-family:Georgia,serif;font-size:27px;font-weight:normal;line-height:1.3;margin:0 0 14px;">
              A new order just came in.
            </h1>

            <p style="font-size:13px;line-height:1.8;color:#76695a;margin:0 0 22px;">
              A customer has submitted an order through your Elevate Shopping website.
              Review the details below and contact the customer to confirm delivery and payment.
            </p>

            <div style="border:1px solid #d9bd88;background:#f7efdf;text-align:center;padding:18px 10px;margin:22px 0;">
              <div style="font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#8b6a38;margin-bottom:9px;">
                Order tracking code
              </div>
              <div style="font-family:Georgia,serif;font-size:19px;letter-spacing:1px;color:#30271f;overflow-wrap:anywhere;">
                ${trackingCode}
              </div>
            </div>

            <h2 style="font-family:Georgia,serif;font-size:20px;font-weight:normal;margin:28px 0 12px;">
              Customer details
            </h2>

            <div style="padding:18px;background:#f8f3eb;font-size:12px;line-height:2;color:#76695a;">
              <strong style="color:#30271f;">Name:</strong> ${safeCustomerName}<br/>
              <strong style="color:#30271f;">Email:</strong>
              <a href="mailto:${escapeHtml(customerEmail)}" style="color:#79582e;">
                ${safeCustomerEmail}
              </a><br/>
              <strong style="color:#30271f;">Phone:</strong>
              <a href="tel:${escapeHtml(customerPhone)}" style="color:#79582e;">
                ${safeCustomerPhone}
              </a>
            </div>

            <h2 style="font-family:Georgia,serif;font-size:20px;font-weight:normal;margin:28px 0 8px;">
              Order summary
            </h2>

            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
              ${itemRows}
            </table>

            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:15px;border-collapse:collapse;">
              <tr>
                <td style="padding:7px 0;font-size:12px;color:#76695a;">Subtotal</td>
                <td align="right" style="padding:7px 0;font-size:12px;">
                  ${money(subtotal)}
                </td>
              </tr>
              <tr>
                <td style="padding:7px 0;font-size:12px;color:#76695a;">Delivery fee</td>
                <td align="right" style="padding:7px 0;font-size:11px;color:#76695a;">
                  To be confirmed
                </td>
              </tr>
              <tr>
                <td style="padding:15px 0;border-top:1px solid #d9cdbb;font-family:Georgia,serif;font-size:17px;">
                  Subtotal before delivery
                </td>
                <td align="right" style="padding:15px 0;border-top:1px solid #d9cdbb;font-size:15px;font-weight:bold;">
                  ${money(subtotal)}
                </td>
              </tr>
            </table>

            <h2 style="font-family:Georgia,serif;font-size:20px;font-weight:normal;margin:28px 0 12px;">
              Delivery details
            </h2>

            <div style="padding:18px;background:#f8f3eb;font-size:12px;line-height:1.9;color:#76695a;">
              <strong style="color:#30271f;">Address</strong><br/>
              ${address || "No delivery address provided."}
              ${
                customer.landmark
                  ? `<br/><strong style="color:#30271f;">Landmark:</strong> ${escapeHtml(customer.landmark)}`
                  : ""
              }
              ${
                customer.instructions
                  ? `<br/><strong style="color:#30271f;">Instructions:</strong> ${escapeHtml(customer.instructions)}`
                  : ""
              }
              ${
                mapsLink
                  ? `<p style="margin:14px 0 0;"><a href="${escapeHtml(mapsLink)}" style="color:#79582e;">Open delivery location in Maps</a></p>`
                  : ""
              }
            </div>

            <p style="font-size:12px;line-height:1.8;color:#76695a;margin:24px 0 0;">
              <strong>Next step:</strong> Contact the customer to confirm the delivery fee,
              payment arrangements, product availability, and dispatch details.
            </p>
          </div>

          <div style="border-top:1px solid #eee4d5;margin-top:28px;padding-top:20px;text-align:center;">
            <p style="font-family:Georgia,serif;font-size:15px;color:#8b6a38;margin:0 0 8px;">
              Elevate Collectives
            </p>
            <p style="font-size:10px;line-height:1.8;color:#a09586;margin:0;">
              Others deliver orders. We deliver value.
            </p>
          </div>

        </div>
      </div>
    `;

    const text = [
      "NEW ORDER — ELEVATE COLLECTIVES",
      "",
      `Tracking code: ${trackingCode}`,
      "",
      "CUSTOMER DETAILS",
      `Name: ${customerName}`,
      `Email: ${customerEmail}`,
      `Phone: ${customerPhone}`,
      "",
      "ORDER ITEMS",
      ...lines.map(
        ({ product, quantity, size }) =>
          `${product.name}${size ? ` (Size: ${size})` : ""} — Qty: ${quantity} — ${money(product.priceEtb * quantity)}`,
      ),
      "",
      `Subtotal before delivery: ${money(subtotal)}`,
      "Delivery fee: To be confirmed",
      "",
      "DELIVERY DETAILS",
      `Address: ${address || "No delivery address provided."}`,
      ...(customer.landmark ? [`Landmark: ${customer.landmark}`] : []),
      ...(customer.instructions
        ? [`Delivery instructions: ${customer.instructions}`]
        : []),
      ...(mapsLink ? [`Maps: ${mapsLink}`] : []),
      "",
      "NEXT STEP",
      "Contact the customer to confirm the delivery fee, payment arrangements, product availability, and dispatch details.",
    ].join("\n");

    // Use Resend's testing sender. The recipient must be your Resend account email.
    const resend = new Resend(apiKey);

    const { data: emailData, error } = await resend.emails.send({
      from: "Elevate Collectives <onboarding@resend.dev>",
      to: ownerEmail,
      subject: `New order — ${customerName} — ${trackingCode}`,
      html,
      text,
    });

    if (error) {
      console.error("Resend order notification error:", error);

      return NextResponse.json(
        { error: "We couldn't notify the store about this order." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      trackingCode,
      emailId: emailData?.id,
    });
  } catch (error) {
    console.error("Order submission error:", error);

    return NextResponse.json(
      { error: "An unexpected error occurred while submitting your order." },
      { status: 500 },
    );
  }
}
