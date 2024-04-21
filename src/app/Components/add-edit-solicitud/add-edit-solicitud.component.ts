import { Component, ViewChild, ElementRef } from '@angular/core';
import { Solicitud } from '../../interfaces/solicitud';
import { Categoria } from '../../interfaces/categoria';
import { Tercero } from '../../interfaces/tercero';
import { EstadoSolicitud } from '../../interfaces/estadoSolicitud';
import { SolicitudesService } from '../../services/solicitudes.service';
import { CategoriasService } from '../../services/categorias.service';
import { TercerosService } from '../../services/terceros.service';
import { EstadoSolicitudService } from '../../services/estado-solicitud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetAlertService } from '../../services/sweet-alert.service';
import { TokenValidationService } from '../../services/token-validation-service.service';
import { ModalService } from '../../services/modal.service';
import { FacturaService } from '../../services/factura.service';
import { TerceroModalComponent } from "../../Components/modals/tercero-modal/tercero-modal.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-edit-solicitud',
  templateUrl: './add-edit-solicitud.component.html',
  styleUrls: ['./add-edit-solicitud.component.scss'],
})
export class AddEditSolicitudComponent {

  @ViewChild('modalContent') modalContent: ElementRef<any> | null = null;
  pdfSrc: string = '';

  facturaFile: File | null = null;

  loading: boolean = false;
  id: string | null;
  operacion: string = 'Agregar ';
  categorias: Categoria[] = [];
  terceros: Tercero[] = [];
  estadoSolicitud: EstadoSolicitud[] = [];
  tenantId: string = '';

  showModal: boolean = false;
  isImage: boolean = false;
  isPdf: boolean = false;

  selectedCategoriaId: string = '';
  selectedTerceroId: string = '';
  facturaSeleccionada: File | null = null;

  fechaSinHora: string = '';

  extension: string = '';

  fechaFormateada: string = "";

  solicitud: any = {};

  formulario: Solicitud = {
    solicitudId: 0,
    tenantId: '',
    tercero: null,
    fecha: "",
    detalle: '',
    categoria: null,
    valor: 0,
    estado: { _id: '65d6a34bc04706dd1cdafd6c', nombre: 'pendiente' }, // Valor por defecto para el estado
    facturaUrl: '',
  };

  constructor(
    private solicitudesService: SolicitudesService,
    private categoriasService: CategoriasService,
    private tercerosService: TercerosService,
    private estadoSolicitudesService: EstadoSolicitudService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private tokenValidationService: TokenValidationService,
    private sweetAlertService: SweetAlertService,
    private modalService2: ModalService,
    private facturaService: FacturaService,
    private modalService: NgbModal
  ) {
    this.id = this.aRouter.snapshot.paramMap.get('id');
    const token = localStorage.getItem('token');
    // this.formulario.estado = this.estadoSolicitudesService.
    if (token) {
      const tenantId = this.tokenValidationService.getTenantIdFromToken();
      if (tenantId) {
        this.tenantId = tenantId;
      } else {
        console.error('No se pudo obtener el tenant ID del token');
      }
    } else {
      console.error('No se encontró ningún token en el almacenamiento local');
    }
    console.log(this.tenantId);

  }



  // onFileSelected(event: any) {
  //   console.log("Evento de cambio:", event);

  //   if (event.target.files.length === 0) {
  //     return;
  //   }

  //   const file = event.target.files[0];

  //   // Validar tipo de archivo
  //   const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf'];
  //   const extension = file.name.split('.').pop()?.toLowerCase();
  //   if (!allowedExtensions.includes(extension)) {
  //     console.error('El archivo seleccionado no es compatible.');
  //     this.sweetAlertService.showErrorAlert('El archivo seleccionado no es compatible. Solo se admiten archivos JPG, JPEG, PNG y PDF.');
  //     return;
  //   }

  //   this.facturaSeleccionada = file;

  //   // Obtener la URL del archivo
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.formulario.facturaUrl = reader.result as string;
  //   };
  //   reader.readAsDataURL(file);
  // if (this.facturaSeleccionada) {
  //    // Emitir la factura seleccionada al servicio modal
  //    this.modalService2.enviarFacturaSeleccionada(this.facturaSeleccionada);
  // }else{
  //   console.error('No se ha seleccionado ningun archivo.');
  // }

