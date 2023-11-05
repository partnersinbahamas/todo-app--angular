import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input() title = 'Error';

  isHidden = true;
  message = '';

  constructor(
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.messageService.message$.subscribe(text => {
      this.isHidden = false;
      this.message = text;
    })
  }
}
