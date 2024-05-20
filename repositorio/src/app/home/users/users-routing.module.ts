import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UpdateComponent } from './update/update.component';


const routes: Routes = [
    {
      path: '',
      children: [
        {
          path: '',
          component: UsersComponent,
        },
        {
          path: 'detail/:userKey',
          component: UpdateComponent,
        },
      ],
    },
  ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}