import { Component, OnInit, ViewChild, ElementRef , ChangeDetectorRef, viewChild} from '@angular/core';
import {InformesService} from "../../services/informes.service";
import { SolicitudesService } from '../../services/solicitudes.service';
import { forkJoin } from 'rxjs';
import Chart from 'chart.js/auto';
import { Solicitud } from '../../interfaces/solicitud';
import { filter } from 'rxjs/operators';
import { Subscription, interval } from 'rxjs';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import{CompanyService} from '../../services/company.service'
import { TokenValidationService } from '../../services/token-validation-service.service';
import { SignInUpService } from "../../services/sign-in-up.service";
import { Router, NavigationStart } from '@angular/router';
import { SaldoCajaService } from "../../services/saldo-caja.service";


interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  terceros: any[] = [];
  companies: any = [];
  categorias: any[] = [];
  cols: Column[] = [];
  saldoCaja: any;
  filtroSeleccionado: string = 'mes'; // Valor predeterminado para el filtro
  valorFiltro: any; // Valor seleccionado por el usuario para el filtro
  @ViewChild('tercerosChart') private chartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('categoriasChart') private categoriasChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('companiesChartRef') private companiesChartRef!: ElementRef<HTMLCanvasElement>;

  fechaInicio = new Date();
  fechaFin = new Date();
  listSolicitudes: Solicitud[] = [];
  tenantId: string = '';
  documento = ""
  isGerente = false;
  isSuperUsuario = false;
  isAdministrador = false;
  isColaborador = false;
  isLoggedIn = false;
  userData: any;

  notifications: any[] = [];
  previousNotifications: any[] = [];
  notificationsCount: number = 0;
  initialNotificationCount = 10; // Define el número inicial de notificaciones a mostrar
  visibleNotifications: any[] = [];
  showLoadMoreLink: boolean = true; // Variable de control para mostrar u ocultar el enlace "Mostrar más"
  loginStatusSubscription!: Subscription;

  subscription: Subscription = new Subscription();
  routerSubscription: Subscription = new Subscription();

  private chart: any;
  ListUsuarios: any = [];
  compniesTotales: any = []

  constructor(private informesService: InformesService,
    private solicitudesService: SolicitudesService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService,
    private tokenValidationService: TokenValidationService,
    private cdr: ChangeDetectorRef,
    private authService: SignInUpService, 
    private saldoDeCaja: SaldoCajaService,
  ) { }

  navegarAIngreso(): void {
    this.router.navigate(['/addIngreso']); 
}
    ngOnInit(): void {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          this.checkAuthentication(); // Verificar autenticación al cambiar de ruta
        }
      });
      // Obtener la fecha actual
      const today = new Date();
      // Establecer la fecha de inicio como el primer día del mes actual
      this.fechaInicio = new Date(today.getFullYear(), today.getMonth(), 1);
      // Establecer la fecha de fin como la fecha actual
      this.fechaFin = new Date();
  
      // Obtener información de usuarios y empresas al cargar la página
      this.obtenerUsuariosYEmpresas();
      // Refresh notifications
      this.refreshNotifications();
      this.subscription = interval(5000).subscribe(() => {
        this.refreshNotifications();
        this.listCompanies();
        this.obtenerCompanies()
        this.obtenerTercerosMasUtilizados()
        this. obtenerCategroiasMasUtilizados()
        this. getListSolicitudes()
        this.ActualizarSaldoCaja()
      });

      this.checkAuthentication(); // Verificar autenticación al cargar el componente

    this.loginStatusSubscription = this.authService.loginStatusChanged.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) {
      } else {
        this.updateUserRoles()
        this.resetUserRoles(); // Restablecer roles después de cerrar sesión
      }
    });
    }
  
    obtenerUsuariosYEmpresas(): void {
      // Obtener usuarios
      this.obtenerUsuariosU();
      // Obtener empresas
      this.listCompanies();
    }

    updateUserRoles() {
      throw new Error('Method not implemented.');
    }



  obtenerTercerosMasUtilizados(): void {
    this.informesService.getTerceros('tenantId').subscribe(
    data => {
      this.terceros = data;
      this.createLineChartTer();
    },
    error => {
      // console.error('Error al obtener terceros:', error);
      // Manejo de errores
    }
  );
  }

  obtenerCategroiasMasUtilizados(): void {
    this.informesService.getCategorias('tenantId').subscribe(
    data => {
      this.categorias = data;
      this.createLineChartCate();
    },
    error => {
      // console.error('Error al obtener categorias:', error);
      // Manejo de errores
    }
  );
  }



  createLineChartTer(): void {
    const canvas: HTMLCanvasElement = this.chartRef.nativeElement;
    const ctx = canvas.getContext('2d');
  
    if (!ctx) {
      // console.error('No se pudo obtener el contexto del lienzo');
      return;
    }
  
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.terceros.map(tercero => tercero.terceroNombre),
        datasets: [{
          label: 'Cantidad de Proveedores',
          data: this.terceros.map(tercero => tercero.count),
          backgroundColor: 'rgba(0, 0, 139, 0.2)',
          borderColor: 'green', // Cambiar el color a verde
          borderWidth: 3
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true // Aquí se especifica el tipo de escala como 'linear'
          }
        }
      }
    });
  }
  
  createLineChartCate(): void {
    const canvas: HTMLCanvasElement = this.categoriasChartRef.nativeElement; // Cambia la referencia de lienzo
    const ctx = canvas.getContext('2d');
  
    if (!ctx) {
      
      // console.error('No se pudo obtener el contexto del lienzo');
      return;
    }
  
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.categorias.map(categoria => categoria.categoriaNombre),
        datasets: [{
          label: 'Cantidad de Categorias',
          data: this.categorias.map(categoria => categoria.count),
          backgroundColor: 'rgba(0, 0, 139, 0.2)',
          borderColor: 'green', // Cambiar el color a verde
          borderWidth: 3
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
  

  getListSolicitudes(): void {
    
    if (!this.fechaInicio || !this.fechaFin) {
      return;
    }
    this.solicitudesService
      .getListaSolicitudes(this.tenantId, this.fechaInicio, this.fechaFin, this.documento)
      .subscribe((data: any) => {
        console.log("estas son las solicitudes: ", data);
        console.log('fechast',this.fechaInicio,this.fechaFin)
        this.listSolicitudes = [...data.data];
        // this.loading = false;
        // console.log("estado: ", this.listSolicitudes);
        // console.log("Datos de las solicitudes: ", this.listSolicitudes);
      });
  }
  getColorByEstado(estado: string | undefined): string {
    switch (estado) {
      case 'pendiente':
        return 'orange'; // color naranja
      case 'aprobado':
        return 'blue'; // color azul
      case 'finalizado':
        return 'green'; // color verde
      case 'rechazado':
        return 'red'; // color rojo
      default:
        return ''; // color predeterminado o ninguno
    }
  }
  
 
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }

  refreshNotifications(): void {
    this.notificationService.getNotificationsByUserId().subscribe(
      (notifications) => {
        const unreadNotifications = notifications.filter(notification => !notification.read);
        // Mostrar solo las primeras 5 notificaciones no leídas
        this.visibleNotifications = unreadNotifications.slice(0, 3);
        // Determinar si se deben mostrar más notificaciones
        this.showLoadMoreLink = unreadNotifications.length > 3;
      },
      (error) => {
        // console.error('Error al obtener las notificaciones:', error);
      }
    );
  }
  

  loadMoreNotifications() {
    // Añadir 10 notificaciones adicionales a las visibles
    const startIndex = this.visibleNotifications.length;
    const endIndex = startIndex + this.initialNotificationCount;
    this.visibleNotifications = [...this.visibleNotifications, ...this.notifications.slice(startIndex, endIndex)];
    // Ocultar el enlace "Mostrar más" si no hay más notificaciones para mostrar
    if (this.visibleNotifications.length >= this.notifications.length) {
      this.showLoadMoreLink = false;
    }
  }

  getNewNotifications(notifications: any[]): any[] {
    return notifications.filter(notification => !this.previousNotifications.includes(notification));
  }

  handleClickNotification(notificationId: string) {
    this.notificationService.markNotificationAsRead(notificationId)
      .subscribe(() => {
        // Realiza alguna acción adicional si es necesario, como actualizar la lista de notificaciones
      }, error => {
        // console.error('Error al marcar la notificación como leída:', error);
      });
  }
 

  
  getIconByCategory(nombre: string | undefined): string {
    if (nombre) {
      // Aquí puedes asignar un ícono específico para cada categoría
      switch (nombre) {
        case 'Cafetería':
          return 'pi pi-building'; 
        case 'Restaurante':
          return 'pi pi-cutlery'; // Ejemplo: ícono de cubiertos de PrimeNG
        case 'Transporte':
        return 'pi pi-car';
        case 'Papelería':
          return 'pi pi-book';
        // Agrega más casos según las categorías que tengas
        default:
          return 'pi pi-question-circle'; // Ícono predeterminado para categorías desconocidas
      }
    } else {
      // Manejar el caso en que categoryName sea undefined
      return 'pi pi-question-circle'; // Ícono predeterminado para categorías indefinidas
    }
  }
  
  async checkAuthentication() {
    try {
      const token = localStorage.getItem('token');
      if (token && await this.tokenValidationService.isValidToken(token)) {
        this.isLoggedIn = true;
        this.userData = await this.tokenValidationService.getUserData(token);
        this.setUserRoles(this.userData.rol); // Establecer los roles del usuario
        this.cdr.detectChanges(); // Realizar detección de cambios para reflejar los roles en la plantilla
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
      // console.log('Roles del usuario:', { isGerente: this.isGerente, isSuperUsuario: this.isSuperUsuario, isAdministrador: this.isAdministrador, isColaborador: this.isColaborador });
    }
  }
  

  resetUserRoles() {
    this.isGerente = false;
    this.isSuperUsuario = false;
    this.isAdministrador = false;
    this.isColaborador = false;
  }

  listCompanies() {
    this.companyService.listTodasCompanies().subscribe(companies => {
      this.companies = companies.length;
      // console.log('empresas:', this.companies)
    });
  }
  

  obtenerUsuariosU() {
    const token = localStorage.getItem('token'); // Obtener el token del localStorage
    if (!token) {
      // console.error('No se proporcionó un token válido.');
      return;
    }
    this.authService.getUserSuperU(token).subscribe( // Pasar el token como argumento
      (usuarios: any[]) => {
        console.log(usuarios)
        this.ListUsuarios = usuarios.length;
      },
      (error) => {
        // console.error('Error al obtener usuarios:', error);
      }
    );
  }

  obtenerCompanies(): void {
    this.companyService.listTodasCompanies().subscribe((comaniesList:any) => {
      this.compniesTotales = comaniesList;
      console.log('list:', this.compniesTotales)
      this.createLineChartCompanies()
    },
    error => {
      // console.error('Error al obtener todas las empresas:', error);
      // Manejo de errores
    }
  );
  }


  createLineChartCompanies(): void {
    const canvas: HTMLCanvasElement = this.companiesChartRef.nativeElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      // console.error('No se pudo obtener el contexto del lienzo');
      return;
    }

    // Agrupar las empresas por mes y año
    const companiesByMonth = this.compniesTotales.reduce((acc: any, company: any) => {
        const date = new Date(company.fecha);
        const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`; // Obtener el año y el mes
        if (!acc[monthYear]) {
            acc[monthYear] = 0; // Inicializar el contador para el mes y año actual
        }
        acc[monthYear]++; // Incrementar el contador para el mes y año actual
        return acc;
    }, {});

    // Obtener las etiquetas (meses) y los datos (cantidad de empresas por mes)
    const labels = Object.keys(companiesByMonth);
    const data = Object.values(companiesByMonth);

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Cantidad de empresas',
          data: data,
          borderColor: 'green',
          borderWidth: 3
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
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
  
  
}