import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'mtap-counter',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cursor-default inline-block rounded-xl py-1 px-2 bg-blue-500 text-sm">
      <span class="text-blue-200 inline-block mr-2">{{ title }}</span>
      <span class="text-white font-bold">{{ count }}</span>
    </div>
  `,
})
export class CounterComponent {
  @Input() title = 'Counter';
  @Input() count = 0;
}
