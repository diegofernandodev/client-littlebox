import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Solicitud } from '../../interfaces/solicitud';
import { SolicitudesService } from '../../services/solicitudes.service';
import { EstadoSolicitud } from '../../interfaces/estadoSolicitud';
import { EstadoSolicitudService } from '../../services/estado-solicitud.service';
import { SweetAlertService } from '../../services/sweet-alert.service';
import { TokenValidationService } from '../../services/token-validation-service.service';
import { SolicitudModalComponent } from "../../Components/modals/solicitud-modal/solicitud-modal.component";
import { SignInUpService } from "../../services/sign-in-up.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import spanish from '../../../assets/i18n/spanish.json';
import { Table } from 'primeng/table';



@Component({
  selector: 'app-list-edict-solicitud',
  templateUrl: './list-edict-solicitud.component.html',
  styleUrl: './list-edict-solicitud.component.scss',
})
export class ListEdictSolicitudComponent implements OnInit{

  @ViewChild('dt1') dt1!: Table;

  dtOptions: DataTables.Settings = {};
  languageOptions: any;


  listSolicitudes: Solicitud[] = [];
  estadoDeSolicitud: EstadoSolicitud[] = [];
  estadoSeleccionado: string | null = null;
  solicitudesSeleccionadas: string[] = [];
  loading: boolean = false;
  tenantId: string = '';
  id: string | null;
  rolUsuario: string = ''; // Variable que almacena el rol del usuario
  cantidadSolicitudes: number = 0

  // fechaInicio = new Date('2024-01-01');
  fechaInicio = "";
  fechaFin = "";

  documento = ""

  constructor(
    private solicitudesService: SolicitudesService,
    private sweetAlertService: SweetAlertService,
    private tokenValidationService: TokenValidationService,
    private estadoSolicitud: EstadoSolicitudService,
    private aRouter: ActivatedRoute,
    private modalService: NgbModal,
    private signInUpService: SignInUpService
    // private datePipe: DatePipe,
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
    this.filtrarSolicitudes();
    this.getEstadoSolicitud();
    this.getRolUser()
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
    // // Obtener la fecha actual
    // const today = new Date();
    // const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    // const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    // this.fechaInicio = firstDayOfMonth;
    // this.fechaFin = lastDayOfMonth;

    // Filtrar las solicitudes al cargar el componente
    // this.filtrarSolicitudes();
  }


  getColorByEstado(estado: string | undefined): string {
    switch (estado) {
      case 'pendiente':
        return '#F9A70C'; // color naranja
      case 'aprobado':
        return '#0B6AD0'; // color azul
      case 'finalizado':
        return '#1CBF32'; // color verde
      case 'rechazado':
        return '#C43619'; // color rojo
      default:
        return ''; // color predeterminado o ninguno
    }
  }
  

  getEstadoSolicitud(): void {
    this.estadoSolicitud.getListaEstadoSolicitudes().subscribe((Data: any) => {
      this.estadoDeSolicitud = [...Data.data];
    });
  }

  getRolUser(): void {
    const userRole = this.signInUpService.getUserRole(); // Obtener el rol del usuario
    if (userRole !== null) {
      this.rolUsuario = userRole; // Establecer el rol del usuario solo si no es null
    } else {
      console.error('No se pudo obtener el rol del usuario');
    }
  }

  
 
  getListSolicitudes(): void {
    
    if (!this.fechaInicio || !this.fechaFin) {
      this.sweetAlertService.showErrorAlert('Debes seleccionar ambas fechas para filtrar.');
      return;
    }
    this.solicitudesService
      .getListaSolicitudes(this.tenantId, this.fechaInicio, this.fechaFin, this.documento)
      .subscribe((data: any) => {
        console.log("estas son las solicitudes: ", data);
        this.listSolicitudes = [...data.data];
        // this.loading = false;
        console.log("estado: ", this.listSolicitudes);
        console.log("Datos de las solicitudes: ", this.listSolicitudes);
      });
  }



  filtrarSolicitudes(): void {
    if (this.fechaInicio && this.fechaFin) {
      // Validar fechas
      if (this.fechaInicio > this.fechaFin) {
        this.sweetAlertService.showErrorAlert('La fecha de inicio no puede ser mayor a la fecha fin.');
        return;
      }

      // Convertir fechas a formato Date
      const fechaInicio = new Date(this.fechaInicio);
      const fechaFin = new Date(this.fechaFin);
       
      this.solicitudesService
        .getListaSolicitudes(this.tenantId, fechaInicio, fechaFin, this.documento)
        .subscribe((data: any) => {
          this.listSolicitudes = [...data.data];
          
          this.listSolicitudes.forEach((solicitud: any) => {
            solicitud.fecha = this.formatoFecha(new Date(solicitud.fecha)); // Suponiendo que 'fecha' es el campo de fecha en cada objeto de solicitud
          });
          console.log("Datos de las solicitudes: ", this.listSolicitudes);
        });

    } else {
      this.sweetAlertService.showErrorAlert('Debes seleccionar ambas fechas para filtrar.');
    }
  }

  deleteSolicitud(id: any) {
    if (id) {
      this.sweetAlertService.showConfirmationDelete().then((result) => {
        if (result.isConfirmed) {
          // this.loading = true;
          this.solicitudesService
            .deleteSolicitud(id, this.tenantId)
            .subscribe(() => {
              this.sweetAlertService.showDeleteAlert(
                'Solicitud eliminada con exito.',
              );
              this.getListSolicitudes();
            });
        }
      });
    } else {
      console.log('no funciona');
    }
  }

  guardarCambiosEstado() {
    if (this.estadoSeleccionado !== null && this.solicitudesSeleccionadas.length > 0) {
      const solicitudesIds = this.solicitudesSeleccionadas; // Solo los IDs de las solicitudes
      const nuevoEstadoId = this.estadoSeleccionado;
      const tenantId = this.tenantId;

      console.log("etas son las solicitudes por parmetros: ", solicitudesIds);
      console.log("este es el nuevo estado pasado por parametro: ", nuevoEstadoId);
      console.log("este es el tenantId: ", tenantId);

      this.solicitudesService.updateEstadoSolicitud(solicitudesIds, nuevoEstadoId, tenantId)
        .subscribe(() => {
          console.log(`Estado de las solicitudes actualizado correctamente.`);
          // Aquí podrías agregar lógica adicional si lo necesitas, como actualizar la lista de solicitudes
          this.sweetAlertService.showSuccessAlert(
            'Estado modificado exitosamente.',
          );
        }, (error) => {
          console.error(`Error al cambiar el estado de las solicitudes:`, error);
          const mensaje = `Error al cambiar el estado de las solicitudes:` + error.error.data
          this.sweetAlertService.showErrorAlert(mensaje)
        });
    } else {
      console.log('Por favor selecciona al menos una solicitud y un nuevo estado.');
    }
  }



    seleccionarSolicitud(solicitudId: string) {
    console.log("Este es la solicitudId de seleccionar solicitud: ", solicitudId);

    if (this.solicitudesSeleccionadas.includes(solicitudId)) {
      this.solicitudesSeleccionadas = this.solicitudesSeleccionadas.filter(id => id !== solicitudId);
      console.log("estas son las solicitudes seleccionadas check: ", this.solicitudesSeleccionadas);

    } else {
      this.solicitudesSeleccionadas.push(solicitudId);
      console.log("solicitud push a array: ", this.solicitudesSeleccionadas);
    }
  }

  verDetalle(solicitud: any) {
    const modalRef = this.modalService.open(SolicitudModalComponent);
    modalRef.componentInstance.solicitud = solicitud;
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