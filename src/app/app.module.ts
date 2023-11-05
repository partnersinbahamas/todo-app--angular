import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoComponent } from './components/todo/todo.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { HttpClientModule } from '@angular/common/http';
import { NotificationComponent } from './components/notification/notification.component';
import { TodoPageComponent } from './components/todo-page/todo-page.component';
import { RouterModule, Routes } from '@angular/router';
import { FilterComponent } from './components/filter/filter.component';

const routes: Routes = [
  {
    path: 'todos/:status',
    component: TodoPageComponent
  },
  {
    path: 'about',
    loadChildren: () => {
      return import('./about/about.module').then(m => m.AboutModule);
    }
  },
  {
    path: '**',
    redirectTo: '/todos/all',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoFormComponent,
    NotificationComponent,
    TodoPageComponent,
    FilterComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
