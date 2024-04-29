import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SafePipe } from './pipes/safe.pipe'; // Importa tu tubería personalizada
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';


import { HomeComponent } from '../app/Components/home/home.component';
import { SidebarComponent } from '../app/Components/sidebar/sidebar.component';
import { FooterComponent } from '../app/Components/footer/footer.component';
import { NavbarComponent } from '../app/Components/navbar/navbar.component';
import { IndexComponent } from '../app/Components/index/index.component';
import {  PreRegistroComponent} from "../app/Components/pre-registro/pre-registro.component";
import { RegistroEmpresaComponent } from '../app/Components/registro-empresa/registro-empresa.component';
import { RegistroEmpleadoComponent } from '../app/Components/registro-empleado/registro-empleado.component';
import { EmployeesComponent } from '../app/Components/employees/employees.component';
import { ChangePasswordComponent } from '../app/Components/change-password/change-password.component';
import { PersonalizationComponent } from '../app/Components/personalization/personalization.component';
import { SignInUpService } from './services/sign-in-up.service';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';
import { DataTablesModule } from "angular-datatables";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AddEditSolicitudComponent } from './Components/add-edit-solicitud/add-edit-solicitud.component';
import { ListEdictSolicitudComponent } from './Components/list-edict-solicitud/list-edict-solicitud.component';
//import { environment } from './environments/environment.prod'; // Para producción
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { NoAutorizedComponent } from './Components/no-autorized/no-autorized.component';
import { RestorePasswordComponent } from './Components/restore-password/restore-password.component';
import { SolicitudesDeEmpresasComponent } from './Components/solicitudes-de-empresas/solicitudes-de-empresas.component';
import { ListCompaniesComponent } from './Components/list-companies/list-companies.component';
import { CreateUserAdminComponent } from './Components/create-user-admin/create-user-admin.component';
import { ListCompaniesAprovedComponent } from './Components/list-companies-aproved/list-companies-aproved.component';
import { SoliColaboradoresComponent } from './Components/soli-colaboradores/soli-colaboradores.component';
import { DataUserComponent } from './Components/data-user/data-user.component';
import { CrearEgresoComponent } from './Components/crear-egreso/crear-egreso.component';
import { CrearTerceroComponent } from './Components/crear-tercero/crear-tercero.component';
import { CrearCategoriaComponent } from './Components/crear-categoria/crear-categoria.component';
import { ListTercerosComponent } from './Components/list-terceros/list-terceros.component';
import { ListCategoriasComponent } from './Components/list-categorias/list-categorias.component';
import { ListEgresosComponent } from './Components/list-egresos/list-egresos.component';
import {  EgresosService} from "../app/services/egresos.service";
import { ModalEgresoComponent } from "./Components/modal-egreso/modal-egreso.component";
import { ModalTerceroComponent } from './Components/modal-tercero/modal-tercero.component';
import { CompanyService } from "./services/company.service";
import { ModalCompanySolicitudComponent } from './Components/modal-company-solicitud/modal-company-solicitud.component';
import { InformesComponent } from './Components/informes/informes.component';
import {InformesService  } from "./services/informes.service";
import { GraficosComponent } from './Components/graficos/graficos.component';
import { TokenInterceptorService } from "./services/token-interceptor.service";

// import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ListDeleteIngresosComponent } from './Components/ingresos/list-delete-ingresos/list-delete-ingresos.component';
import { AddEditIngresoComponent } from './Components/ingresos/add-edit-ingreso/add-edit-ingreso.component';
import { NotificationsComponent } from './Components/notifications/notifications.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TerceroModalComponent } from './Components/modals/tercero-modal/tercero-modal.component';
import { SolicitudModalComponent } from './Components/modals/solicitud-modal/solicitud-modal.component';
import { CaducidadTokenComponent } from './Components/caducidad-token/caducidad-token.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { GastoComponent } from './Components/gasto/gasto.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { CrearSuperUsuarioComponent } from './Components/crear-super-usuario/crear-super-usuario.component';
import { ListboxModule } from 'primeng/listbox';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ModalLegalComponent } from './Components/modal-legal/modal-legal.component'
import { InforcacionAPPComponent } from './Components/inforcacion-app/inforcacion-app.component'



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IndexComponent,
    AddEditSolicitudComponent,
    ListEdictSolicitudComponent,
    SafePipe,
    PreRegistroComponent,
    RegistroEmpresaComponent,
    RegistroEmpleadoComponent,
    HomeComponent,
    IndexComponent,
    SidebarComponent,
    EmployeesComponent,
    ChangePasswordComponent,
    PersonalizationComponent,
    FooterComponent,
    NotFoundComponent,
    NoAutorizedComponent,
    RestorePasswordComponent,
    SolicitudesDeEmpresasComponent,
    ListCompaniesComponent,
    CreateUserAdminComponent,
    ListCompaniesAprovedComponent,
    SoliColaboradoresComponent,
    DataUserComponent,
    CrearEgresoComponent,
    CrearTerceroComponent,
    CrearCategoriaComponent,
    ListTercerosComponent,
    ListCategoriasComponent,
    ListEgresosComponent,
    ModalEgresoComponent,
    ModalTerceroComponent,
    ModalCompanySolicitudComponent,
    InformesComponent,
    GraficosComponent,
    // DataUserComponent,
    ListDeleteIngresosComponent,
    AddEditIngresoComponent,
    NotificationsComponent,
    TerceroModalComponent,
    SolicitudModalComponent,
    CaducidadTokenComponent,
    GastoComponent,
    DashboardComponent,
    CrearSuperUsuarioComponent,
    ModalLegalComponent,
    InforcacionAPPComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbCarouselModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    MatDialogModule,
    MatIconModule ,
    DataTablesModule,
    SidebarModule,
    ButtonModule,
    MenubarModule,
    MenuModule,
    AvatarModule,
    BadgeModule,
    CommonModule,
    DatePipe,
    TableModule,
    ListboxModule,
    InputTextModule,
    SplitButtonModule,
    CheckboxModule,
    DropdownModule,
    CalendarModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        }
      }
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http, './assets/i18n/', '.json');
        },
        deps: [HttpClient]
      }
    })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
  providers: [SignInUpService,{ provide: environment, useValue: environment }, EgresosService, CompanyService, InformesService, provideAnimationsAsync(), TokenInterceptorService],
  bootstrap: [AppComponent]
})
export class AppModule {}
