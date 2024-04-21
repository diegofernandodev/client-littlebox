import { Component, OnInit,ViewChild } from '@angular/core';
import { EgresosService } from "../../services/egresos.service";
import { CategoriasService } from "../../services/categoria.service";
import { TercerosService } from "../../services/terceros.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalEgresoComponent } from "../modal-egreso/modal-egreso.component";
import { Table } from 'primeng/table';

import spanish from '../../../assets/i18n/spanish.json';

@Component({
  selector: 'app-list-egresos',
  templateUrl: './list-egresos.component.html',
  styleUrls: ['./list-egresos.component.scss']
})
export class ListEgresosComponent implements OnInit {
   
  @ViewChild('dt1') dt1!: Table;

  dtOptions: DataTables.Settings = {};
  languageOptions: any;

  egresos: any[] = [];
  categoria: any[] = [];
  tercero: any[] = [];
  loading: boolean = false;
  categoriaSeleccionada: any;
  terceroSeleccionado: any;
  fechaInicio: string = ''; // Se actualizará automáticamente
  fechaFin: string = ''; // Se actualizará automáticamente
  mostrarModal: boolean = false;
  egresoSeleccionado: any;
  totalEgresos: number = 0
  itemsPerPage: number = 10;
  currentPage: number = 1;


  constructor(
    private egresosService: EgresosService,
    private categoriasService: CategoriasService,
    private tercerosService: TercerosService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.obtenerCategorias();
    this.obtenerTercerosPorTenantId();
    this.establecerFechasMesActual(); // Llamar a la función para establecer las fechas del mes actual
    this.obtenerEgresos(); // Llamar a la función para obtener los egresos del mes actual
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
          console.log("obtener categorias: ",this.categoriaSeleccionada);
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
          console.log("obtener terceros: ",this.terceroSeleccionado);
          
        }
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  obtenerEgresos() {
    const filtros: any = {};

    // Verificar si las fechas están definidas antes de agregarlas a los filtros
    if (this.fechaInicio) {
      filtros.fechaInicio = this.formatoFecha(new Date(this.fechaInicio));
    }
    if (this.fechaFin) {
      filtros.fechaFin = this.formatoFecha(new Date(this.fechaFin));
    }

    // Agregar filtros de categoría y tercero si están seleccionados
    if (this.categoriaSeleccionada) {
      filtros.categoria = this.categoriaSeleccionada;
    }
    if (this.terceroSeleccionado) {
      filtros.tercero = this.terceroSeleccionado;
    }

    // Llamar al servicio para obtener los egresos con las fechas y filtros especificados
    this.egresosService.obtenerEgresoS(filtros).subscribe(
      (response) => {
        this.egresos = response.data.map((egreso: any) => {
          egreso.fecha = this.formatoFecha(new Date(egreso.fecha));
          return egreso;
        });
        this.totalEgresos = this.egresos.length
      },
      (error) => {
        console.error('Error al obtener los egresos:', error);
      }
    );
  }

  formatoFecha(fecha: Date): string {
    const isoString = fecha.toISOString(); // Obtener la fecha en formato ISO 8601
    return isoString.substring(0, 10); // Recortar solo la parte de la fecha (YYYY-MM-DD)
  }

  verDetalle(egreso: any) {
    const modalRef = this.modalService.open(ModalEgresoComponent);
    modalRef.componentInstance.egreso = egreso;
  }

  clear(table: Table) {
    table.clear();
  }
  establecerFechasMesActual(): void {
    const fechaActual = new Date();
    const primerDiaMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
    const ultimoDiaMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0);

    // Formatear las fechas
    this.fechaInicio = this.formatoFecha(primerDiaMes);
    this.fechaFin = this.formatoFecha(ultimoDiaMes);
  }

  getPages(): number[] {
    const totalPages = Math.ceil(this.egresos.length / this.itemsPerPage);
    return Array(totalPages).fill(0).map((x, i) => i + 1);
  }

  filterData(event: any) {
    if (event && event.target && this.dt1) {
      this.dt1.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
}
