import { Component, OnInit } from '@angular/core';
import { SignInUpService } from "../../services/sign-in-up.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-data-user',
  templateUrl: './data-user.component.html',
  styleUrls: ['./data-user.component.scss']
})
export class DataUserComponent implements OnInit {
  userId: string = '';
  userData: any; // Aquí puedes definir una interfaz o clase para el tipo de datos del usuario

  constructor(
    private signInUpService: SignInUpService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Obtener el ID del usuario desde la ruta activada
    this.route.params.subscribe(params => {
      console.log('UserID recibido:', params['userId']);
      this.userId = params['userId']; // Asignar el userId obtenido de los parámetros de la ruta
      this.getUserData(); // Llamar a getUserData() para obtener los datos del usuario
    });
  }

  getUserData() {
    this.signInUpService.getUserById(this.userId).subscribe(
      (userData) => {
        this.userData = userData;
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
        // Manejar el error adecuadamente en tu aplicación
      }
    );
  }

  // Función para editar datos de usuario
  editUser(userId: string, newData: any) {
    this.signInUpService.editUser(userId, newData).subscribe(
      response => {
        console.log('Datos de usuario actualizados:', response);
        // Manejar la respuesta aquí
      },
      error => {
        console.error('Error al editar datos de usuario:', error);
        // Manejar errores aquí
      }
    );
  }

  submitForm() {
    // Llamar a la función para editar los datos del usuario
    this.editUser(this.userId, this.userData);
  }
}
