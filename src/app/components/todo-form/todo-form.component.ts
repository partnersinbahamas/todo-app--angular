import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
      validators: [
        Validators.required,
        Validators.minLength(3),
      ]
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
