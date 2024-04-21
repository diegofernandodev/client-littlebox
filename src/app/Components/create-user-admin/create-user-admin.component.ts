import { Component } from '@angular/core';
import { SignInUpService } from "../../services/sign-in-up.service";
import { TokenValidationService } from "../../services/token-validation-service.service"; // Importa el servicio de validación de token
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-user-admin',
  templateUrl: './create-user-admin.component.html',
  styleUrl: './create-user-admin.component.scss'
})
export class CreateUserAdminComponent {

  defaultRole: any;
  selectedCompanys: string = '';
  companys: any =[];
  User = {
    username: '',
    identification: '',
    rol:'Administrador',
    email: '',
    tenantId: '',
    direction: '',
    telephone: ''
  }
 
  constructor(private userService: SignInUpService, private tokenService: TokenValidationService,  private router: Router) { } 
  
  registrar(): void {
    const formData = new FormData();

    formData.append('username', this.User.username);
    formData.append('identification', this.User.identification);
    formData.append('email', this.User.email);
    formData.append('direction', this.User.direction);
    formData.append('telephone', this.User.telephone)

    // Obtiene el tenantId del usuario actualmente logueado
    const token = localStorage.getItem('token');
    if (token !== null) { // Verifica si el token no es nulo
      const tenantId = this.tokenService.getUserData(token).tenantId;
      this.User.tenantId = tenantId;
    } else {
      // Manejar el caso en que no se encuentre ningún token en localStorage
      console.error('No se encontró ningún token en el almacenamiento local');
      return; // Sale de la función registrar() para evitar errores adicionales
    }

    formData.append('tenantId', this.User.tenantId);
    formData.append('rol', this.User.rol); 

    this.userService.registrarUsuario(formData).subscribe(response => {
      console.log('Usuario registrado:', response);
      this.router.navigate(['/employees']);

      Swal.fire('Éxito', 'usuario creado correctamente.', 'success');

    }, error => {
      console.error('Error al registrar:', error);
      Swal.fire('Error', 'Ocurrio un error al crear Usuario. ¡Intente Nuevamente!', 'error');

    });
  }
}