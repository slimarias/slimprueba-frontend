# slimprueba-frontend

Este proyecto administra los hoteles y sus recpectivas habitaciones del consorcio Decameron

## Configuracion inicial del proyecto

```sh
npm install
```

## Antes de Compilar

La ruta del API que vayamos a consultar en la aplicación está en el archivo .env tal como está en este ejemplo:

VITE_API_URL=http://localhost:8000

Se puede cambiar por la ruta de su preferencia (normalmente es la que arroja el php artisan serve del backend)

### Compilación para desarrollo

```sh
npm run dev
```

Para probarlo en desarrollo digitamos http://localhost:5173

Datos de prueba:

Email: *ejemplo@mail.com*
Contraseña: *123456*

### Compilación para producción

```sh
npm run build
```