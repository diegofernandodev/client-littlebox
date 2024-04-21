import { Component } from '@angular/core';
import { SignInUpService } from "../../services/sign-in-up.service";
import { TokenValidationService } from "../../services/token-validation-service.service"; // Importa el servicio de validación de token
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-super-usuario',
  templateUrl: './crear-super-usuario.component.html',
  styleUrl: './crear-super-usuario.component.scss'
})
export class CrearSuperUsuarioComponent {
  defaultRole: any;
  User = {
    username: '',
    identification: '',
    rol:'SuperUsuario',
    tenantId :'sin definir',
    email: '',
  }

  constructor(private userService: SignInUpService, private tokenService: TokenValidationService,  private router: Router) { } 
  
  registrar(): void {
    const formData = new FormData();

    formData.append('username', this.User.username);
    formData.append('identification', this.User.identification);
    formData.append('email', this.User.email);
    formData.append('rol', this.User.rol); 
    formData.append('tenantId', this.User.tenantId); 
    this.userService.registrarUsuario(formData).subscribe(response => {
      console.log('Usuario registrado:', response);
      this.router.navigate(['/employees']);

      Swal.fire('Éxito', 'SUperUsuario creado correctamente.', 'success');

    }, error => {
      console.error('Error al registrar:', error);
      Swal.fire('Error', 'Ocurrio un error al crear SuperUsuario. ¡Intente Nuevamente!', 'error');

    });
  }
}