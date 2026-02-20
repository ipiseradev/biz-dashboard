export type RecentSale = {
  id: string;
  customer: string;
  date: string; // YYYY-MM-DD
  amount: number;
  status: "Pagado" | "Pendiente" | "Vencido";
};

export const recentSales: RecentSale[] = [
  { id: "FV-1001", customer: "Ferretería López", date: "2026-02-10", amount: 42000, status: "Pagado" },
  { id: "FV-1002", customer: "Distribuidora Sur", date: "2026-02-12", amount: 185000, status: "Pendiente" },
  { id: "FV-1003", customer: "Kiosco Central", date: "2026-02-14", amount: 12000, status: "Pagado" },
  { id: "FV-1004", customer: "Estudio Contable Ríos", date: "2026-02-15", amount: 95000, status: "Vencido" },
  { id: "FV-1005", customer: "Panadería San Juan", date: "2026-02-18", amount: 31000, status: "Pendiente" },
];
