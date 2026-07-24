import './register.css';
import { useState } from "react";
import { createNewUser } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const navigate = useNavigate();

  
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

  const handleRegister = async (e) => {
     e.preventDefault();
    try {
        const response = await createNewUser({
            fullname,
            email,
            password,
        });
        console.log(response);
        navigate("/"); 
         Toast.fire({
          icon: 'success',
          title: 'Usuario creado exitosamente'
        });
        localStorage.setItem("token", response.token);
    } catch (error) {
        console.log(error);
    }
   };
  

    return(
    <div className='main-container'>
     <div className='banner'>
        <div className='content-banner'>
            <div className='title-banner'>
              <h1>Gestor de tareas</h1>
            </div>
            <div className='text-banner'>
              <h2>¿Ya tienes una cuenta? Inicia sesion:</h2>
            </div>
            <div className='button-reg'>
             <button>Iniciar sesion</button>
            </div>
            
        </div>
     </div>

     <div className='form-login'>
       <div className='title'>
           <h1>!Bienvenido! crea tu cuenta</h1>
       </div>
      
        <div className='dates-login'>
          <form onSubmit={handleRegister}>
            <label>Nombre completo</label>
          <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} required />
            <label>Correo</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            <label>Contraseña</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
           <div className='button-styles'>
            <button>Registrarse</button>
           </div>
            <div className='register'>
               <label>¿Ya tienes una cuenta? Inicia sesion: <a href="login">Iniciar sesion</a></label>
            </div>
            
          </form>
        </div>
     </div>
    </div>
    );
}

export default Login;
