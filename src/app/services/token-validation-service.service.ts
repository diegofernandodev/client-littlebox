import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class TokenValidationService {
  constructor(private jwtHelper: JwtHelperService) {}

   // Método para obtener el token de autenticación del almacenamiento local
   getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Método para verificar si el token es válido
  public isValidToken(token: string): boolean {
    if (token) {
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }

  // Método para obtener los datos del usuario del token
  public getUserData(token: string): any {
    if (token) {
      return this.jwtHelper.decodeToken(token);
    }
    return null;
  }

  // Método para verificar si el usuario tiene el rol especificado
  public hasRole(token: string, rol: string): boolean {
    const userData = this.getUserData(token);
    return userData && userData.rol === rol;
  }

  public getTenantIdFromToken(): string | undefined {
    // Obtiene el tenantId del usuario actualmente logueado
    const token = localStorage.getItem('token');
    if (token !== null) {
      // Verifica si el token no es nulo
      const userData = this.getUserData(token);
      if (userData && userData.tenantId) {
        // Verifica si se pudo obtener el tenantId del token
        return userData.tenantId;
      } else {
        // Manejar el caso en el que no se pudo obtener el tenantId del token
        console.error('No se encontró el tenantId en el token');
        return undefined;
      }
    } else {
      // Manejar el caso en que no se encuentre ningún token en localStorage
      console.error('No se encontró ningún token en el almacenamiento local');
      return undefined;
    }
  }
  
}
