import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {
  @Input() title = 'Error';

  isHidden = true;
  message = '';
  destroy$$ = new Subject();

  constructor(
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.messageService.message$
    .pipe(
      takeUntil(this.destroy$$),
    )
      .subscribe(text => {
      console.log('2');
      this.isHidden = false;
      this.message = text;
    })
  }

  ngOnDestroy(): void {
    this.destroy$$.next(null);
    this.destroy$$.complete();
  }
}
