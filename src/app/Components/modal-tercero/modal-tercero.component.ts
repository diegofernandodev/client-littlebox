import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbActiveModal
import { TercerosService } from "../../services/terceros.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-tercero',
  templateUrl: './modal-tercero.component.html',
  styleUrl: './modal-tercero.component.scss'
})
export class ModalTerceroComponent {
  @Input() tercero: any;

  constructor(public activeModal: NgbActiveModal,
              private tercerosService: TercerosService) { } // Inyecta el servicio

  saveChanges() {
    this.tercerosService.modificarTercero(this.tercero, this.tercero._id).subscribe(
      (response: any) => {
        // Aquí puedes manejar la respuesta si lo necesitas
        console.log('Tercero modificado:', response);
        Swal.fire('¡Cambios guardados!', 'Los cambios se han guardado correctamente.', 'success');
        this.activeModal.close('Cambios guardados'); // Cierra el modal si la operación se realizó con éxito
      },
      (error) => {
        console.error('Error al modificar tercero:', error);
        console.log(this.tercero._id)
        // Aquí puedes manejar el error si lo necesitas
      }
    );
  }

  cancelChanges() {
    if (window.confirm('¿Estás seguro de que deseas cancelar?')) {
      this.activeModal.dismiss('Cancelado');
    }
  }
}
