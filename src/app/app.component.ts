import { AfterContentChecked, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getUniqId } from 'src/helpers/functions';
import { Todo } from 'src/Types/Todo';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
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

  constructor (
    private TodoService: TodoService,
  ) {}

  ngOnInit(): void {
    this.TodoService.getTodos()
      .subscribe((todos: Todo[]) => {
        console.log(todos);
        this.todos = todos
      })
  }

  trackById(i: number, todo: Todo) {
    return todo.id;
  }

  onAdd(newTitle: string) {
    const newId = getUniqId(this.todos);
    console.log('id: ', newId);

    const newTodo: Todo = {
      id: new Date().getSeconds(),
      title: newTitle,
      completed: false,
    };

    console.log(newTodo);

    this.TodoService.createTodo(newTodo)
      .subscribe((todo: Todo) => {
        this.TodoService.getTodos()
          .subscribe((todos: Todo[]) => {
            this.todos = todos;
          })
      })
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
    return this.TodoService.removeTodo(todoId)
      .subscribe((todoAPI: Todo) => {
        this.todos = [...this.todos].filter((todo: Todo) => todo.id !== todoId);
      })
  }
}