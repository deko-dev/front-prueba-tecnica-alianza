import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { IClient } from 'src/app/shared/interfaces/IClient';

import { MatSnackBar } from '@angular/material/snack-bar';
import { IGeneralResonse } from 'src/app/shared/interfaces/IGeneralResponse';

@Component({
  selector: 'app-form-add-client',
  templateUrl: './form-add-client.component.html',
  styleUrls: ['./form-add-client.component.scss']
})
export class FormAddClientComponent implements OnInit{

  public isLoading: boolean = false;
  private isEditForm: boolean = false;
  public formNewClient: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
  });

  constructor (
    private apiService: ApiService,
    private dialogRef: MatDialogRef<FormAddClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IClient,
    private _snackBar: MatSnackBar
    ){}

  ngOnInit(): void {
    if( this.data ) {
      this.patchForm();
    }
  }

  patchForm() {
    this.isEditForm = true;
    const { businessId, phone, email, startDate, endDate } = this.data;
    const dataFormClient = {
      name: businessId,
      phone,
      email,
      startDate,
      endDate
    }

    this.formNewClient.patchValue( dataFormClient );
  }

  async sendClientNew(event: any) {
    this.isLoading = true;
    try {
      const { name, phone, email, startDate, endDate } = this.formNewClient.getRawValue()
      const newClient: IClient = {
        businessId: name,
        phone: phone,
        email: email,
        startDate: startDate,
        endDate: endDate
      };

      if( this.isEditForm ) {
        const { clientId, sharedKey, createdAt } = this.data;
        const updateDataClient: IClient = {
          ...newClient,
          clientId,
          sharedKey,
          createdAt
        }
        const responseUpdateClient = await firstValueFrom( this.apiService.updateClient( updateDataClient ) );
        if( responseUpdateClient.success ) {
          this.isLoading = false;
          this.dialogRef.close(true);
        }
      } else {
        const responseCreateClient = await firstValueFrom( this.apiService.createClient( newClient ) );
        console.log( responseCreateClient );
        if( responseCreateClient.success ) {
          this.isLoading = false;
          this.dialogRef.close(true);
        }
      }
    } catch (error: any) {
      this.isLoading = false;
      console.error("Ha ocurrido un error", error);
      this._snackBar.open(error.error.message, "OK!")
    }
  }
}
