export interface ExceptionHandler {
  status?: number | string;
  message?: string;
  statusText?: string;
  color?: 'primary' | 'success' | 'danger' | 'warning';
  newMesage?: string;
  do?: (err: any) => void;
}
