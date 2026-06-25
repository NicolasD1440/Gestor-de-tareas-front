import "./TaskMenu.css";

function TaskMenu({ closeMenu }) {
    return (
        <div className="task-menu">
            <button onClick={closeMenu}>✏️ Editar</button>
            <button onClick={closeMenu}>📋 Duplicar</button>
            <button onClick={closeMenu}>➡️ Mover</button>
            <button className="delete">🗑 Eliminar</button>
        </div>
    );
}

export default TaskMenu;
