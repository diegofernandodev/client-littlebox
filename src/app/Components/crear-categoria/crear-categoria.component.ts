import { Component } from '@angular/core';
import {  CategoriasService} from "../../services/categoria.service";
import { JwtHelperService } from '@auth0/angular-jwt'; // Importa JwtHelperService
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrl: './crear-categoria.component.scss'
})
export class CrearCategoriaComponent {
  categoria: any = {}; // Objeto para almacenar los datos del tercero
  tenantId: string = ''; // Inicializamos tenantId con un valor por defecto

  constructor(
    private categoriaService: CategoriasService,
    private jwtHelper: JwtHelperService ,// Inyecta JwtHelperService en el constructor
    private router: Router

  ) { }

  ngOnInit(): void {
    // Obtener el token de autenticación del lugar donde lo tengas almacenado (por ejemplo, localStorage)
    const token = localStorage.getItem('token');

    if (token !== null) {
      // Decodificar el token para obtener el tenantId utilizando JwtHelperService
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      this.tenantId = decodedToken.tenantId;
    } else {
      console.error('No se encontró ningún token en el almacenamiento local.');
      // Manejar el caso en el que no se encuentra
    }
  }

  guardarCategoria(): void {
    this.categoriaService.guardarCategoria(this.categoria)
      .subscribe(
        response => {
          Swal.fire('¡Categoria creada exitosamente!');
          this.router.navigate(['/listCatgorias']);

          console.log('Categoria guardada exitosamente:', response);
          // Limpia el formulario o realiza alguna acción adicional
        },
        error => {
          console.error('Error al guardar categoria:', error);
          // Maneja el error según tus necesidades
        }
      );
  }
}

