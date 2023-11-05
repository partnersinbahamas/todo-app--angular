import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Todo } from 'src/Types/Todo';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {
  @Output() save = new EventEmitter();

  todosForm = new FormGroup({
    typing: new FormControl('', {
      nonNullable: true,
    }),
  });

  get typing() {
    return this.todosForm.get('typing') as FormControl;
  };

  handleFormSubmit() {
    if (this.todosForm.invalid) {
      return;
    }

    this.save.emit(this.typing.value);
    this.todosForm.reset();
  }
}
