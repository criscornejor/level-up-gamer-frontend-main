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
