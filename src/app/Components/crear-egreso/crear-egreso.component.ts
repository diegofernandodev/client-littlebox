import { Component } from '@angular/core';
import { EgresosService } from "../../services/egresos.service";
import { CategoriasService } from "../../services/categoria.service";
import { TercerosService } from "../../services/terceros.service";
import { TokenValidationService } from "../../services/token-validation-service.service";
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TerceroModalComponent } from "../../Components/modals/tercero-modal/tercero-modal.component";


@Component({
  selector: 'app-crear-egreso',
  templateUrl: './crear-egreso.component.html',
  styleUrls: ['./crear-egreso.component.scss']
})
export class CrearEgresoComponent {
  selectedCategoria: any;
  selectedTercero: any;
  egreso: any = {};
  categoria: any[] = [];
  tercero: any[] = [];
tenantId: string= ''
  constructor(
    private egresoService: EgresosService,
    private categoriasService: CategoriasService,
    private tercerosService: TercerosService,
    private tokenService: TokenValidationService,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private modalService: NgbModal
  ) {
    
  }

  ngOnInit(): void {
    this.obtenerCategorias();
    this.obtenerTercerosPorTenantId();
     // Obtener el token de autenticación del lugar donde lo tengas almacenado (por ejemplo, localStorage)
     const token = localStorage.getItem('token');
     console.log('tokeeeeen', token )

     if (token !== null) {
       // Decodificar el token para obtener el tenantId utilizando JwtHelperService
       const decodedToken: any = this.jwtHelper.decodeToken(token);
       if (decodedToken && decodedToken.tenantId) {
         this.tenantId = decodedToken.tenantId;
         console.log('Este es el tenantId:', this.tenantId);
       } else {
         console.error('El token no contiene el campo tenantId.');
       }
     } else {
       console.error('No se encontró ningún token en el almacenamiento local.');
       // Manejar el caso en el que no se encuentra el token
     }
  } 

  guardarEgresos(): void {

  
    this.egresoService.saveEgreso(this.egreso).subscribe(
      (response: any) => {
        Swal.fire('Egreso Creado Exitosamente!');
        this.router.navigate(['/listEgresos']);

        console.log('Egreso guardado exitosamente:', response);
        // Puedes hacer alguna acción adicional aquí, como redirigir a una página de confirmación
      },
      (error:any) => {
        console.error('Error al guardar egreso:', error);
        // Maneja el error según tus necesidades, por ejemplo, muestra un mensaje de error al usuario
      }
    );
  }
  

  obtenerCategorias(): void {
    this.categoriasService.obtenerTodasLasCategorias().subscribe(
      (response) => {
        this.categoria = response.data;
        if (this.categoria.length > 0) {
          this.egreso.categoria = this.categoria[0]._id;
        }
      },
      (error) => {
        console.error('Error al obtener las categorías:', error);
      }
    );
  }

  obtenerTercerosPorTenantId() {

    this.tercerosService.obtenerTerceros().subscribe(
      (response: any) => {
        this.tercero = response.data;
        if (this.tercero.length > 0) {
          this.egreso.tercero = this.tercero[0]._id;
        }
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }
  onFileSelected(event: any) {
    const selectedFile = event.target.files[0]; // Obtener el archivo seleccionado
    const fileReader = new FileReader();
    
    fileReader.onload = () => {
      // Cuando la lectura del archivo esté completa
      // Asignar el contenido del archivo (sin prefijo de ruta) a company.pdfRunt
      this.egreso.factura = fileReader.result as string; // Esto asume que pdfRunt es de tipo string
    };
    
    // Leer el contenido del archivo como una URL de datos (data URL)
    fileReader.readAsDataURL(selectedFile);
  }
 
  openModal() {
    const modalRef = this.modalService.open(TerceroModalComponent); // Abre el modal
    //   modalRef.componentInstance.tercero = tercero; // Pasa el tercero seleccionado al modal
    // }
  }
}
