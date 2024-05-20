import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonsService } from 'src/app/services/persons.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  showPassword = false;

  constructor(private fb: FormBuilder, private personsService: PersonsService, private router: Router,) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  hideAndShowPassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.errorMessage = '';

    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.personsService.login({ email, password }).subscribe(
        async (response) => {
          await this.router.navigate(['/home/users']);
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
            }
          } else  {
            this.errorMessage = 'Este usuario no existe.';
          }
        }
      );
    }
  }

  async goToRegister() {
    await this.router.navigate(['/register']);
  }
}
