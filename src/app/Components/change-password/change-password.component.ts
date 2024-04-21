import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignInUpService } from "../../services/sign-in-up.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  userId: string = '';
  newPassword: string = '';

  constructor(private route: ActivatedRoute, private signInUpService: SignInUpService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
    });
  }

  validatePassword(): string {
    const password = this.newPassword;
    if (password.length < 8) {
      return 'Débil';
    } else if (password.length < 12) {
      return 'Medio';
    } else {
      return 'Fuerte';
    }
  }

  passwordStrengthPercentage(): number {
    const password = this.newPassword;
    if (password.length < 8) {
      return (password.length / 8) * 100;
    } else if (password.length < 12) {
      return (password.length / 12) * 100;
    } else {
      return 100;
    }
  }

  changePassword(): void {
    this.signInUpService.changePassword(this.userId, this.newPassword).subscribe(
      response => {
        console.log('Cambio de contraseña exitoso:', response);
        this.signInUpService.logout();
        this.router.navigate(['/']);
        alert('¡Cambio de contraseña exitoso! Se ha cerrado sesión.');
      },
      error => {
        console.error('Error al cambiar la contraseña:', error);
      }
    );
  }
}
