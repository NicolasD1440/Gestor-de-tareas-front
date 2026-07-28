import "./NavBar.css";
import useSession from "../../hooks/useSesions";
import { useState, useEffect, useRef} from 'react';
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/loginService";

function NavBar() {
  const timeLeft = useSession();

  const navigate = useNavigate();

  const [abierto, setAbierto] = useState(false);
  const menuRef = useRef(null);

  const alternarMenu = () => {
    setAbierto((prev) => !prev);
  };

  const cerrarSesion = async () => {
    try {
      await logout();

      setAbierto(false);

      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };


  useEffect(() => {
    const manejarClicFuera = (evento) => {
      if (menuRef.current && !menuRef.current.contains(evento.target)) {
        setAbierto(false);
      }
    };

    document.addEventListener('mousedown', manejarClicFuera);

    return () => {
      document.removeEventListener('mousedown', manejarClicFuera);
    };
  }, []);


  return (
    <div className="Nav-main">
      <div className="search">
        <div className="search-container">
          <svg 
            className="search-icon" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            width="20" 
            height="20"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          
          <input type="text" placeholder="Search" className="search-input" />
        </div>
      </div>

      <div className="options">
        <div className="timmer">
          <i className="fa-regular fa-clock"><span>{" " + timeLeft}</span></i> 
        </div>
        
        <i className="fa-regular fa-bell"></i>
        <i className="fa-regular fa-circle-question"></i>
        <div className="profile-menu" ref={menuRef}>
          <button
            className="profile-button"
            onClick={alternarMenu}
            aria-label="Abrir menú de perfil"
          >
            <i className="fa-regular fa-circle-user"></i>
          </button>

          {abierto && (
            <ul className="dropdown-menu">
              <li onClick={() => setAbierto(false)}>
                <i className="fa-regular fa-user"></i>
                <span>Perfil</span>
              </li>

              <li
                className="logout-option"
                onClick={cerrarSesion}
              >
                <i className="fa-solid fa-right-from-bracket"></i>
                <span>Cerrar sesión</span>
              </li>
            </ul>
          )}
      </div>
              
      </div>
    </div>
  );
}

export default NavBar;