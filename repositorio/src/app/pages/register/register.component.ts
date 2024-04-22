import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from 'src/app/model/person';
import { PersonsService } from 'src/app/services/persons.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  myForm!: FormGroup;

  constructor(private fb: FormBuilder, private personsService: PersonsService) {
    this.builder();
  }

  builder() {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', Validators.required], // Asegúrate de agregar los campos restantes del formulario
      phone: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.myForm.valid) {
      const formData = this.myForm.value;
      const newPerson = new Person();
      newPerson.name = formData.name;
      newPerson.email = formData.email;
      newPerson.password = formData.password;
      newPerson.address = formData.address;
      newPerson.phone = formData.phone;
      console.log(newPerson);
      this.personsService.create(newPerson).subscribe(
        (result) => {
          console.log(result);
          console.log('Registro exitoso:', result);

        },
        (error) => {
          console.error('Error al registrar:', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }
}