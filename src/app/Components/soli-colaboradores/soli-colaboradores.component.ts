import { Component, OnInit } from '@angular/core';
import { SignInUpService } from "../../services/sign-in-up.service";
import Swal from 'sweetalert2'; // Importa SweetAlert2
import { Observable } from 'rxjs';

@Component({
  selector: 'app-soli-colaboradores',
  templateUrl: './soli-colaboradores.component.html',
  styleUrl: './soli-colaboradores.component.scss'
})
export class SoliColaboradoresComponent implements OnInit {
  usuarios: any[] = [];

  constructor(private signInUpService: SignInUpService) { }

  ngOnInit(): void {
    this.obtenerUsuariosPorTenantId();
  }

  obtenerUsuariosPorTenantId() {
    this.signInUpService.getUsersByTenantId().subscribe(
      (usuarios: any[]) => {
        // Filtrar usuarios con status "pendiente"
        this.usuarios = usuarios.filter(usuario => usuario.status === 'pendiente');
        console.log('Estos son los usuarios pendientes:', this.usuarios);
      },
      (error) => {
        // Manejar el error con SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al obtener usuarios: ' + error.message // Puedes mostrar el mensaje de error
        });
      }
    );
  }

  // Método para activar un usuario
  activarUsuario(userId: string) {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se proporcionó un token válido.'
      });
      return;
    }
    this.signInUpService.activeUser(userId, token).subscribe(
      response => {
        console.log('Usuario activado:', response);
        // Actualizar la lista de usuarios después de activar uno
        this.obtenerUsuariosPorTenantId();
        Swal.fire('¡Usuario activado!', '', 'success'); // Muestra una alerta de éxito con SweetAlert2
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al activar el usuario: '
        });
      }
    );
  }

  // Método para denegar un usuario
  deniedUsuario(userId: string) {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se proporcionó un token válido.'
      });
      return;
    }
    this.signInUpService.denyUser(userId, token).subscribe(
      response => {
        console.log('Usuario Denegado:', response);
        // Actualizar la lista de usuarios después de inactivar uno
        this.obtenerUsuariosPorTenantId();
        Swal.fire('¡Usuario denegado!', '', 'success'); // Muestra una alerta de éxito con SweetAlert2
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al denegar el usuario: '
        });
      }
    );
  }
}
