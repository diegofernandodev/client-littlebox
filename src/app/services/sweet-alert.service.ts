import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SweetAlertService {
  showConfirmationDialog(): Promise<any> {
    return Swal.fire({
      title: '¿Seguro que quieres guardar los cambios?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: 'No guardar',
      cancelButtonText: 'Cancelar',
    });
  }

  showSuccessAlert(message: string): void {
    Swal.fire('Éxito', message, 'success');
  }

  showErrorAlert(message: string): void {
    Swal.fire('Error', message, 'error');
  }

  showSuccessToast(message: string): void {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  showConfirmationDelete(): Promise<SweetAlertResult> {
    return Swal.fire({
      title: 'Estas seguro de eliminar el registro?',
      text: 'Este proceso no se podra revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
    });
  }

  showDeleteAlert(message: string): void {
    Swal.fire({
      title: 'Eliminado!',
      text: message,
      icon: 'success',
    });
  }
  // Agrega más métodos según sea necesario para tu aplicación
}
