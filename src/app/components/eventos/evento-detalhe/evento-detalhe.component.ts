import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Evento } from '@app/models/Evento';
import { EventoService } from '@app/services/evento.service';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.css'],
})
export class EventoDetalheComponent implements OnInit {
  form!: FormGroup;
  evento = {} as Evento;
  stateSave: string = 'post';

  get bsConfig(): any {
    return {
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY hh:mm a',
      containerClass: 'theme-default',
      showWeekNumbers: false,
    };
  }

  get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private router: ActivatedRoute,
    private eventoService: EventoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    this.localeService.use('pt-br');
  }

  public loadEvent(): void {
    const eventIdParam = this.router.snapshot.paramMap.get('id');
    if (eventIdParam !== null) {
      this.stateSave = 'put';

      this.spinner.show();
      this.eventoService.getEventoById(+eventIdParam).subscribe(
        (evento: Evento) => {
          this.evento = { ...evento };
          this.form.patchValue(this.evento);
        },
        (error: any) => {
          this.toastr.error('Erro ao tentar carregar o evento!', 'Erro!');
          console.error(error);
        },
      ).add(() => this.spinner.hide());
    }
  }

  ngOnInit(): void {
    this.loadEvent();
    this.validation();
  }

  public validation(): void {
    this.form = this.fb.group({
      tema: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      local: ['', [Validators.required]],
      dataEvento: ['', [Validators.required]],
      qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
      telefone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      imagemURL: ['', [Validators.required]],
    });
  }

  public resetForm(): void {
    this.form.reset();
  }
  public cssValidator(inputForm: FormControl): any {
    return { 'is-invalid': inputForm?.errors && inputForm?.touched };
  }

  public saveEvent(): void {
    this.spinner.show();

    if (this.form.valid) {
      switch (this.stateSave) {
        case 'post':
          this.newEvent();
          break;
        case 'put':
          this.updateEvent();
          break;
        default:
          break;
      }
    }
  }
  private newEvent() : void {
    this.evento = { ...this.form.value };
    this.eventoService.post(this.evento)
      .subscribe(this.saveConfig)
      .add(() => this.spinner.hide());
  }
  private updateEvent() : void {
    this.evento = { id: this.evento.id, ...this.form.value };
    this.eventoService.put(this.evento)
      .subscribe(this.saveConfig)
      .add(() => this.spinner.hide());
  }
  private saveConfig = {
    next: () => {
      this.toastr.success('Evento salvo com sucesso!', 'Sucesso');
    },
    error: (error: any) => {
      console.error(error);
      this.toastr.error('Erro ao salvar o Evento!', 'Error');
    },
  };
}
