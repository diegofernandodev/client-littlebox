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
export class TercerosService {
  private baseUrl = ''; // Reemplaza esta URL con la URL de tu backend

  constructor(private http: HttpClient, private tokenValidationService:TokenValidationService) {
    this.baseUrl = environment.apiUrl;
   }

  obtenerTerceros():Observable<any[]> {
    const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
    
    // Verificar si token no es nulo antes de llamar a getUserData
    if (!token) {
      console.error('No se proporcionó un token válido.');
      return throwError('No se proporcionó un token válido.');
    }
    
    const terceroTenant = this.tokenValidationService.getUserData(token);
    
    // Verificar si userTenant.tenantId es una cadena antes de asignarlo a tenantId
    const tenantId = typeof terceroTenant.tenantId === 'string' ? terceroTenant.tenantId : '';
    
    const url = `${this.baseUrl}obtenerTodosLosTerceros/`;
    
    // Configurar las cabeceras con el token de autorización
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });
  
    // Realizar la solicitud HTTP con las cabeceras configuradas
    return this.http.get<any[]>(url, { headers }).pipe(
      catchError(error => {
        console.error('Error al obtener Terceros:', error);
        return throwError('Error al obtener Terceros');
      })
    );
  }

  

  obtenerTerceroPorId(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}obtenerTercero/${id}`);
  }

  guardarTercero(tercero: any): Observable<any> {
    // Obtén el token de autenticación del servicio de validación de token
    const token = this.tokenValidationService.getToken();

    // Agrega el token al encabezado de la petición
    const headers = new HttpHeaders({ 'Authorization': `${token}` });

    // Realiza la petición HTTP para guardar el tercero
    return this.http.post<any>(`${this.baseUrl}guardarTercero`, tercero, { headers });
  }



  modificarTercero(tercero: any, id: string): Observable<any> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    return this.http.put<any>(`${this.baseUrl}modificarTercero/${id}`, tercero, { headers });
  }

  eliminarTercero(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}eliminarTercero/${id}`);
  }
}
