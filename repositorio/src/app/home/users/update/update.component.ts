import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/model/person';
import { PersonsService } from 'src/app/services/persons.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  usersUpdateForm!: FormGroup;
  key!: number;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private personsService: PersonsService
  ) {
    console.log('UpdateComponent constructor called');
    this.buildForm();
  }

  ngOnInit(): void {
    const userKey = this.activatedRoute.snapshot.paramMap.get('userKey');
    console.log('ID from route:', userKey);
    this.key = Number(userKey);
    this.getUser(this.key);
  }

  buildForm(): void {
    this.usersUpdateForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      address: new FormControl('')
    });
  }

  getUser(id: number): void {
    this.personsService.get(id).subscribe((user: Person) => {
      console.log(user);
      this.form(user);
    });
  }

  form(person: Person): void {
    this.usersUpdateForm = new FormGroup({
      name: new FormControl(person.name),
      email: new FormControl(person.email),
      phone: new FormControl(person.phone),
      address: new FormControl(person.address)
    });
  }

  update() {
    try {
      this.personsService.update(this.key, this.usersUpdateForm.value)
        .subscribe((response: any) => {
          console.log(response);
          this.router.navigate(['/home/users/consult']);
        }, (error: any) => {
          console.log(error.error.message);
        });
    } catch (error) {
      console.log(error);
    }
  }

  delete() {
    try {
      this.personsService.delete(this.key)
        .subscribe((response: any) => {
          console.log(response);
          this.router.navigate(['/home/users/consult']);
        }, (error: any) => {
          console.log(error.error.message);
        });
    } catch (error) {
      console.log(error);
    }
  }
}