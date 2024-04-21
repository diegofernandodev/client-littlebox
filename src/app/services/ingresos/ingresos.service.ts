import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
// import { ObjectId } from 'mongoose';
import { Ingreso } from '../../interfaces/ingreso';
import { TokenValidationService } from '../../services/token-validation-service.service';

@Injectable({
  providedIn: 'root'
})
export class IngresosService {

  private myAppUrl: string;
  private urlGet = 'obtenerTodosLosIngresos';
  private urlDelete = 'eliminarIngreso';
  private urlPost = 'guardarIngreso';
  private urlPut = 'modificarIngreso';
  private urlIpGet = 'obtenerIngreso';
  private urlGetSaldoInicial = 'SaldoInicialCaja';
  constructor(private http: HttpClient, private tokenValidationService: TokenValidationService,) {
    this.myAppUrl = environment.apiUrl;
  }
  getListaIngresos(tenantId: string, fechaInicio:any, fechaFin:any): Observable<Ingreso[]> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    const params = {
      tenantId,
      fechaInicio,
      fechaFin,
    };
    return this.http.get<Ingreso[]>(`${this.myAppUrl}${this.urlGet}`, {
      params,
      headers: headers
    });
  }

  getSaldoInicialCaja(): Observable<any[]> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    return this.http.get<any[]>(`${this.myAppUrl}${this.urlGetSaldoInicial}`, {
      headers: headers
    });
  }



  deleteIngreso(Id: any, tenantId: string): Observable<void> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    return this.http.delete<void>(
      `${this.myAppUrl}${this.urlDelete}/${Id}`,
      {
        params: { tenantId },
        headers: headers
      },
    );
  }

  
  saveIngreso(
    ingreso: Ingreso,
    tenantId: string,
  ): Observable<void> {
    console.log
    ("datos a enviar  en el servicio..",ingreso,tenantId)
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
  
    return this.http.post<void>(
      `${this.myAppUrl}${this.urlPost}`,
      { ingreso: ingreso, tenantId: tenantId },
      { headers: headers }
    );
  }
  

  getIngreso(Id: string, tenantId: string): Observable<Ingreso> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    return this.http.get<Ingreso>(
      `${this.myAppUrl}${this.urlIpGet}/${Id}`,
      { params: { tenantId },
      headers: headers
    },
    );
  }

    

  updateIngreso(
    Id: any,
    nuevosDatos: Ingreso,
    tenantId: string,
  ): Observable<Ingreso> {
    // Convertir la fecha a una cadena en formato ISO
    nuevosDatos.fecha = new Date(nuevosDatos.fecha).toISOString();
  
    // Agregar el tenantId al objeto de datos
    nuevosDatos.tenantId = tenantId;
  
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
  
    return this.http.put<Ingreso>(
      `${this.myAppUrl}${this.urlPut}/${Id}`,
      nuevosDatos,
      { headers: headers }
    );
  }
  
}
