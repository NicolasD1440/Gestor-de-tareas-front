import { useEffect, useState } from "react";
import "./EditTaskModal.css";

function EditTaskModal({isOpen,
    task,
    position,
    onClose,
    onSave}) {

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        status: ""
    });

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title,
                description: task.description,
                category: task.category,
                status: task.status
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

        onSave(formData);
    }

    return (
        <div className="modal-overlay">

            <div className="modal" style={{
        position: "fixed",
        top: position.top,
        left: position.left
    }}>

                <h2>Editar tarea</h2>

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
                            Guardar
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default EditTaskModal;