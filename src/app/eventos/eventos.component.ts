import { Component, OnInit } from '@angular/core';
import { EventoService } from '../services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
  // providers: [EventoService];
})
export class EventosComponent implements OnInit {
  public eventos: any = [];
  public eventosFilters: any = [];
  widthImg:   number = 150;
  marginImg:  number = 2;
  showImg:    boolean = true;
  private _filterList: string = '';

  public get filterList(): string {
    return this._filterList;
  }
  public set filterList(value: string) {
    this._filterList = value;
    this.eventosFilters = this.filterList ? this.filterEvent(this.filterList) : this.eventos;
  }

  filterEvent(filter: string):any {
    filter = filter.toLocaleLowerCase();
    return this.eventos.filter(
      (event: any) =>
      event.tema.toLocaleLowerCase().indexOf(filter) !== -1 || event.local.toLocaleLowerCase().indexOf(filter) !== -1,
    );
  }

  constructor(private eventoService: EventoService) {}

  ngOnInit(): void {
    this.getEventos();
  }

  changeImgBtn(){
    this.showImg = !this.showImg
  }

  public getEventos(): void{
    this.eventoService.getEventos().subscribe(
      response => {
        this.eventos = response
        this.eventosFilters = this.eventos
      },
      error => console.error(error),
    );
  }
}
