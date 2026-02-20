"use client";

import { useEffect, useState } from "react";
import type { RecentSale } from "@/data/recentSales";
import AddSaleModal from "@/components/AddSaleModal";

const STORAGE_KEY = "biz-sales";

function formatARS(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
}

function badgeClass(status: RecentSale["status"]) {
  if (status === "Pagado") return "badge badge-success";
  if (status === "Vencido") return "badge badge-danger";
  return "badge badge-warning";
}

export default function RecentSalesTable() {
  const [sales, setSales] = useState<RecentSale[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setSales(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sales));
  }, [sales]);

  function createSale(sale: RecentSale) {
    setSales((prev) => [sale, ...prev]);
    window.dispatchEvent(new Event("biz-sales-updated"));
  }

  return (
    <div className="card card-pad" style={{ marginTop: 16 }}>
      <AddSaleModal open={open} onClose={() => setOpen(false)} onCreate={createSale} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
          gap: 12,
        }}
      >
        <div>
          <h3 style={{ margin: 0 }}>Ventas recientes</h3>
          <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
            Últimos movimientos
          </div>
        </div>

        <button className="btn" onClick={() => setOpen(true)}>
          Agregar venta
        </button>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", fontSize: 12, color: "var(--muted)" }}>
              <th style={{ padding: "10px 8px", borderBottom: "1px solid var(--border)" }}>
                ID
              </th>
              <th style={{ padding: "10px 8px", borderBottom: "1px solid var(--border)" }}>
                Cliente
              </th>
              <th style={{ padding: "10px 8px", borderBottom: "1px solid var(--border)" }}>
                Fecha
              </th>
              <th style={{ padding: "10px 8px", borderBottom: "1px solid var(--border)" }}>
                Monto
              </th>
              <th style={{ padding: "10px 8px", borderBottom: "1px solid var(--border)" }}>
                Estado
              </th>
            </tr>
          </thead>

          <tbody>
            {sales.map((s) => (
              <tr key={s.id}>
                <td style={{ padding: "12px 8px", borderBottom: "1px solid #f2f2f2" }}>
                  {s.id}
                </td>
                <td style={{ padding: "12px 8px", borderBottom: "1px solid #f2f2f2" }}>
                  <div style={{ fontWeight: 700 }}>{s.customer}</div>
                </td>
                <td style={{ padding: "12px 8px", borderBottom: "1px solid #f2f2f2" }}>
                  {s.date}
                </td>
                <td style={{ padding: "12px 8px", borderBottom: "1px solid #f2f2f2" }}>
                  {formatARS(s.amount)}
                </td>
                <td style={{ padding: "12px 8px", borderBottom: "1px solid #f2f2f2" }}>
                  <span className={badgeClass(s.status)}>{s.status}</span>
                </td>
              </tr>
            ))}

            {sales.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: 12, color: "var(--muted)" }}>
                
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
