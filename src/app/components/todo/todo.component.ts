import { AfterViewChecked, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Todo } from 'src/Types/Todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  @Input() todo!: Todo;
  @Output() remove = new EventEmitter();
  @Output() rename = new EventEmitter<string>();
  @Output() toggle = new EventEmitter();

  isEditing = false;
  title = '';

  @ViewChild('titleInput')
  set titleInput(field: ElementRef) {
    if (field) {
      field.nativeElement.focus();
    }
  }

  onEdit() {
    this.isEditing = true;
    this.title = this.todo.title;
  }

  onSave() {
    if (!this.isEditing) {
      return;
    };

    // this.isEditing = false;
    this.rename.emit(this.title);
  }
}
