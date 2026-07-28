import { useEffect, useState } from "react";
import api from "../services/api";

function useSession() {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    let interval;

    const obtenerSesion = async () => {
      try {
        const response = await api.get("/auth/session");

        const expiresAt = response.data.expiresAt;

        const actualizarTiempo = () => {
          const now = Math.floor(Date.now() / 1000);

          const secondsLeft = expiresAt - now;

          if (secondsLeft <= 0) {
            setTimeLeft("0:00");

            clearInterval(interval);

            return;
          }

          const minutes = Math.floor(secondsLeft / 60);

          const seconds = secondsLeft % 60;

          setTimeLeft(
            `${minutes}:${String(seconds).padStart(2, "0")}`
          );
        };

        // Se ejecuta inmediatamente
        actualizarTiempo();

        // Luego se actualiza cada segundo
        interval = setInterval(
          actualizarTiempo,
          1000
        );

      } catch (error) {
        console.error(
          "No se pudo obtener la sesión:",
          error
        );

        setTimeLeft("");
      }
    };

    obtenerSesion();

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  return timeLeft;
}

export default useSession;