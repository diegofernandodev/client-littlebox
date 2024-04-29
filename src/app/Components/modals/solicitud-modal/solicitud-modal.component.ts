import { Component, Input, OnInit } from '@angular/core';
import { TokenValidationService } from '../../../services/token-validation-service.service';

@Component({
  selector: 'app-solicitud-modal',
  templateUrl: './solicitud-modal.component.html',
  styleUrl: './solicitud-modal.component.scss'
})
export class SolicitudModalComponent implements OnInit{
  @Input() solicitud: any;
  mostrarModal: boolean = false;
  soicitudSeleccionada: any;
  userData: any;

  constructor(private tokenValidationService: TokenValidationService,){}

  ngOnInit(){
    this.datosUserToken()
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.soicitudSeleccionada = null;
  }
  
  async verFactura(): Promise<void> {
    if (this.solicitud && this.solicitud.facturaUrl && this.solicitud.solicitudId) {
      // Llamar al método para abrir la factura en el navegador
      await this.openPdf(this.solicitud.facturaUrl, 'factura', this.solicitud.solicitudId);
    } else {
      // Manejar el caso donde no hay URL de factura definida en el egreso o no hay ID de egreso
      alert('Error al obtener la Factura');
    }
  }

  async openPdf(urlPdf: string, facturaUrl: string, solicitudId: string): Promise<void> {
    try {
        const response = await fetch(urlPdf, {
            method: 'GET'
        });
  
        if (response.ok) {
            // Obtener el contenido del encabezado Content-Disposition para obtener el nombre del archivo
            const contentDisposition = response.headers.get('Content-Disposition');
            let filename = 'documento.pdf'; // Nombre de archivo predeterminado
  
            if (contentDisposition) {
                const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                const matches = filenameRegex.exec(contentDisposition);
                if (matches != null && matches[1]) {
                    filename = matches[1].replace(/['"]/g, '');
                }
            }
  
            // Crear el nombre de archivo único combinando el ID del egreso con el nombre de la factura
            const uniqueFilename = `${solicitudId}_${facturaUrl}`;
  
            // Crear el Blob y descargar el archivo
            const blob = new Blob([await response.blob()], { type: 'application/pdf' });
            const downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(blob);
            downloadLink.download = uniqueFilename; // Utilizar el nombre único del archivo
            downloadLink.click();
            window.URL.revokeObjectURL(downloadLink.href);
        } else {
            // Manejar errores de la solicitud HTTP (por ejemplo, mostrar un mensaje de error)
        }
    } catch (error) {
        // Manejar errores de red u otros errores
    }
  }

  async datosUserToken(){
    try {
      const token = localStorage.getItem('token');
      if (token && await this.tokenValidationService.isValidToken(token)) {
        this.userData = await this.tokenValidationService.getUserData(token);
        console.log("Datos del token: ", this.userData.username);
        
      }
    } catch (error) {
      console.error('Error al verificar la autenticación:', error);
    }
  } 

}
