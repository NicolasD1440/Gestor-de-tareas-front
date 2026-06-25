import Task from "../Task/Task";
import './Colum.css'

function Column({ title, tasks }) {

    return (

        <div className="Column">

    <div className="titles">
        <h2>{title}</h2>
        <div className="titles-options">
         <button className="AddButton">
            <i class="fa-solid fa-plus"></i>
        </button>
        <a href=""><i className="fa-solid fa-ellipsis"></i></a>
        </div>
        
    </div>

    <div className="tasks">

        {tasks.map(task => (
            <Task
                key={task.id}
                task={task}
            />
        ))}

    </div>

</div>

    );

}

export default Column;