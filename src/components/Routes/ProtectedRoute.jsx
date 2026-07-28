import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

function ProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] =
        useState(null);

    useEffect(() => {
        async function checkSession() {
            try {
                await api.get("/auth/me");

                setIsAuthenticated(true);
            } catch {
                setIsAuthenticated(false);
            }
        }

        checkSession();
    }, []);

    if (isAuthenticated === null) {
        return <p>Cargando...</p>;
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    return children;
}

export default ProtectedRoute;