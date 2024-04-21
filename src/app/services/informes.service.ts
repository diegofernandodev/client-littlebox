import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenValidationService } from "../services/token-validation-service.service";
import { environment } from '../../environments/environment';

@Injectable({
providedIn: 'root'
})
export class InformesService {

  private baseUrl = ''; // Reemplaza esta URL con la URL de tu backend

constructor(private http: HttpClient, private tokenValidationService:TokenValidationService) { 
  this.baseUrl = environment.apiUrl;
}


  obtenerMovimientoCaja(datos: any): Observable<any> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders().set('Authorization', `${token}`);
  
    return this.http.post(`${this.baseUrl}obtenerMovimientoCaja`, datos, {headers});
  }

  getGastoRealMesActual(tenantId: string): Observable<any[]> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.http.get<any[]>(`${this.baseUrl}gastoActual`, { headers });
  }

  getTerceros(tenantId: string): Observable<any[]> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.http.get<any[]>(`${this.baseUrl}tercerosMasUtilizados`, { headers });
  }

  getCategorias(tenantId: string): Observable<any[]> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.http.get<any[]>(`${this.baseUrl}categoriasMasUtilizados`, { headers });
  }

}

