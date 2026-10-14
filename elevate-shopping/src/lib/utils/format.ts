export const formatEtb = (n: number) => new Intl.NumberFormat("en-ET", { style: "currency", currency: "ETB" }).format(n);
