import { AfterContentChecked, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getUniqId } from 'src/helpers/functions';
import { Todo } from 'src/Types/Todo';
import { todoService } from './services/todo.service';
import { MessageService } from './services/message.service';

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

  message = '';

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
    private todoService: todoService,
    private messageService: MessageService,
  ) {}


  ngOnInit(): void {
    this.todoService.todos$
      .subscribe(todos => this.todos = todos);

    this.todoService.loadTodos()
      .subscribe({
        error: () => {
          this.messageService.showMessage('Unable to load todos.')
        }
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
      userId: 3,
    };

    this.todoService.createTodo(newTodo)
      .subscribe({
        error: () => {
          this.messageService.showMessage('Unable to create todo.')
        }
      });
  }

  onTodoRename(todo: Todo, title: string) {
    return this.todoService.updateTodo({ ...todo, title, })
      .subscribe({
        error: () => {
          this.messageService.showMessage('Unable to update todo');
        }
      });
  };

  onTodoToggle(todo: Todo) {
    return this.todoService.updateTodo({ ...todo, completed: !todo.completed })
      .subscribe({
        error: () => {
          this.messageService.showMessage('Unable to update todo');
        }
      });
  };

  onTodoRemove(todo: Todo) {
    return this.todoService.removeTodo(todo)
      .subscribe({
        error: () => {
          this.messageService.showMessage('Unable to remove todo')
        }
      });
  }
}