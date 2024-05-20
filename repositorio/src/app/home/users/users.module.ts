import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { ConsultComponent } from './consult/consult.component';
import { UpdateComponent } from './update/update.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [UsersComponent, ConsultComponent, UpdateComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatTableModule,
		MatPaginatorModule,
		MatButtonModule,
    ReactiveFormsModule,
		MatCardModule,
		FormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatDividerModule,
    MatIconModule,
  ]
})
export class UsersModule { }
