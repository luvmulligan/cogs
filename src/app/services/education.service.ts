import { Injectable } from '@angular/core';
import { EducationalContent, EducationCategory } from '../models/business.model';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private contents: EducationalContent[] = [
    {
      id: '1',
      title: 'Costos Fijos: ¿Qué son y cómo identificarlos?',
      category: EducationCategory.FIXED_COSTS,
      difficulty: 'beginner',
      estimatedTime: 5,
      content: `
        <h3>¿Qué son los costos fijos?</h3>
        <p>Los costos fijos son aquellos gastos que no varían con el nivel de producción o ventas. Debes pagarlos independientemente de cuánto vendas.</p>
        
        <h4>Ejemplos de costos fijos:</h4>
        <ul>
          <li><strong>Alquiler:</strong> El local comercial, oficina o espacio de producción</li>
          <li><strong>Salarios fijos:</strong> Personal administrativo con sueldo mensual</li>
          <li><strong>Servicios básicos:</strong> Luz, agua, internet, teléfono</li>
          <li><strong>Seguros:</strong> Seguro del local, de equipos, etc.</li>
          <li><strong>Licencias y permisos:</strong> Licencias de funcionamiento, software, etc.</li>
        </ul>

        <h4>¿Por qué son importantes?</h4>
        <p>Los costos fijos determinan tu <strong>punto de equilibrio</strong>: la cantidad mínima que necesitas vender para cubrir todos tus gastos. Conocerlos te ayuda a:</p>
        <ul>
          <li>Establecer metas de ventas realistas</li>
          <li>Decidir si tu negocio es viable</li>
          <li>Planificar tu flujo de caja</li>
        </ul>

        <div class="tip">
          <strong><span class="material-icons icon-tip" style="font-size: 18px; vertical-align: middle;">lightbulb</span> Consejo:</strong> Lista todos tus costos fijos mensuales y súmalos. Esa es la cantidad mínima que tu negocio debe generar para no operar en pérdidas.
        </div>
      `
    },
    {
      id: '2',
      title: 'Cómo Distribuir Costos Fijos entre Productos',
      category: EducationCategory.FIXED_COSTS,
      difficulty: 'intermediate',
      estimatedTime: 8,
      content: `
        <h3>El Desafío de los Costos Fijos</h3>
        <p>Los costos fijos son mensuales (alquiler, servicios, salarios), pero tus productos se venden por unidad. ¿Cómo calcular cuánto cuesta cada unidad?</p>
        
        <h4>Método 1: Distribución Simple por Volumen</h4>
        <p>Divide tus costos fijos mensuales entre las unidades que esperas vender/producir:</p>
        <code>
Costo Fijo por Unidad = Costos Fijos Mensuales / Unidades Esperadas al Mes
        </code>

        <h4>Ejemplo Práctico - Panadería</h4>
        <p>Imagina que tienes estos costos fijos mensuales:</p>
        <ul>
          <li>Alquiler: $15,000</li>
          <li>Servicios (luz, agua, gas): $3,000</li>
          <li>Salarios fijos: $20,000</li>
          <li><strong>Total mensual: $38,000</strong></li>
        </ul>

        <p>Si produces <strong>2,000 panes al mes</strong>:</p>
        <code>
Costo Fijo por Pan = $38,000 / 2,000 = $19 por pan
        </code>

        <h4>Método 2: Distribución por Producto (Múltiples Productos)</h4>
        <p>Si produces varios productos, distribuye según:</p>
        
        <p><strong>Opción A - Por volumen de ventas:</strong></p>
        <ul>
          <li>Producto A vende 1,000 unidades (50% del total)</li>
          <li>Producto B vende 600 unidades (30% del total)</li>
          <li>Producto C vende 400 unidades (20% del total)</li>
        </ul>
        <code>
Costo Fijo Producto A = $38,000 × 50% / 1,000 = $19 por unidad
Costo Fijo Producto B = $38,000 × 30% / 600 = $19 por unidad
Costo Fijo Producto C = $38,000 × 20% / 400 = $19 por unidad
        </code>

        <p><strong>Opción B - Por tiempo de producción:</strong></p>
        <p>Si un producto requiere más tiempo/recursos, asigna más costos fijos:</p>
        <ul>
          <li>Pastel elaborado: 2 horas → asigna más costo fijo</li>
          <li>Pan simple: 30 min → asigna menos costo fijo</li>
        </ul>

        <h4>Consideraciones Importantes</h4>
        
        <div class="tip">
          <strong><span class="material-icons icon-warning" style="font-size: 18px; vertical-align: middle;">warning</span> Cuidado con la Capacidad:</strong>
          <p>Si produces menos unidades de las esperadas, cada unidad carga más costo fijo. Esto puede hacer que pierdas dinero incluso vendiendo al codecio calculado.</p>
        </div>

        <h4>Estrategia Recomendada</h4>
        <ol>
          <li><strong>Calcula tu capacidad realista:</strong> ¿Cuántas unidades puedes producir y vender realmente?</li>
          <li><strong>Usa un promedio conservador:</strong> No uses tu capacidad máxima, usa 70-80% de ella</li>
          <li><strong>Revisa mensualmente:</strong> Ajusta según tus ventas reales</li>
          <li><strong>Mantén un margen de seguridad:</strong> Si calculas con 1,000 unidades pero solo vendes 800, pierdes dinero</li>
        </ol>

        <h4>Ejemplo Completo de codecio</h4>
        <p><strong>Pastel de Chocolate:</strong></p>
        <ul>
          <li>Costos Variables (ingredientes, empaque): $50</li>
          <li>Costo Fijo por unidad (del cálculo anterior): $19</li>
          <li><strong>Costo Total: $69</strong></li>
          <li>Margen deseado: 40%</li>
          <li><strong>codecio de Venta: $69 / (1 - 0.40) = $115</strong></li>
        </ul>

        <div class="tip">
          <strong><span class="material-icons icon-tip" style="font-size: 18px; vertical-align: middle;">tips_and_updates</span> Consejo Profesional:</strong> En AppCogs, cuando agregas un costo fijo, puedes especificar cuántas unidades esperas producir al mes. La app calculará automáticamente el costo fijo por unidad.
        </div>

        <h4>¿Qué pasa si tengo varios productos?</h4>
        <p>Tienes dos opciones:</p>
        <ol>
          <li><strong>Distribuir proporcionalmente:</strong> Divide los costos fijos según el porcentaje de ventas de cada producto</li>
          <li><strong>Producto por producto:</strong> Asigna costos fijos específicos a productos específicos (ej: el salario del panadero solo a los panes)</li>
        </ol>

        <h4>Errores Comunes</h4>
        <ul>
          <li><span class="material-icons icon-error" style="font-size: 16px; vertical-align: middle;">cancel</span> No incluir costos fijos en el codecio → Pierdes dinero con cada venta</li>
          <li><span class="material-icons icon-error" style="font-size: 16px; vertical-align: middle;">cancel</span> Usar cifras demasiado optimistas de producción → El costo real será mayor</li>
          <li><span class="material-icons icon-error" style="font-size: 16px; vertical-align: middle;">cancel</span> No revisar y ajustar periódicamente → Los costos cambian con el tiempo</li>
          <li><span class="material-icons icon-error" style="font-size: 16px; vertical-align: middle;">cancel</span> Olvidar incluir tu propio salario → Tu tiempo también es un costo</li>
        </ul>
      `
    },
    {
      id: '3',
      title: 'Costos Variables: La clave de la producción',
      category: EducationCategory.VARIABLE_COSTS,
      difficulty: 'beginner',
      estimatedTime: 5,
      content: `
        <h3>¿Qué son los costos variables?</h3>
        <p>Los costos variables cambian directamente con el volumen de producción o ventas. Si produces más, estos costos aumentan; si produces menos, disminuyen.</p>
        
        <h4>Ejemplos de costos variables:</h4>
        <ul>
          <li><strong>Materias primas:</strong> Ingredientes, materiales, insumos directos</li>
          <li><strong>Empaquetado:</strong> Cajas, bolsas, etiquetas por unidad</li>
          <li><strong>Comisiones de venta:</strong> Porcentajes sobre ventas</li>
          <li><strong>Envíos:</strong> Costo de transporte por producto</li>
          <li><strong>Mano de obra variable:</strong> Pago por unidad producida</li>
        </ul>

        <h4>Cálculo del costo variable unitario</h4>
        <p>Para saber cuánto te cuesta producir cada unidad:</p>
        <code>Costo Variable Unitario = Costos Variables Totales / Unidades Producidas</code>

        <h4>¿Por qué son importantes?</h4>
        <ul>
          <li>Determinan tu <strong>margen de contribución</strong></li>
          <li>Te ayudan a calcular el codecio mínimo de venta</li>
          <li>Permiten evaluar la rentabilidad de cada producto</li>
        </ul>

        <div class="tip">
          <strong><span class="material-icons icon-tip" style="font-size: 18px; vertical-align: middle;">lightbulb</span> Consejo:</strong> Registra todos los costos variables de un producto. Esto te permitirá saber cuánto ganas realmente por cada venta.
        </div>
      `
    },
    {
      id: '4',
      title: 'Establecer el codecio Correcto',
      category: EducationCategory.PRICING,
      difficulty: 'intermediate',
      estimatedTime: 8,
      content: `
        <h3>Estrategias para fijar codecios</h3>
        <p>El codecio de tu producto debe cubrir costos y generar ganancia, pero también considerar el mercado.</p>
        
        <h4>1. codecio basado en costos</h4>
        <code>codecio = Costos Totales + Margen de Ganancia</code>
        <p>Es el método más simple y asegura que cubras tus gastos.</p>

        <h4>2. codecio basado en competencia</h4>
        <p>Investiga qué codecios maneja tu competencia y posiciónate estratégicamente:</p>
        <ul>
          <li><strong>codecio codemium:</strong> Superior a la competencia (mayor calidad)</li>
          <li><strong>codecio competitivo:</strong> Similar a la competencia</li>
          <li><strong>codecio de penetración:</strong> Inferior para ganar mercado</li>
        </ul>

        <h4>3. codecio basado en valor percibido</h4>
        <p>¿Cuánto está dispuesto a pagar el cliente por tu producto? Considera:</p>
        <ul>
          <li>Calidad del producto</li>
          <li>Reputación de tu marca</li>
          <li>Experiencia del cliente</li>
          <li>Diferenciación frente a la competencia</li>
        </ul>

        <h4>Errores comunes al fijar codecios</h4>
        <ul>
          <li><span class="material-icons icon-error" style="font-size: 16px; vertical-align: middle;">cancel</span> No incluir TODOS los costos</li>
          <li><span class="material-icons icon-error" style="font-size: 16px; vertical-align: middle;">cancel</span> Competir solo por codecio bajo</li>
          <li><span class="material-icons icon-error" style="font-size: 16px; vertical-align: middle;">cancel</span> No ajustar codecios periódicamente</li>
          <li><span class="material-icons icon-error" style="font-size: 16px; vertical-align: middle;">cancel</span> Ignorar el valor percibido</li>
        </ul>

        <div class="tip">
          <strong><span class="material-icons icon-tip" style="font-size: 18px; vertical-align: middle;">lightbulb</span> Consejo:</strong> Calcula tres codecios: el mínimo (punto de equilibrio), el objetivo (con tu margen deseado) y el óptimo (considerando el mercado).
        </div>
      `
    },
    {
      id: '5',
      title: 'Margen de Ganancia: Tu rentabilidad real',
      category: EducationCategory.PROFIT_MARGIN,
      difficulty: 'intermediate',
      estimatedTime: 6,
      content: `
        <h3>¿Qué es el margen de ganancia?</h3>
        <p>El margen de ganancia es el porcentaje de beneficio que obtienes sobre el codecio de venta.</p>
        
        <h4>Fórmula del margen de ganancia</h4>
        <code>Margen (%) = ((codecio - Costos) / codecio) × 100</code>

        <h4>Tipos de márgenes</h4>
        <ul>
          <li><strong>Margen bruto:</strong> codecio - Costos variables</li>
          <li><strong>Margen neto:</strong> codecio - Todos los costos (fijos + variables)</li>
        </ul>

        <h4>Márgenes recomendados por industria</h4>
        <ul>
          <li>Alimentos/Restaurantes: 60-70%</li>
          <li>Retail/Ropa: 50-60%</li>
          <li>Servicios: 40-50%</li>
          <li>Productos manufacturados: 25-35%</li>
          <li>Tecnología/Software: 70-80%</li>
        </ul>

        <h4>¿Cómo mejorar tu margen?</h4>
        <ol>
          <li><strong>Reducir costos:</strong> Negocia con proveedores, optimiza procesos</li>
          <li><strong>Aumentar valor:</strong> Mejora calidad, branding, experiencia</li>
          <li><strong>Ajustar codecios:</strong> Aumentos graduales basados en valor</li>
          <li><strong>Eliminar desperdicios:</strong> Reduce mermas y pérdidas</li>
        </ol>

        <div class="tip">
          <strong><span class="material-icons icon-tip" style="font-size: 18px; vertical-align: middle;">lightbulb</span> Consejo:</strong> Un margen del 30-40% es generalmente saludable para la mayoría de negocios, pero varía según tu industria y modelo de negocio.
        </div>
      `
    },
    {
      id: '6',
      title: 'Punto de Equilibrio: ¿Cuánto necesitas vender?',
      category: EducationCategory.BREAK_EVEN,
      difficulty: 'advanced',
      estimatedTime: 10,
      content: `
        <h3>¿Qué es el punto de equilibrio?</h3>
        <p>El punto de equilibrio es la cantidad de unidades que necesitas vender para cubrir todos tus costos, sin ganar ni perder dinero.</p>
        
        <h4>Fórmula del punto de equilibrio</h4>
        <code>Unidades = Costos Fijos / (codecio - Costo Variable Unitario)</code>

        <h4>Ejemplo práctico</h4>
        <p>Imagina que vendes pasteles:</p>
        <ul>
          <li>Costos fijos mensuales: $10,000 (alquiler, salarios, servicios)</li>
          <li>Costo variable por pastel: $50 (ingredientes, empaque)</li>
          <li>codecio de venta: $150</li>
        </ul>
        <code>
Punto de equilibrio = $10,000 / ($150 - $50)
                    = $10,000 / $100
                    = 100 pasteles al mes
        </code>

        <h4>Intercodetación</h4>
        <p>Necesitas vender <strong>100 pasteles al mes</strong> para cubrir todos tus gastos. A partir del pastel 101, comienzas a generar ganancias.</p>

        <h4>¿Cómo reducir tu punto de equilibrio?</h4>
        <ol>
          <li><strong>Reducir costos fijos:</strong> Busca un local más económico, negocia contratos</li>
          <li><strong>Reducir costos variables:</strong> Compra al mayoreo, optimiza procesos</li>
          <li><strong>Aumentar el codecio:</strong> Si el mercado lo permite</li>
          <li><strong>Mejorar el margen de contribución:</strong> Aumenta el codecio o reduce costos variables</li>
        </ol>

        <h4>Análisis de escenarios</h4>
        <p>codegúntate:</p>
        <ul>
          <li>¿Es realista vender esa cantidad mensual?</li>
          <li>¿Qué pasa si mis costos aumentan?</li>
          <li>¿Puedo reducir mi punto de equilibrio?</li>
        </ul>

        <div class="tip">
          <strong><span class="material-icons icon-tip" style="font-size: 18px; vertical-align: middle;">lightbulb</span> Consejo:</strong> Calcula tu punto de equilibrio mensual y divide entre días laborables. Así sabrás cuánto debes vender diariamente para ser rentable.
        </div>
      `
    },
    {
      id: '7',
      title: 'Flujo de Caja: El corazón de tu negocio',
      category: EducationCategory.CASH_FLOW,
      difficulty: 'advanced',
      estimatedTime: 12,
      content: `
        <h3>¿Qué es el flujo de caja?</h3>
        <p>El flujo de caja es el movimiento de dinero que entra y sale de tu negocio. Puedes ser rentable en papel, pero sin efectivo disponible, tu negocio puede quebrar.</p>
        
        <h4>Componentes del flujo de caja</h4>
        <ul>
          <li><strong>Entradas:</strong> Ventas en efectivo, cobros de ventas a crédito, préstamos</li>
          <li><strong>Salidas:</strong> Pagos a proveedores, salarios, alquiler, impuestos, inversiones</li>
        </ul>

        <h4>Fórmula básica</h4>
        <code>Flujo de Caja = Entradas de Efectivo - Salidas de Efectivo</code>

        <h4>Tipos de flujo de caja</h4>
        <ol>
          <li><strong>Flujo operativo:</strong> Dinero generado por las operaciones del negocio</li>
          <li><strong>Flujo de inversión:</strong> Compra/venta de activos (equipos, inmuebles)</li>
          <li><strong>Flujo de financiamiento:</strong> Préstamos, aportes de capital</li>
        </ol>

        <h4>Problemas comunes de flujo de caja</h4>
        <ul>
          <li><span class="material-icons icon-error" style="font-size: 16px; vertical-align: middle;">cancel</span> Ventas a crédito sin control</li>
          <li><span class="material-icons icon-error" style="font-size: 16px; vertical-align: middle;">cancel</span> Inventario excesivo que inmoviliza dinero</li>
          <li><span class="material-icons icon-error" style="font-size: 16px; vertical-align: middle;">cancel</span> Gastos no planificados</li>
          <li><span class="material-icons icon-error" style="font-size: 16px; vertical-align: middle;">cancel</span> Estacionalidad del negocio</li>
          <li><span class="material-icons icon-error" style="font-size: 16px; vertical-align: middle;">cancel</span> Crecimiento demasiado rápido</li>
        </ul>

        <h4>Cómo mejorar tu flujo de caja</h4>
        <ol>
          <li><strong>Acelera los cobros:</strong> Ofrece descuentos por pago anticipado</li>
          <li><strong>Retrasa los pagos:</strong> Negocia plazos más largos con proveedores</li>
          <li><strong>Controla el inventario:</strong> No comcodes más de lo necesario</li>
          <li><strong>Reduce costos:</strong> Elimina gastos innecesarios</li>
          <li><strong>Planifica:</strong> Proyecta tus flujos futuros</li>
        </ol>

        <h4>Proyección de flujo de caja</h4>
        <p>Crea una tabla mensual que incluya:</p>
        <ul>
          <li>Saldo inicial</li>
          <li>Todas las entradas esperadas</li>
          <li>Todas las salidas programadas</li>
          <li>Saldo final</li>
        </ul>

        <div class="tip">
          <strong><span class="material-icons icon-tip" style="font-size: 18px; vertical-align: middle;">lightbulb</span> Consejo:</strong> Mantén siemcode un colchón de efectivo equivalente a 3-6 meses de costos fijos. Esto te protege ante imcodevistos.
        </div>
      `
    }
  ];

  constructor() {}

  getAllContent(): EducationalContent[] {
    return this.contents;
  }

  getContentById(id: string): EducationalContent | undefined {
    return this.contents.find(c => c.id === id);
  }

  getContentByCategory(category: EducationCategory): EducationalContent[] {
    return this.contents.filter(c => c.category === category);
  }

  getContentByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): EducationalContent[] {
    return this.contents.filter(c => c.difficulty === difficulty);
  }

  getCategoryLabel(category: EducationCategory): string {
    const labels: { [key in EducationCategory]: string } = {
      [EducationCategory.FIXED_COSTS]: 'Costos Fijos',
      [EducationCategory.VARIABLE_COSTS]: 'Costos Variables',
      [EducationCategory.PRICING]: 'Fijación de codecios',
      [EducationCategory.PROFIT_MARGIN]: 'Margen de Ganancia',
      [EducationCategory.BREAK_EVEN]: 'Punto de Equilibrio',
      [EducationCategory.CASH_FLOW]: 'Flujo de Caja'
    };
    return labels[category];
  }
}
