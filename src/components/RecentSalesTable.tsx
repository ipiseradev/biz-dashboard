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
    if (stored) {
      setSales(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sales));
  }, [sales]);

  function addSale() {
    const newSale: RecentSale = {
      id: "FV-" + Math.floor(Math.random() * 10000),
      customer: "Nuevo Cliente",
      date: new Date().toISOString().split("T")[0],
      amount: 50000,
      status: "Pendiente",
    };

    setSales([newSale, ...sales]);
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
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
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

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", fontSize: 12, opacity: 0.7 }}>
            <th style={{ padding: "10px 8px" }}>ID</th>
            <th style={{ padding: "10px 8px" }}>Cliente</th>
            <th style={{ padding: "10px 8px" }}>Fecha</th>
            <th style={{ padding: "10px 8px" }}>Monto</th>
            <th style={{ padding: "10px 8px" }}>Estado</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((s) => (
            <tr key={s.id}>
              <td style={{ padding: "10px 8px" }}>{s.id}</td>
              <td style={{ padding: "10px 8px" }}>{s.customer}</td>
              <td style={{ padding: "10px 8px" }}>{s.date}</td>
              <td style={{ padding: "10px 8px" }}>{formatARS(s.amount)}</td>
              <td style={{ padding: "10px 8px" }}>{s.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
