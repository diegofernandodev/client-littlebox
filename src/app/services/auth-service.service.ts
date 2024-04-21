import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  // constructor() { }

  private authTokenSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);
  public authToken$: Observable<string | null> =
    this.authTokenSubject.asObservable();

  setToken(token: string): void {
    this.authTokenSubject.next(token);
  }

  getToken(): Observable<string | null> {
    return this.authToken$;
  }

  // decodeToken(): any {
  //   const token = this.authTokenSubject.getValue();
  //   if (token) {
  //     return jwt_decode(token);
  //   }
  //   return null;
  // }

  // getTenantId(): string | null {
  //   const decodedToken = this.decodeToken();
  //   if (decodedToken) {
  //     return decodedToken.tenantId;
  //   }
  //   return null;
  // }
}
