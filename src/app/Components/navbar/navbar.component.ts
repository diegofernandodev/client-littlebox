import { Component, HostListener, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { SignInUpService } from "../../services/sign-in-up.service";
import { TokenValidationService } from '../../services/token-validation-service.service';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { SidebarComponent } from '../sidebar/sidebar.component';
// import { SidebarService } from '../../services/sidebar.service';
import { Sidebar } from 'primeng/sidebar';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from "../../services/notification.service";
import { SaldoCajaService } from "../../services/saldo-caja.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  mostrarNavbar = true;
  scrolled: boolean = false;
 
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  items: MenuItem[] = [];
  modalOpen = false;
  isMenuOpen = false;
  isLoggedIn = false;
  userData: any;
  loginStatusSubscription!: Subscription;
  isGerente = false;
  isSuperUsuario = false;
  isAdministrador = false;
  isColaborador = false;
  currentRoute = '';
  notificationsCount = 0;
  miValorComoString: string = ""
  saldoCaja: any;
  

  constructor(
    private router: Router,
    private authService: SignInUpService,
    private tokenValidationService: TokenValidationService,
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService,
    private saldoDeCaja: SaldoCajaService,
  ) { 
    this.router.events.subscribe((val) => {
      this.currentRoute = this.router.url;
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY > 50) {
      this.scrolled = true;
    } else {
      this.scrolled = false;
    }
  }

  ActualizarSaldoCaja(): void {
    this.saldoDeCaja.getSaldoDeCaja().subscribe((Data: any) => {
      if (Data) {
        this.saldoCaja = Data.data;
        console.log("saldo caja = ",this.saldoCaja);
      }else{
        console.error("Error al obtener el saldo de caja ");
        
      }
    });
  }
  showNotifications: boolean = false;

  closeNotifications(): void {
    this.showNotifications = false;
  }

  
  openNotifications(): void {
    this.showNotifications = !this.showNotifications;
    this.miValorComoString = this.notificationsCount.toString();
    if (this.showNotifications) {
      console.log("notificaciones abiertas: ",this.showNotifications);
      
      this.refreshNotifications(); // Actualizar el contador de notificaciones al abrir las notificaciones
    }
  }

  
  ngOnInit(): void {
    this.checkAuthentication();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.currentRoute = this.router.url;
        this.closeModal();
        this.checkAuthentication();
        
      }
    });
    this.authService.mostrarNavbar.subscribe(mostrar => {
      this.mostrarNavbar = mostrar;
    });
    

    this.loginStatusSubscription = this.authService.loginStatusChanged.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.updateMenuItems();
      if (isLoggedIn) {
        this.refreshNotifications(); // Actualizar el contador de notificaciones al iniciar sesión
        this.ActualizarSaldoCaja()
      }
    });
    this.refreshNotifications(); // Actualizar el contador de notificaciones al iniciar el componente
    this.ActualizarSaldoCaja()
  }

  async refreshNotifications(): Promise<void> {
    try {
      const notifications = await this.notificationService.getNotificationsByUserId().toPromise();

      // Verificar si notifications no es undefined antes de acceder a la propiedad length
      if (notifications !== undefined) {
        // Contar las notificaciones no leídas
        this.notificationsCount = notifications.filter(notification => !notification.read).length;
        this.miValorComoString = this.notificationsCount.toString(); // Actualizar el contador de notificaciones
      }
    } catch (error) {
      console.error('Error al obtener las notificaciones:', error);
    }
  }

  closeCallback(e:any): void {
    this.sidebarRef.close(e);
}

sidebarVisible: boolean = false;

  async checkAuthentication() {
    try {
      const token = localStorage.getItem('token');
      if (token && await this.tokenValidationService.isValidToken(token)) {
        this.isLoggedIn = true;
        this.userData = await this.tokenValidationService.getUserData(token);
        this.setUserRoles(this.userData.rol);
        this.updateMenuItems();
        this.cdr.detectChanges(); // Realizar detección de cambios
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

  updateMenuItems() {
    this.items = [
      { label: 'Gráficos', icon: 'pi pi-chart-bar', routerLink: '/graficos',  visible: this.isLoggedIn && (this.isAdministrador || this.isGerente) },
      { label: 'Informes', icon: 'pi pi-file', routerLink: '/Informes', styleClass: 'custom-menu-item', visible: this.isLoggedIn && (this.isAdministrador || this.isGerente) },
      { label: 'Ingresos', icon: 'pi pi-arrow-up', routerLink: '/obtenerTodosLosIngresos', styleClass: 'custom-menu-item', visible: this.isLoggedIn && (this.isAdministrador || this.isGerente) },
      { label: 'Crear Egreso', icon: 'pi pi-arrow-down', routerLink: '/crearEgreso', styleClass: 'custom-menu-item', visible: this.isLoggedIn && (this.isAdministrador || this.isGerente) },
      { label: 'Solicitudes', icon: 'pi pi-list', routerLink: '/obtenerTodasLasSolicitudes', styleClass: 'custom-menu-item', visible: this.isLoggedIn && (this.isAdministrador || this.isGerente || this.isColaborador) },
    ];
  }
 

  @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    if (this.isMenuOpen && (event.target as Element)?.closest('.menu-container') == null && (event.target as Element)?.closest('.contenedor-img') == null) {
      this.isMenuOpen = false;
    }
    const target = event.target as HTMLElement;
    if (!target.closest('.notification-container') && !target.closest('button[pButton]')) {
      this.closeNotifications();
    }
  }

  logout(): void {
    try {
      this.authService.logout(); // Limpia la sesión
      this.isLoggedIn = false; // Actualiza el estado de inicio de sesión
      this.isGerente = false; // Establece estas variables en false
      this.isSuperUsuario = false;
      this.isAdministrador = false;
      this.isColaborador = false;
      this.router.navigate(['/']); // Navega de regreso a la página de inicio
      localStorage.removeItem('isLoggedIn'); // Borra el indicador de inicio de sesión
      this.checkAuthentication(); // Verifica el estado de inicio de sesión después de cerrar la sesión
      this.cdr.detectChanges(); // Realiza detección de cambios
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
  

  

  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  
}
