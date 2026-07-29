import "./sidebar.css";
import { NavLink } from "react-router-dom";

function Sidebar() {
const menu = [
    {
      icon: "fa-solid fa-house-user",
      title: "Inicio",
      path: "/panel" // Cambia a "/" si tu Inicio es la raíz
    },
    {
      icon: "fa-solid fa-table-list",
      title: "Tablero",
      path: "/" // O la ruta correspondiente a tu tablero, ej: "/board"
    },
    {
      icon: "fa-regular fa-circle-user",
      title: "Perfil",
      path: "/profile"
    }
  ];
    return (

        <aside className="Sidebar">
            <div className="Sidebar-logo">
                <i className="fa-solid fa-cube"></i>
                <h2>Gestor Tareas</h2>
            </div>
            <nav className="Sidebar-menu">
                 {menu.map((item) => (
        <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) =>
              `Sidebar-item ${isActive ? "active" : ""}`
            }
          >
            <i className={item.icon}></i>
            <span>{item.title}</span>
          </NavLink>
        ))}
            </nav>

        </aside>

    );

}

export default Sidebar;