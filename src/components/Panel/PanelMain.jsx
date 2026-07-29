import "./PanelMain.css";
import { useNavigate } from "react-router-dom";
function PanelMain (){
     const navigate = useNavigate();
    return(
     <div className="main-container-panel">
      <div className="card">
        <div className="content">
            <div className="text-panel">
               <h2>Tablero principal</h2>
               <p>Este es el tablero por defecto</p>
            </div>
            <div className="button-panel">
             <button onClick={() => navigate("/")}>Ir al tablero</button>
            </div>

        </div>
       
      </div>
     </div>
    );
}

export default PanelMain;