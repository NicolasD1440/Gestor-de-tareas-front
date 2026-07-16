import "./TaskMenu.css";
import Task from '../Task/Task.jsx'


function TaskMenu({  task, onEdit, onDelete, onDuplicate, closeMenu  }) { 

         function handleEdit(event) {
            const rect = event.currentTarget.getBoundingClientRect();
            onEdit(task, rect);
            closeMenu();
        }

    return (
        <div className="task-menu">
            <button onClick={handleEdit}>✏️ Editar</button>
            <button onClick={()=>{ onDuplicate(task);
                                   closeMenu();}}>📋 Duplicar</button>
            <button onClick={()=>{ onDelete(task.id);
                                   closeMenu();}}>🗑 Eliminar
            </button>
        </div>
    );
}

export default TaskMenu;
