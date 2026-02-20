"use client";

import { recentSales, type RecentSale } from "@/data/recentSales";

function formatARS(value: number) {
  try {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `$ ${Math.round(value)}`;
  }
}

function statusBadge(status: RecentSale["status"]) {
  const base: React.CSSProperties = {
    padding: "4px 8px",
    borderRadius: 999,
    fontSize: 12,
    display: "inline-block",
    border: "1px solid #e5e5e5",
    background: "white",
  };

  if (status === "Pagado") return { ...base };
  if (status === "Pendiente") return { ...base };
  return { ...base };
}

export default function RecentSalesTable() {
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
        <span style={{ fontSize: 12, opacity: 0.7 }}>Últimos movimientos</span>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", fontSize: 12, opacity: 0.7 }}>
              <th style={{ padding: "10px 8px", borderBottom: "1px solid #eee" }}>ID</th>
              <th style={{ padding: "10px 8px", borderBottom: "1px solid #eee" }}>Cliente</th>
              <th style={{ padding: "10px 8px", borderBottom: "1px solid #eee" }}>Fecha</th>
              <th style={{ padding: "10px 8px", borderBottom: "1px solid #eee" }}>Monto</th>
              <th style={{ padding: "10px 8px", borderBottom: "1px solid #eee" }}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {recentSales.map((s) => (
              <tr key={s.id}>
                <td style={{ padding: "10px 8px", borderBottom: "1px solid #f2f2f2" }}>{s.id}</td>
                <td style={{ padding: "10px 8px", borderBottom: "1px solid #f2f2f2" }}>{s.customer}</td>
                <td style={{ padding: "10px 8px", borderBottom: "1px solid #f2f2f2" }}>{s.date}</td>
                <td style={{ padding: "10px 8px", borderBottom: "1px solid #f2f2f2" }}>
                  {formatARS(s.amount)}
                </td>
                <td style={{ padding: "10px 8px", borderBottom: "1px solid #f2f2f2" }}>
                  <span style={statusBadge(s.status)}>{s.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
