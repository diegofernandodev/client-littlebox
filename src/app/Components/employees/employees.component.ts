// employees.component.ts
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SignInUpService } from "../../services/sign-in-up.service";
import { Observable } from 'rxjs';
import { SweetAlertService } from "../../services/sweet-alert.service";
import { TokenValidationService } from '../../services/token-validation-service.service';
import { Router } from '@angular/router'; // Importar el Router de Angular


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent  implements OnInit {


  usuarios: any[] = [];
  ListUsuarios: any[] = [];
  isSuperUsuario = false;
  isLoggedIn = false;
  userData: any;

  constructor(private signInUpService: SignInUpService, private sweetAlert:SweetAlertService,
    private tokenValidationService: TokenValidationService,
    private cdr: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    this.obtenerUsuariosPorTenantId();
    this.obtenerUsuariosU();
    this.checkAuthentication(); // Llamar a la función para verificar la autenticación
  }

  obtenerUsuariosPorTenantId() {
    this.signInUpService.getUsersByTenantId().subscribe(
      (usuarios: any[]) => {
        console.log(usuarios)
        this.usuarios = usuarios;
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  // Método para activar un usuario
  activarUsuario(userId: string) {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No se proporcionó un token válido.');
      return;
    }
    this.signInUpService.activeUser(userId, token).subscribe(
      response => {
        console.log('Usuario activado:', response);
        // Actualizar la lista de usuarios después de activar uno
        this.obtenerUsuariosPorTenantId();
        // alert('Usuario Activo')
        this.sweetAlert.showSuccessToast("El Usuario ha sido activado correctamente!")
        this.router.navigate(['/employees']);
      },
      error => {
        console.error('Error al activar el usuario:', error);
      }
    );
  }

  // Método para inactivar un usuario
  inactivarUsuario(userId: string) {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No se proporcionó un token válido.');
      return;
    }
    this.signInUpService.inactiveUser(userId, token).subscribe(
      response => {
        console.log('Usuario inactivado:', response);
        // Actualizar la lista de usuarios después de inactivar uno
        this.obtenerUsuariosPorTenantId();
        // alert('Usuario Inactivo')
        this.sweetAlert.showSuccessToast("El Usuario ha sido activado correctamente!")
      },
      error => {
        console.error('Error al inactivar el usuario:', error);
      }
    );
  }

  obtenerUsuariosU() {
    const token = localStorage.getItem('token'); // Obtener el token del localStorage
    if (!token) {
      console.error('No se proporcionó un token válido.');
      return;
    }
    this.signInUpService.getUserSuperU(token).subscribe( // Pasar el token como argumento
      (usuarios: any[]) => {
        console.log(usuarios)
        this.ListUsuarios = usuarios;
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  async checkAuthentication() {
    try {
      const token = localStorage.getItem('token');
      if (token && await this.tokenValidationService.isValidToken(token)) {
        this.isLoggedIn = true;
        this.userData = await this.tokenValidationService.getUserData(token);
        this.setUserRoles(this.userData.rol);
        this.cdr.detectChanges(); // Realizar detección de cambios
      }
    } catch (error) {
      console.error('Error al verificar la autenticación:', error);
    }
  }

  setUserRoles(rol: string) {
    if (rol) {
      this.isSuperUsuario = rol === 'SuperUsuario';
    }
  }
}