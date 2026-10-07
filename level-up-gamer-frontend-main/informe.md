# Informe del proyecto: Level-Up Gamer

## Objetivo

Implementar una tienda gamer de demostración en una aplicación de una sola página con React, React-Bootstrap y Bootstrap.

## Estructura

- `index.html` carga la aplicación React.
- `src/main.jsx` monta React e importa Bootstrap.
- `src/App.jsx` contiene la tienda, las vistas administrativas y su estado.
- `src/Atoms/` reúne componentes reutilizables (`Button`, `TextField` y `StatusBadge`) importados por las pantallas.
- `src/app.css` complementa los estilos del proyecto en `styles.css`.

Vite se utiliza exclusivamente como herramienta de desarrollo y compilación. Las rutas administrativas usan hash para evitar instalar una librería de enrutamiento.

## Funcionalidades

- Búsqueda de productos y filtros por categoría.
- Carrito de demostración con cantidad y total.
- Validación de nombre, correo Duoc, edad y aceptación de condiciones en el registro.
- Formularios de demostración para productos y usuarios.
- Eliminación local de productos y bloqueo local de usuarios.
- Diseño adaptable a pantallas de escritorio y móviles mediante Bootstrap y CSS.

Los datos son de ejemplo y se mantienen únicamente en memoria; no hay autenticación ni persistencia de servidor.

## Pruebas unitarias

Se configuraron Jasmine y Karma con el launcher jsdom para ejecutar pruebas sin requerir instalar un navegador del sistema. La lógica compartida entre React y las pruebas está en `src/domain.js`. La suite contiene 10 pruebas para filtros, registro, carrito, inventario, usuarios y eliminación. Se usa un spy de Jasmine como mock de la confirmación de borrado para probar las ramas de aceptar y cancelar.

Ejecutar con `npm test`. Karma muestra el resultado de cada prueba en la terminal; la compilación también se verifica con `npm run build`.
