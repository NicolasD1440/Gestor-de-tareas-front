import "./Sidebar.css";

function Sidebar() {
const menu = [
    {
        icon: "fa-solid fa-house-user",
        title: "Inicio"
    },
    {
        icon: "fa-solid fa-table-list",
        title: "Tablero"
    },
    {
        icon: "fa-regular fa-circle-user",
        title: "Perfil"
    }
];
    return (

        <aside className="Sidebar">
            <div className="Sidebar-logo">
                <i className="fa-solid fa-cube"></i>
                <h2>Gestor Tareas</h2>
            </div>
            <nav className="Sidebar-menu">
                 {menu.map(item => (
        <button
            key={item.title}
            className={`Sidebar-item ${item.title === "Tablero" ? "active" : ""}`}
        >
            <i className={item.icon}></i>
            <span>{item.title}</span>
        </button>

    ))}
            </nav>

        </aside>

    );

}

export default Sidebar;