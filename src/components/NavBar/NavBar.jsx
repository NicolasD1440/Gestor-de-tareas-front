import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useSession from "../../hooks/useSesions";
import { logout } from "../../services/loginService";
import "./NavBar.css";

function NavBar() {
  const timeLeft = useSession();
  const navigate = useNavigate();
  const location = useLocation();

  const [abierto, setAbierto] = useState(false);
  const menuRef = useRef(null);

  const isBoard = location.pathname === "/" || location.pathname === "/panel";
  const isProfile = location.pathname === "/profile";

  const alternarMenu = () => setAbierto((prev) => !prev);

  const cerrarSesion = async () => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro de que quieres cerrar la sesión?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, cerrar sesión",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        await logout();
        setAbierto(false);
        navigate("/login");
      }
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

    document.addEventListener("mousedown", manejarClicFuera);
    return () => {
      document.removeEventListener("mousedown", manejarClicFuera);
    };
  }, []);

  return (
    <header className="Nav-main">
      <div className="search">
        {isBoard && (
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Buscar tarea..."
              className="search-input"
            />
          </div>
        )}

        {isProfile && (
          <div className="page-title">
            <h2>Mi perfil</h2>
            <p>Administra tu información personal</p>
          </div>
        )}
      </div>

      <div className="options">
        {isBoard && (
          <>
            <div className="timer">
              <i className="fa-regular fa-clock"></i>
              <span>{timeLeft}</span>
            </div>
            <i className="fa-regular fa-bell icon-btn"></i>
          </>
        )}

        <i className="fa-regular fa-circle-question icon-btn"></i>

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
              <li
                onClick={() => {
                  setAbierto(false);
                  navigate("/profile");
                }}
              >
                <i className="fa-regular fa-user"></i>
                <span>Perfil</span>
              </li>

              <li className="logout-option" onClick={cerrarSesion}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <span>Cerrar sesión</span>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}

export default NavBar;