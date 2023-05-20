import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { IGeneralResonse } from '../interfaces/IGeneralResponse';
import { IClient } from '../interfaces/IClient';
import { firstValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent {
  @Output() resultsToSearch: EventEmitter<IClient[]> = new EventEmitter<IClient[]>();

  showFormAdvancedSearch = false;
  isLoading = false;

  formSharedKey = new FormGroup({
    sharedKey: new FormControl('', Validators.required)
  })

  constructor(
    private apiService: ApiService,
    private _snackBar: MatSnackBar
  ){}

  async onSearchSharedKey(event: any) {
    this.isLoading = true;
    try {
      const { sharedKey } = this.formSharedKey.getRawValue();

      const resultToSearchData = await firstValueFrom( this.apiService.searchToClientBySharedKey( sharedKey ) );
      if( resultToSearchData.success ) {
        if( resultToSearchData.data.length == 0 ) {
          this._snackBar.open("No existen clientes con ese shared key", "OK!");
          this.isLoading = false;
          return;
        }
        this.resultsToSearch.emit( resultToSearchData.data );
        this.isLoading = false;
      }
    } catch (error) {
      console.error('Ha ocurrido un error');
      this.isLoading = false;
    }
  }

  async onAdvancedSearch( dataToSearch: IClient ) {
    this.isLoading = true;
    try {
      const resultsAdvancedSearch = await firstValueFrom( this.apiService.searchToClientByKey(dataToSearch) )
      if( resultsAdvancedSearch.success ){
        this.resultsToSearch.emit( resultsAdvancedSearch.data );
        this.isLoading = false;
        this.showFormAdvancedSearch = false;
      }
    } catch (error) {
      console.error('Ha ocurrido un error');
      this.showFormAdvancedSearch = false;
      this.isLoading = false;
    }
  }

}
