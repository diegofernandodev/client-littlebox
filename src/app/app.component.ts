import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'LittleBoxFE';

  constructor(private config: PrimeNGConfig,private translateService: TranslateService) {}

    ngOnInit() {
        this.config.setTranslation({
            accept: 'Accept',
            reject: 'Cancel',
            //translations
        });
        this.translateService.setDefaultLang('es');
    }

    translate(lang: string) {
      this.translateService.use(lang);
      this.translateService.get('primeng').subscribe(res => this.config.setTranslation(res));
  }
}