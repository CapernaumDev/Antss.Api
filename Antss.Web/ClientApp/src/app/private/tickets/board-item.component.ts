import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { animate, keyframes, style, transition, trigger } from "@angular/animations";
import { Store } from '@ngrx/store';

import { AppState } from '@app/core/store/app.state';
import { TicketListItem } from '@app/core/models/ticket/ticket-list-item';
import { ServerConfirmationEvent } from '@app/core/interfaces/server-confirmation-event';
import { FilterInputComponent } from '@app/core/components/filter-input.component';

@Component({
  selector: 'div[board-item]',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('confirmationHighlight', [
      transition('*=>myActionConfirmed', animate('600ms', keyframes([
        style({ backgroundColor: 'initial', boxShadow: 'none', offset: 0 }),
        style({ backgroundColor: '#5cff4c', boxShadow: '0 0 5px #5cff4c', offset: 0.01 }),
        style({ backgroundColor: 'initial', boxShadow: 'none', offset: 1 }),
      ]))),
      transition('*=>othersActionConfirmed', animate('1500ms', keyframes([
        style({ backgroundColor: 'initial', boxShadow: 'none', offset: 0, opacity: 0 }),
        style({ backgroundColor: '#6699ff', boxShadow: '0 0 10px #6699ff', opacity: 0.5, offset: 0.5 }),
        style({ backgroundColor: 'initial', boxShadow: 'none', opacity: 1, offset: 1 }),
      ]))),
      transition('*=>addedByOther', animate('1500ms', keyframes([
        style({ backgroundColor: 'initial', boxShadow: 'none', offset: 0, opacity: 0, transform: 'translateX(-100%)' }),
        style({ backgroundColor: '#6699ff', boxShadow: '0 0 10px #6699ff', opacity: 0.5, offset: 0.5, transform: 'translateX(5%)' }),
        style({ offset: 0.6, transform: 'translateX(0%)' }),
        style({ backgroundColor: 'initial', boxShadow: 'none', opacity: 1, offset: 1, transform: 'translateX(0%)' })
      ]))),
      transition('*=>addedByMe', animate('1500ms', keyframes([
        style({ backgroundColor: 'initial', boxShadow: 'none', offset: 0, opacity: 0, transform: 'translateX(-100%)' }),
        style({ backgroundColor: '#5cff4c', boxShadow: '0 0 10px #5cff4c', opacity: 0.5, offset: 0.5, transform: 'translateX(5%)' }),
        style({ offset: 0.6, transform: 'translateX(0%)' }),
        style({ backgroundColor: 'initial', boxShadow: 'none', opacity: 1, offset: 1, transform: 'translateX(0%)' })
      ])))
    ])
  ]
})

export class TicketBoardItemComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef, private store: Store<AppState>) {
  }

  @Input() ticket!: TicketListItem;
  @Input() showConfirmationFor?: ServerConfirmationEvent| null;
  @Input() filterElement!: FilterInputComponent;

  ngOnInit(): void {

  }

  ngOnDestroy() {
  }

  getAnimationName(showConfirmationFor: ServerConfirmationEvent | null | undefined) : string  {
    if (!showConfirmationFor || showConfirmationFor.id != this.ticket.id) return '';

    if (showConfirmationFor.isNew) {
      return showConfirmationFor.initiatedByMe ? 'addedByMe' : 'addedByOther';
    }

    return showConfirmationFor.initiatedByMe ? 'myActionConfirmed' : 'othersActionConfirmed';
  }
}
