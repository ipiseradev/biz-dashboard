export default function Sidebar() {
  return (
    <aside
      style={{
        width: 220,
        height: "100vh",
        borderRight: "1px solid #e5e5e5",
        padding: 20,
        background: "#fafafa",
      }}
    >
      <h2 style={{ fontSize: 18, marginBottom: 24 }}>Panel </h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Item text="Dashboard" active />
        <Item text="Ventas" />
        <Item text="Clientes" />
        <Item text="Reportes" />
        <Item text="Configuración" />
      </nav>
    </aside>
  );
}

function Item({ text, active = false }: { text: string; active?: boolean }) {
  return (
    <div
      style={{
        padding: "8px 10px",
        borderRadius: 8,
        background: active ? "#e5e7eb" : "transparent",
        cursor: "pointer",
        fontSize: 14,
      }}
    >
      {text}
    </div>
  );
}
