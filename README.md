# 📋 Gestor de tareas (Frontend)

Aplicación web desarrollada con React que permite gestionar tareas mediante un tablero interactivo. Los usuarios pueden crear, editar, eliminar y organizar tareas según su estado.
## 🌍 Despliegue

| Servicio | Enlace |
|----------|----------|
| Aplicación | https://nicolasdev.duckdns.org/login |
| Frontend | [Frontend](https://github.com/NicolasD1440/Gestor-de-tareas-front) |
| Backend | [Bakend](https://github.com/NicolasD1440/Gestor-de-tareas-backend) |

## ✨ Características

- Inicio de sesión mediante JWT.
- Creación, edición y eliminación de tareas.
- Sistema de arrastrar y soltar (*drag and drop*).
- Filtrado por título, categoría y estado.
- Diseño adaptable para dispositivos móviles.
- Integración con una API desarrollada con Node.js y PostgreSQL.

## 🛠️ Tecnologías utilizadas

- React
- Vite
- JavaScript
- Axios
- React Router
- Dnd Kit
- CSS

## 📂 Estructura del proyecto

```text
src/
├── assets/
├── components/
│   ├── Board/
│   ├── Column/
│   ├── EditTaskModal/
│   ├── NavBar/
│   └── Task/
├── hooks/
├── pages/
├── services/
├── utils/
├── App.jsx
└── main.jsx
```

## ⚙️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/usuario/gestor-de-tareas-frontend.git
```

### 2. Entrar en el directorio

```bash
cd gestor-de-tareas-frontend
```

### 3. Instalar las dependencias

```bash
npm install
```

### 4. Crear el archivo `.env`

```env
VITE_API_URL=http://localhost:5000
```

### 5. Iniciar la aplicación

```bash
npm run dev
```

La aplicación se ejecutará en:

```text
http://localhost:5173
```

## 🚀 Compilación para producción

```bash
npm run build
```

Los archivos generados se encontrarán en la carpeta `dist`.

## 🔗 Repositorio del backend

El código del servidor se encuentra en el siguiente repositorio:

- https://github.com/tu-usuario/Gestor-de-tareas-backend

## 🌐 Configuración de Nginx

```nginx
location /api/ {
    proxy_pass http://localhost:5000/api/;

    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

Si el backend utiliza la siguiente configuración:

```javascript
app.use("/api", router);
```

el prefijo `/api` debe mantenerse para evitar errores como:

```text
404 Cannot POST /login
```

## 🔒 Variables de entorno

### Desarrollo

```env
VITE_API_URL=http://localhost:5000
```

### Producción

```env
VITE_API_URL=/api
```

## 👨‍💻 Autor

**Nicolás D.**

- GitHub: https://github.com/NicolasD1440
- LinkedIn: https://www.linkedin.com/in/deivy-nicol%C3%A1s-castiblanco-infante/
