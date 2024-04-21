import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private facturaSeleccionadaSource = new Subject<File>();
  facturaSeleccionada$ = this.facturaSeleccionadaSource.asObservable();

  constructor() { }

  enviarFacturaSeleccionada(factura: File) {
    this.facturaSeleccionadaSource.next(factura);
  }
}
