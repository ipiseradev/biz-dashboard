"use client";

import { useEffect, useState } from "react";
import type { RecentSale } from "@/data/recentSales";

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

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setSales(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sales));
  }, [sales]);

  function addSale() {
    const customer = prompt("Cliente:");
    if (!customer) return;

    const amountStr = prompt("Monto:");
    if (!amountStr) return;

    const amount = Number(amountStr);
    if (Number.isNaN(amount) || amount <= 0) return;

    const today = new Date().toISOString().split("T")[0];
    const date = prompt("Fecha (YYYY-MM-DD):", today) || today;

    const statusInput =
      prompt("Estado (Pagado / Pendiente / Vencido):", "Pendiente") ||
      "Pendiente";

    const status: RecentSale["status"] =
      statusInput === "Pagado" || statusInput === "Vencido"
        ? statusInput
        : "Pendiente";

    const newSale: RecentSale = {
      id: "FV-" + Math.floor(Math.random() * 10000),
      customer,
      date,
      amount,
      status,
    };

    setSales((prev) => [newSale, ...prev]);

    // avisar a KPIs y gráfico
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <h3 style={{ margin: 0 }}>Ventas recientes</h3>
        <button
          onClick={addSale}
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
                <td
                  style={{
                    padding: "10px 8px",
                    borderBottom: "1px solid #f2f2f2",
                  }}
                >
                  {s.id}
                </td>
                <td
                  style={{
                    padding: "10px 8px",
                    borderBottom: "1px solid #f2f2f2",
                  }}
                >
                  {s.customer}
                </td>
                <td
                  style={{
                    padding: "10px 8px",
                    borderBottom: "1px solid #f2f2f2",
                  }}
                >
                  {s.date}
                </td>
                <td
                  style={{
                    padding: "10px 8px",
                    borderBottom: "1px solid #f2f2f2",
                  }}
                >
                  {formatARS(s.amount)}
                </td>
                <td
                  style={{
                    padding: "10px 8px",
                    borderBottom: "1px solid #f2f2f2",
                  }}
                >
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
