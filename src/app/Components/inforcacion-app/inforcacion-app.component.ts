import { Component } from '@angular/core';

@Component({
  selector: 'app-inforcacion-app',
  templateUrl: './inforcacion-app.component.html',
  styleUrl: './inforcacion-app.component.scss'
})
export class InforcacionAPPComponent {

  
  switchCards() {
    const frontCard = document.querySelector('.front-card') as HTMLElement;
    const backCard = document.querySelector('.back-card') as HTMLElement;
    frontCard.classList.toggle('front-card');
    frontCard.classList.toggle('back-card');
    backCard.classList.toggle('front-card');
    backCard.classList.toggle('back-card');
  }

}
