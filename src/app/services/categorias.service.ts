import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Categoria } from '../interfaces/categoria';
import { Observable } from 'rxjs';
import { TokenValidationService } from '../services/token-validation-service.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  private myAppUrl: string;
  urlGet = 'obtenerTodasLasCategorias';
  urlDelete = 'eliminarCategoria';
  urlPost = 'guardarCategoria';
  urlPut = 'modificarCategoria';
  urlIpGet = 'obtenerCategoria';

  constructor(private http: HttpClient,private tokenValidationService: TokenValidationService) {
    this.myAppUrl = environment.apiUrl;
  }

  getListaCategorias(tenantId: string): Observable<Categoria[]> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    return this.http.get<Categoria[]>(`${this.myAppUrl}${this.urlGet}`, {
      params: { tenantId },
      headers: headers
    });
  }

  deleteCategoria(categoriaId: any, tenantId: string): Observable<void> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    return this.http.delete<void>(
      `${this.myAppUrl}${this.urlDelete}/${categoriaId}`,
      { params: { tenantId }, headers: headers },
    );
  }

  saveCategoria(categoria: Categoria, tenantId: string): Observable<void> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    return this.http.post<void>(`${this.myAppUrl}${this.urlPost}`, categoria, {
      params: { tenantId },
      headers: headers
    });
  }

  getCategoria(categoriaId: any, tenantId: string): Observable<Categoria> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    return this.http.get<Categoria>(
      `${this.myAppUrl}${this.urlIpGet}/${categoriaId}`,
      {
        params: { tenantId },
        headers: headers
      },
    );
  }

  updateTercero(
    categoriaId: any,
    nuevosDatos: Categoria,
    tenantId: string,
  ): Observable<void> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    return this.http.put<void>(
      `${this.myAppUrl}${this.urlPut}/${categoriaId}`,
      nuevosDatos,
      {
        params: { tenantId },
        headers: headers
      },
    );
  }
}
