# AppCogs - Gestión de Costos de Negocios

Una aplicación Angular completa para la gestión de costos, cálculo de precios y educación financiera para negocios de cualquier rubro.

## [▤] Características

### [■] Gestión de Negocios
- Crea y administra múltiples negocios
- Organiza productos por negocio
- Dashboard interactivo con estadísticas en tiempo real

### [÷] Calculadora de Costos
- Registra todos los tipos de costos (fijos, variables, mano de obra, etc.)
- Calcula automáticamente el precio de venta sugerido
- Define tu margen de ganancia objetivo
- Visualiza el desglose completo de costos

### [↗] Análisis de Precios
- Determina el precio óptimo de venta
- Calcula el punto de equilibrio
- Compara diferentes escenarios de precios
- Visualiza métricas clave como margen de ganancia y rentabilidad
- Recomendaciones personalizadas basadas en tus datos

### [≡] Centro de Aprendizaje
- Guías educativas sobre gestión financiera
- Contenido organizado por temas y niveles
- Aprende sobre:
  - Costos fijos y variables
  - Fijación de precios
  - Márgenes de ganancia
  - Punto de equilibrio
  - Flujo de caja

## 🚀 Instalación

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm (viene con Node.js)

### Pasos para ejecutar la aplicación

1. **Instalar dependencias:**
```bash
npm install
```

2. **Ejecutar la aplicación en modo desarrollo:**
```bash
npm start
```

3. **Abrir en el navegador:**
Navega a `http://localhost:4200/`

La aplicación se recargará automáticamente si realizas cambios en los archivos fuente.

## [■] Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm run build` - Construye el proyecto para producción
- `npm test` - Ejecuta las pruebas unitarias
- `npm run watch` - Construye en modo observación

## [≡] Estructura del Proyecto

```
app-cogs/
├── src/
│   ├── app/
│   │   ├── components/          # Componentes de la aplicación
│   │   │   ├── dashboard/       # Panel de control
│   │   │   ├── cost-calculator/ # Calculadora de costos
│   │   │   ├── price-analysis/  # Análisis de precios
│   │   │   ├── educational-guide/ # Guías educativas
│   │   │   ├── business-form/   # Formulario de negocios
│   │   │   └── header/          # Encabezado de navegación
│   │   ├── services/            # Servicios de negocio
│   │   │   ├── business.service.ts    # Gestión de datos
│   │   │   ├── pricing.service.ts     # Cálculos de precios
│   │   │   └── education.service.ts   # Contenido educativo
│   │   ├── models/              # Modelos e interfaces
│   │   │   └── business.model.ts
│   │   ├── app-routing.module.ts
│   │   └── app.module.ts
│   ├── assets/                  # Recursos estáticos
│   ├── styles.scss              # Estilos globales
│   └── index.html
├── angular.json                 # Configuración de Angular
├── package.json                 # Dependencias del proyecto
└── tsconfig.json               # Configuración de TypeScript
```

## [ⓘ] Cómo Usar la Aplicación

### 1. Crear tu Primer Negocio
- Ve al Dashboard
- Haz clic en "Nuevo Negocio"
- Completa el formulario con el nombre, rubro y descripción
- Guarda tu negocio

### 2. Calcular Costos de un Producto
- Ve a la sección "Calculadora"
- Selecciona tu negocio
- Ingresa el nombre del producto y margen objetivo
- Agrega todos los costos asociados (materiales, mano de obra, etc.)
- La aplicación calculará automáticamente el precio sugerido

### 3. Analizar Precios
- Ve a la sección "Análisis"
- Selecciona un producto
- Revisa el desglose completo de costos
- Compara diferentes escenarios de precio
- Obtén recomendaciones personalizadas

### 4. Aprender
- Ve a la sección "Aprende"
- Explora las guías educativas
- Filtra por tema o nivel de dificultad
- Lee sobre conceptos financieros clave

## [■] Almacenamiento de Datos

La aplicación utiliza **Local Storage** del navegador para guardar todos los datos:
- Tus datos permanecen en tu dispositivo
- No se envían a ningún servidor externo
- Los datos persisten entre sesiones
- Puedes limpiar los datos desde la configuración del navegador

## [⚙] Características Técnicas

- **Framework:** Angular 17
- **TypeScript:** Tipado fuerte para mejor mantenibilidad
- **Reactive Forms:** Formularios reactivos con validaciones
- **RxJS:** Programación reactiva para gestión de estado
- **SCSS:** Estilos avanzados con preprocesador
- **Responsive Design:** Totalmente adaptable a móviles y tablets

## [★] Tipos de Costos Soportados

1. **Costos Fijos:** Gastos que no varían con la producción
2. **Costos Variables:** Gastos que cambian con el volumen
3. **Mano de Obra:** Costos de personal directo
4. **Gastos Generales:** Costos indirectos de operación
5. **Impuestos:** Tributos y tasas
6. **Envío/Logística:** Costos de transporte

## [▤] Casos de Uso

- **Restaurantes:** Calcula el costo de cada platillo
- **Retail:** Determina precios de productos
- **Manufactura:** Analiza costos de producción
- **Servicios:** Establece tarifas por servicio
- **Emprendedores:** Aprende a gestionar finanzas desde cero

## [☎] Compatibilidad

- Chrome (recomendado)
- Firefox
- Safari
- Edge
- Navegadores móviles

## [✔] Contribuir

Esta es una aplicación de código abierto. Siéntete libre de:
- Reportar bugs
- Sugerir nuevas características
- Mejorar la documentación

## [■] Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## [❓] Soporte

Si tienes preguntas o necesitas ayuda:
1. Revisa las guías educativas dentro de la aplicación
2. Consulta la documentación de Angular: https://angular.io/docs
3. Abre un issue en el repositorio

---

**¡Disfruta gestionando los costos de tu negocio de manera profesional!**
