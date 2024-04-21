import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbActiveModal
import { TercerosService } from "../../../services/terceros.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tercero-modal',
  templateUrl: './tercero-modal.component.html',
  styleUrls: ['./tercero-modal.component.scss']
})
export class TerceroModalComponent {
  tercero: any = {};
  terceros: any[] = [];
  
  constructor(public activeModal: NgbActiveModal,
              private terceroService: TercerosService) { }

  guardarTercero() {
    this.terceroService.guardarTercero(this.tercero)
      .subscribe(
        response => {
          Swal.fire('¡Tercero Creado Exitosamente!');
          // this.obtenerTerceros()
          this.activeModal.close(); // Cierra el modal después de guardar los datos
          console.log('Tercero guardado exitosamente:', response);
        },
        error => {
          console.error('Error al guardar tercero:', error);
        }
      );
  }

  cancelChanges() {
      this.activeModal.dismiss('Cancelado');
  }

  // obtenerTerceros() {
  //   this.terceroService.obtenerTerceros().subscribe(
  //     (response: any) => {
  //       this.terceros = response.data; // Asignar la matriz de terceros desde la propiedad 'data' del objeto de respuesta
  //       console.log(this.terceros);
  //     },
  //     (error) => {
  //       console.error('Error al obtener usuarios:', error);
  //     }
  //   );
  // }
}
