import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { PersonsService } from 'src/app/services/persons.service';
import { MatTableDataSource } from '@angular/material/table';
import { Person } from 'src/app/model/person';

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.css']
})
export class ConsultComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Person> = new MatTableDataSource<Person>();
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'actions'];
  persons: Person[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private personsService: PersonsService
  ) {}

  ngOnInit(): void {
    this.loadPersons();
  }

  loadPersons(): void {
    this.personsService.getAll().subscribe(
      (data: Person[]) => {
        this.persons = data;
        this.dataSource.data = this.persons;
        console.log('Persons:', this.persons);
      },
      error => {
        console.error('Error fetching persons:', error);
      }
    );
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }

  async update(id: number) {
    if (id) {
      await this.router.navigate(['/home/users/detail/' + id]);
    }
  }

}
