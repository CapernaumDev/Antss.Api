import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { animate, keyframes, style, transition, trigger } from "@angular/animations";

import { TicketListItem } from '@app/core/models/ticket/ticket-list-item';
import { FilterInputComponent } from '@app/core/components/filter-input.component';
import { Store } from '@ngrx/store';
import { ticketAnimationPlayed } from '@app/core/store/actions';

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
        style({ backgroundColor: 'initial', boxShadow: 'none', offset: 0, opacity: 0.5, transform: 'translateY(-100%)' }),
        style({ backgroundColor: '#6699ff', boxShadow: '0 0 10px #6699ff', opacity: 1, offset: 0.5, transform: 'translateY(5%)' }),
        style({ offset: 0.6, transform: 'translateY(0%)' }),
        style({ backgroundColor: 'initial', boxShadow: 'none', opacity: 1, offset: 1, transform: 'translateY(0%)' })
      ]))),
      transition('*=>addedByMe', animate('1500ms', keyframes([
        style({ backgroundColor: 'initial', boxShadow: 'none', offset: 0, opacity: 0.5, transform: 'translateY(-100%)' }),
        style({ backgroundColor: '#5cff4c', boxShadow: '0 0 10px #5cff4c', opacity: 1, offset: 0.5, transform: 'translateY(5%)' }),
        style({ offset: 0.6, transform: 'translateY(0%)' }),
        style({ backgroundColor: 'initial', boxShadow: 'none', opacity: 1, offset: 1, transform: 'translateY(0%)' })
      ])))
    ])
  ]
})

export class TicketBoardItemComponent implements OnInit {
  constructor(private store: Store) {
  }

  @Input() ticket!: TicketListItem;
  @Input() filterElement!: FilterInputComponent;

  ngOnInit(): void {
  }

  animationComplete(animation: string | null) {
    if (animation)
      this.store.dispatch(ticketAnimationPlayed({ ticketId: this.ticket.id }));
  }

  ngOnDestroy() {
  }
}
