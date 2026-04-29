🛡️ Guía de Ejecución - SafeRoute AI Prototype
Siga estos pasos de forma secuencial para ejecutar el prototipo en su entorno local.

1. Clonación y Preparación
Abra su terminal y sitúese en la carpeta donde desea descargar el proyecto:

Bash
# Si está usando el link del repositorio:
git clone [URL_DEL_REPO]

# Entre a la carpeta del proyecto:
cd saferoute-ai
2. Instalación de Dependencias
El proyecto utiliza Vite y React. Es necesario instalar los módulos de Node (incluyendo el SDK de Firebase y Leaflet):

Bash
npm install
3. Configuración del Entorno (Verificación)
El sistema ya incluye las credenciales de Firebase Firestore en src/firebaseConfig.js.

Importante: No es necesario configurar variables de entorno adicionales; el acceso a la base de datos de zonas de peligro ya está configurado para lectura en modo de prueba para esta entrega.

4. Ejecución del Servidor de Desarrollo
Inicie el servidor local mediante el siguiente comando:

Bash
npm run dev
5. Visualización en el Navegador
Una vez ejecutado el comando anterior, la terminal mostrará una dirección URL (usualmente http://localhost:5173).

Abra su navegador y diríjase a: http://localhost:5173

Prueba de funcionalidad:

En el campo Origin, escriba Uni y seleccione Universidad Icesi.

En el campo Destination, escriba Alfa y seleccione Alfaguara (Jamundí).

Presione el botón Find Safe Route.

6. Detalles Técnicos para Evaluación
Al ejecutar el prototipo, el profesor podrá validar:

Conexión Cloud: Los datos de las zonas de riesgo (círculos rojos) se extraen en tiempo real desde Google Firebase.

Routing Real: La línea de ruta no es estática; se genera mediante una petición fetch a la API de OSRM (Open Source Routing Machine), devolviendo una geometría real basada en la malla vial de la vía Panamericana.

Manejo de Estado: Uso de Hooks de React (useState, useEffect) para gestionar el flujo de análisis de la IA y el renderizado condicional de marcadores.

Notas adicionales
Si el puerto 5173 está ocupado, Vite asignará automáticamente el siguiente (ej. 5174). Por favor, use la URL que indique su terminal.

El proyecto requiere conexión a internet activa para cargar los mapas (OpenStreetMap) y los datos de Firebase.