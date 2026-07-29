import "./panel.css";
import Sidebar from "../../components/Sidebar/sidebar";
import NavBar from "../../components/NavBar/NavBar";
import PanelMain from "../../components/Panel/PanelMain";

function inicio(){
    return(
       <div className="Inicio">
            
            <Sidebar />
            <main className="MainContent">
                <NavBar/>
                <PanelMain/>
            </main>
        </div>
    );
}

export default inicio;