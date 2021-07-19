export interface Cliente {
  id?: string;
  nombre?: string;
  apellido?: string;
  email?: string;
  saldo?: number;
}

export interface Accion {
  title:string;
  esEditar: boolean;

}

export interface User {
  email:string;
  password: string;

}

