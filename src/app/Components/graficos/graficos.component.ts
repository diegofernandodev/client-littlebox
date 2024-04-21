import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { InformesService } from "../../services/informes.service";
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss']
})
export class GraficosComponent implements OnInit, OnChanges {
  @Input() filtro: string = ''; // Marcar 'filtro' como una entrada del componente
  fechaInicio: string = '';
  fechaFin: string = '';
  movimientosDeCaja: any[] = [];
  grafico: any;
  graficoTorta:any

  constructor(private informesService: InformesService) { }

  ngOnInit(): void {
    // Llamar al método para obtener los movimientos de caja al inicializar el componente
    // this.obtenerMovimientoDeC();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filtro']) {
      this.obtenerMovimientoDeC();
    }
  }
  
  obtenerMovimientoDeC() {
    const datos: any = {};
  
    // Verificar si las fechas están definidas antes de agregarlas a los filtros
    if (this.fechaInicio) {
      datos.fechaInicio = this.formatoFecha(new Date(this.fechaInicio));
    }
    if (this.fechaFin) {
      datos.fechaFin = this.formatoFecha(new Date(this.fechaFin));
    }
  
    // Llamar al servicio para obtener los egresos con las fechas y filtros especificados
    this.informesService.obtenerMovimientoCaja(datos).subscribe(
      (response) => {
        // Verificar si la lista de movimientos está presente en la respuesta
        if (response.data && response.data.listaMovimientos) {
          // Almacena todos los movimientos de caja
          this.movimientosDeCaja = response.data.listaMovimientos;
  
          console.log('Movimientos de caja obtenidos:', this.movimientosDeCaja);
  
          // Generar el gráfico después de obtener los movimientos de caja
          this.generarGrafico();
          this.generarGraficoTorta();
        } else {
          // Manejar el caso donde la lista de movimientos no está presente en la respuesta
          console.error('La lista de movimientos no está presente en la respuesta');
        }
      },
      (error) => {
        // Manejar errores
        console.error('Error al obtener los movimientos de caja:', error);
      }
    );
  }
  
  generarGrafico() {
    // Filtrar los movimientos de caja por tipo de movimiento (egreso)
    const movimientosEgreso = this.movimientosDeCaja.filter((movimiento: any) => movimiento.tipoMovimiento === 'Egreso');

    console.log('Movimientos de egreso:', movimientosEgreso);

    // Obtener los nombres de categoría o tercero independientemente del filtro
    let nombres: string[] = [];
    nombres = movimientosEgreso.map((movimiento: any) => this.filtro === 'categoria' ? movimiento.categoria || 'Sin categoría' : movimiento.tercero || 'Sin tercero');

    console.log('Nombres obtenidos:', nombres);

    // Contar la cantidad de cada nombre y sumar sus valores correspondientes
    const contadorNombres = this.contarNombres(nombres);

    console.log('Contador de nombres:', contadorNombres);

    // Convertir el objeto de contador a un arreglo de pares clave-valor
    const data = Object.entries(contadorNombres).map(([nombre, valor]) => ({ nombre, valor }));

    // Ordenar los datos por valor descendente
    data.sort((a, b) => b.valor - a.valor);

    // Extraer los nombres y valores ordenados
    const nombresOrdenados = data.map(entry => entry.nombre);
    const valoresOrdenados = data.map(entry => entry.valor);

    // Calcular el total de movimientos de caja
    const totalMovimientos = movimientosEgreso.length;

    console.log('Total de movimientos de egreso:', totalMovimientos);

    // Calcular los porcentajes de cada nombre
    const porcentajes = valoresOrdenados.map((valor: number) => (valor / totalMovimientos) * 100);

    console.log('Porcentajes:', porcentajes);

    // Generar el gráfico
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      if (this.grafico) {
        this.grafico.destroy(); // Destruir el gráfico anterior si existe
      }
      this.grafico = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: nombresOrdenados,
          datasets: [{
            label: 'Porcentaje de demanda',
            data: porcentajes,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Porcentaje (%)'
              }
            },
            x: {
              title: {
                display: true,
                text: this.filtro === 'categoria' ? 'Categoría' : 'Proveedor'
              }
            }
          }
        }
      });
    }
  }

  generarGraficoTorta() {
    // Filtrar los movimientos de caja por tipo de movimiento (egreso)
    const movimientosEgreso = this.movimientosDeCaja.filter((movimiento: any) => movimiento.tipoMovimiento === 'Egreso');

    console.log('Movimientos de egreso:', movimientosEgreso);

    // Obtener los nombres de categoría o tercero independientemente del filtro
    let nombres: string[] = [];
    nombres = movimientosEgreso.map((movimiento: any) => this.filtro === 'categoria' ? movimiento.categoria || 'Sin categoría' : movimiento.tercero || 'Sin tercero');

    console.log('Nombres obtenidos:', nombres);

    // Contar la cantidad de cada nombre y sumar sus valores correspondientes
    const contadorNombres = this.contarNombres(nombres);

    console.log('Contador de nombres:', contadorNombres);

    // Convertir el objeto de contador a un arreglo de pares clave-valor
    const data = Object.entries(contadorNombres).map(([nombre, valor]) => ({ nombre, valor }));

    // Ordenar los datos por valor descendente
    data.sort((a, b) => b.valor - a.valor);

    // Extraer los nombres y valores ordenados
    const nombresOrdenados = data.map(entry => entry.nombre);
    const valoresOrdenados = data.map(entry => entry.valor);

    // Generar el gráfico de torta
    const canvasTorta = document.getElementById('myChartTorta') as HTMLCanvasElement;
    const ctxTorta = canvasTorta.getContext('2d');

    if (ctxTorta) {
      if (this.graficoTorta) {
        this.graficoTorta.destroy(); // Destruir el gráfico anterior si existe
      }
      this.graficoTorta = new Chart(ctxTorta, {
        type: 'pie',
        data: {
          labels: nombresOrdenados,
          datasets: [{
            label: 'Porcentaje de demanda',
            data: valoresOrdenados,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }
  }
  
  formatoFecha(fecha: Date): string {
    if (!fecha || isNaN(fecha.getTime())) {
      // Manejar casos de fecha nula o inválida
      return '';
    }
    return fecha.toISOString().substring(0, 10);
  }

  contarNombres(nombres: string[]): {[key: string]: number} {
    const contador: {[key: string]: number} = {};

    nombres.forEach((nombre: string) => {
      if (nombre) {
        contador[nombre] = (contador[nombre] || 0) + 1;
      }
    });

    return contador;
  }  
}
