import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages.routing';
import { ClientsComponent } from './clients/clients.component';
import { FormAddClientComponent } from './clients/form-add-client/form-add-client.component';



@NgModule({
  declarations: [
    PagesComponent,
    ClientsComponent,
    FormAddClientComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
