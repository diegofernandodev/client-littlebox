import { Injectable, EventEmitter  } from '@angular/core';
import { HttpClient, HttpHeaders , HttpResponse } from '@angular/common/http';
import { Observable, Subject  } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators'; 
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { TokenValidationService } from "../services/token-validation-service.service";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  baseUrl =""
  constructor(private http: HttpClient, private tokenValidationService:TokenValidationService) {
    this.baseUrl = environment.apiUrl;
   }

  
 
  obtenerTodasLasCategorias(): Observable<any> {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No se proporcionó un token válido.');
      return throwError('No se proporcionó un token válido.');
    }

    const categoriaTenant = this.tokenValidationService.getUserData(token);

    const tenantId = typeof categoriaTenant.tenantId === 'string' ? categoriaTenant.tenantId : '';

    // Configurar las cabeceras con el token de autorización
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });

    // Devolver la solicitud HTTP con las cabeceras configuradas
    return this.http.get(`${this.baseUrl}obtenerTodasLasCategorias`, { headers });
  }

  obtenerCategoriaPorId(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}obtenerCategoria/${id}`);
  }

  guardarCategoria(categoria: any): Observable<any> {
    const token = this.tokenValidationService.getToken();
    // Agrega el token al encabezado de la petición
    const headers = new HttpHeaders({ 'Authorization': `${token}` });

    // Realiza la petición HTTP para guardar el tercero
    return this.http.post<any>(`${this.baseUrl}guardarCategoria`, categoria, { headers });
  }

  eliminarCategoria(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}eliminarCategoria/${id}`);
  }

  modificarCategoria(id: string, nuevosDatos: any): Observable<any> {
    return this.http.put(`${this.baseUrl}modificarCategoria/${id}`, nuevosDatos);
  }
}
