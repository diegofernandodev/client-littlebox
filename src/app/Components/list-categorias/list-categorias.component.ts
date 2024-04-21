import { Component } from '@angular/core';
import { CategoriasService } from "../../services/categoria.service";
import { TokenValidationService } from "../../services/token-validation-service.service";
import { HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-list-categorias',
  templateUrl: './list-categorias.component.html',
  styleUrl: './list-categorias.component.scss'
})
export class ListCategoriasComponent {
 
  categorias: any[] = [];

  constructor(private categoriaService: CategoriasService, private tokenValidationService: TokenValidationService) { }


  ngOnInit(): void {
    this.obtenerTercerosPorTenantId();
  }

  obtenerTercerosPorTenantId() {
    this.categoriaService.obtenerTodasLasCategorias().subscribe(
      (response: any) => {
        this.categorias = response.data; // Asignar la matriz de terceros desde la propiedad 'data' del objeto de respuesta
        console.log(this.categorias);
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }
  
  

}
