import { useEffect, useState } from "react";
import "./EditTaskModal.css";

function EditTaskModal({isOpen,
    task,
    position,
    onClose,
    onSave,
    onCreate}) {

    const isEditing = !!task;
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        status: ""
    });
    const modalStyle = position
    ? {
        position: "fixed",
        top: position.top,
        left: position.left,
    }
    : {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    };

 useEffect(() => {
    if (task) {
        setFormData({
            title: task.title,
            description: task.description,
            category: task.category,
            status: task.status
        });
    } else {
        setFormData({
            title: "",
            description: "",
            category: "",
            status: "Por hacer"
        });
    }
}, [task]);

    if (!isOpen) return null;

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function handleSubmit(e) {
    e.preventDefault();

    if (isEditing) {
        onSave(formData);
    } else {
        onCreate(formData);
    }
}   

    return (
        <div className="modal-overlay">

            <div className="modal" style={modalStyle}>
                <h2>{isEditing ? "Editar tarea" : "Nueva tarea"}</h2>
                <form onSubmit={handleSubmit}>
                    <label>Título</label>
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <label>Descripción</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <label>Categoría</label>
                    <input
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    />
                    <label>Estado</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option>Por hacer</option>
                        <option>En progreso</option>
                        <option>Hecho</option>
                    </select>

                    <div className="modal-buttons">

                        <button
                            type="button"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button type="submit">
                        {isEditing ? "Guardar" : "Crear"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditTaskModal;