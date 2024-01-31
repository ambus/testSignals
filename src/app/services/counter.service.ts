import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CounterService {
  counter = signal(0);
  serviceProp: number = 0;
  servicePropStream: BehaviorSubject<number> = new BehaviorSubject(0);
  increment() {
    this.counter.update((count) => count + 1);
  }
  incrementServiceProp() {
    this.serviceProp += 1;
    this.servicePropStream.next(this.serviceProp);
  }
}
