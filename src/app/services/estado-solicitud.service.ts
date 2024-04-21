import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { EstadoSolicitud } from '../interfaces/estadoSolicitud';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EstadoSolicitudService {
  private myAppUrl: string;
  urlGet = 'obtenerEstadosSolicitudes';
  urlDelete = 'eliminarCategoria';
  urlPost = 'guardarCategoria';
  urlPut = 'modificarCategoria';
  urlIpGet = 'obtenerCategoria';

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.apiUrl;
  }

  getListaEstadoSolicitudes(): Observable<EstadoSolicitud[]> {
    return this.http.get<EstadoSolicitud[]>(`${this.myAppUrl}${this.urlGet}`);
  }

  // deleteEstadoSolicitud(
  //   estadoSolicitudId: any,
  //   tenantId: string,
  // ): Observable<void> {
  //   return this.http.delete<void>(
  //     `${this.myAppUrl}${this.urlDelete}/${estadoSolicitudId}`,
  //     { params: { tenantId } },
  //   );
  // }

  // saveEstadoSolicitud(
  //   estadoSolicitud: EstadoSolicitud,
  //   tenantId: string,
  // ): Observable<void> {
  //   return this.http.post<void>(
  //     `${this.myAppUrl}${this.urlPost}`,
  //     estadoSolicitud,
  //     {
  //       params: { tenantId },
  //     },
  //   );
  // }

  // getEstadoSolicitud(
  //   estadoSolicitudId: any,
  //   tenantId: string,
  // ): Observable<EstadoSolicitud> {
  //   return this.http.get<EstadoSolicitud>(
  //     `${this.myAppUrl}${this.urlIpGet}/${estadoSolicitudId}`,
  //     {
  //       params: { tenantId },
  //     },
  //   );
  // }

  // updateTercero(
  //   estadoSolicitudId: any,
  //   nuevosDatos: EstadoSolicitud,
  //   tenantId: string,
  // ): Observable<void> {
  //   return this.http.put<void>(
  //     `${this.myAppUrl}${this.urlPut}/${estadoSolicitudId}`,
  //     nuevosDatos,
  //     {
  //       params: { tenantId },
  //     },
  //   );
  // }
}
