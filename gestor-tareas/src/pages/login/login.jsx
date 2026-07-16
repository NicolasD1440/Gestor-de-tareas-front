import './login.css';
function login(){
    return(
     <div className='main-container'>
     <div className='banner'>
      <h5>aca va la imagen</h5>
     </div>

     <div className='form-login'>
      <h5>aca va el formulario</h5>
        <div className='dates-login'>
          <form action="">
            <label>Nombre completo</label>
          <input type="text" name="" id="" />
            <label>correo</label>
          <input type="email" name="" id="" />
            <label>contraseña</label>
          <input type="password" name="" id="" />
          <button>Iniciar sesion</button>
          </form>
        </div>
     </div>
     </div>
    );
}

export default login;
