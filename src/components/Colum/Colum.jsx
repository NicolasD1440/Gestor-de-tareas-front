import Task from "../Task/Task";
import './Colum.css'
import { useDroppable } from "@dnd-kit/core";

function Column({ id, title, tasks, onEdit, onDelete, onDuplicate,onCreate}) {

    const { setNodeRef } = useDroppable({
        id,
    });

    return (
 <div ref={setNodeRef} className="Column">

            <div className="titles">
                <h2>{title}</h2>

                <div className="titles-options">
                    <button className="AddButton"
                    onClick={onCreate}>
                        <i className="fa-solid fa-plus"></i>
                    </button>

                    <a href="">
                        <i className="fa-solid fa-ellipsis"></i>
                    </a>
                </div>
            </div>

            <div className="tasks">
                {tasks.map(task => (
                    <Task
                        key={task.id}
                        task={task}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onDuplicate={onDuplicate}
                    />
                ))}
            </div>

        </div>

    );

}

export default Column;