import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { reject } from 'q';

// Al utilizar el formulario por Data, hay que importar en el app.module.ts el ReactiveFormsModule

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {

  formularioData: FormGroup;

  usuario: any = {
    nombrecompleto: {
      nombre: 'Sergio',
      apellido: 'Gutiérrez'
    },
    correo: 'ravasad@gmail.com',
    pasatiempos: ['Correr', 'Fitness', 'Dormir', 'Comer']
  };

  constructor() {

    this.formularioData = new FormGroup({

      /* FormControl recibe 3 parámetros, el primero es el valor,
      , el segundo son las validaciones, si es un valor se pasa directamente el valor, si es más de uno, se pasa en array
      , el tercero las validaciones asíncronas. */

      'nombrecompleto': new FormGroup({
        'nombre': new FormControl( '' , [Validators.required, Validators.minLength(3)]),
        'apellido': new FormControl( '' , [Validators.required, this.noGutierrez])
      }),
      'correo': new FormControl( '' , [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      'pasatiempos': new FormArray([
        new FormControl('Correr', Validators.required)
      ]),
      'username': new FormControl('', Validators.required, this.existeUsuario),
      'password1': new FormControl('', Validators.required),
      'password2': new FormControl()
    });

    // this.formularioData.setValue(this.usuario);
    this.formularioData.controls['password2'].setValidators([
      Validators.required,
      this.noIgual.bind( this.formularioData )
    ]);

    // this.formularioData.valueChanges
    //     .subscribe( data => {
    //       console.log(data);
    //     });

    this.formularioData.controls['username'].valueChanges
         .subscribe( data => {
           console.log(data);
         });

    this.formularioData.controls['username'].statusChanges
         .subscribe( data => {
           console.log(data);
         });
  }

  guardarCambios() {
    console.log('Formulario: ', this.formularioData);
    console.log('Valor: ', this.formularioData.value);

    // this.formularioData.reset({
    //   nombrecompleto: {
    //     nombre: '',
    //     apellido: ''
    //   },
    //   correo: ''
    // });

  }

  agregarPasatiempo() {
    (<FormArray>this.formularioData.controls['pasatiempos']).push(
      new FormControl('', Validators.required)
    );
  }

  noGutierrez ( control: FormControl ): { [s: string]: boolean } {

    if (control.value === 'Gutierrez') {
      return {
        nogutierrez: true
      };
    }
    return null;
  }

  noIgual ( control: FormControl ): { [s: string]: boolean } {

    let forma: any = this;

    if (control.value !== forma.controls['password1'].value ) {
      return {
        noiguales: true
      };
    }
    return null;
  }

  existeUsuario ( control: FormControl ): Promise<any>|Observable<any> {

    let promesa = new Promise(
      (resolve, reject) => {

        setTimeout( () => {
          if (control.value === 'ravasad') {
            resolve( {existe: true} );
          }else{
            resolve( null );
          }
        }, 3000);
      }
    );
    return promesa;
  }

}