  // }

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0]; // Obtener el archivo seleccionado
    const fileReader = new FileReader();

    fileReader.onload = () => {
      // Cuando la lectura del archivo esté completa
      // Asignar el contenido del archivo (sin prefijo de ruta) a company.pdfRunt
      this.formulario.facturaUrl = fileReader.result as string; // Esto asume que pdfRunt es de tipo string
    };

    // Leer el contenido del archivo como una URL de datos (data URL)
    fileReader.readAsDataURL(selectedFile);
  }


  openFacturaModal() {
    console.log("Abriendo modal de factura");
    this.showModal = true;

    // Verificar si la facturaUrl está definida y no es nula
    if (!this.formulario.facturaUrl) {
      console.log("No se ha adjuntado ninguna factura");
      return;
    }

    // Verificar si se está creando una nueva solicitud o modificando una existente
    if (!this.id) {
      // Si no hay ID, significa que se está creando una nueva solicitud
      console.log("Ver factura adjunta al formulario");
      // Verificar si el archivo es una imagen o un PDF
      this.verificarTipoArchivo(this.formulario.facturaUrl);
    } else {
      // Si hay un ID, significa que se está modificando una solicitud existente
      console.log("Ver factura desde el servicio de factura");
      // Llamar al servicio de factura para obtener la factura desde la base de datos
      this.facturaService.obtenerFactura(this.id, this.tenantId).subscribe((response: Blob) => {
        // Convertir la respuesta en una URL válida para el visor
        const reader = new FileReader();
        reader.onload = () => {
          this.pdfSrc = reader.result as string;
        };
        reader.readAsDataURL(response);
      });
    }
  }

  verificarTipoArchivo(url: string | undefined) {
    console.log("estaes la url completa...", url);

    if (!url) {
      console.error('La URL de la factura es indefinida.');
      // Tratar el caso en el que la URL es indefinida
      return;
    }

    const extension = url.split('.').pop()?.toLowerCase()!; // <- Añadimos el operador de aserción !

    if (['jpg', 'jpeg', 'png'].includes(extension)) {
      this.isImage = true;
      this.isPdf = false;
      this.pdfSrc = url;
    } else if (extension === 'pdf') {
      this.isImage = false;
      this.isPdf = true;
      this.pdfSrc = url;
    } else {
      console.error('El tipo de archivo de la factura no es compatible.');
      this.sweetAlertService.showErrorAlert('El tipo de archivo de la factura no es compatible. Solo se admiten imágenes JPG, JPEG, PNG y archivos PDF.');
    }
  }



  closeFacturaModal() {
    this.showModal = false;
  }

  removeFactura(): void {
    // Verificar si se está creando una nueva solicitud o modificando una existente
    if (!this.id) {
      // Si no hay ID, significa que se está creando una nueva solicitud
      // Limpiar la URL de la factura adjunta
      this.formulario.facturaUrl = '';
      this.facturaFile = null;
      // Opcional: mostrar un mensaje de éxito al usuario
      this.sweetAlertService.showSuccessAlert('La factura se ha eliminado correctamente.');
    } else {
      // Si hay un ID, significa que se está modificando una solicitud existente
      // Llamar al servicio de factura para eliminar la factura de la base de datos
      this.facturaService.removeFactura(this.id, this.tenantId).subscribe(() => {
        // Limpiar la URL de la factura adjunta
        this.formulario.facturaUrl = '';
        this.facturaFile = null;
        // Mostrar un mensaje de éxito al usuario
        this.sweetAlertService.showSuccessAlert('La factura se ha eliminado correctamente.');
      });
    }
  }



  ngOnInit() {
    //this.tenantService.setTenant('123456789')
    this.getCategorias();
    this.getTerceros();
    if (this.id !== null) {
      this.operacion = 'Editar ';
      this.getSolicitud(this.id);
    } else {
      // Inicializa los controles ngModel
      this.selectedCategoriaId = '';
      this.selectedTerceroId = '';
    }


  }


  getCategorias(): void {
    this.categoriasService.getListaCategorias(this.tenantId).subscribe((Data: any) => {
      this.categorias = [...Data.data];
    });
  }

  getTerceros(): void {
    this.tercerosService.obtenerTerceros().subscribe((Data: any) => {
      this.terceros = [...Data.data];
    });
  }

  getSolicitud(id: any) {
    this.loading = true;
    this.solicitudesService.getSolicitud(id, this.tenantId).subscribe((response: any) => {
      this.loading = false;
      const data = response.data; // Extraer la propiedad 'data' de la respuesta
      data.fecha = this.formatoFecha(new Date(data.fecha));
    
      console.log('Datos obtenidos:', data);

      this.formulario = {
        solicitudId: data.solicitudId,
        tenantId: data.tenantId,
        fecha: data.fecha,
        detalle: data.detalle,
        valor: data.valor,
        categoria: data.categoria?.nombre,
        tercero: data.tercero?.nombreTercero,
        // Verificar si 'estado' es null antes de asignarlo al formulario
        estado: data.estado || { _id: '65d6a34bc04706dd1cdafd6c' }, // Asignar el valor por defecto si 'estado' es null
        facturaUrl: data.facturaUrl,
      };
      console.log('esta es la categoria', this.formulario.categoria, this.formulario.tercero);

      // Asignar valores por defecto a los controles ngModel
      this.selectedCategoriaId = data.categoria?._id || ''; // Asignar el ID de la categoría
      this.selectedTerceroId = data.tercero?._id || ''; // Asignar el ID del tercero
      console.log('Formulario después de la asignación:', this.formulario);
      console.log(this.selectedCategoriaId, this.selectedTerceroId);
    });
  }

  updateTercero(value: string): void {
    if (this.formulario.tercero) {
      this.formulario.tercero.nombreTercero = value;
    }
  }

  updateCategoria(value: string): void {
    if (this.formulario.categoria) {
      this.formulario.categoria.nombre = value;
    }
  }

  addSolicitud() {
    // this.loading = true;
    this.formulario.categoria = this.categorias.find((c) => c._id === this.selectedCategoriaId);
    this.formulario.tercero = this.terceros.find((t) => t._id === this.selectedTerceroId);
    if (this.id !== null) {
      this.sweetAlertService.showConfirmationDialog().then((result) => {
        if (result.isConfirmed) {
          this.realizarActualizacion();
        } else if (result.isDenied) {
          this.sweetAlertService.showErrorAlert('Los cambios no se guardaron');
          this.loading = false;
        } else {
          // Si hace clic en "Cancelar", redirige a la lista de solicitudes
          this.router.navigate(['/obtenerTodasLasSolicitudes']);
        }
      });
    } else {
      this.realizarInsercion();
    }
  }


  realizarActualizacion() {
    if (this.formulario.estado?.nombre !== "finalizado") {
      // Verifica si hay un archivo de factura seleccionado
      if (this.facturaSeleccionada) {

        // Verifica si this.id no es null antes de llamar a la función updateSolicitud
        if (this.id !== null) {
          console.log("datos nuevos del formulario: ", this.formulario);

          this.solicitudesService
            .updateSolicitud(
              this.id,
              this.formulario,
              this.tenantId,
              this.facturaSeleccionada
            )
            .subscribe(() => {
              this.formulario.fecha = this.formatoFecha(new Date(this.formulario.fecha))
              // Muestra una alerta de éxito
              const categoriaNombre = this.formulario.categoria?.nombre;
              // Asignar la fecha formateada de vuelta al formulario
              this.sweetAlertService.showSuccessAlert(
                `La solicitud ${categoriaNombre} fue actualizada con éxito`
              );
              // Redirige a la lista de solicitudes
              this.router.navigate(['/obtenerTodasLasSolicitudes']);
            });
        } else {
          console.error('El ID de la solicitud es null.');
        }
      } else {
        // Si no hay archivo de factura seleccionado, realiza la actualización sin la factura
        if (this.id !== null) {
          this.solicitudesService
            .updateSolicitud(
              this.id,
              this.formulario,
              this.tenantId,
              null // Pasar null como archivo de factura
            )
            .subscribe(() => {
              // Muestra una alerta de éxito
              const categoriaNombre = this.formulario.categoria?.nombre;
              this.sweetAlertService.showSuccessAlert(
                `La solicitud ${categoriaNombre} fue actualizada con éxito`
              );
              // Redirige a la lista de solicitudes
              this.router.navigate(['/obtenerTodasLasSolicitudes']);
            });
        } else {
          console.error('El ID de la solicitud es null.');
        }
      }
    } else {
      const alerta = `El estado de la solicitud es ${this.formulario.estado.nombre}, no puede ser modificada`;
      this.sweetAlertService.showErrorAlert(alerta)
    }
  }


  realizarInsercion() {

    // Asignar la fecha formateada de vuelta al formulario
    this.formulario.fecha = this.formatoFecha(new Date(this.formulario.fecha));

    console.log('este es el formulario con los datos en saveSolicitud= ', this.formulario, " esta es la url de la factura guardada: ", this.facturaSeleccionada);
    this.solicitudesService.savesolicitud(this.formulario).subscribe(() => {
      console.log("estos son los datos al intentar guardar el formulario: ", this.formulario, " esta es la url de la factura guardada: ", this.facturaSeleccionada);

      // Muestra la alerta de éxito con SweetAlert2
      this.sweetAlertService.showSuccessToast('Solicitud guardada exitosamente');

      // Espera 1500 milisegundos (1.5 segundos) antes de navegar a la lista de egresos
      setTimeout(() => {
        this.loading = false;
        this.router.navigate(['/obtenerTodasLasSolicitudes']);
      }, 1500);
    });
  }

  formatoFecha(fecha: Date): string {
    const fechaUTCString = fecha.toUTCString(); // Obtener la fecha en formato UTC
    const isoString = fecha.toISOString(); // Obtener la fecha en formato ISO 8601 (UTC)
    console.log('Fecha en formato UTC:', fechaUTCString);
    console.log('Fecha en formato ISO 8601 (UTC):', isoString);
    return isoString.substring(0, 10); // Recortar solo la parte de la fecha (YYYY-MM-DD)
  }
  

  openModal() {
    const modalRef = this.modalService.open(TerceroModalComponent); // Abre el modal
    //   modalRef.componentInstance.tercero = tercero; // Pasa el tercero seleccionado al modal
    // }
  }

}
