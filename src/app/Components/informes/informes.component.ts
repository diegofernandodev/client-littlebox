import { Component } from '@angular/core';
import { InformesService } from "../../services/informes.service";
import { CategoriasService } from "../../services/categoria.service";
import { TercerosService } from "../../services/terceros.service";
import { ExcelService } from "../../services/excel.service";
import spanish from '../../../assets/i18n/spanish.json';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.scss']
})
export class InformesComponent {
  dtOptions: DataTables.Settings = {};
  languageOptions: any;

  fechaInicio: string = ''; // Se actualizará automáticamente
  fechaFin: string = ''; // Se actualizará automáticamente
  movimientosDeCaja: any[] = [];
  categoria: any[] = [];
  tercero: any[] = [];
  categoriaSeleccionada: any;
  terceroSeleccionado: any;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalMovimientosDeCaja: number = 0;
  page: number = 1;
  constructor(private informesService: InformesService,
    private categoriasService: CategoriasService,
    private tercerosService: TercerosService,
    private excelService: ExcelService) { }

  ngOnInit(): void {
    this.obtenerCategorias();
    this.obtenerTercerosPorTenantId();
    this.establecerFechasMesActual(); // Llamar a la función para establecer las fechas del mes actual
    this.obtenerMovimientoDeC(); // Llamar a la función para obtener los movimientos del mes actual
    this.languageOptions = spanish;
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: this.languageOptions
    };
  }


  obtenerCategorias(): void {
    this.categoriasService.obtenerTodasLasCategorias().subscribe(
      (response) => {
        this.categoria = response.data;
        if (this.categoria.length > 0) {
          this.categoriaSeleccionada = this.categoria[0]._id;
        }
      },
      (error) => {
        console.error('Error al obtener las categorías:', error);
      }
    );
  }

  obtenerTercerosPorTenantId(): void {
    this.tercerosService.obtenerTerceros().subscribe(
      (response: any) => {
        this.tercero = response.data;
        if (this.tercero.length > 0) {
          this.terceroSeleccionado = this.tercero[0]._id;
        }
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
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
  
    // Agregar filtros de categoría y tercero si están seleccionados
    if (this.categoriaSeleccionada) {
      datos.categoria = this.categoriaSeleccionada;
    }
    if (this.terceroSeleccionado) {
      datos.tercero = this.terceroSeleccionado;
    }
  
    // Llamar al servicio para obtener los egresos con las fechas y filtros especificados
    this.informesService.obtenerMovimientoCaja(datos).subscribe(
      (response) => {
        // Verificar si la lista de movimientos está presente en la respuesta
        if (response.data && response.data.listaMovimientos) {
          // Mapear la lista de movimientos y formatear las fechas
          this.movimientosDeCaja = response.data.listaMovimientos.map((movimiento: any) => {
            movimiento.fecha = this.formatoFecha(new Date(movimiento.fecha));
            return {
              numeroDocumento: movimiento.numeroDocumento || '0',
              fecha: movimiento.fecha || '0',
              detalle: movimiento.detalle || '0',
              valor: movimiento.valor || '0',
              tipoMovimiento: movimiento.tipoMovimiento || '',
              saldo: movimiento.saldo || '0'
            };
          });
          this.totalMovimientosDeCaja = this.movimientosDeCaja.length;
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
  
  

  formatoFecha(fecha: Date): string {
    if (!fecha || isNaN(fecha.getTime())) {
      // Manejar casos de fecha nula o inválida
      return '';
    }
    return fecha.toISOString().substring(0, 10);
  }

  getPages(): number[] {
    const totalPages = Math.ceil(this.totalMovimientosDeCaja / this.itemsPerPage);
    return Array(totalPages).fill(0).map((x, i) => i + 1);
  }

  exportarExcel(): void {
    this.excelService.exportToExcel(this.movimientosDeCaja, 'informe_movimientos');
  }

  establecerFechasMesActual(): void {
    const fechaActual = new Date();
    const primerDiaMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
    const ultimoDiaMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0);

    // Formatear las fechas
    this.fechaInicio = this.formatoFecha(primerDiaMes);
    this.fechaFin = this.formatoFecha(ultimoDiaMes);
  }
}