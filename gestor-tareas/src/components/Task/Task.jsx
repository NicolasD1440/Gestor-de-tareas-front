import { useState, useRef, useEffect } from "react";
import "./Task.css";
import TaskMenu from "./TaskMenu"

function Task({ task }) {
  const [showMenu, setShowMenu] = useState(false);

    const menuRef = useRef(null);

    useEffect(() => {

        function handleClick(event) {

            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setShowMenu(false);
            }

        }

        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };

    }, []);


    return (

    <div className="menu-container" ref={menuRef}>
        <div className="Task">
            <div className="task-category">
                <div className='task-info'>
                   <span className="task-status"></span>
                <small>{task.category}</small>
                </div>
                
                 <button
                    className="menu-button"
                    onClick={() => setShowMenu(!showMenu)}
                >
                    <i className="fa-solid fa-ellipsis"></i>
                </button>
                
             
            </div>
            
            <h3>{task.title}</h3>   
            <h5>{task.text}</h5>

          
               {showMenu && (
                <TaskMenu closeMenu={() => setShowMenu(false)} />
            )}

        </div>
     </div>

    );

}
export default Task;