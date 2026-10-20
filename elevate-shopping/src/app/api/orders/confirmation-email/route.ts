
import { randomUUID } from "node:crypto";
import { Resend } from "resend";
import { NextResponse } from "next/server";
import data from "@/data/products.json";

const resend = new Resend(process.env.RESEND_API_KEY);

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

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY || !process.env.ORDERS_FROM_EMAIL) {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 },
      );
    }

    const body = await request.json();
    const customer = body.customer as {
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

    const items = body.items as RequestItem[];

    if (
      typeof customer?.fullName !== "string" ||
      !customer.fullName.trim() ||
      typeof customer.email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email) ||
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

    const lines = [];

    for (const item of items) {
      if (
        !item ||
        typeof item.productId !== "string" ||
        !Number.isSafeInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > 100
      ) {
        return NextResponse.json(
          { error: "Invalid order item." },
          { status: 400 },
        );
      }

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

    // UUID-based identifier; the full UUID makes accidental collisions
    // extraordinarily unlikely. Persist it with a unique database constraint
    // when order storage is added.
    const trackingCode = `GW-${randomUUID().toUpperCase()}`;

    const subtotal = lines.reduce(
      (sum, line) => sum + line.product.priceEtb * line.quantity,
      0,
    );

    const customerName = escapeHtml(customer.fullName.trim());
    const customerEmail = customer.email.trim();
    const customerPhone = escapeHtml(customer.phone.trim());

    const itemRows = lines
      .map(
        ({ product, quantity, size }) => `
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #e8dfd1;font-size:13px;color:#30271f;">
              ${escapeHtml(product.name)}
              ${size ? `<div style="font-size:11px;color:#8b7c6b;margin-top:4px;">Size: ${escapeHtml(size)}</div>` : ""}
              <div style="font-size:11px;color:#8b7c6b;margin-top:4px;">Qty: ${quantity}</div>
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
      .filter(Boolean)
      .map(escapeHtml)
      .join(", ");

    const mapsLink =
      typeof customer.mapsLink === "string" &&
      /^https:\/\/(www\.)?(google\.[a-z.]+\/maps|maps\.app\.goo\.gl\/)/i.test(
        customer.mapsLink,
      )
        ? customer.mapsLink
        : "";

    const html = `
      <div style="margin:0;background:#f7f1e7;padding:32px 12px;font-family:Arial,Helvetica,sans-serif;color:#30271f;">
        <div style="max-width:520px;margin:0 auto;background:#fffdf9;padding:32px 28px;">
          <div style="text-align:center;padding-bottom:25px;border-bottom:1px solid #eee4d5;">
            <div style="font-family:Georgia,serif;font-size:23px;letter-spacing:1px;color:#6b4b2a;">
              Elevate Collectives
            </div>
            <div style="font-size:9px;letter-spacing:4px;color:#a88454;margin-top:8px;">
              THOUGHTFULLY SELECTED
            </div>
          </div>

          <div style="padding-top:28px;">
            <h1 style="font-family:Georgia,serif;font-size:27px;font-weight:normal;line-height:1.3;margin:0 0 16px;color:#30271f;">
              Thank you, ${escapeHtml(customer.fullName.trim().split(/\s+/)[0])}.
            </h1>

            <p style="font-size:13px;line-height:1.8;color:#76695a;margin:0 0 20px;">
              Your order has been received. Keep the tracking code below for future enquiries.
              Our team will contact you at <strong>${customerPhone}</strong> to confirm your delivery and payment arrangements.
            </p>

            <div style="border:1px solid #d9bd88;background:#f7efdf;text-align:center;padding:18px 10px;margin:22px 0;">
              <div style="font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#8b6a38;margin-bottom:9px;">
                Your tracking code
              </div>
              <div style="font-family:Georgia,serif;font-size:19px;letter-spacing:1px;color:#30271f;overflow-wrap:anywhere;">
                ${trackingCode}
              </div>
            </div>

            <div style="text-align:center;margin:24px 0 30px;">
              <a href="https://t.me/Youngermi"
                 style="display:inline-block;background:#211a14;color:#ffffff;text-decoration:none;padding:15px 24px;font-size:10px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;">
                TRACK YOUR ORDER
              </a>
            </div>

            <h2 style="font-family:Georgia,serif;font-size:20px;font-weight:normal;margin:0 0 8px;">
              Order summary
            </h2>

            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
              ${itemRows}
            </table>

            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:15px;border-collapse:collapse;">
              <tr>
                <td style="padding:7px 0;font-size:12px;color:#76695a;">Subtotal</td>
                <td align="right" style="padding:7px 0;font-size:12px;">${money(subtotal)}</td>
              </tr>
              <tr>
                <td style="padding:7px 0;font-size:12px;color:#76695a;">Delivery fee</td>
                <td align="right" style="padding:7px 0;font-size:11px;color:#76695a;">Confirmed by our team</td>
              </tr>
              <tr>
                <td style="padding:15px 0;border-top:1px solid #d9cdbb;font-family:Georgia,serif;font-size:17px;">Total</td>
                <td align="right" style="padding:15px 0;border-top:1px solid #d9cdbb;font-size:15px;font-weight:bold;">${money(subtotal)}</td>
              </tr>
            </table>

            <div style="margin-top:18px;padding:20px;background:#f8f3eb;">
              <h2 style="font-family:Georgia,serif;font-size:18px;font-weight:normal;margin:0 0 12px;">
                Delivery details
              </h2>
              <p style="font-size:12px;line-height:1.8;margin:0;color:#76695a;">
                <strong style="color:#30271f;">${customerName}</strong><br/>
                ${address || "Address not provided"}<br/>
                ${customerPhone}
                ${customer.landmark ? `<br/>Landmark: ${escapeHtml(customer.landmark)}` : ""}
              </p>
              ${
                mapsLink
                  ? `<p style="margin:14px 0 0;"><a href="${escapeHtml(mapsLink)}" style="font-size:12px;color:#79582e;">View delivery location</a></p>`
                  : ""
              }
              ${
                customer.instructions
                  ? `<p style="font-size:12px;line-height:1.7;color:#76695a;margin:12px 0 0;">Delivery instructions: ${escapeHtml(customer.instructions)}</p>`
                  : ""
              }
            </div>

            <p style="font-size:12px;line-height:1.8;color:#76695a;margin:24px 0 0;">
              Your order is currently pending confirmation. We will contact you before dispatch to confirm the delivery fee and payment arrangements.
            </p>
          </div>

          <div style="border-top:1px solid #eee4d5;margin-top:28px;padding-top:20px;text-align:center;">
            <p style="font-family:Georgia,serif;font-size:15px;color:#8b6a38;margin:0 0 8px;">
              Elevate Collectives
            </p>
            <p style="font-size:10px;line-height:1.8;color:#a09586;margin:0;">
              Others deliver orders. We deliver value.<br/>
              Need help? Message us on
              <a href="https://t.me/Youngermi" style="color:#79582e;">Telegram</a>.
            </p>
          </div>
        </div>
      </div>
    `;

    const result = await resend.emails.send({
      from: process.env.ORDERS_FROM_EMAIL,
      to: customerEmail,
      subject: `Order received — your tracking code is ${trackingCode}`,
      html,
      text: [
        `Thank you, ${customer.fullName}.`,
        `Your order has been received.`,
        `Tracking code: ${trackingCode}`,
        `Phone: ${customer.phone}`,
        `Delivery address: ${address}`,
        `Order subtotal: ${money(subtotal)}`,
        "Delivery fee: Confirmed by our team.",
        "Your order is pending confirmation.",
        "Contact us on Telegram: https://t.me/Youngermi",
      ].join("\n\n"),
    });

    if (result.error) {
      console.error("Resend email error:", result.error);
      return NextResponse.json(
        { error: "We couldn't send the confirmation email. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      trackingCode,
      emailId: result.data?.id,
    });
  } catch (error) {
    console.error("Order confirmation error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while sending your confirmation." },
      { status: 500 },
    );
  }
}
