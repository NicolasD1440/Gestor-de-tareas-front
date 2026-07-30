import Column from "../Colum/Colum";
import './Board.css'
import { useEffect, useState } from "react";
import  {getTasks, updateTask, deleteTask, createTask} from "../../services/taskService";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Task from "../Task/Task";
import EditTaskModal from "../EditTaskModal/EditTaskModal";
import Swal from 'sweetalert2';

function Board() {
  const Toast = Swal.mixin({
        toast: true,
        position: 'top-end', // Posición (esquina superior derecha)
        showConfirmButton: false, // Sin botón de "OK"
        timer: 2000, // Se cierra automáticamente en 2 segundos (2000ms)
        timerProgressBar: true, // Barra visual de tiempo
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
        });
    const [tasks, setTasks] = useState([]);
    const [activeTask, setActiveTask] = useState(null);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    

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
  
    async function handleCreateTask(taskData) {
    try {
        const newTask = await createTask(taskData);

        setTasks(prev => [...prev, newTask]);

        setEditingTask(null);
        setIsTaskModalOpen(false);

    } catch (error) {
        console.error(error);
    }
}
  function handleEditTask(task) {
    setEditingTask(task);
    setIsTaskModalOpen(true);
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

        setIsTaskModalOpen(false);
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

    const task = tasks.find(task => task.id === taskId);

    if (!task) return;

    // No cambió de columna
    if (task.status === newStatus) {
        return;
        console.log("no se actualizo misma columna");
    }

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

      Toast.fire({
          icon: 'success',
          title: '¡Tarea actualizada'
        });
    } catch (error) {
        console.error(error);
        loadTasks();
    }
}
  function handleOpenCreateModal() {
    setEditingTask(null);
   
    setIsTaskModalOpen(true);
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

            const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor, {
            activationConstraint: {
            delay: 200,
            tolerance: 8,
            },
        })
        );

        

    return (
       
<DndContext
    sensors={sensors}
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
        onCreate={handleOpenCreateModal}
            />
        ))}
    </div>

    <DragOverlay>
        {activeTask ? (
            <Task task={activeTask} />
        ) : null}
    </DragOverlay>
    <EditTaskModal
    isOpen={isTaskModalOpen}
    task={editingTask}
    onClose={() => {
        setIsTaskModalOpen(false);
        setEditingTask(null);
    }}
    onSave={handleSaveTask}
    onCreate={handleCreateTask}
/>

</DndContext>
    );
}

export default Board;