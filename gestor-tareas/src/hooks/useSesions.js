import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function useSession() {
    const [timeLeft, setTimeLeft] = useState("");
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;
        const decoded = jwtDecode(token);
        const interval = setInterval(() => {
             const now = Math.floor(Date.now() / 1000);
            const secondsLeft = decoded.exp - now;
            const minutes = Math.floor(secondsLeft / 60);
            const seconds = secondsLeft % 60;
            setTimeLeft(`${minutes}:${seconds}`);
 
        }, 1000);
        return () => clearInterval(interval);
        
    }, []);
     return timeLeft;
}
export default useSession;