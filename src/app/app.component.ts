import { Component } from '@angular/core';

const todos = [
  { id: 1, title: 'HTML + CSS', completed: true },
  { id: 2, title: 'JS + TS', completed: false },
  { id: 3, title: 'React', completed: false },
  { id: 4, title: 'Angular', completed: false },
];

console.log(todos);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todo-app--angular';
  todos = todos;
}
