import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/Evento';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
  // providers: [EventoService];
})
export class EventosComponent implements OnInit {

  public eventos: Evento[] = [];
  public eventosFilters: Evento[] = [];

  public  widthImg      = 150;
  public  marginImg     = 2;
  public  showImg       = false;
  private filterListed  = '';

  private modalRef!: BsModalRef;

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    ) {}

  public ngOnInit(): void {
    this.spinner.show();
    this.getEventos();
  }

  public getEventos(): void {
    this.eventoService.getEventos().subscribe({
      next: (eventosResp : Evento[]) => {
      this.eventos = eventosResp
      this.eventosFilters = this.eventos
      },
      error : (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao carregar os Eventos', 'Erro!');
      },
      complete : () => this.spinner.hide()
    });
  }

  public get filterList(): string {
    return this.filterListed;
  }
  public set filterList(value: string) {
    this.filterListed = value;
    this.eventosFilters = this.filterList ? this.filterEvent(this.filterList) : this.eventos;
  }

  public filterEvent(filter: string):any {
    filter = filter.toLocaleLowerCase();
    return this.eventos.filter(
      (event: any) =>
      event.tema.toLocaleLowerCase().indexOf(filter) !== -1 || event.local.toLocaleLowerCase().indexOf(filter) !== -1,
    );
  }
  public changeImgBtn(){
    this.showImg = !this.showImg
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  confirm(): void {
    this.modalRef.hide();
    this.toastr.success('Evento deletado com sucesso!','Deletado!');
  }

  decline(): void {
    this.modalRef.hide();
  }
}
