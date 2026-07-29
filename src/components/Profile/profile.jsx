import React from "react";
import "./profile.css";
import { useEffect, useState } from "react";
import { updateUser } from "../../services/userService";
import Swal from 'sweetalert2';

function Profile({user}) {
const [editing, setEditing] = useState(false);

const [formData, setFormData] = useState({
    name: user.fullname,
    username: user.fullname,
    email: user.email,
});
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

useEffect(() => {
    if (user) {
        setFormData({
            fullname: user.fullname,
            username: user.fullname,
            email: user.email,
        });
    }
}, [user]);

function cancelEdit() {
    setFormData({
        fullname: user.fullname,
        username: user.fullname,
        email: user.email,
    });

    setEditing(false);
}

async function saveUser() {
    try {

        const data =  formData;
        const {username, id, password, created_at,...newObject} = data;
        console.log(newObject);
        const updatedUser = await updateUser(user.id , newObject);
        
        setFormData(updatedUser);
        setEditing(false);

         Toast.fire({
                    icon: 'success',
                    title: 'Perfil actualizado'
                });
    } catch (error) {
        console.error(error);
    }
}


  return (
    <div className="main-container">
      <div className="profile-container">

        {/* Cabecera del perfil */}
        <div className="profile-header">
          <div className="profile-info">
            <div className="profile-avatar">
              <i className="fa-regular fa-circle-user"></i>
            </div>
            <div className="text-profile">
              <h2>{`${formData.fullname}`}</h2>
              <p>{`${formData.email}`}</p>
            </div>
          </div>
       <div className="profile-actions">
    {!editing ? (
        <button
            className="edit-btn"
            onClick={() => setEditing(true)}
        >
            Editar
        </button>
    ) : (
        <>
            <button
                className="save-btn"
                onClick={saveUser}
            >
                Guardar
            </button>

            <button
                className="cancel-btn"
                onClick={cancelEdit}
            >
                Cancelar
            </button>
        </>
    )}
</div>
        </div>

        {/* Formulario de Información */}
        <div className="profile-form">
          <div className="input-group">
            <label>Nombre completo</label>
            <input
              type="text"
              value={`${formData.fullname}`}
              disabled={!editing}
               onChange={(e) =>
        setFormData({
            ...formData,
            fullname: e.target.value
        })
    }
       
            />
          </div>

          <div className="input-group">
            <label>Nombre de usuario</label>
            <input
              type="text"
              value={`${formData.fullname}`}
              disabled={!editing}
              onChange={(e) =>
        setFormData({
            ...formData,
            fullname: e.target.value
        })
    }
            />
          </div>

          <div className="input-group">
            <label>Correo electrónico</label>
            <input
              type="email"
              value={`${formData.email}`}
              disabled={!editing}
               onChange={(e) =>
        setFormData({
            ...formData,
            email: e.target.value
        })
    }
            />
          </div>

          <div className="input-group">
            <label>Rol</label>
            <input
              type="text"
              value="Usuario"
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Profile;