import Column from "../Colum/Colum";
import './Board.css'
import { useEffect, useState } from "react";
import  {getTasks, updateTask, deleteTask, createTask} from "../../services/taskService";
import { DndContext,  DragOverlay } from "@dnd-kit/core";
import Task from "../Task/Task";
import EditTaskModal from "../EditTaskModal/EditTaskModal";

function Board() {

    const [tasks, setTasks] = useState([]);
    const [activeTask, setActiveTask] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [modalPosition, setModalPosition] = useState({
    top: 0,
    left: 0
    });

    useEffect(() => {
        loadTasks();
    }, []);

    async function loadTasks() {
        try {
            const data = await getTasks();
            setTasks(data);
        } catch (error) {
            console.error(error);
        }
    }


    async function handleDeleteTask(taskId){
        try {
            await deleteTask(taskId);
            setTasks(prev =>
            prev.filter(task => task.id !== taskId));
        } catch (error) {
            console.error(error);
        }
      
    }
    async function handleDuplicateTask(taskBody) {
        try {
            const newTaskData = taskBody;
            const { id, updated_at,created_at,due_date,completed_at,user_id, ...newTaskMod } = newTaskData;
              console.log(newTaskMod);
            const savedTask = await createTask(newTaskMod);
            setTasks(prev => [...prev, savedTask]);
        } catch (error) {
            console.error(error);
        }
        
    }

  function handleEditTask(task, rect) {

    const modalWidth = 420;
    const margin = 12;

    let left = rect.right + margin;

    // Si no cabe a la derecha, lo ponemos a la izquierda
    if (left + modalWidth > window.innerWidth) {
        left = rect.left - modalWidth - margin;
    }

    let top = rect.top;

    const modalHeight = 560;

    // Si se sale por abajo, lo subimos
    if (top + modalHeight > window.innerHeight) {
        top = window.innerHeight - modalHeight - margin;
    }

    setEditingTask(task);

    setModalPosition({
        top,
        left
    });

    setIsEditModalOpen(true);
}
    async function handleSaveTask(updatedTask) {
    try {

        await updateTask(editingTask.id, updatedTask);

        setTasks(prev =>
            prev.map(task =>
                task.id === editingTask.id
                    ? { ...task, ...updatedTask }
                    : task
            )
        );

        setIsEditModalOpen(false);
        setEditingTask(null);

    } catch (error) {
        console.error(error);
    }
}

function handleDragStart({ active }) {
    const task = tasks.find(t => t.id === active.id);
    setActiveTask(task);
}

 async function handleDragEnd({ active, over }) {
      setActiveTask(null);
    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    // Actualiza la UI inmediatamente
    setTasks(prev =>
        prev.map(task =>
            task.id === taskId
                ? { ...task, status: newStatus }
                : task
        )
    );

    try {
        await updateTask(taskId, {
            status: newStatus
        });
    } catch (error) {
        console.error(error);

        // Si falla el backend, recarga el estado real
        loadTasks();
    }
}

    const columns = [
        {
            id: "Por hacer",
            title: "Por hacer",
            tasks: tasks.filter(task => task.status === "Por hacer")
        },
        {
            id: "En progreso",
            title: "En progreso",
            tasks: tasks.filter(task => task.status === "En progreso")
        },
        {
            id: "Hecho",
            title: "Hecho",
            tasks: tasks.filter(task => task.status === "Hecho")
        }
    ];

    return (
       
<DndContext
    onDragStart={handleDragStart}
    onDragEnd={handleDragEnd}
    onDragCancel={() => setActiveTask(null)}
>
    <div className="Board">
        {columns.map(column => (
            <Column
                key={column.id}
                id={column.id}
                title={column.title}
                tasks={column.tasks}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onDuplicate={handleDuplicateTask}
            />
        ))}
    </div>

    <DragOverlay>
        {activeTask ? (
            <Task task={activeTask} />
        ) : null}
    </DragOverlay>
    <EditTaskModal
    isOpen={isEditModalOpen}
    task={editingTask}
    position={modalPosition}
    onClose={() => {
        setIsEditModalOpen(false);
        setEditingTask(null);
    }}
    onSave={handleSaveTask}
  />

</DndContext>
    );
}

export default Board;