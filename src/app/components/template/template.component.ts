import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`
    .ng-invalid.ng-touched:not(form) {
      border: 1px solid red;
    }

  `]
})
// Con not(form) le decimos a Angular que nos aplique las clases excepto al formulario.
export class TemplateComponent {

  public usuario: Object = {
    nombre: null,
    apellido: null,
    correo: null,
    pais: '',
    sexo: 'Hombre',
    mayorDeEdad: 'Si',
    acepta: false
  };

  paises = [{
    codigo: 'ESP',
    nombre: 'España'
  }, {
    codigo: 'FRA',
    nombre: 'Francia'
  }, {
    codigo: 'POR',
    nombre: 'Portugal'
  }, {
    codigo: 'ALE',
    nombre: 'Alemania'
  }, {
    codigo: 'ITA',
    nombre: 'Italia'
  }];

  mayorDeEdad: string[] = ['Si', 'No'];

  constructor() { }

  guardar(forma: NgForm) {
    console.log('Formulario guardado');
    console.log('ngForm ', forma);
    console.log('Valor ', forma.value);
  }

}
