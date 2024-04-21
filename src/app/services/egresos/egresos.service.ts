import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Egreso } from '../../interfaces/egreso';

@Injectable({
  providedIn: 'root',
})
export class EgresosService {
  private myAppUrl: string;
  private urlGet = 'obtenerTodasLasSolicitudes';
  private urlDelete = 'eliminarSolicitud';
  private urlPost = 'guardarSolicitud';
  private urlPut = 'modificarSolicitud';
  private urlPutEstado = 'modificarEstadoSolicitud';
  private urlIpGet = 'obtenerSolicitud';
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.apiUrl;
  }
}
