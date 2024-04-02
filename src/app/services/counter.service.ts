import { Injectable, computed, effect, model, output, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CounterService {
  counter = signal(0);
  futureCounter = computed(() => this.counter() + 1);
  modelExample = model('');
  outputExample = output<string>();

  serviceProp: number = 0;
  servicePropStream: BehaviorSubject<number> = new BehaviorSubject(0);
  increment() {
    this.counter.update((count) => count + 1);
  }
  incrementServiceProp() {
    this.serviceProp += 1;
    this.servicePropStream.next(this.serviceProp);
  }

  constructor() {
    effect(() => {
      console.log('counter: ', this.counter());
    });

    this.outputExample.emit('New Value');
  }
}
