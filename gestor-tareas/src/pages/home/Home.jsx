import Board from "../../components/Board/Board";
import Sidebar from "../../components/Sidebar/sidebar";
import './Home.css'

function Home() {

    return (
         <div className="Home">
            <Sidebar />
            <main className="MainContent">
                <h1>Gestor de tareas</h1>
                <Board />
            </main>
        </div>
    );

}

export default Home;