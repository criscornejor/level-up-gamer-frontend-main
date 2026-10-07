# Level-Up Gamer

Tienda gamer de demostración migrada a React. La interfaz usa React-Bootstrap y los estilos de Bootstrap; los componentes, formularios, filtros y carrito se gestionan con React. No se utiliza una librería de enrutamiento: las pantallas administrativas se abren con rutas hash.

## Requisitos

- Node.js compatible con Vite 8.
- npm.

## Desarrollo

Desde la carpeta raíz del proyecto:

```bash
npm install
npm run dev
```

Para generar y previsualizar la versión de producción:

```bash
npm run build
npm run preview
```

## Pantallas

- `#/`: tienda, catálogo, carrito y registro.
- `#/admin/productos`: listado de productos.
- `#/admin/producto-nuevo`: formulario de producto.
- `#/admin/usuarios`: listado de usuarios.
- `#/admin/usuario-nuevo`: formulario de usuario.

## Componentes reutilizables (Atoms)

Los componentes pequeños que se repiten entre pantallas están en `src/Atoms/` y se importan en `src/App.jsx`:

- `Button.jsx`: botón basado en React-Bootstrap, usado en la tienda y en administración.
- `TextField.jsx`: campo de texto con etiqueta y mensaje de validación, usado en los formularios.
- `StatusBadge.jsx`: indicador de estado para las tablas de productos y usuarios.

Así, cada pantalla puede renderizar estos átomos pasándoles sus propiedades y contenido, sin duplicar su estructura.

Las operaciones de administración y el carrito son demostraciones locales; no se guardan en un servidor.

## Pruebas unitarias

El proyecto incluye 10 pruebas con Jasmine ejecutadas por Karma en un entorno de navegador simulado con jsdom. Cubren filtros y búsqueda, validación del registro, cálculo e inmutabilidad del carrito, estados de stock, bloqueo de usuarios y confirmación de borrado.

Las funciones que prueban las pantallas están aisladas en `src/domain.js` y también son utilizadas por la aplicación. La prueba de borrado usa un spy de Jasmine como mock de `window.confirm`, verificando tanto la confirmación como la cancelación sin mostrar un diálogo real.

Ejecuta la suite desde la raíz del proyecto:

```bash
npm test
```

Karma informa el resultado de cada prueba en la terminal y devuelve un código de salida distinto de cero si hay fallos.
