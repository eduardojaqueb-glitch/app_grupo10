# FoodPlease – Aplicación Móvil

Aplicación móvil desarrollada por el **Grupo 10** para el proyecto FoodPlease, correspondiente a la asignatura **Taller de Desarrollo Web y Móvil – UNAB**.

Esta versión representa un **Producto Mínimo Viable (MVP)** que complementa la plataforma web desarrollada previamente para la administración de restaurantes.

La aplicación fue desarrollada utilizando **React Native y Expo**, incorporando navegación entre vistas, autenticación demostrativa y diferenciación de funcionalidades según el perfil del usuario.

---

## Descripción

FoodPlease es una aplicación móvil desarrollada como Producto Mínimo Viable (MVP) para representar las principales interacciones de los usuarios de la plataforma.

La solución considera tres perfiles: **Cliente, Administrador y Repartidor**, aplicando control de acceso para presentar únicamente las funcionalidades correspondientes a cada usuario.

En esta versión los datos son locales y tienen fines demostrativos. La integración con el backend desarrollado mediante Django y PostgreSQL se contempla como evolución de la solución.

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
- **Expo Go** en un dispositivo Android o iOS para pruebas desde un dispositivo físico.

Las dependencias utilizadas por el proyecto se encuentran definidas en:

```text
package.json
```

Las versiones instaladas se encuentran registradas en:

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

Para probar la aplicación desde un dispositivo móvil, se puede escanear el código QR utilizando **Expo Go**.

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

Las pruebas funcionales permitieron verificar que cada perfil accede únicamente a las funcionalidades correspondientes a su rol.

---

## Navegación por perfiles

La navegación se adapta al perfil autenticado, presentando únicamente las vistas y operaciones correspondientes a cada usuario.

```text
Inicio de sesión
       │
       ├── Cliente
       │     └── Restaurantes
       │           └── Detalle del restaurante
       │                 └── Ver menú (proyectado)
       │
       ├── Administrador
       │     └── Gestión de restaurantes
       │           ├── Consultar
       │           ├── Crear
       │           ├── Editar
       │           └── Eliminar
       │
       └── Repartidor
             └── Entregas asignadas
                   └── Detalle de entrega
```

## Funcionalidades por perfil

El MVP incorpora funcionalidades diferenciadas según el perfil autenticado. La implementación actual permite validar la navegación y las principales interacciones de cada usuario, utilizando datos locales de demostración.

### Cliente

Funcionalidades disponibles:

- Inicio y cierre de sesión.
- Visualización de restaurantes disponibles.
- Consulta del detalle de cada restaurante.
- Visualización de dirección, horario, teléfono, categoría y descripción.
- Acceso desde el detalle a la opción de menú.

**Estado actual:** la consulta de restaurantes y sus detalles se encuentra disponible. La gestión completa de menús, selección de productos y generación de pedidos se contempla para una siguiente iteración.

### Administrador

Funcionalidades disponibles:

- Inicio y cierre de sesión.
- Visualización y consulta de restaurantes.
- Creación de nuevos restaurantes.
- Edición de restaurantes existentes.
- Eliminación de restaurantes previa confirmación.

**Estado actual:** las operaciones CRUD se encuentran disponibles en el MVP y restringidas al perfil Administrador. Los cambios operan sobre datos locales y todavía no poseen persistencia permanente en el backend.

### Repartidor

Funcionalidades disponibles:

- Inicio y cierre de sesión.
- Consulta de entregas asignadas.
- Visualización del restaurante asociado.
- Consulta de cliente y dirección de entrega.
- Visualización del estado del pedido.

**Estado actual:** la vista de entregas permite demostrar el flujo definido para el Repartidor. La actualización de estados, seguimiento y sincronización de entregas con el backend corresponden a futuras iteraciones.

> **Alcance del MVP:** la autenticación, usuarios, restaurantes y entregas utilizados actualmente tienen fines demostrativos y se gestionan localmente. La integración con Django y PostgreSQL mediante una API REST corresponde a la siguiente etapa de evolución de FoodPlease.
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
Contiene la implementación principal del MVP, incluyendo vistas, navegación, perfiles, control de acceso y operaciones disponibles.

**`index.js`**  
Punto de entrada utilizado para registrar e iniciar la aplicación React Native.

**`app.json`**  
Contiene la configuración general utilizada por Expo.

**`package.json`**  
Define las dependencias y scripts necesarios para instalar y ejecutar el proyecto.

**`package-lock.json`**  
Mantiene las versiones exactas de las dependencias instaladas para facilitar la reproducción del ambiente.

**`assets/`**  
Contiene los recursos gráficos utilizados por la aplicación.

---

## Integración propuesta con la plataforma web

La plataforma web desarrollada previamente utiliza **Django y PostgreSQL** para la administración y persistencia de información.

Como evolución de FoodPlease, se propone integrar la aplicación móvil con este backend mediante servicios **API REST**, permitiendo intercambiar información mediante HTTP y JSON.

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

Esta arquitectura permitirá que la aplicación móvil consuma la información administrada por el backend, manteniendo PostgreSQL como fuente centralizada de datos y separando la interfaz móvil de la lógica y persistencia de la solución.

---

## Alcance y evolución

La versión actual permite demostrar la navegación, diferenciación de perfiles y funcionalidades principales de FoodPlease.

Los usuarios, restaurantes y entregas corresponden a **datos locales de demostración**, por lo que las modificaciones realizadas durante la ejecución no poseen todavía persistencia permanente.

Como evolución del proyecto se contempla:

- Integrar la aplicación móvil con Django mediante API REST.
- Incorporar persistencia mediante PostgreSQL.
- Implementar autenticación mediante backend.
- Incorporar gestión completa de productos y menús.
- Implementar generación y seguimiento de pedidos.
- Ampliar la gestión de entregas para repartidores.

---

## Integrantes – Grupo 10

Proyecto desarrollado de manera colaborativa por el **Grupo 10** para la asignatura **Taller de Desarrollo Web y Móvil** de la Universidad Andrés Bello.

| Integrante |
|---|
| Matias Lillo |
| Eduardo Jaque |
| Gabriel Jara |

**Universidad Andrés Bello – UNAB**  
**Taller de Desarrollo Web y Móvil**  
**2026**