import type { RecentSale } from "@/data/recentSales";

export function calcMetrics(sales: RecentSale[]) {
  const revenue = sales.reduce((acc, s) => acc + s.amount, 0);
  const salesCount = sales.length;

  const uniqueClients = new Set(sales.map((s) => s.customer)).size;

  return {
    revenue,
    salesCount,
    clients: uniqueClients,
  };
}
