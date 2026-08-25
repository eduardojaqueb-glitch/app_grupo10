# App Grupo 10 - FoodPlease

Este repositorio contiene la implementación inicial de la interfaz de usuario (UI) para la aplicación móvil "FoodPlease", desarrollada en base a mockups de diseño.

## Resumen de Desarrollo

- **Tecnología:** Desarrollado utilizando React Native y el marco de trabajo Expo.
- **Estructura:** La lógica visual de las vistas (Login, Inicio, y Detalle) está contenida de forma unificada en el archivo `app.js`, utilizando renderizado condicional mediante estados (`useState`).
- **Iconografía:** Se integró la librería `@expo/vector-icons` (utilizando *Ionicons* y *MaterialCommunityIcons*) para la representación de los iconos en la barra de búsqueda, botones, información de contacto y la barra de navegación inferior.
- **Imágenes:** Se utilizaron URLs externas de prueba (Unsplash y Pravatar) para simular las fotografías de los platos y el perfil de usuario mostrados en el diseño original.
- **Diseño (UI/UX):** 
  - Se replicó fielmente la paleta de colores (destacando el color naranja `#FF6B00`), las tipografías y las proporciones establecidas en los mockups.
  - Se utilizaron componentes estándar como `SafeAreaView` y `ScrollView` para asegurar que el contenido se adapte y desplace correctamente en pantallas de dispositivos móviles.
  - Se implementó una barra de navegación inferior fija para la pantalla de inicio y un botón de acción fijo ("Ver Menú") en la pantalla de detalle.
