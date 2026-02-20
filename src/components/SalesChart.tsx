"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { salesData } from "@/data/sales";

type SalePoint = { month: string; revenue: number };

function hasRealData(data: SalePoint[]) {
  // si hay al menos un punto con revenue > 0
  return data.some((d) => Number(d.revenue) > 0);
}

export default function SalesChart() {
  const ok = hasRealData(salesData as SalePoint[]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
        <div>
          <h3 style={{ margin: 0 }}>Ingresos por mes</h3>
          <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
            Evolución de ingresos en el período
          </div>
        </div>
      </div>

      {!ok ? (
        <div
          style={{
            border: "1px dashed var(--border)",
            borderRadius: 14,
            padding: 22,
            background: "#fff",
            minHeight: 240,
            display: "grid",
            placeItems: "center",
            textAlign: "center",
          }}
        >
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 6 }}>
              Todavía no hay datos para mostrar
            </div>
            <div style={{ fontSize: 13, color: "var(--muted)" }}>
              Agregá ventas para que el gráfico empiece a calcular ingresos por mes.
            </div>
          </div>
        </div>
      ) : (
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#000000"
                strokeWidth={3}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
