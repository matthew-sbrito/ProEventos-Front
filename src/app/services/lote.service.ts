import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lote } from '@app/models/Lote';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()

export class LoteService {

private baseURL = 'https://localhost:5001/lote'

constructor(private http: HttpClient) {}

public getLotesByEvento(eventoId: number): Observable<Lote[]>{
  return this.http
  .get<Lote[]>(`${this.baseURL}/lote/${eventoId}`)
  .pipe(take(1));
};
public getLoteById(eventoId: number, loteId: number): Observable<Lote>{
  return this.http
  .get<Lote>(`${this.baseURL}/${eventoId}/${loteId}`)
  .pipe(take(1));
};
public saveLote(eventoId: number, lotes: Lote[]): Observable<Lote>{
  return this.http
  .put<Lote>(`${this.baseURL}/${eventoId}`, lotes)
  .pipe(take(1));
};
public deleteLote(eventoId: number, loteId: number): Observable<Lote>{
  return this.http
  .delete<Lote>(`${this.baseURL}/${eventoId}/${loteId}`)
  .pipe(take(1));
};
}
