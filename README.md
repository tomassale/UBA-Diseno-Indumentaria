# FADU Organizer

Herramienta web para visualizar y trackear el progreso académico en la Facultad de Arquitectura, Diseño y Urbanismo (FADU) de la UBA.

---

## ¿Qué es?

FADU Organizer es una aplicación que te permite ver el plan de estudios como un grafo de correlatividades y registrar tu avance materia por materia. De un vistazo podés saber qué materias tenés disponibles para cursar, cuáles te faltan regularizar y qué camino te queda por delante hasta recibirte.

Actualmente la app carga una carrera: **Diseño de Indumentaria y Textil** (plan FADU - UBA).

---

## Funcionalidades

### Vista Mapa

Muestra todas las materias como nodos conectados por flechas que indican las correlatividades. Los nodos se organizan en **columnas por año** (CBC primero, luego 1° a 4° año); las materias transversales van en su propia sección debajo. El layout es fijo: los nodos no se pueden arrastrar. El color de cada nodo refleja su estado actual:

| Color | Estado |
|-------|--------|
| Gris | Bloqueada (falta regularizar alguna correlativa) |
| Azul | Disponible para cursar |
| Amarillo | Cursando |
| Verde claro | Regularizada |
| Verde | Aprobada |

### Vista Tabla

Lista las materias en formato tabla, con:

- **Búsqueda** por nombre o código de materia.
- **Filtro por Estado** (bloqueada, disponible, cursando, regularizada, aprobada).
- **Filtro por Año** (CBC, 1° a 4°).
- **Filtro de Transversales** (en su propio filtro, separado del resto).

Los filtros son combinables: se puede marcar más de una opción a la vez (por ejemplo, "1° Año" + "2° Año", o varios estados en simultáneo). Desde la tabla podés cambiar el estado de cada materia y registrar las notas de parciales y final.

### Modo Simulación

Permite simular un escenario académico marcando materias como aprobadas temporalmente, para visualizar qué otras materias se desbloquearían. Al salir del modo simulación todo vuelve a su estado real.

### Barra de progreso

El encabezado muestra cuántas materias aprobaste sobre el total, el porcentaje de avance, y cuántas están en curso, regularizadas o disponibles.

### Tema claro / oscuro

Soporte completo de tema oscuro (por defecto) y claro.

### Exportar mapa

"Exportar" descarga una imagen (`.png`) del mapa de correlativas tal como está en ese momento, con la referencia de colores incluida. Solo está disponible en la vista Mapa.

### Sincronización con Google (opcional)

Sin iniciar sesión, el progreso se guarda solo en este navegador (`localStorage`). Iniciando sesión con Google se sincroniza el progreso entre dispositivos: se guarda en un archivo dentro de la carpeta oculta `appData` de tu Google Drive (solo esta app puede leerla). Al loguearte por primera vez se fusiona lo que tenías guardado localmente con lo que haya en la nube.

> La sincronización solo aparece si la app tiene configurado el Client ID de Google.

### Versión mobile

La app es completamente usable desde el celular:

- **Header compacto**: en pantallas chicas, las acciones (Exportar, Simular, tema, sesión) se agrupan detrás de un botón de menú (☰); el toggle Mapa/Tabla y la barra de progreso quedan siempre visibles.
- **Vista Mapa**: al entrar se hace zoom automático sobre el primer año en vez de mostrar todo el plan diminuto, y se puede seguir explorando con pan/pinch-zoom táctil.
- **Vista Tabla**: las materias se muestran como tarjetas compactas; los filtros quedan colapsados detrás de un botón "Filtros" con contador de filtros activos.
- **Panel de detalle**: al tocar una materia se abre como una hoja deslizable desde abajo (bottom sheet).

---

## Tecnologías

| Tecnología | Uso |
|------------|-----|
| [React 19](https://react.dev/) | UI y manejo de estado |
| [TypeScript](https://www.typescriptlang.org/) | Tipado estático |
| [Vite 8](https://vitejs.dev/) | Bundler y servidor de desarrollo |
| [@xyflow/react](https://reactflow.dev/) | Grafo de correlatividades interactivo |
| [react-router-dom](https://reactrouter.com/) | Ruteo |
| [Lucide React](https://lucide.dev/) | Íconos de la interfaz |
| [html-to-image](https://github.com/bubkoo/html-to-image) | Exportar el mapa de correlativas como imagen |
| [Google Identity Services](https://developers.google.com/identity/oauth2/web) + [Drive API](https://developers.google.com/drive/api) | Login con Google y sincronización del progreso (opcional) |
| [Vercel Analytics](https://vercel.com/docs/analytics) + [Speed Insights](https://vercel.com/docs/speed-insights) | Métricas de visitas y performance en producción |
| [oxlint](https://oxc.rs/docs/guide/usage/linter) | Linter |
| CSS Custom Properties | Sistema de temas (dark/light) sin frameworks externos |

---

## Scripts

| Comando | Qué hace |
|---------|----------|
| `npm run dev` | Levanta el servidor de desarrollo de Vite |
| `npm run build` | Compila los tipos (`tsc -b`) y genera el build de producción con Vite |
| `npm run preview` | Sirve localmente el build de producción |
| `npm run lint` | Corre oxlint sobre el proyecto |

---

## Requisitos e instalación

Requiere Node.js y npm.

```bash
npm install
npm run dev
```

---

## Estructura del proyecto

```
src/
├── App.tsx                  Rutas de la app (una sola ruta: /)
├── main.tsx                 Punto de entrada
├── pages/
│   └── CarreraPage.tsx      Monta AppInner con la carrera de Diseño de Indumentaria
├── components/
│   ├── AppInner.tsx         Estado principal (vista, selección, simulación)
│   ├── Header.tsx           Encabezado: progreso, toggle de vista, acciones
│   ├── MapaView.tsx         Vista Mapa (grafo con @xyflow/react)
│   ├── MateriaNode.tsx      Nodo de materia en el grafo
│   ├── ColumnHeaderNode.tsx Encabezados de columna (año) en el grafo
│   ├── TablaView.tsx        Vista Tabla con búsqueda y filtros
│   ├── MateriaPanel.tsx     Panel de detalle de una materia
│   └── SocialIcons.tsx      Íconos (Google, etc.)
├── context/
│   ├── ThemeContext.tsx     Tema claro/oscuro
│   └── AuthContext.tsx      Sesión de Google y estado sincronizado
├── hooks/
│   └── useProgreso.ts       Progreso por carrera (localStorage + sync a Drive)
├── data/
│   └── diseño.ts            Plan de Diseño de Indumentaria y Textil (FADU - UBA)
├── lib/
│   └── googleDrive.ts       Guardado/lectura del progreso en Google Drive
├── utils/
│   ├── estados.ts           Cálculo del estado efectivo de cada materia
│   ├── graphLayout.ts       Armado del grafo (columnas por año)
│   └── anios.ts             Orden y etiquetas de años
└── types.ts                 Tipos del dominio (Carrera, Materia, Progreso)
```

---

## Persistencia del progreso

- El progreso de cada carrera se guarda en `localStorage` bajo la clave `fadu_progreso_v1_<carreraId>`.
- Con sesión de Google iniciada, además se sincroniza (con debounce) en un archivo dentro de la carpeta `appData` de Google Drive.

---

## Deploy

Pensado para desplegarse en Vercel. El `vercel.json` reescribe todas las rutas a `index.html` para que funcione el ruteo SPA de React Router.
