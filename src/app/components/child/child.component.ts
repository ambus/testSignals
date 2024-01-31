import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject, signal } from '@angular/core';
import { HighlightDirective } from '../../directives/highlight/highlight.directive';
import { CounterService } from '../../services/counter.service';
import { CounterComponent } from '../counter/counter.component';

@Component({
  selector: 'mtap-child',
  standalone: true,
  imports: [CounterComponent, CommonModule],
  hostDirectives: [HighlightDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `{{ cd() }}
    <div class="flex items-center gap-2 mb-4">
      <h1 class="inline-block text-2xl font-bold">Child</h1>
      <mtap-counter title="CD" [count]="cdCount" />
      <mtap-counter title="Signal" [count]="signal()" />
      <mtap-counter title="Prop" [count]="prop" />

      @if (depth === 1) {
        <mtap-counter title="Service Prop" [count]="(counterService.servicePropStream | async) || 0" />
        <mtap-counter title="From service" [count]="counterService.counter()" />
      }
    </div>
    <button class="btn mb-4 mr-2" (click)="increment()">Increment</button>
    <button class="btn mb-4 mr-2" (click)="incrementProp()">Increment (prop)</button>
    @if (!intervalId) {
      <button class="btn mb-4 mr-2" (click)="start()">Start increment on interval</button>
    } @else {
      <button class="btn mb-4 mr-2" (click)="stop()">Stop increment on interval</button>
    }
    @if (depth === 0) {
      <button class="btn mb-4 mr-2" (click)="counterService.incrementServiceProp()">Increment prop (service)</button>
      <button class="btn mb-4 mr-2" (click)="counterService.increment()">Increment (service)</button>
    }
    @if (depth > 1) {
      <mtap-child [depth]="depth - 1" />
    } `,
})
export class ChildComponent {
  @Input() depth = 0;

  private highlight = inject(HighlightDirective);

  protected counterService = inject(CounterService);

  public signal = signal(0);
  public intervalId?: number;
  public cdCount = 0;
  public prop = 0;

  cd() {
    this.cdCount++;
    this.highlight.highlight();
    console.warn(this.counterService.serviceProp);
  }

  incrementProp() {
    this.prop++;
  }

  increment() {
    this.signal.set(this.signal() + 1);
  }

  start() {
    this.intervalId = setInterval(() => {
      this.increment();
    }, 1000) as unknown as number;
  }

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = undefined;
  }
}
