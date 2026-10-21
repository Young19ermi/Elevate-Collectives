export const ORDER_HISTORY_STORAGE_KEY = "elevate-order-history";

export type OrderCustomer = {
  fullName: string;
  email: string;
  phone: string;
  country?: string;
  deliveryZone?: string;
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

export type StoredOrderItem = {
  productId: string;
  productName: string;
  imageUrl?: string;
  unitPriceEtb: number;
  quantity: number;
  size?: string;
};

export type StoredOrder = {
  trackingCode: string;
  createdAt: string;
  customer: OrderCustomer;
  items: StoredOrderItem[];
  subtotalEtb: number;
  orderStatus: "Order Confirmed";
  paymentStatus: "Payment Awaited";
};