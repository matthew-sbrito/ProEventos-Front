import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  @Input() title!: string;
  @Input() subtitle = 'Perfil do usuário';
  @Input() iconClass = 'fa fa-user';
  @Input() function : any;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  action():void{
    this.function();
  }
}
