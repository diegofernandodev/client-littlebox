import { Component } from '@angular/core';
import { TercerosService } from "../../services/terceros.service";
import { JwtHelperService } from '@auth0/angular-jwt'; // Importa JwtHelperService
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-tercero',
  templateUrl: './crear-tercero.component.html',
  styleUrls: ['./crear-tercero.component.scss'] // La propiedad se llama styleUrls, no styleUrl
})
export class CrearTerceroComponent {
  tercero: any = {}; // Objeto para almacenar los datos del tercero
  tenantId: string = ''; // Inicializamos tenantId con un valor por defecto

  constructor(
    private terceroService: TercerosService,
    private jwtHelper: JwtHelperService, // Inyecta JwtHelperService en el constructor
    private router: Router
  ) { }

  ngOnInit(): void {
    // Obtener el token de autenticación del lugar donde lo tengas almacenado (por ejemplo, localStorage)
  const token = localStorage.getItem('token');

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

  guardarTercero(): void {
    // Llama al servicio para guardar el tercero
    this.terceroService.guardarTercero(this.tercero)
      .subscribe(
        response => {
          Swal.fire('¡Tercero Creado Exitosamente!');
          this.router.navigate(['/listTerceros']);

          console.log('Tercero guardado exitosamente:', response);
          // Limpia el formulario o realiza alguna acción adicional
        },
        error => {
          console.error('Error al guardar tercero:', error);
          // Maneja el error según tus necesidades
        }
      );
  }
}
