import "./profileUser.css";
import Sidebar from "../../components/Sidebar/sidebar";
import NavBar from "../../components/NavBar/NavBar";
import Profile from "../../components/Profile/profile"
import { useEffect, useState } from "react";
import {getUserLogged, getUserById} from "../../services/userService";

function ProfileUser() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        getInfoUser();
    }, []);


    async function getInfoUser(id) {
       try {
            const userLogged = await getUserLogged();
            const data = await getUserById(userLogged.id);
            setUser(data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="Profile">
            <Sidebar />
            <main className="MainContent">
                <NavBar />
                {user && <Profile user={user} />}
            </main>
        </div>
    );

}

export default ProfileUser;