import { Component, ViewChild, ElementRef } from '@angular/core';
import { Ingreso } from '../../../interfaces/ingreso';
import { IngresosService } from '../../../services/ingresos/ingresos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetAlertService } from '../../../services/sweet-alert.service';
import { TokenValidationService } from '../../../services/token-validation-service.service';

@Component({
  selector: 'app-add-edit-ingreso',
  templateUrl: './add-edit-ingreso.component.html',
  styleUrl: './add-edit-ingreso.component.scss'
})
export class AddEditIngresoComponent {

  loading: boolean = false;
  id: string | null;
  operacion: string = 'Agregar ';
  tenantId: string = '';

  formulario: Ingreso = {
    ingresoId: 0,
    tenantId: '',
    fecha: "",
    detalle: '',
    valor: 0,
  };

  constructor(
    private ingrsosService: IngresosService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private tokenValidationService: TokenValidationService,
    private sweetAlertService: SweetAlertService,
  ) {
    this.id = this.aRouter.snapshot.paramMap.get('id');
    const token = localStorage.getItem('token');
    if (token) {
      const tenantId = this.tokenValidationService.getTenantIdFromToken();
      if (tenantId) {
        this.tenantId = tenantId;
      } else {
        console.error('No se pudo obtener el tenant ID del token');
      }
    } else {
      console.error('No se encontró ningún token en el almacenamiento local');
    }
    console.log(this.tenantId);
  }

  ngOnInit() {
    if (this.id !== null) {
      this.operacion = 'Editar ';
      this.getIngreso(this.id);
    } else {
      this.operacion = 'Agregar ';
      this.formulario = {
        ingresoId: 0, // O el valor inicial que desees
        tenantId: this.tenantId, // Si deseas establecer el tenantId
        fecha: new Date(),
        detalle: '',
        valor: 0
      };
    }
  }

  getIngreso(id: any) {
    this.loading = true;
    this.ingrsosService.getIngreso(id, this.tenantId).subscribe((response: any) => {
      this.loading = false;
      const data = response.data; // Extraer la propiedad 'data' de la respuesta
      data.fecha = this.formatoFecha(new Date(data.fecha));
      console.log('Datos obtenidos:', data);

      this.formulario = {
        ingresoId: data.ingresoId,
        tenantId: this.tenantId,
        fecha: data.fecha,
        detalle: data.detalle,
        valor: data.valor,
      };
    });
  }

  addIngreso() {
    // this.loading = true;
    
    if (this.id !== null) {
      this.sweetAlertService.showConfirmationDialog().then((result) => {
        if (result.isConfirmed) {
          this.realizarActualizacion();
        } else if (result.isDenied) {
          this.sweetAlertService.showErrorAlert('Los cambios no se guardaron');
          this.loading = false;
        } else {
          // Si hace clic en "Cancelar", redirige a la lista de solicitudes
          this.router.navigate(['/obtenerTodosLosIngresos']);
        }
      });
    } else {
      this.realizarInsercion();
    }
  }

  realizarActualizacion() {   
      // Verifica si this.id no es null antes de llamar a la función updateSolicitud
      if (this.id !== null) {
        console.log("datos nuevos del formulario: ", this.formulario);
        
        this.ingrsosService
          .updateIngreso(
            this.id,
            this.formulario,
            this.tenantId,
          )
          .subscribe(() => {
            // Muestra una alerta de éxito
            this.sweetAlertService.showSuccessAlert(
              `El ingreso fue actualizado con éxito`
            );
            // Redirige a la lista de solicitudes
            this.router.navigate(['/obtenerTodosLosIngresos']);
          });
      } else {
        console.error('El ID del Ingreso es null.');
      }
  }

  realizarInsercion() {
    console.log("estos son los datos al intentar guardar el formulario: ",this.formulario);
    this.ingrsosService.saveIngreso(this.formulario, this.tenantId).subscribe(() => {
      
      
      // Muestra la alerta de éxito con SweetAlert2
      this.sweetAlertService.showSuccessToast('Ingreso guardado exitosamente');

      // Espera 1500 milisegundos (1.5 segundos) antes de navegar a la lista de egresos
      setTimeout(() => {
        this.loading = false;
        this.router.navigate(['/obtenerTodosLosIngresos']);
      }, 1500);
    });
  }

  formatoFecha(fecha: Date): string {
    const fechaUTCString = fecha.toUTCString(); // Obtener la fecha en formato UTC
    const isoString = fecha.toISOString(); // Obtener la fecha en formato ISO 8601 (UTC)
    console.log('Fecha en formato UTC:', fechaUTCString);
    console.log('Fecha en formato ISO 8601 (UTC):', isoString);
    return isoString.substring(0, 10); // Recortar solo la parte de la fecha (YYYY-MM-DD)
  }
}
