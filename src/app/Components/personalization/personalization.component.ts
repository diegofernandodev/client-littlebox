import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SignInUpService } from "../../services/sign-in-up.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-personalization',
  templateUrl: './personalization.component.html',
  styleUrls: ['./personalization.component.scss'] 
})
export class PersonalizationComponent implements OnInit {
  userId: string = '';

  constructor(private router: Router, private signInUpService: SignInUpService) { }

  ngOnInit(): void {
    // Obtener el userId cuando se inicializa el componente
    const userId = this.signInUpService.getUserId();
    if (userId !== null) {
      this.userId = userId;
    } else {
      // Aquí puedes manejar el caso en el que userId sea null
      console.error('El userId no está disponible');
    }
  }
  
  
 navigateToChangePassword(): void {
    if (this.userId) {
      // Navegar a la ruta '/changePassword' con el userId como parámetro
      this.router.navigate(['/changePassword', this.userId]);
    } else {
      console.error('No se puede navegar a la página de cambio de contraseña sin un userId válido.');
      // Aquí puedes mostrar un mensaje al usuario o redirigirlo a una página de inicio de sesión
    }
  }

  navigateToUserData(): void {
    if (this.userId) {
      // Navegar a la ruta '/userData' con el userId como parámetro
      this.router.navigate(['/userData', this.userId]);
    } else {
      console.error('No se puede navegar a la página de datos del usuario sin un userId válido.');
      // Aquí puedes mostrar un mensaje al usuario o redirigirlo a una página de inicio de sesión
    }
  }
}
