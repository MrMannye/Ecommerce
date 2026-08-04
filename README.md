# Ecommerce React App

Aplicación de e-commerce creada con React, Vite y Redux Toolkit. Esta app muestra un catálogo de productos, permite buscar artículos, ver detalles y administrar un carrito de compras.

## Características

- Catálogo de productos con búsqueda por nombre, categoría o vendedor
- Página de detalle de producto con imágenes, información de stock y precio
- Carrito de compras administrado con Redux Toolkit
- Experiencia accesible con etiquetas `aria`, roles y foco mejorados
- SEO básico con metadatos dinámicos en páginas de listado y detalle
- Imágenes con carga diferida (`loading="lazy"`) para mejor rendimiento

## Stack tecnológico

- React 19
- Vite
- React Router DOM 7
- Redux Toolkit + RTK Query
- ESLint

## Instalación

```bash
pnpm install
```

## Desarrollo

```bash
pnpm run dev
```

Abre el navegador en `http://localhost:5173`.

## Construcción

```bash
pnpm run build
```

## Previsualización de producción

```bash
pnpm run preview
```

## Lint

```bash
pnpm run lint
```

## Estructura del proyecto

- `src/`
  - `App.jsx` - configuración principal de rutas y diseño global
  - `main.jsx` - punto de entrada con `Provider` y router
  - `store.js` - configuración de Redux Toolkit
  - `reducers/` - slices y servicios RTK Query
    - `productsApi.js` - consulta de productos desde `dummyjson.com`
    - `cartSlice.js` - estado y operaciones del carrito
    - `uiSlice.js` - búsqueda y visibilidad del carrito
    - `normalizeData.js` - normalización de los datos de productos
  - `components/` - componentes reutilizables de UI
  - `pages/` - vistas principales (`Home`, `ProductDetail`)
  - `hooks/` - hooks personalizados como metadatos de página
  - `utils/` - utilidades de ayuda
- `index.html` - plantilla HTML base

## API de datos

La aplicación consume datos de `https://dummyjson.com` para productos y búsqueda.

## Mejoras recomendadas

- Añadir paginación y filtros avanzados
- Persistencia de carrito en `localStorage`
- Autenticación de usuarios y proceso de checkout real
- Pruebas unitarias y de integración con Vitest o Playwright
- Mejora de la UX en caso de error de carga y retries automáticos

## Licencia

Proyecto de ejemplo para aprendizaje y demostración.
