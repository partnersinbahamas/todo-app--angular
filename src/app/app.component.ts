import { Component, OnInit } from '@angular/core';
import { getUniqId } from 'src/helpers/functions';
import { Todo } from 'src/Types/Todo';
import { API_USER_ID, todoService } from './services/todo.service';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AppComponent  {
  title = 'todo-app--angular';
}