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
    <div
      style={{
        marginTop: 16,
        background: "white",
        padding: 20,
        borderRadius: 14,
        border: "1px solid #e5e5e5",
      }}
    >
      <AddSaleModal
        open={open}
        onClose={() => setOpen(false)}
        onCreate={createSale}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <h3 style={{ margin: 0 }}>Ventas recientes</h3>
        <button
          onClick={() => setOpen(true)}
          style={{
            padding: "6px 12px",
            borderRadius: 8,
            border: "1px solid #ddd",
            cursor: "pointer",
          }}
        >
          + Agregar venta
        </button>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", fontSize: 12, opacity: 0.7 }}>
              <th style={{ padding: "10px 8px", borderBottom: "1px solid #eee" }}>
                ID
              </th>
              <th style={{ padding: "10px 8px", borderBottom: "1px solid #eee" }}>
                Cliente
              </th>
              <th style={{ padding: "10px 8px", borderBottom: "1px solid #eee" }}>
                Fecha
              </th>
              <th style={{ padding: "10px 8px", borderBottom: "1px solid #eee" }}>
                Monto
              </th>
              <th style={{ padding: "10px 8px", borderBottom: "1px solid #eee" }}>
                Estado
              </th>
            </tr>
          </thead>

          <tbody>
            {sales.map((s) => (
              <tr key={s.id}>
                <td style={{ padding: "10px 8px", borderBottom: "1px solid #f2f2f2" }}>
                  {s.id}
                </td>
                <td style={{ padding: "10px 8px", borderBottom: "1px solid #f2f2f2" }}>
                  {s.customer}
                </td>
                <td style={{ padding: "10px 8px", borderBottom: "1px solid #f2f2f2" }}>
                  {s.date}
                </td>
                <td style={{ padding: "10px 8px", borderBottom: "1px solid #f2f2f2" }}>
                  {formatARS(s.amount)}
                </td>
                <td style={{ padding: "10px 8px", borderBottom: "1px solid #f2f2f2" }}>
                  {s.status}
                </td>
              </tr>
            ))}

            {sales.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: 12, opacity: 0.7 }}>
                  No hay ventas todavía. Tocá “+ Agregar venta”.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
