import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute,Router } from '@angular/router';
import { Ingreso } from '../../../interfaces/ingreso';
import { IngresosService } from '../../../services/ingresos/ingresos.service';
import { SweetAlertService } from '../../../services/sweet-alert.service';
import { TokenValidationService } from '../../../services/token-validation-service.service';
import spanish from '../../../../assets/i18n/spanish.json';
import { SignInUpService } from "../../../services/sign-in-up.service";
import { Table } from 'primeng/table';

@Component({
  selector: 'app-list-delete-ingresos',
  templateUrl: './list-delete-ingresos.component.html',
  styleUrl: './list-delete-ingresos.component.scss'
})
export class ListDeleteIngresosComponent {

  @ViewChild('dt1') dt1!: Table;

  dtOptions: DataTables.Settings = {};
  languageOptions: any;

  listIngresos: Ingreso[] = [];
  loading: boolean = false;
  tenantId: string = '';
  id: string | null;
  addIngreso:boolean = false;
  rolUsuario: string = ''; // Variable que almacena el rol del usuario
  // fechaInicio = new Date();
  // fechaFin = new Date();

  fechaInicio = "";
  fechaFin = "";

  constructor(
    private ingresosService: IngresosService,
    private sweetAlertService: SweetAlertService,
    private tokenValidationService: TokenValidationService,
    private aRouter: ActivatedRoute,
    private signInUpService: SignInUpService,
  ) {
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  establecerFechasMesActual(): void {
    const fechaActual = new Date();
    const primerDiaMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
    const ultimoDiaMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0);

    // Formatear las fechas
    this.fechaInicio = this.formatoFecha(primerDiaMes);
    this.fechaFin = this.formatoFecha(ultimoDiaMes);
  }

  formatoFecha(fecha: Date): string {
    const isoString = fecha.toISOString(); // Obtener la fecha en formato ISO 8601
    return isoString.substring(0, 10); // Recortar solo la parte de la fecha (YYYY-MM-DD)
  }
  ngOnInit(): void {
    this.establecerFechasMesActual();
    this.filtrarIngresos();
    this.getRolUser();
    const token = localStorage.getItem('token');
    if (token) {
      const tenantId = this.tokenValidationService.getTenantIdFromToken();
      if (tenantId) {
        this.tenantId = tenantId;
        console.log("este es el tenantid: ", this.tenantId);
        console.log("este es el token: ", token);
        
      } else {
        console.error('No se pudo obtener el tenant ID del token');
      }
    } else {
      console.error('No se encontró ningún token en el almacenamiento local');
    }
    this.languageOptions = spanish;
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: this.languageOptions
    };
    // this.getListIngresos();
   
  }

  getRolUser(): void {
    const userRole = this.signInUpService.getUserRole(); // Obtener el rol del usuario
    if (userRole !== null) {
      this.rolUsuario = userRole; // Establecer el rol del usuario solo si no es null
      console.log("rol del usuario: ",this.rolUsuario);
      
    } else {
      console.error('No se pudo obtener el rol del usuario');
    }
  }

  getListIngresos(): void {
    if (!this.fechaInicio || !this.fechaFin) {
      this.sweetAlertService.showErrorAlert('Debes seleccionar ambas fechas para filtrar.');
      return;
    }
    // this.loading = true;
    this.ingresosService
      .getListaIngresos(this.tenantId,this.fechaInicio,this.fechaFin)
      .subscribe((data: any) => {
        console.log("estas son los egresos: ",data);
        this.listIngresos = [...data.data];
        // this.loading = false;
        console.log("Datos de los ingresos: ",this.listIngresos);
      });
  }

  filtrarIngresos(): void {
    if (this.fechaInicio && this.fechaFin) {
      // Validar fechas
      if (this.fechaInicio > this.fechaFin) {
        this.sweetAlertService.showErrorAlert('La fecha de inicio no puede ser mayor a la fecha fin.');
        return;
      }
  
      // Convertir fechas a formato Date
      const fechaInicio = new Date(this.fechaInicio);
      const fechaFin = new Date(this.fechaFin);
  
      // Llamar al servicio con las fechas actualizadas
      this.ingresosService
        .getListaIngresos(this.tenantId, fechaInicio, fechaFin)
        .subscribe((data: any) => {
          this.listIngresos = [...data.data];

          this.listIngresos.forEach((ingreso: any) => {
            ingreso.fecha = this.formatoFecha(new Date(ingreso.fecha)); // Suponiendo que 'fecha' es el campo de fecha en cada objeto de solicitud
          });
          console.log("Datos de los ingresos: ", this.listIngresos);
        });
    } else {
      this.sweetAlertService.showErrorAlert('Debes seleccionar ambas fechas para filtrar.');
    }
  }
  

  deleteIngreso(id: any) {
    if (id) {
      this.sweetAlertService.showConfirmationDelete().then((result) => {
        if (result.isConfirmed) {
          // this.loading = true;
          this.ingresosService
            .deleteIngreso(id, this.tenantId)
            .subscribe(() => {
              this.sweetAlertService.showDeleteAlert(
                'Ingreso eliminado con exito.',
              );
              this.getListIngresos();
            });
        }
      });
    } else {
      console.log('no funciona');
    }
  }

  clear(table: Table) {
    table.clear();
  }

  filterData(event: any) {
    if (event && event.target && this.dt1) {
      this.dt1.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}

  
  
}
