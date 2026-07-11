import Board from "../../components/Board/Board";
import Sidebar from "../../components/Sidebar/sidebar";
import NavBar from "../../components/NavBar/NavBar";
import { useState, useEffect } from "react";
import { getTasks } from "../../services/taskService";
import './Home.css'

function Home() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        loadTasks();
    }, []);

    async function loadTasks(){
        const data = await getTasks();
        setTasks(data);
    }
    return (
         <div className="Home">
            
            <Sidebar />
            <main className="MainContent">
                <NavBar/>
                <h3>Gestor de tareas</h3>
                <Board tasks={tasks}/>
            </main>
        </div>
    );

}

export default Home;