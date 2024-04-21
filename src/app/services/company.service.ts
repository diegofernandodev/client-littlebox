import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpResponse } from '@angular/common/http';
import { Observable, Subject  } from 'rxjs';
import { TokenValidationService } from '../services/token-validation-service.service'; // Asegúrate de importar el servicio de verificación de token
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  baseUrl = '';

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenValidationService // Inyecta el servicio de verificación de token
  ) { 
    this.baseUrl = environment.apiUrl;
  }

  private getHeaders(): HttpHeaders {
    const token = this.tokenService.getToken(); // Obtén el token de autenticación
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}` // Agrega el token al encabezado de autorización
    });
  }

  listCompanySuperU(): Observable<any[]> {
    const url = `${this.baseUrl}GetCompaniesSuperU`;
    return this.httpClient.get<any[]>(url, { headers: this.getHeaders() }); // Usa los encabezados en la solicitud
  }

  approveCompany(companyId: string): Observable<any> {
    const url = `${this.baseUrl}companiesAproved/${companyId}`;
    return this.httpClient.put<any>(url, {}, { headers: this.getHeaders() });
  }

  activedCompany(companyId: string): Observable<any> {
    const url = `${this.baseUrl}companiesActived/${companyId}`;
    return this.httpClient.put<any>(url, {}, { headers: this.getHeaders() });
  }

  denyCompany(companyId: string): Observable<any> {
    const url = `${this.baseUrl}companiesDeny/${companyId}`;
    return this.httpClient.put<any>(url, {}, { headers: this.getHeaders() });
  }

  listCompanies(): Observable<any[]> {
    const url = `${this.baseUrl}getAllCompanies`;
    return this.httpClient.get<any[]>(url, { headers: this.getHeaders() });
  }

  disableCompany(companyId: string): Observable<any> {
    const url = `${this.baseUrl}disable/${companyId}`;
    return this.httpClient.put<any>(url, {}, { headers: this.getHeaders() });
  }

  listTodasCompanies(): Observable<any[]> {
    const url = `${this.baseUrl}getAllCompanis`;
    return this.httpClient.get<any[]>(url, { headers: this.getHeaders() });
  }
}

