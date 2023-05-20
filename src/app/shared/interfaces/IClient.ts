export interface IClient {
  clientId?: number;
  sharedKey?: string;
  businessId: string;
  email: string;
  phone: string;
  startDate: string;
  endDate: string;
  createdAt?: Date;
}
