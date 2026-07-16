import './login.css';
import { useState } from "react";
import { login } from "../../services/loginService";
import { useNavigate } from "react-router-dom";

function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleLogin = async (e) => {
     e.preventDefault();
    try {
        const response = await login({
            email,
            password,
        });
        console.log(response);
        navigate("/"); 
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
           <div className='button-styles'>
            <button>Iniciar sesion</button>
           </div>
            <div className='register'>
               <label>¿No tienes una cuenta? <a href="#">Registrarse</a></label>
            </div>
            
          </form>
        </div>
     </div>
    </div>
    );
}

export default Login;
