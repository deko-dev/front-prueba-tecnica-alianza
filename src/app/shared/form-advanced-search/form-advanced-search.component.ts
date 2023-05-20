import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IClient } from '../interfaces/IClient';

@Component({
  selector: 'app-form-advanced-search',
  templateUrl: './form-advanced-search.component.html',
  styleUrls: ['./form-advanced-search.component.scss']
})
export class FormAdvancedSearchComponent {
  @Output() dataToSearch: EventEmitter<IClient> = new EventEmitter<IClient>

  formAdvancedSearch = new FormGroup({
    name: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
  })

  onSearchClients(event: any){
    const { name, phone, email, startDate, endDate } = this.formAdvancedSearch.getRawValue()
      const clientToSearch: IClient = {
        businessId: name ? name : "",
        phone: phone ? phone : "" ,
        email: email ? email : "" ,
        startDate: startDate ? startDate : "" ,
        endDate: endDate ? endDate : ""
      };
      this.dataToSearch.emit( clientToSearch );
  }
}
