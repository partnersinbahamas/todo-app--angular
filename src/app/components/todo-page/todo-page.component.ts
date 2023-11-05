import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, distinctUntilChanged, map, switchMap } from 'rxjs';
import { Statuses } from 'src/Types/Statuses';
import { Todo } from 'src/Types/Todo';
import { MessageService } from 'src/app/services/message.service';
import { API_USER_ID, todoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent implements OnInit {
  todos$ = this.todoService.todos$
  todosCount = this.todos$.pipe(
    distinctUntilChanged(),
    map(todos => todos.length),
  );

  activeTodos$ = this.todos$.pipe(
    distinctUntilChanged(),
    map((todos) => todos.filter(todo => !todo.completed)),
  );

  completedTodos$ = this.todos$.pipe(
    distinctUntilChanged(),
    map((todos) => todos.filter(todo => todo.completed)),
  );

  activeCount = this.activeTodos$.pipe(
    map(todos => todos.length),
  );

  completeTodos = this.completedTodos$.pipe(
    map((todo) => todo)
  )

  visibleTodos$ = this.router.params.pipe(
    switchMap(params => {
      switch(params['status'] as Statuses) {
        case 'active':
          return this.activeTodos$;

        case 'completed':
          return this.completedTodos$;

        default:
          return this.todos$;
      }
    })
  )

  isEditing = false;

  constructor (
    private todoService: todoService,
    private messageService: MessageService,
    private router: ActivatedRoute,
  ) {}


  ngOnInit(): void {
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

  removeCompleted(todos: Observable<Todo[]>) {
    todos.subscribe(todos => {
      todos.forEach((todo) => this.todoService.removeTodo(todo)
        .subscribe({
          error: () => this.messageService.showMessage('Unable to remove todos.')
        }))
    })
  }

  onAdd(newTitle: string) {
    // const newId = getUniqId(this.todos);

    const newTodo: Todo = {
      title: newTitle,
      completed: false,
      userId: API_USER_ID,
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
