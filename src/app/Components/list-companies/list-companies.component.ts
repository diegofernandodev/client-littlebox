import { Component, OnInit, ViewChild } from '@angular/core';
import{CompanyService} from '../../services/company.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  ModalCompanySolicitudComponent} from "../modal-company-solicitud/modal-company-solicitud.component";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';


@Component({
  selector: 'app-list-companies',
  templateUrl: './list-companies.component.html',
  styleUrl: './list-companies.component.scss'
})
export class ListCompaniesComponent  implements OnInit {

  @ViewChild('dt1') dt1!: Table;

  loading: boolean = false;

  active: boolean = false

  companies: any = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalCompanies: number = 0
  constructor(private companyService: CompanyService, private modalService: NgbModal,  private router: Router
    ) { }

  ngOnInit(): void {
    this.loadCompanies();
  }

  getPages(): number[] {
    const totalPages = Math.ceil(this.totalCompanies / this.itemsPerPage);
    return Array(totalPages).fill(0).map((x, i) => i + 1);
  }
  loadCompanies() {
    this.companyService.listCompanySuperU().subscribe(companies => {
      this.companies = companies;
      this.totalCompanies= companies.length
    });
  }

  approveCompany(companyId: string) {
    this.companyService.approveCompany(companyId).subscribe(() => {
      Swal.fire('¡Empresa Aprobada Exitosamente!', 'Los cambios se han guardado correctamente.', 'success');
      window.location.reload();  // Recargar la página actual    
    }, error =>{
      Swal.fire('¡Error al Aprobar Empresa!', 'Los cambios  no se han guardado correctamente.', 'error');
    });
  }
  

  denyCompany(companyId: string) {
    this.companyService.denyCompany(companyId).subscribe(() => {
      this.active = true
      Swal.fire('¡Cambios guardados!', 'Los cambios se han guardado correctamente.', 'success');
    },
    error=>{
      Swal.fire('Error al Denegar Empresa',  'Los cambios no se han guardado correctamente.' ,'error');
    });
  }

  async openPdf(urlPdf: string, companyName: string): Promise<void> {
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

            // Agregar el nombre de la empresa al nombre del archivo
            const uniqueFilename = `${companyName}_${filename}`;

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

verDetalle(company: any) {
  const modalRef = this.modalService.open(ModalCompanySolicitudComponent);
  modalRef.componentInstance.company = company;
}

clear(table: Table) {
  table.clear();
}

filterData(event: any) {
  if (event && event.target && this.dt1) {
    this.dt1.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
  
}