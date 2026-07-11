import Column from "../Colum/Colum";
import './Board.css'
import { useEffect, useState } from "react";
import  {getTasks} from "../../services/taskService";

function Board() {

        const [tasks, setTasks] = useState([]);

        useEffect(() => {
            loadTasks();
        }, []);

        async function loadTasks() {
            try {
                const data = await getTasks();

                console.log(data); // <-- Verifica la respuesta

                setTasks(data);
            } catch (error) {
                console.error(error);
            }
}
        const columns = [
    {
        id: 1,
        title: "Por hacer",
        tasks: tasks.filter(task => task.status === "Por hacer")
    },
    {
        id: 2,
        title: "En progreso",
        tasks: tasks.filter(task => task.status === "En progreso")
    },
    {
        id: 3,
        title: "Hecho",
        tasks: tasks.filter(task => task.status === "Hecho")
    }
];
    return (

        <div className="Board">

    {columns.map(column => (

        <Column
            key={column.id}
            title={column.title}
            tasks={column.tasks}
        />

    ))}

</div>

    );

}

export default Board;