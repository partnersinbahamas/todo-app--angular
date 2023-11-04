import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from 'src/Types/Todo';

const todosFromServer: Todo[] = [
  { id: 1, title: 'HTML + CSS', completed: true },
  { id: 2, title: 'JS + TS', completed: false },
  { id: 3, title: 'React', completed: false },
  { id: 4, title: 'Angular', completed: false },
];

const API_USER_ID = 3;
const BASE_URL = 'https://mate.academy/students-api';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private http: HttpClient,
  ) {}

  getTodos() {
    return this.http.get<Todo[]>(`${BASE_URL}/todos`)
  }

  createTodo(newTodo: Todo) {
    return  this.http.post<Todo>(`${BASE_URL}/todos`, newTodo)
  }

  removeTodo(todoId: number) {
    return this.http.delete<Todo>(`${BASE_URL}/todos/${todoId}`)
  }
}
