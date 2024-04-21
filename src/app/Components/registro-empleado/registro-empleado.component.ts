import { Component } from '@angular/core';
import { SignInUpService } from "../../services/sign-in-up.service";
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-empleado',
  templateUrl: './registro-empleado.component.html',
  styleUrls: ['./registro-empleado.component.scss']
})
export class RegistroEmpleadoComponent {
  selectedCompany: any; // Variable para almacenar la empresa seleccionada
  companys: any[] = [];
  User = {
    username: '',
    identification: '',
    telephone: '',
    email: '',
    tenantId: '', // Almacenará el tenantId de la empresa seleccionada
    direction: '',
    rol: 'Colaborador'
  }

  constructor(private userService: SignInUpService, private route: ActivatedRoute, private router: Router) { }

  registrar(): void {
    const formData = new FormData();

    formData.append('username', this.User.username);
    formData.append('telephone', this.User.telephone);
    formData.append('identification', this.User.identification);
    formData.append('email', this.User.email);
    formData.append('tenantId', this.User.tenantId);
    formData.append('direction', this.User.direction);
    formData.append('rol', this.User.rol);

    this.userService.registrarUsuario(formData).subscribe(response => {
      this.router.navigate(['/']);
      Swal.fire('Éxito', 'Datos de Usuario registrados correctamente.', 'success');
    }, error => {
      Swal.fire('Error', ' Ocurrio un error al enviar los datos. ¡Intente Nuevamente!', 'error');
    });
  }

  // Después de inicializar tu componente, establece selectedCompany en null.
ngOnInit(): void {
  this.selectedCompany = null;
  this.listCompanys();
}


  listCompanys(): void {
    this.userService.listCompanys().subscribe(
      (data) => {
        this.companys = data;
        // if (this.companys.length > 0) {
        //   // Establece la primera empresa como seleccionada por defecto
        //   this.selectedCompany = this.companys[0];
        //   this.User.tenantId = this.selectedCompany.tenantId;
        // }
      },
      (error) => {
        console.error('Error al obtener empresas', error);
      }
    );
  }

  onCompanySelect(): void {
    // Cuando se selecciona una empresa, actualiza el tenantId en User
    this.User.tenantId = this.selectedCompany.tenantId;
  }
}
