import Board from "../../components/Board/Board";
import Sidebar from "../../components/Sidebar/sidebar";
import NavBar from "../../components/NavBar/NavBar";
import './Home.css'

function Home() {

    return (
         <div className="Home">
            
            <Sidebar />
            <main className="MainContent">
                <NavBar/>
                <h3>Gestor de tareas</h3>
                <Board />
            </main>
        </div>
    );

}

export default Home;