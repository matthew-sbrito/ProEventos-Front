import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
  // providers: [EventoService];
})

export class EventosComponent implements OnInit {

  ngOnInit(): void {
    this.titleService.setTitle('Eventos')
  }

  constructor(
    private titleService: Title,
    private router: Router
    ){}

  redirect() : void{
    this.router.navigate([`/eventos/lista`])
  }
}
