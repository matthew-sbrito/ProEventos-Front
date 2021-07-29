import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ValidatorField } from '@app/helpers/ValidatorField';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  form!: FormGroup;
  get f():any{
    return this.form.controls;
  }

  constructor(
    private titleService: Title,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Perfil')
    this.validation();
  }
  private validation():void{
    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('password', 'confirmPassword')
    }
    this.form = this.fb.group({
      title: ['',[Validators.required]],
      firstName: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      telefone: ['',[Validators.required]],
      function: ['',[Validators.required]],
      desc: ['',[Validators.required]],
      password: ['',[Validators.minLength(6), Validators.nullValidator]],
      confirmPassword: ['',[Validators.nullValidator]]
    }, formOptions)
  }
  public resetForm(event: any):void{
    event.preventDefault();
    this.form.reset();
  }
}
