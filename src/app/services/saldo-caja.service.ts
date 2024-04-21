import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { TokenValidationService } from '../services/token-validation-service.service';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class SaldoCajaService {

  private myAppUrl: string;
  private urlGet = 'obtenerSaldoDeCaja';
  
  constructor(private http: HttpClient, private tokenValidationService: TokenValidationService,) {
    this.myAppUrl = environment.apiUrl;
  }

  getSaldoDeCaja(): Observable<any[]> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    return this.http.get<any[]>(`${this.myAppUrl}${this.urlGet}`, {
      headers: headers
    });
  }
}
