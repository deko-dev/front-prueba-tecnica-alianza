import { Component, OnInit } from '@angular/core';
import { FormAddClientComponent } from './form-add-client/form-add-client.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { firstValueFrom } from 'rxjs';
import { IClient } from 'src/app/shared/interfaces/IClient';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  public clients: IClient[] = [];
  public resultsSearch = false;

  public columnsTable: string[] = [
    'sharedKey', 'businessId', 'email', 'phone', 'createdAt', 'actions'
  ]

  constructor(private dialog: MatDialog, private apiService: ApiService) {}

  ngOnInit(): void {
    this.getListClients();

  }

  openModalCreateClient() {
    this.dialog.open(FormAddClientComponent).afterClosed().subscribe( () => {
      this.getListClients();
    });
  }

  async getListClients() {
    this.resultsSearch = false;
    try {
      const responseListClient = await firstValueFrom(this.apiService.getListClient());
      if( responseListClient.success) {
        this.clients = responseListClient.data;
      }
    } catch ( error ) {
      console.error( "Ha ocurrido un error", error );
    }
  }

  editClient( element: IClient ) {
    this.dialog.open(FormAddClientComponent, {
      data: element
    }).afterClosed().subscribe( () => {
      this.getListClients();
    })
  }

  exportarToCSV() {
    const csvData = this.convertToCSV();

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL( blob );
    const link = document.createElement('a');
    link.href = url;
    link.download = 'clientes.csv';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }


  private convertToCSV() {
    const header = Object.keys( this.clients[0] ).join(',')+'\n';
    const rows = this.clients.map( client => Object.values(client).join(',')).join('\n');
    return header + rows;
  }

  loadDataResultsSearch(clientsToSearch: IClient[]) {
    if( clientsToSearch && clientsToSearch.length > 0 ){
      this.resultsSearch = true;
      this.clients = clientsToSearch;
    }
  }
}
