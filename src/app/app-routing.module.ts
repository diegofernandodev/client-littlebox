import { NgModule, importProvidersFrom } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditSolicitudComponent } from '../app/Components/add-edit-solicitud/add-edit-solicitud.component';
import { ListEdictSolicitudComponent } from '../app/Components/list-edict-solicitud/list-edict-solicitud.component';
import { ListDeleteIngresosComponent } from '../app/Components/ingresos/list-delete-ingresos/list-delete-ingresos.component';
import { AddEditIngresoComponent } from '../app/Components/ingresos/add-edit-ingreso/add-edit-ingreso.component';
import { RoleGuard } from "../app/Guards/role.guard";

import { HomeComponent } from "../app/Components/home/home.component";
import {SidebarComponent  } from "../app/Components/sidebar/sidebar.component";
import { IndexComponent } from "../app/Components/index/index.component";
import {PreRegistroComponent} from "../app/Components/pre-registro/pre-registro.component";
import { RegistroEmpresaComponent } from "../app/Components/registro-empresa/registro-empresa.component";
import { RegistroEmpleadoComponent } from "../app/Components/registro-empleado/registro-empleado.component";
import {EmployeesComponent  } from "../app/Components/employees/employees.component";
import {ChangePasswordComponent  } from "../app/Components/change-password/change-password.component";
import { PersonalizationComponent } from "../app/Components/personalization/personalization.component";
import { NotFoundComponent } from "../app/Components/not-found/not-found.component";
import { NoAutorizedComponent } from "../app/Components/no-autorized/no-autorized.component";
import { RestorePasswordComponent } from "../app/Components/restore-password/restore-password.component";
import {ListCompaniesComponent} from "../app/Components/list-companies/list-companies.component";
import { CreateUserAdminComponent } from "../app/Components/create-user-admin/create-user-admin.component";
import { ListCompaniesAprovedComponent } from "../app/Components/list-companies-aproved/list-companies-aproved.component";
import {SoliColaboradoresComponent  } from "../app/Components/soli-colaboradores/soli-colaboradores.component";
import { DataUserComponent } from "../app/Components/data-user/data-user.component";
import { CrearEgresoComponent } from "../app/Components/crear-egreso/crear-egreso.component";
import { CrearTerceroComponent } from "../app/Components/crear-tercero/crear-tercero.component";
import { CrearCategoriaComponent } from "../app/Components/crear-categoria/crear-categoria.component";
import { ListTercerosComponent } from "../app/Components/list-terceros/list-terceros.component";
import { ListCategoriasComponent } from "../app/Components/list-categorias/list-categorias.component";
import { ListEgresosComponent } from "../app/Components/list-egresos/list-egresos.component";
import { InformesComponent } from "../app/Components/informes/informes.component";
import {  GraficosComponent} from "../app/Components/graficos/graficos.component";
import {  NotificationsComponent} from "../app/Components/notifications/notifications.component";
import { TerceroModalComponent } from '../app/Components/modals/tercero-modal/tercero-modal.component';
import { CaducidadTokenComponent } from "../app/Components/caducidad-token/caducidad-token.component";
import { GastoComponent } from "../app/Components/gasto/gasto.component";
import {DashboardComponent} from "../app/Components/dashboard/dashboard.component";
import { CrearSuperUsuarioComponent } from "../app/Components/crear-super-usuario/crear-super-usuario.component";
import { ModalLegalComponent } from '../app/Components/modal-legal/modal-legal.component'


