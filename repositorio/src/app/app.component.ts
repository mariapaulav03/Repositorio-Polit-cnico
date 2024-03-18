import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'repositorio';
  myForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.builder();
  }

builder(){
  this.myForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
}

  submitForm() {
    if (this.myForm.valid) {
      // Aquí puedes manejar la lógica de envío del formulario
      console.log(this.myForm.value);
    } else {
      // Manejar errores de validación si es necesario
      console.log('Formulario inválido');
    }
  }
}
