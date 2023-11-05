import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject, switchMap, tap, withLatestFrom } from 'rxjs';
import { Todo } from 'src/Types/Todo';

export const API_USER_ID = 6548;
const BASE_URL = 'https://mate.academy/students-api';

@Injectable({
  providedIn: 'root'
})
export class todoService {
  private todos$$ = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todos$$.asObservable();

  constructor(
    private http: HttpClient,
  ) {}

  loadTodos() {
    return this.http.get<Todo[]>(`${BASE_URL}/todos?userId=${API_USER_ID}`)
      .pipe(
        tap((todos) => {
          this.todos$$.next(todos);
        }),
      );
  }

  createTodo(todo: Todo) {
    return this.http.post<Todo>(`${BASE_URL}/todos`, todo)
      .pipe(
        withLatestFrom(this.todos$$),
        tap(([newTodo, todos]) => {
          this.todos$$.next([...todos, newTodo]);
        }),
      );
  }

  updateTodo(toUpdateTodo: Todo) {
    return this.http.patch<Todo>(`${BASE_URL}/todos/${toUpdateTodo.id}`, toUpdateTodo)
      .pipe(
        withLatestFrom(this.todos$$),
        tap(([updatedTodo, todos]) => {
          this.todos$$.next(
            todos.map((todo: Todo) => {
              if (todo.id === toUpdateTodo.id) {
                return updatedTodo;
              }

              return todo;
            })
          );
        }),
      );
  }

  removeTodo({id}: Todo) {
    return this.http.delete<Todo>(`${BASE_URL}/todos/${id}`)
      .pipe(
        withLatestFrom(this.todos$$),
        tap(([_, todos]) => {
          this.todos$$.next(
            [...todos].filter((todo: Todo) => todo.id !== id)
          )
        })
      )
  }
}
