import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { EventoService } from '@app/services/evento.service';
import { EmailService } from '@app/services/email.service';
import { Evento } from '@app/models/Evento';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.css']
})

export class EventoListaComponent implements OnInit {


  public eventos: Evento[] = [];
  public eventosFilters: Evento[] = [];
  public eventoId: number = 0;

  public  widthImg      = 150;
  public  marginImg     = 2;
  public  showImg       = false;
  private filterListed  = '';
  public  emailReceiver = '';

  private modalRef!: BsModalRef;

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private emailService: EmailService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    ) {}

  public ngOnInit(): void {
    this.spinner.show();
    this.loadEventos();
  }

  public loadEventos(): void {
    this.eventoService.getEventos().subscribe(
      (eventosResp : Evento[]) => {
      this.eventos = eventosResp;
      this.eventosFilters = this.eventos;
      },
      (error: any) => this.toastr.error('Erro ao carregar os Eventos', 'Erro!'),
    ).add(() => this.spinner.hide());;
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

  openModal(event: any, template: TemplateRef<any>, eventoId: number): void {
    event.stopPropagation();
    this.eventoId = eventoId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef.hide();
    this.spinner.show();
    this.eventoService.deleteEvento(this.eventoId).subscribe(
      (response: any) => {
        if(response.message == 'Deletado'){
          this.toastr.success('Evento deletado com sucesso!','Deletado!');
          this.spinner.hide();
          this.loadEventos();
        }
      },
      (error:any) =>{
        this.toastr.error(`Erro ao deletar o evento ${this.eventoId}`, 'Erro!');
        console.error(error);
      },
    ).add(() => this.spinner.hide());
  }

  decline(): void {
    this.modalRef.hide();
  }
  detalheEvento(id: number): void {
    this.router.navigate([`/eventos/detalhe/${id}`]);
  }

  sendEmail(): void{
    this.modalRef.hide();
    this.spinner.show();

    this.emailService.sendEmailConfirm(this.emailReceiver, this.eventoId).subscribe(
      (response: any) => {
        if(response.message == 'Deletado'){
          this.toastr.success('Evento deletado com sucesso!','Deletado!');
          this.spinner.hide();
          this.loadEventos();
        }
      },
      (error:any) =>{
        this.toastr.error(`Erro ao enviar email para ${this.emailReceiver}`, 'Erro!');
        this.emailReceiver = '';
        console.error(error);
      },
    ).add(() => this.spinner.hide());
  }
}
