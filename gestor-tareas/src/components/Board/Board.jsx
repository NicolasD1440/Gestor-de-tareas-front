import Column from "../Colum/Colum";
import './Board.css'
function Board() {

    const columns = [
        {
            id: 1,
            title: "Por hacer",
            tasks: [
                {
                    id: 1,
                    title: "Aprender React",
                    category: "Categoria",
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
                },
                {
                    id: 2,
                    title: "Crear Backend",
                    category: "Categoria",
                    text: "hola 2"
                },
                  {
                    id: 3,
                    title: "Crear Backend",
                    category: "Categoria",
                    text: "hola 3"
                }
            ]
        },
        {
            id: 2,
            title: "En progreso",
            tasks: [
                {
                    id: 3,
                    title: "Diseñar Login",
                    category: "Categoria",
                    text: "hola 1"
                }
            ]
        },
        {
            id: 3,
            title: "Hecho",
            tasks: [
                {
                    id: 4,
                    title: "Crear proyecto",
                    category: "Categoria",
                    text: "hola 1"
                }
            ]
        }
    ];

    return (

        <div className="Board">

            {columns.map(column => (

                <Column
                    key={column.id}
                    title={column.title}
                    tasks={column.tasks}
                />

            ))}

        </div>

    );

}

export default Board;