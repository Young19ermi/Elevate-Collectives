# ELEVATE COLLECTIVES

### Thoughtfully Selected. Designed to Deliver Value

## ✦ About the Project

**Elevate Collectives** is a modern online shopping platform focused on bringing carefully selected fashion, accessories, fragrances, and lifestyle products to customers in Ethiopia.

The goal is simple: combine a premium visual identity with a smooth shopping experience, intuitive navigation, and a checkout flow designed around local customer needs.

From browsing the catalog to reviewing an order, every interaction is designed to feel clean, purposeful, and easy to use.

## ✨ Features

- **Curated Product Catalog** — Browse a growing collection of clothing, perfumes, watches, sunglasses, belts, and more.
- **Product Details & Galleries** — Explore product information, pricing, available options, and imagery.
- **Shopping Cart** — Add products, adjust quantities, select applicable options, and review your bag before checkout.
- **Responsive Experience** — A layout designed to work across desktop, tablet, and mobile screens.
- **Checkout & Delivery Details** — Collect customer contact information and delivery addresses through a structured checkout flow.
- **Order Confirmation** — Generate a unique tracking code and present a dedicated confirmation experience after successful submission.
- **Transaction History** — Review previous orders, inspect transaction details, and manage locally stored history.
- **Order Status** — Display order confirmation and payment-awaiting information, including the message: _“You will pay after you get the product in hand.”_
- **Email Notifications** — Send order-related email notifications through Resend when the service is correctly configured.
- **Telegram Contact** — Give customers a direct way to contact the store for questions and order assistance.
- **Ethiopian Market Focus** — Display product prices in Ethiopian birr (ETB) and support locally relevant delivery information.

## 🛍️ Product Categories

| Category            | Description                             |
| ------------------- | --------------------------------------- |
| T-shirts & Clothing | Everyday essentials and selected styles |
| Perfumes            | Fragrances for different preferences    |
| Watches             | Timepieces and statement accessories    |
| Sunglasses          | Accessories for everyday wear           |
| Belts               | Practical finishing touches             |
| Artifacts           | A category planned for future expansion |

_Available products and categories may change as the catalog evolves._

## 🧰 Tech Stack

| Technology                                    | Purpose                                                 |
| --------------------------------------------- | ------------------------------------------------------- |
| [Next.js](https://nextjs.org/)                | Application framework and routing                       |
| [React](https://react.dev/)                   | Component-based user interface                          |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe application development                       |
| [Tailwind CSS](https://tailwindcss.com/)      | Responsive styling and UI design                        |
| [Zustand](https://zustand.docs.pmnd.rs/)      | Lightweight client-side state management                |
| [Zod](https://zod.dev/)                       | Data validation and schema definitions                  |
| [Resend](https://resend.com/)                 | Transactional email integration                         |
| [Chapa](https://chapa.co/)                    | Payment integration planned for the checkout experience |

> **Payment note:** Payment provider integration and live payment processing depend on the project's current implementation and configuration. The presence of a provider in the tech stack does not mean every payment method is active.

## 🚀 Getting Started

### Prerequisites

- Node.js compatible with the project's Next.js version
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Young19ermi/Elevate-Collectives.git
cd Elevate-Collectives
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root.

```env
RESEND_API_KEY=your_resend_api_key
ORDERS_FROM_EMAIL=your_configured_sender_address
ORDERS_TO_EMAIL=your_store_notification_email
```

Use the variable names required by your current API route. Keep secret keys on the server, never commit `.env.local`, and never expose private API keys through `NEXT_PUBLIC_` variables.

**Email setup:** Resend's testing configuration restricts recipients and sender addresses. Follow its current sender-verification requirements before using the integration for real customer emails.

If email functionality is not configured, the rest of the application may still run, but order email requests will not work.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production

```bash
npm run build
npm run start
```

## 📂 Project Structure

The application follows a feature-oriented Next.js App Router structure. The exact files may evolve as development continues.

```text
elevate-shopping/
├── public/                  # Static assets and product images
├── src/
│   ├── app/                 # Pages, layouts and API routes
│   │   ├── api/             # Server-side endpoints
│   │   ├── cart/            # Shopping cart
│   │   ├── checkout/        # Checkout and confirmation
│   │   └── products/        # Product catalog and details
│   ├── data/                # Product catalog data
│   ├── features/            # Feature-specific logic and state
│   └── lib/                 # Shared utilities and helpers
├── .env.local               # Local environment variables (not committed)
├── package.json
└── README.md
```

## 🧾 Order Experience

The intended customer journey is straightforward:

1. Browse products and explore their details.
2. Add products to the shopping cart.
3. Review quantities, options, and the order subtotal.
4. Enter contact and delivery information.
5. Submit the order details.
6. Receive an order confirmation and tracking code when submission succeeds.
7. Review the transaction history and contact the store when assistance is needed.

**Order status and payment status are different.** An order may be confirmed while payment remains awaited. The displayed payment message reflects the store's intended pay-on-delivery arrangement, subject to the actual order terms.

### Important implementation detail

Transaction history stored in browser `localStorage` is specific to that browser and device. It is not a centralized customer account or a persistent store database. For reliable cross-device history, inventory control, and order management, connect the flow to a database and associate orders with a verified customer identity.

## 🎨 Design Philosophy

Elevate Collectives is built around a simple design direction:

- **Minimal, not empty** — Give products and important information room to breathe.
- **Premium, not complicated** — Use thoughtful typography, balanced spacing, and restrained colors.
- **Mobile-first thinking** — Make the essential shopping actions accessible on smaller screens.
- **Clear customer communication** — Make order status, delivery details, and next steps easy to understand.
- **Local relevance** — Build for Ethiopian customers, including ETB pricing and local delivery needs.

## 🔒 Security & Reliability

- Validate incoming order data on the server.
- Calculate order totals from trusted product data rather than client-submitted prices.
- Keep API credentials in server-side environment variables.
- Validate customer inputs before processing requests.
- Use persistent server-side order storage and unique database constraints before treating tracking codes as a production order-management system.
- Add rate limiting, duplicate-submission protection, and appropriate customer-data retention policies before public launch.

## 🗺️ Roadmap

- [x] Product catalog and product detail experience
- [x] Shopping cart
- [x] Checkout form and order confirmation flow
- [x] Unique-format tracking codes
- [x] Transaction history interface
- [x] Transactional email integration
- [x] Persistent database-backed order history
- [x] Customer accounts and cross-device order access
- [x] Production-ready payment integration
- [x] Inventory synchronization and order administration


_The checklist reflects the intended project direction; verify each item against the current implementation before treating it as complete._

## 🤝 Contributing

Suggestions, bug reports, and improvements are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Test the affected functionality.
5. Submit a pull request with a clear description.

## 📬 Contact

**Elevate Collectives**

- Telegram: [@Youngermi](https://t.me/Youngermi)
- GitHub: [Young19ermi](https://github.com/Young19ermi)
