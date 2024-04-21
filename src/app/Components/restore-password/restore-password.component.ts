import { Component } from '@angular/core';
import { SignInUpService } from "../../services/sign-in-up.service";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss']
})
export class RestorePasswordComponent {
  email: string = '';
  codigo: string = '';
  newPassword: string ='';
  mostrarCodigoInput: boolean = false; // Variable para controlar la visibilidad del bloque de entrada del código

  constructor(private authService: SignInUpService, private router: Router) {}

  // Función para mostrar solo los primeros caracteres del correo
  get emailToShow(): string {
    const firstChars = this.email.substring(0, 5); // Mostrar los primeros 3 caracteres del correo
    const asterisks = '*'.repeat(this.email.length - 5); // Rellenar con asteriscos el resto del correo
    return firstChars + asterisks;
  }
  
  solicitarRestablecimiento() {
    this.authService.enviarCodigoRestablecimiento(this.email).subscribe(
      response => {
        console.log('Código de restablecimiento enviado:', response);
        // Manejar la respuesta según sea necesario (mostrar mensaje al usuario, redirigir, etc.)
        this.mostrarCodigoInput = true; // Mostrar el bloque de entrada del código después de enviar la solicitud
      },
      error => {
        console.error('Error al solicitar restablecimiento:', error);
        // Manejar el error (mostrar mensaje de error al usuario, etc.)
        Swal.fire({
          title: 'Error',
          text: 'Error al solicitar restablecimiento, correo no encontrado ',
          icon: 'error'
        });
      }
    );
  }

  resetPasswordhtml() {
    this.authService.resetPassword(this.email, this.codigo, this.newPassword).subscribe(
      response => {
        console.log('Contraseña restablecida con éxito:', response);
        // Manejar la respuesta según sea necesario (mostrar mensaje al usuario, redirigir, etc.)
        this.router.navigate(['/']); 
        Swal.fire({
          title: 'Éxito',
          text: '¡Cambio de contraseña exitoso!',
          icon: 'success'
        });
      },
      error => {
        console.error('Error al restablecer contraseña:', error);
        // Manejar el error (mostrar mensaje de error al usuario, etc.)
        Swal.fire({
          title: 'Error',
          text: 'Error al restablecer contraseña ',
          icon: 'error'
        });
      }
    );
  }
  validatePassword(): string {
    const password = this.newPassword;
    if (password.length < 8) {
      return 'Débil';
    } else if (password.length < 12) {
      return 'Medio';
    } else {
      return 'Fuerte';
    }
  }

  passwordStrengthPercentage(): number {
    const password = this.newPassword;
    if (password.length < 8) {
      return (password.length / 8) * 100;
    } else if (password.length < 12) {
      return (password.length / 12) * 100;
    } else {
      return 100;
    }
  }
}