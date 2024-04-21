import { Injectable, EventEmitter  } from '@angular/core';
import { HttpClient, HttpHeaders , HttpResponse } from '@angular/common/http';
import { Observable, Subject  } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators'; 
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { TokenValidationService } from "../services/token-validation-service.service";
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignInUpService {
  private baseUrl: string;
  loginStatusChanged = new EventEmitter<boolean>();

  mostrarNavbar = new BehaviorSubject<boolean>(true);

  
  constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService, private router: Router, private tokenValidationService: TokenValidationService) {
    this.baseUrl = environment.apiUrl;
  }

  registrarUsuario(formData: FormData, ): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}registrer`, formData);
  }

  login(formValue: any) {
    const url = `${this.baseUrl}iniciarSesion`;
    return this.httpClient.post<any>(url, formValue).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('userId', response.userId);
          localStorage.setItem('token', response.token);
          
          // Verificar si es el primer inicio de sesión
          if (response.firstLogin) {
              this.router.navigate(['/changePassword', { userId: response.userId }]);
          } else {
            // Emitir el evento solo si no es el primer inicio de sesión
            this.loginStatusChanged.emit(true);
          }
        }
      })
    );
  }
  

  //cerrar sesion
  logout() {
    // Eliminar el token del almacenamiento local al cerrar sesión
    localStorage.removeItem('token');
    this.loginStatusChanged.emit(false);
  }
  

  getUsers(): Observable<any[]> {
    const url=`${this.baseUrl}getUsers`;
    return this.httpClient.get<any[]>(url)
  }

 
  

  getUserId(): string | null {
    // Obtener el userId del localStorage
    return localStorage.getItem('userId');
  }
  //rol por id
  getRoleName(roleId: string): Observable<string> {
    const url = `${this.baseUrl}getRolName/${roleId}`; // Endpoint para obtener el nombre del rol por ID
    return this.httpClient.get<string>(url);
  }

  createCompany(formValue: any): Observable<any> {
    const url = `${this.baseUrl}saveNewCompany`;
    return this.httpClient.post<any>(url, formValue, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  listCompanys(): Observable<any[]> {
    const url = `${this.baseUrl}getAllCompanies`;

    return this.httpClient.get<any[]>(url);
  }

  listRoles(): Observable<any[]> {
    const url = `${this.baseUrl}getRoles`;
    return this.httpClient.get<any[]>(url);

  }
 // Método para obtener el rol del usuario desde el token
 public getUserRole(): string | null {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken.rol; // Suponiendo que el token tiene un campo 'role' que contiene el rol del usuario
  }
  return null;
}

public getUserTenant(): string | null {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken.tenantId; 
  }
  return null;
}
// Método para cambiar la contraseña
changePassword(userId: string, newPassword: string): Observable<any> {
  console.log('UserId:', userId);
  console.log('NewPassword:', newPassword);
  
  const url = `${this.baseUrl}changePassword/${userId}`;
  const body = { newPassword: newPassword };
  return this.httpClient.put<any>(url, body);

}

enviarCodigoRestablecimiento(email: string) {
  return this.httpClient.post<any>(`${this.baseUrl}solicitar-restablecimiento`, { email });
}

resetPassword(email: string, codigo: string, nuevaContraseña: string) {
  return this.httpClient.post<any>(`${this.baseUrl}restablecer-password`, { email, codigo, nuevaContraseña });
}



getUsersByTenantId(): Observable<any[]> {
  const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
  
  // Verificar si token no es nulo antes de llamar a getUserData
  if (!token) {
    console.error('No se proporcionó un token válido.');
    return throwError('No se proporcionó un token válido.');
  }
  
  const userTenant = this.tokenValidationService.getUserData(token);
  
  // Verificar si userTenant.tenantId es una cadena antes de asignarlo a tenantId
  const tenantId = typeof userTenant.tenantId === 'string' ? userTenant.tenantId : '';
  
  const url = `${this.baseUrl}getUsers/${tenantId}`;
  
  // Configurar las cabeceras con el token de autorización
  const headers = new HttpHeaders({
    'Authorization': `${token}`
  });

  // Realizar la solicitud HTTP con las cabeceras configuradas
  return this.httpClient.get<any[]>(url, { headers }).pipe(
    catchError(error => {
      console.error('Error al obtener usuarios:', error);
      return throwError('Error al obtener usuarios');
    })
  );
}


// Método para activar un usuario
activeUser(userId: string, token: string): Observable<any> {
  const headers = new HttpHeaders().set('Authorization', `${token}`);
  return this.httpClient.put<any>(`${this.baseUrl}userActive/${userId}`, null, { headers });
}

// Método para inactivar un usuario
inactiveUser(userId: string, token: string): Observable<any> {
  const headers = new HttpHeaders().set('Authorization', `${token}`);
  return this.httpClient.put<any>(`${this.baseUrl}userInactive/${userId}`, null, { headers });
}

//denegar Usuario
denyUser(userId: string, token: string): Observable<any> {
  const headers = new HttpHeaders().set('Authorization', `${token}`);
  return this.httpClient.put<any>(`${this.baseUrl}userDeny/${userId}`, null, { headers });
}

getUserById(userId: string): Observable<any> {
  console.log(userId)
  return this.httpClient.get<any>(`${this.baseUrl}getId/${userId}`);
}

getUserSuperU(token: string): Observable<any> {
  const headers = new HttpHeaders().set('Authorization', `${token}`);

  return this.httpClient.get<any>(`${this.baseUrl}getUsersSuperU`, {headers});
}


// Función para editar datos de usuario
editUser(userId: string, newData: any): Observable<any> {
  const url = `${this.baseUrl}editUser/${userId}`; // Endpoint para editar datos de usuario
  return this.httpClient.put<any>(url, newData);
}

}
