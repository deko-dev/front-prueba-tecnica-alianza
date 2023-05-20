export interface IGeneralResonse<T> {
  success: boolean;
  message: string;
  data: T[];
}
