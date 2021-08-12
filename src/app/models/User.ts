import { Evento } from "./Evento";

export interface User {
  Id: number;
  Nome: string;
  Email: string;
  Senha: string;
  DataNascimento: Date;
  IsAdmin: number;
  IsPalest: number;
  UserEventos: Evento[];
}
