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

export default function SalesChart() {
  return (
    <div
      style={{
        marginTop: 40,
        background: "white",
        padding: 20,
        borderRadius: 14,
        border: "1px solid #e5e5e5",
      }}
    >
      <h3 style={{ marginBottom: 20 }}>Ingresos</h3>

      <ResponsiveContainer width="100%" height={300}>
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
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
