import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  BarChart3, 
  Settings,
  ChevronRight 
} from "lucide-react"; // Importamos iconos para mejorar la jerarquía visual

export default function Sidebar() {
  // 1. Centralizamos los items para cumplir con el principio DRY
  const menuItems = [
    { text: "Dashboard", icon: <LayoutDashboard size={18} />, active: true },
    { text: "Mis Ventas", icon: <ShoppingBag size={18} /> },
    { text: "Clientes Activos", icon: <Users size={18} /> },
    { text: "Reportes Activos", icon: <BarChart3 size={18} /> },
    { text: "Configuración", icon: <Settings size={18} /> },
  ];

  return (
    <aside
      style={{
        width: 260, // Un poco más de aire
        height: "100vh",
        padding: "24px 16px",
        borderRight: "1px solid var(--border)",
        background: "var(--panel)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Brand / Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32, paddingLeft: 8 }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: "var(--primary)",
            color: "white",
            display: "grid",
            placeItems: "center",
            fontWeight: 900,
            fontSize: 14,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)" // Sutil sombra para destacar
          }}
        >
          BIZ
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 16, lineHeight: 1.2 }}>Biz</div>
          <div style={{ fontSize: 12, color: "var(--muted)", opacity: 0.8 }}>Dashboard Manager</div>
        </div>
      </div>

      {/* Navegación */}
      <nav style={{ display: "grid", gap: 4 }}>
        {menuItems.map((item, index) => (
          <Item 
            key={index} 
            text={item.text} 
            icon={item.icon} 
            active={item.active} 
          />
        ))}
      </nav>

      {/* User / Footer Info (Corregido el espacio vacío de tu código) */}
      <div style={{ marginTop: "auto", paddingTop: 16, borderTop: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px" }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#ddd" }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>Ignacio Dev</div>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>Admin Plan</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

interface ItemProps {
  text: string;
  icon: React.ReactNode;
  active?: boolean;
}

function Item({ text, icon, active = false }: ItemProps) {
  return (
    <div
      className="sidebar-item" // Agregué una clase para que puedas aplicar hover en CSS
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 12px",
        borderRadius: 10,
        background: active ? "var(--primary-light, rgba(17,24,39,.05))" : "transparent",
        color: active ? "var(--primary)" : "var(--foreground)",
        cursor: "pointer",
        transition: "all 0.2s ease",
        fontWeight: active ? 700 : 500,
        fontSize: 14,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ opacity: active ? 1 : 0.7 }}>{icon}</span>
        {text}
      </div>
      {active && <ChevronRight size={14} opacity={0.5} />}
    </div>
  );
}