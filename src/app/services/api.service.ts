import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGeneralResonse } from '../shared/interfaces/IGeneralResponse';
import { IClient } from '../shared/interfaces/IClient';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  // Metodo para obtener la lista de clientes
  getListClient(): Observable<IGeneralResonse<IClient>> {
    const endpoint = this.apiUrl + '/clients';
    return this.httpClient.get<IGeneralResonse<IClient>>(endpoint);
  }

  // Creaar un cliente nuevo
  createClient(client: IClient): Observable<IGeneralResonse<IClient>> {
    const endpoint = this.apiUrl + '/clients';
    return this.httpClient.post<IGeneralResonse<IClient>>(endpoint, client);
  }

  // Creaar un cliente nuevo
  updateClient(client: IClient): Observable<IGeneralResonse<IClient>> {
    const endpoint = this.apiUrl + '/clients';
    return this.httpClient.put<IGeneralResonse<IClient>>(endpoint, client);
  }

  // Buscar clientes por una key
  searchToClientByKey(
    dataToSearch: any
  ): Observable<IGeneralResonse<IClient>> {
    const endpoint = this.apiUrl + '/clients/getClientByAtrribute';
    return this.httpClient.post<IGeneralResonse<IClient>>(
      endpoint,
      dataToSearch
    );
  }

  // Buscar clientes por una key
  searchToClientBySharedKey(
    sharedKey: string | null
  ): Observable<IGeneralResonse<IClient>> {
    const endpoint = this.apiUrl + `/clients/getClientBySharedKey/${sharedKey}`;
    return this.httpClient.get<IGeneralResonse<IClient>>(endpoint);
  }
}
