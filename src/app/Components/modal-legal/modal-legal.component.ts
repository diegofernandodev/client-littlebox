import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignInUpService } from "../../services/sign-in-up.service";
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-modal-legal',
  templateUrl: './modal-legal.component.html',
  styleUrls: ['./modal-legal.component.scss']
})
export class ModalLegalComponent implements OnInit {
  autorizado: boolean = false;
  loginStatusSubscription!: Subscription;
  isLoggedIn = false;
  userId: string | null = null;

  constructor(private router: Router, private userService: SignInUpService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loginStatusSubscription = this.userService.loginStatusChanged.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
    });
    this.userService.mostrarNavbar.next(false); // Ocultar el navbar
  }

  confirmar() {
    if (this.autorizado) {
      if (this.userId) {
        this.userService.mostrarNavbar.next(true); // Restaurar el navbar
        this.router.navigate(['/changePassword', this.userId]);
      } else {
        console.error('No se ha proporcionado un userId válido.');
      }
    } else {
      this.router.navigate(['']);
    }
  }
  

  regresar() {
    try {
      this.userService.logout();
      this.isLoggedIn = false;
      this.userService.mostrarNavbar.next(true); // Restaurar el navbar
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
