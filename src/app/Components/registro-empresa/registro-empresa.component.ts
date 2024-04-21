import { Component } from '@angular/core';
import { SignInUpService } from "../../services/sign-in-up.service";
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-empresa',
  templateUrl: './registro-empresa.component.html',
  styleUrls: ['./registro-empresa.component.scss']
})
export class RegistroEmpresaComponent {
  
  company = {
    nameCompany: '',
    telephoneCompany: '',
    tenantId:'',
    emailCompany: '',
    directionCompany:'',
    pdfRunt: '' ,
    fecha:new Date ()
  };

  User = {
    username: '',
    identification: '',
    telephone: '',
    email: '',
    tenantId: '',
    direction: '',
    rol:'Gerente'
  };

  sendingData: boolean = false; // Bandera para controlar si se está enviando datos

  constructor(private singService: SignInUpService, private route: ActivatedRoute, private router: Router) { }

  showErrorAlert(message: string) {
    Swal.fire({
      title: 'Ocurrió un error al enviar los datos. ',
      text: message,
      icon: 'error'
    });
  }

  sendAndRegistrar(): void {
    this.sendingData = true; // Establecer la bandera en true antes de comenzar el proceso de envío

    this.User.tenantId = this.company.tenantId;
    this.company.emailCompany = this.User.email;
    this.company.fecha = new Date();

    // Validar los campos antes de enviar los datos
    if (this.formIsValid()) {
      this.send();
      Swal.fire({
        title: "¡Felicidades!",
        text: "Tus datos fueron registrados correctamente, a asu correo llegara la respuesta.",
        icon: "success"
      });
      this.router.navigate(['/']);
      this.sendingData = false; // Establecer la bandera en false después de registrar el usuario
      this.registrar();
    } else {
      this.showErrorAlert(' ¡Intente Nuevamente!');
      this.sendingData = false; // Establecer la bandera en false si hay errores en el formulario
    }
  }

  send() {
    this.singService.createCompany(this.company).subscribe(
      response => {
        console.log('Datos enviados', response);
        // Swal.fire({
        //   title: "¡Felicidades!",
        //   text: "Tu registro se ha realizado exitosamente",
        //   icon: "success"
        // });
        this.sendingData = false; // Establecer la bandera en false después de enviar los datos
      },
      error => {
        console.log('Error al enviar Datos', error);
        // this.showErrorAlert('Ocurrió un error al registrar la empresa. ¡Intente Nuevamente!');
        this.sendingData = false; // Establecer la bandera en false si hay un error
      }
    );
  }

  registrar(): void {
    const formData = new FormData();

    formData.append('username', this.User.username);
    formData.append('telephone', this.User.telephone);
    formData.append('identification', this.User.identification);
    formData.append('email', this.User.email);
    formData.append('tenantId', this.User.tenantId);
    formData.append('direction', this.User.direction);
    formData.append('rol', this.User.rol);

    this.singService.registrarUsuario(formData).subscribe(response => {
      console.log('Usuario registrado:', response);
      // Swal.fire({
      //   title: "¡Felicidades!",
      //   text: "Tu registro se ha realizado exitosamente, Este pendiente a su correo",
      //   icon: "success"
      // });
      // this.router.navigate(['/']);
      // this.sendingData = false; // Establecer la bandera en false después de registrar el usuario
    }, error => {
      console.error('Error al registrar:', error);
      // this.showErrorAlert('Ocurrió un error al registrar la empresa. ¡Intente Nuevamente!');
      this.sendingData = false; // Establecer la bandera en false si hay un error
    });
  }

  formIsValid(): boolean {
    // Validar el formulario según tus criterios
    return !!(
      this.company.nameCompany &&
      this.company.telephoneCompany &&
      this.company.tenantId &&
      this.company.emailCompany &&
      this.company.directionCompany &&
      this.User.username &&
      this.User.identification &&
      this.User.telephone &&
      this.User.email &&
      this.User.tenantId &&
      this.User.direction
    );
  }

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = () => {
      this.company.pdfRunt = fileReader.result as string;
    };
    
    fileReader.readAsDataURL(selectedFile);
  }
}
