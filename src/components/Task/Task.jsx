import { useState, useRef, useEffect } from "react";
import "./Task.css";
import TaskMenu from "./TaskMenu"
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

function Task({task, onEdit, onDelete, onDuplicate}) {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClick(event) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setShowMenu(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
    } = useDraggable({
        id: task.id,
    });

    const style = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        <div className="menu-container" ref={menuRef}>
            <div
                ref={setNodeRef}
                style={style}
                className="Task"
            >
                {/* 1. Ubicamos el tirador de arrastre a la izquierda */}
                <div className="drag-handle" {...listeners} {...attributes}>
                    <i className="fa-solid fa-grip-vertical"></i>
                </div>

                {/* 2. Contenedor principal de la información */}
                <div className="task-content">
                    <div className="task-category">
                        <div className="task-info">
                            <span className="task-status"></span>
                            <small>{task.category}</small>
                        </div>

                        <button
                            className="menu-button"
                            onClick={() => setShowMenu(!showMenu)}
                        >
                            <i className="fa-solid fa-ellipsis"></i>
                        </button>
                    </div>
                    
                    <h3>{task.title}</h3>
                    <h5>{task.description}</h5>
          
                            {showMenu && (
                           <TaskMenu
                            task={task}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onDuplicate={onDuplicate}
                            closeMenu={() => setShowMenu(false)}
                   />
                           )}
                 </div>
            </div>   
        </div>
    );
}

export default Task;