const routes: Routes = [
  // { path: '', component: IndexComponent },
  { path: '', component: HomeComponent },
  { path: 'home', component: DashboardComponent },
  { path: 'listIngresos', component: ListDeleteIngresosComponent, canActivate: [RoleGuard], data: { allowedRoles: ['Gerente', 'SuperUsuario'] } },
  { path: 'obtenerTodosLosIngresos', component: ListDeleteIngresosComponent, canActivate: [RoleGuard], data: { allowedRoles: ['Gerente','Administrador'] } },
  { path: 'addIngreso', component: AddEditIngresoComponent, canActivate: [RoleGuard], data: { allowedRoles: ['Gerente', 'SuperUsuario'] } },
  { path: 'editIngreso/:id', component: AddEditIngresoComponent, canActivate: [RoleGuard], data: { allowedRoles: ['Gerente', 'SuperUsuario'] } },
  { path: 'sidebar', component: SidebarComponent },
  {
    path: 'obtenerTodasLasSolicitudes',
    component: ListEdictSolicitudComponent, canActivate: [RoleGuard], data: { allowedRoles: ['Gerente', 'Administrador','Colaborador'] }
  },
  { path: 'add', component: AddEditSolicitudComponent,canActivate: [RoleGuard], data: { allowedRoles: ['Gerente', 'SuperUsuario', 'Colaborador'] } },
  { path: 'modal-terceros', component: TerceroModalComponent,canActivate: [RoleGuard], data: { allowedRoles: ['Gerente', 'Administrador', 'Colaborador'] } },
  { path: 'edit/:id', component: AddEditSolicitudComponent,canActivate: [RoleGuard], data: { allowedRoles: ['Gerente', 'Administrador','Colaborador'] } },
  // { path: '**', redirectTo: '', pathMatch: 'full' },
  { path: 'sidebar', component: SidebarComponent, canActivate: [RoleGuard], data: { allowedRoles: ['Gerente', 'SuperUsuario'] } },
  { path: 'SignIn/Up', component: PreRegistroComponent },
  // { path: 'SignIn/Up', component: ListEdictSolicitudComponent, canActivate: [RoleGuard], data: { allowedRoles: ['Gerente', 'SuperUsuario'] } },
  { path: 'registroEmpresa', component: RegistroEmpresaComponent },
  { path: 'registroEmpleado', component: RegistroEmpleadoComponent },
  { path: 'employees', component: EmployeesComponent, canActivate: [RoleGuard], data: { allowedRoles: ['Gerente', 'SuperUsuario'] } },
  { path: 'changePassword/:userId', component: ChangePasswordComponent },
  { path: 'personalization', component: PersonalizationComponent },
  { path: 'noAutorized', component: NoAutorizedComponent },
  { path: 'restorePassword', component: RestorePasswordComponent},
  { path: 'listDeSoliDeEmpresas', component: ListCompaniesComponent},
  { path: 'crearUserAdmin', component: CreateUserAdminComponent},
  { path: 'listCompaniesAproved', component:ListCompaniesAprovedComponent },
  { path: 'SoliColaboradores', component: SoliColaboradoresComponent},
  { path: 'userData/:userId', component: DataUserComponent},
  { path: 'crearEgreso', component:CrearEgresoComponent, canActivate: [RoleGuard], data: { allowedRoles: ['Gerente', 'Administrador'] }},
  { path: 'crearTercero', component: CrearTerceroComponent,  canActivate: [RoleGuard], data: { allowedRoles: ['Gerente', 'Administrador'] }},
  { path: 'crearCategoria', component: CrearCategoriaComponent ,canActivate: [RoleGuard], data: { allowedRoles: ['Gerente', 'Administrador'] }},
  { path: 'listTerceros', component: ListTercerosComponent ,canActivate: [RoleGuard], data: { allowedRoles: ['Gerente', 'Administrador', 'Colaborador'] }},
  { path: 'listEgresos', component: ListEgresosComponent, canActivate: [RoleGuard], data: { allowedRoles: ['Gerente', 'Administrador'] }},
  { path: 'listCatgorias', component: ListCategoriasComponent, canActivate: [RoleGuard], data: { allowedRoles: ['Gerente', 'Administrador', 'Colaborador'] }},
  { path: 'Informes', component: InformesComponent, canActivate: [RoleGuard], data: { allowedRoles: ['Gerente', 'Administrador'] }},
  { path: 'graficos', component: GraficosComponent, canActivate: [RoleGuard], data: { allowedRoles: ['Gerente', 'Administrador'] }},
  { path: 'notificaciones/:notificationId', component: NotificationsComponent },
  { path: 'exit', component: CaducidadTokenComponent},
  { path: 'gastoActual', component: GastoComponent},
  { path: 'crearSuperU', component: CrearSuperUsuarioComponent},
  { path: 'TratamientoDeDatos/:userId', component: ModalLegalComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
