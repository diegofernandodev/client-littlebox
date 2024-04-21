// notification.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { TokenValidationService } from "../services/token-validation-service.service";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  baseUrl = ''; // Cambia esta URL por la base de tu API

  constructor(private http: HttpClient, private tokenService:TokenValidationService  ) {
    this.baseUrl = environment.apiUrl;
  }

  

  getNotificationsByUserId(): Observable<any[]> {
    // Obtenemos el token
    const token = this.tokenService.getToken();
    if (!token) {
      console.error('No se encontró ningún token en el almacenamiento local');
      return of([]); // Retorna un Observable vacío
    }

    // Obtenemos el userId del token
    const userId = this.tokenService.getUserData(token)?.userId;
    if (!userId) {
      console.error('No se pudo obtener el userId del token');
      return of([]); // Retorna un Observable vacío
    }

    // Utilizamos el userId para hacer la solicitud HTTP y obtener las notificaciones
    return this.http.get<any[]>(`${this.baseUrl}notifications/${userId}`);
  }


  markNotificationAsRead(notificationId: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}notifications/${notificationId}`, {});
  }
  

  
}
