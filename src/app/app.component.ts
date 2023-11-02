import { AfterContentChecked, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getUniqId } from 'src/helpers/functions';
import { Todo } from 'src/Types/Todo';

const todosFromServer: Todo[] = [
  { id: 1, title: 'HTML + CSS', completed: true },
  { id: 2, title: 'JS + TS', completed: false },
  { id: 3, title: 'React', completed: false },
  { id: 4, title: 'Angular', completed: false },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AppComponent implements OnInit {
  title = 'todo-app--angular';
  _todos: Todo[] = [];
  activeTodos: Todo[] = [];

  get todos() {
    return this._todos;
  }

  set todos(todos: Todo[]) {
    if (todos === this._todos) {
      return;
    }

    this._todos = todos;
    this.activeTodos = this._todos.filter((todo: Todo) => !todo.completed)
  }

  isEditing = false;

  constructor () {}
  ngOnInit(): void {
    this.todos = todosFromServer;
  }

  trackById(i: number, todo: Todo) {
    return todo.id;
  }

  onAdd(newTitle: string) {
    let newId = getUniqId(this.todos);

    let newTodo: Todo = {
      id: newId,
      title: newTitle,
      completed: false,
    };

    this.todos = [...this.todos, newTodo];
  }

  onTodoRename(todoId: number, title: string) {
    this.todos = this.todos.map((todo: Todo) => {
      if (todo.id !== todoId) {
        return todo;
      }

      return { ...todo, title };
    });
  };

  onTodoToggle(todoId: number) {
    this.todos = this.todos.map((todo: Todo) => {
      if (todo.id === todoId) {
        return { ...todo, completed: !todo.completed }
      };

      return todo;
    })
  };

  onTodoRemove(todoId: number) {
    this.todos = [...this.todos].filter((todo: Todo) => todo.id !== todoId);
  }
}