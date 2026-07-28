import './login.css';
import { useState, useEffect } from "react";
import { login } from "../../services/loginService";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
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

          useEffect(() => {
        const savedEmail =
            localStorage.getItem("rememberedEmail");

        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }
    }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        await login({
            email,
            password
        });

        if (rememberMe) {
            localStorage.setItem(
                "rememberedEmail",
                email
            );
        } else {
            localStorage.removeItem(
                "rememberedEmail"
            );
        }
        console.log("Login terminado");
        console.log("Redirigiendo al Home..."); 
        navigate("/");
    } catch (error) {
        console.log(error);

        Toast.fire({
            icon: "error",
            title: "Datos incorrectos"
        });
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
              <h2>Registrarte para usar nuestra aplicacion</h2>
            </div>
            <div className='button-reg'>
             <button>Registrarse</button>
            </div>
            
        </div>
     </div>

     <div className='form-login'>
       <div className='title'>
           <h1>Inicia sesion o crea una cuenta</h1>
       </div>
      
        <div className='dates-login'>
          <form onSubmit={handleLogin}>
            <label>Correo</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <label>Contraseña</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
             <label>
                <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) =>
                        setRememberMe(
                            event.target.checked
                        )
                    }
                />

                Recordar correo
            </label>
           <div className='button-styles'>
            <button type='submit'>Iniciar sesion</button>
           </div>
            <div className='register'>
               <label>¿No tienes una cuenta? <a href="register">Registrarse</a></label>
            </div>
            
          </form>
        </div>
     </div>
    </div>
    );
}

export default Login;
