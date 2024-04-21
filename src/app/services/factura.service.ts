import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { TokenValidationService } from '../services/token-validation-service.service';

@Injectable({
  providedIn: 'root',
})
export class FacturaService {
  private myAppUrl: string;
  private urlPost = 'guardarFactura';
  private urlGet = 'obtenerFactura';
  private urlDownload = 'descargarFactura';
  private urlRemove = 'eliminarFactura'; // Agrega la URL para eliminar factura

  constructor(private http: HttpClient, private tokenValidationService: TokenValidationService) {
    this.myAppUrl = environment.apiUrl;
  }

  guardarFactura(factura: FormData, tenantId: string): Observable<void> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });

    return this.http.post<void>(
      `${this.myAppUrl}${this.urlPost}`,
      factura,
      { 
        params: { tenantId },
        headers: headers 
      }
    );
  }

  obtenerFactura(facturaId: string, tenantId: string): Observable<Blob> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });

    return this.http.get(
      `${this.myAppUrl}${this.urlGet}/${facturaId}`,
      { 
        params: { tenantId },
        headers: headers,
        responseType: 'blob' 
      }
    );
  }

  descargarFactura(facturaUrl: string, tenantId: string): Observable<Blob> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });

    return this.http.get(
      `${this.myAppUrl}${this.urlDownload}`,
      { 
        params: { facturaUrl, tenantId },
        headers: headers,
        responseType: 'blob' 
      }
    );
  }

  // Método para eliminar factura
  removeFactura(facturaId: string, tenantId: string): Observable<void> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });

    return this.http.delete<void>(
      `${this.myAppUrl}${this.urlRemove}/${facturaId}`,
      { 
        params: { tenantId },
        headers: headers
      }
    );
  }
}
