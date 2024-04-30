import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonsService } from 'src/app/services/persons.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = ''; // Mensaje de error para mostrar en el formulario

  constructor(private fb: FormBuilder, private personsService: PersonsService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.errorMessage = '';

    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.personsService.login({ email, password }).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error('Error en el login:', error);
          if (error.status === 401) {
            const errorData = error.error;
            if (errorData.error === 'InvalidEmail') {
              this.errorMessage = 'El correo electrónico proporcionado es incorrecto.';
            } else if (errorData.error === 'InvalidPassword') {
              this.errorMessage = 'La contraseña proporcionada es incorrecta.';
            } else {
              // Otro tipo de error no identificado
              this.errorMessage = 'Error al intentar iniciar sesión. Por favor, intenta de nuevo más tarde.';
            }
          } else {
            // Otro tipo de error HTTP
            this.errorMessage = 'Error al intentar iniciar sesión. Por favor, intenta de nuevo más tarde.';
          }
        }
      );
    }
  }
}
