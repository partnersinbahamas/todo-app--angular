import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getUniqId } from 'src/helpers/functions';
import { Todo } from 'src/Types/Todo';

const todos: Todo[] = [
  { id: 1, title: 'HTML + CSS', completed: true },
  { id: 2, title: 'JS + TS', completed: false },
  { id: 3, title: 'React', completed: false },
  { id: 4, title: 'Angular', completed: false },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'todo-app--angular';
  todos = todos;

  isEditing = false;

  todosForm = new FormGroup({
    typing: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
      ]
    }),
  });

  get typing() {
    return this.todosForm.get('typing') as FormControl;
  }

  get activeTodos() {
    return this.todos.filter(item => !item.completed);
  };

  onAdd() {
    if (this.todosForm.invalid) {
      return;
    }

    let newId = getUniqId(this.todos);

    let newTodo: Todo = {
      id: newId,
      title: this.typing.value,
      completed: false,
    };

    this.todosForm.reset();
    this.todos.push(newTodo);
  }
}