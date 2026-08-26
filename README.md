# FoodPlease – Aplicación Móvil

Aplicación móvil desarrollada por el **Grupo 10** para el proyecto FoodPlease, correspondiente a la asignatura **Taller de Desarrollo Web y Móvil – UNAB**.

Esta versión representa un **Producto Mínimo Viable (MVP)** de la aplicación móvil propuesta para FoodPlease y complementa la plataforma web desarrollada previamente para la administración de restaurantes.

La aplicación fue desarrollada utilizando **React Native y Expo**, incorporando navegación entre vistas, autenticación demostrativa y diferenciación de funcionalidades según el perfil del usuario.

---

## Descripción

FoodPlease corresponde a una propuesta orientada a la gestión y utilización de servicios asociados a una cadena de restaurantes.

La aplicación móvil considera tres perfiles de usuario:

- **Cliente:** permite consultar los restaurantes disponibles y visualizar información detallada de cada establecimiento.
- **Administrador:** permite administrar los restaurantes mediante operaciones de creación, consulta, modificación y eliminación.
- **Repartidor:** dispone de una vista orientada a la consulta de entregas asignadas.

Las funcionalidades disponibles cambian según el perfil autenticado, evitando que usuarios sin permisos administrativos accedan a operaciones de creación, edición o eliminación.

---

## Funcionalidades implementadas

### Autenticación

La aplicación incorpora un mecanismo de autenticación demostrativo que permite identificar el perfil del usuario y presentar las funciones correspondientes.

Para efectos del MVP, las credenciales se encuentran definidas localmente en la aplicación.

### Perfil Cliente

El cliente puede:

- Iniciar y cerrar sesión.
- Visualizar restaurantes disponibles.
- Consultar información de cada restaurante.
- Revisar dirección, horario, teléfono, categoría y descripción.
- Acceder a la opción de menú desde el detalle del restaurante.

### Perfil Administrador

El administrador puede:

- Iniciar y cerrar sesión.
- Visualizar restaurantes registrados.
- Consultar el detalle de un restaurante.
- Crear nuevos restaurantes.
- Editar restaurantes existentes.
- Eliminar restaurantes previa confirmación.

Las operaciones administrativas se encuentran disponibles exclusivamente para este perfil.

### Perfil Repartidor

El repartidor puede:

- Iniciar y cerrar sesión.
- Consultar las entregas asignadas.
- Visualizar el restaurante asociado.
- Consultar cliente y dirección de entrega.
- Visualizar el estado de cada pedido.

---

## Tecnologías utilizadas

- React Native
- Expo SDK 54
- JavaScript
- Node.js
- npm
- Expo Vector Icons

---

## Requisitos

Para ejecutar el proyecto se requiere:

- **Node.js**
- **npm**
- Navegador web actualizado para ejecución web.
- **Expo Go** en un dispositivo móvil Android o iOS para pruebas desde un dispositivo físico.

Las dependencias específicas utilizadas por el proyecto se encuentran definidas en:

```text
package.json
```

y sus versiones instaladas se encuentran registradas en:

