import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: false,
  template: `<span class="badge" [ngClass]="clase">{{ texto }}</span>`,
  styleUrl: './badge.component.scss'
})
export class BadgeComponent {
  @Input({ required: true }) texto = '';

  get clase(): string {
    return this.texto.toLowerCase().replace(' ', '-');
  }
}
