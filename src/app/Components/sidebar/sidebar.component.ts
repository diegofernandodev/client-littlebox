import { Component, HostListener, OnInit, ChangeDetectorRef, Output, EventEmitter  } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { SignInUpService } from "../../services/sign-in-up.service";
import { TokenValidationService } from '../../services/token-validation-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  visibleSidebar: boolean = false;
  position: string = 'left';
  isLoggedIn: boolean = false;
  isGerente: boolean = false;
  isSuperUsuario: boolean = false;
  isAdministrador: boolean = false;
  isColaborador: boolean = false;
  loginStatusSubscription!: Subscription;
  userData: any;
  isOpen = false;

  constructor(private router: Router, private authService: SignInUpService, private tokenValidationService: TokenValidationService, private cdr: ChangeDetectorRef,) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.checkAuthentication(); // Verificar autenticación al cambiar de ruta
      }
    });

    this.checkAuthentication(); // Verificar autenticación al cargar el componente

    this.loginStatusSubscription = this.authService.loginStatusChanged.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        this.updateUserRoles(); // Actualizar roles después de iniciar sesión
      } else {
        this.resetUserRoles(); // Restablecer roles después de cerrar sesión
      }
    });
  }
  updateUserRoles() {
    throw new Error('Method not implemented.');
  }

  async checkAuthentication() {
    try {
      const token = localStorage.getItem('token');
      if (token && await this.tokenValidationService.isValidToken(token)) {
        this.isLoggedIn = true;
        this.userData = await this.tokenValidationService.getUserData(token);
        this.setUserRoles(this.userData.rol); // Establecer los roles del usuario
        this.cdr.detectChanges(); // Realizar detección de cambios
      } else {
        this.isLoggedIn = false; // Actualizar estado de autenticación si no hay token válido
        this.resetUserRoles(); // Restablecer roles si no hay token válido
      }
    } catch (error) {
      console.error('Error al verificar la autenticación:', error);
    }
  }

  setUserRoles(rol: string) {
    if (rol) {
      this.isGerente = rol === 'Gerente';
      this.isSuperUsuario = rol === 'SuperUsuario';
      this.isAdministrador = rol === 'Administrador';
      this.isColaborador = rol === 'Colaborador';
    }
  }

  resetUserRoles() {
    this.isGerente = false;
    this.isSuperUsuario = false;
    this.isAdministrador = false;
    this.isColaborador = false;
  }

}