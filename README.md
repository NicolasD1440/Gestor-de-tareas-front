## 🔗 Repositorio del Backend
El código de la API y lógica del servidor para este proyecto se encuentra en: 
[Gestor-de-tareas-backend](https://github.com/tu-usuario/Gestor-de-tareas-backend)

### Configuración de Nginx

```nginx
location /api/ {
    proxy_pass http://localhost:5000/api/;

    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

> Si el backend está montado con `app.use('/api', ...)`, el `proxy_pass` debe conservar el prefijo `/api` para evitar errores `404 Cannot POST /login`.
