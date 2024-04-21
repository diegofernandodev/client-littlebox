import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
// import { ObjectId } from 'mongoose';
import { Solicitud } from '../interfaces/solicitud';
import { TokenValidationService } from '../services/token-validation-service.service';

@Injectable({
  providedIn: 'root',
})
export class SolicitudesService {
  private myAppUrl: string;
  private urlGet = 'obtenerTodasLasSolicitudes';
  private urlDelete = 'eliminarSolicitud';
  private urlPost = 'guardarSolicitud';
  private urlPut = 'modificarSolicitud';
  private urlPutEstado = 'modificarEstadoSolicitud';
  private urlIpGet = 'obtenerSolicitud';
  constructor(private http: HttpClient, private tokenValidationService: TokenValidationService,) {
    this.myAppUrl = environment.apiUrl;
  }

  // getListaSolicitudes(tenantId: string): Observable<Solicitud[]> {
  //   const token = this.tokenValidationService.getToken();
  //   const headers = new HttpHeaders({ 'Authorization': `${token}` });
  //   return this.http.get<Solicitud[]>(`${this.myAppUrl}${this.urlGet}`, {
  //     params: { tenantId },
  //     headers: headers
  //   });
  // }

  getListaSolicitudes(tenantId: string, fechaInicio: any, fechaFin: any, documento: string): Observable<Solicitud[]> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    const params = {
      tenantId,
      fechaInicio,
      fechaFin,
      documento: documento
    };
    return this.http.get<Solicitud[]>(`${this.myAppUrl}${this.urlGet}`, {
      params,
      headers: headers
    });
  }


  deleteSolicitud(solicitudId: any, tenantId: string): Observable<void> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    return this.http.delete<void>(
      `${this.myAppUrl}${this.urlDelete}/${solicitudId}`,
      {
        params: { tenantId },
        headers: headers
      },
    );
  }


  // savesolicitud(
  //   solicitud: Solicitud,
  //   tenantId: string,
  //   file: File | null
  // ): Observable<void> {

  //   const fechaDate = new Date(solicitud.fecha);

  //   const formData: FormData = new FormData();
  //   formData.append('solicitudId', solicitud.solicitudId.toString()); 
  //   formData.append('tercero', solicitud.tercero?._id);
  //   formData.append('fecha', fechaDate.toISOString());
  //   formData.append('detalle', solicitud.detalle);
  //   formData.append('valor', solicitud.valor.toString()); // Convertir valor a cadena
  //   formData.append('categoria', solicitud.categoria?._id);
  //   formData.append('estado', solicitud.estado?._id);
  //   formData.append('tenantId', tenantId);
  //   if (file) { // Verifica si file no es nulo antes de agregarlo al FormData
  //     formData.append('facturaUrl', file, file.name);
  //   }

  //   const token = this.tokenValidationService.getToken();
  //   const headers = new HttpHeaders({ 'Authorization': `${token}` });
  
  //   return this.http.post<void>(
  //     `${this.myAppUrl}${this.urlPost}`,
  //     formData,
  //     { headers: headers }
  //   );
  // }

  savesolicitud(solicitud: any): Observable<any> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });

    return this.http.post<any>(`${this.myAppUrl}${this.urlPost}`, solicitud, { headers });
  }
  

  getSolicitud(solicitudId: string, tenantId: string): Observable<Solicitud> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    return this.http.get<Solicitud>(
      `${this.myAppUrl}${this.urlIpGet}/${solicitudId}`,
      { params: { tenantId },
      headers: headers
    },
    );
  }

    

  updateSolicitud(
    Id: any,
    nuevosDatos: Solicitud,
    tenantId: string,
    archivo: File | null // Se cambió "file" a "archivo" para claridad en español
  ): Observable<Solicitud> {
    const formData = new FormData();
  
    formData.append('solicitudId', nuevosDatos.solicitudId.toString()); 
    formData.append('tercero', nuevosDatos.tercero?._id);
    formData.append('fecha', nuevosDatos.fecha);
    formData.append('detalle', nuevosDatos.detalle);
    formData.append('valor', nuevosDatos.valor.toString()); // Convertir valor a cadena
    formData.append('categoria', nuevosDatos.categoria?._id);
    formData.append('estado', nuevosDatos.estado?._id);
    formData.append('tenantId', tenantId);
    if (archivo) {
      formData.append('facturaUrl', archivo, archivo.name); // Incluir nombre del archivo
    } else {
      // Opcional: Incluir lógica para mantener la 'facturaUrl' existente si no se proporciona un archivo
      // formData.append('facturaUrl', ''); // Ejemplo para enviar una cadena vacía
    }
  
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
  
    return this.http.put<Solicitud>(
      `${this.myAppUrl}${this.urlPut}/${Id}`,
      formData,
      { headers:headers }
    );
  }
  
  
  

  updateEstadoSolicitud(
    solicitudesId: any,
    nuevoEstadoId: any,
    tenantId: string,
  ): Observable<void> {
    console.log("este es el nuevo estado del servico:..",nuevoEstadoId);
    
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    return this.http.put<void>(
      `${this.myAppUrl}${this.urlPutEstado}/${solicitudesId}`,
      null,
      { params: { tenantId, nuevoEstadoId },headers: headers },
    );
  }

   
}
