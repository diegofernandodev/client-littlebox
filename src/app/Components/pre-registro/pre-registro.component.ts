import { Component, OnInit } from '@angular/core';
import { SignInUpService } from "../../services/sign-in-up.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-pre-registro',
  templateUrl: './pre-registro.component.html',
  styleUrls: ['./pre-registro.component.scss']
})
export class PreRegistroComponent implements OnInit {
  showPassword: boolean = false; // Propiedad para controlar si se muestra la contraseña o no
  pestanaActual: string = 'valorInicial'; 
  user = {
    email: '',
    password: ''
  };
  mensajeError: string = '';
  rutaSeleccionada: any;
  intentosFallidos: number = 0; // Contador de intentos fallidos

  constructor(private userService: SignInUpService, private router: Router) { }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword; // Cambia el estado de la propiedad para mostrar/ocultar la contraseña
  }
  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      const pestanaGuardada = localStorage.getItem('pestanaActual');
      if (pestanaGuardada) {
        this.pestanaActual = pestanaGuardada;
      }
    }
  }

  onSubmit() {
    this.userService.login(this.user).subscribe(
      response => {
        if (response.error) {
          this.mensajeError = 'Error al iniciar sesión';
          console.error('Error de inicio de sesión:', response.error);
          this.intentosFallidos++; // Incrementa el contador de intentos fallidos
          if (this.intentosFallidos === 4) {
            this.router.navigate(['/restorePassword']); // Redirige a la ruta deseada
          }
        } else {
          // Verificar si la respuesta contiene el userId y firstLogin es true
          if (response.userId && response.token && response.firstLogin) {
            localStorage.setItem('userId', response.userId);
            localStorage.setItem('token', response.token);
            // Mostrar alerta y navegar al componente ChangePasswordComponent
            if (confirm('Aceptar Términos y condiciones.')) {
                this.router.navigate(['TratamientoDeDatos', response.userId]);  
            }
          } else {
            // Si no es el primer inicio de sesión, redirigir al home
            this.router.navigate(['home']);
          }
          this.mensajeError = '';
          console.log('Inicio de sesión exitoso:', response);
        }
      },
      error => {
        if (error.status === 401 && error.error && error.error.error === 'Credenciales inválidas') {
          this.mensajeError = 'Error al iniciar sesión';
          console.error('Error de inicio de sesión:', error.error);
          this.intentosFallidos++; // Incrementa el contador de intentos fallidos
          if (this.intentosFallidos === 4) {
            this.router.navigate(['/restorePassword']); // Redirige a la ruta deseada
          }
        } else {
          this.mensajeError = 'Error al iniciar sesión';
          console.error('Error HTTP en inicio de sesión:', error);
        }
      }
    );
  }



  cambiarPestana(pestana: string): void {
    this.pestanaActual = pestana;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('pestanaActual', pestana);
    }
  }

  navegar() {
    if (this.rutaSeleccionada) {
      this.router.navigate([this.rutaSeleccionada]);
    }
  }

  redirigirARestablecerContrasena() {
    this.router.navigate(['/restorePassword/']); // Reemplaza '/restablecer-contraseña' con la ruta real de tu componente de restablecimiento de contraseña
  }
}