```text
package-lock.json
```

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/eduardojaqueb-glitch/app_grupo10.git
```

### 2. Ingresar al directorio

```bash
cd app_grupo10
```

### 3. Instalar las dependencias

```bash
npm install
```

---

## Ejecución

### Ejecutar con Expo

```bash
npx expo start
```

Expo iniciará Metro Bundler y mostrará un código QR.

Para probar la aplicación desde un dispositivo móvil se puede escanear el código QR utilizando **Expo Go**, siempre que el computador y el dispositivo se encuentren en una red compatible.

### Ejecutar versión web

También es posible validar el funcionamiento desde un navegador mediante:

```bash
npm run web
```

La aplicación quedará disponible normalmente en:

```text
http://localhost:8081
```

El puerto puede variar dependiendo de la disponibilidad del ambiente local.

---

## Usuarios de demostración

Para validar los diferentes perfiles del MVP se encuentran disponibles las siguientes cuentas:

| Perfil | Usuario | Contraseña |
|---|---|---|
| Administrador | `admin@foodplease.cl` | `1234` |
| Cliente | `cliente@foodplease.cl` | `1234` |
| Repartidor | `repartidor@foodplease.cl` | `1234` |

> **Importante:** estas credenciales tienen exclusivamente fines demostrativos para el MVP y no representan el mecanismo de autenticación definitivo de la solución.

---

## Control de acceso por perfiles

La aplicación diferencia las funcionalidades disponibles según el perfil autenticado.

| Funcionalidad | Cliente | Administrador | Repartidor |
|---|:---:|:---:|:---:|
| Iniciar sesión | ✓ | ✓ | ✓ |
| Consultar restaurantes | ✓ | ✓ | — |
| Consultar detalle | ✓ | ✓ | — |
| Crear restaurante | — | ✓ | — |
| Editar restaurante | — | ✓ | — |
| Eliminar restaurante | — | ✓ | — |
| Consultar entregas | — | — | ✓ |
| Cerrar sesión | ✓ | ✓ | ✓ |

Durante las pruebas funcionales se verificó que cada perfil accede solamente a las funcionalidades que le corresponden.

---

## Estructura principal

```text
app_grupo10/
│
├── assets/
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── icon.png
│   └── splash-icon.png
│
├── .gitignore
├── App.js
├── app.json
├── index.js
├── package.json
├── package-lock.json
└── README.md
```

### Archivos principales

**`App.js`**

Contiene la implementación principal del MVP, incluyendo las vistas, navegación, perfiles de usuario, control de acceso y operaciones disponibles.

**`index.js`**

Punto de entrada utilizado para registrar e iniciar la aplicación React Native.

**`app.json`**

Contiene la configuración general utilizada por Expo.

**`package.json`**

Define las dependencias y scripts necesarios para instalar y ejecutar el proyecto.

**`package-lock.json`**

Mantiene las versiones exactas de las dependencias instaladas para facilitar la reproducción del ambiente.

**`assets/`**

Contiene los recursos gráficos utilizados por la configuración de la aplicación.

---

## Alcance actual del MVP

La versión actual permite demostrar la estructura y navegación de la aplicación móvil FoodPlease, incluyendo la diferenciación funcional entre cliente, administrador y repartidor.

Los restaurantes, usuarios y entregas utilizados en esta etapa corresponden a información local de demostración almacenada durante la ejecución de la aplicación.

Por lo tanto, las modificaciones realizadas mediante las operaciones CRUD del administrador se mantienen durante la sesión actual y no representan todavía persistencia permanente en una base de datos.

---

## Integración propuesta con la plataforma web

La plataforma web desarrollada previamente utiliza **Django y PostgreSQL** para la administración y persistencia de la información.

Como evolución de la solución, se propone integrar la aplicación móvil con este backend mediante servicios API REST:

```text
Aplicación móvil
React Native / Expo
        │
        │ HTTP / JSON
        ▼
     API REST
       Django
        │
        ▼
    Django ORM
        │
        ▼
    PostgreSQL
```

Esta arquitectura permitirá que la aplicación móvil consuma la misma información administrada desde la plataforma web, manteniendo PostgreSQL como fuente centralizada de datos.

---

## Consideraciones

La aplicación corresponde a una versión mínimamente viable desarrollada con fines académicos.

En futuras iteraciones se contempla:

- Integración real con el backend Django.
- Persistencia de información mediante PostgreSQL.
- Autenticación mediante API.
- Gestión de productos y menús.
- Generación y seguimiento de pedidos.
- Gestión completa de entregas para repartidores.
- Persistencia de favoritos y preferencias del cliente.
- Mejoras adicionales de navegación y experiencia de usuario.

---

## Grupo 10

Proyecto desarrollado para la asignatura:

**Taller de Desarrollo Web y Móvil**  
**Universidad Andrés Bello – UNAB**  
**2026**