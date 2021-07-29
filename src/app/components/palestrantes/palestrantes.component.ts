import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-palestrantes',
  templateUrl: './palestrantes.component.html',
  styleUrls: ['./palestrantes.component.css']
})
export class PalestrantesComponent implements OnInit {

  constructor(private titleService : Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Palestrantes')
  }
}
