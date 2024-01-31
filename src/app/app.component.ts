import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ChildComponent } from './components/child/child.component';
import { CounterComponent } from './components/counter/counter.component';
import { HighlightDirective } from './directives/highlight/highlight.directive';

@Component({
  selector: 'mtap-root',
  standalone: true,
  imports: [CounterComponent, ChildComponent],
  hostDirectives: [HighlightDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `{{ cd() }}
    <div class="flex items-center gap-2 mb-4">
      <h1 class="text-3xl font-bold">Angular Signals i change detection</h1>
      <mtap-counter title="CD" [count]="cdCount" />
    </div>

    <p class="text-lg mb-4">
      <span class="font-bold text-fuchsia-500">Różowy</span> kolor sygnalizuje to że komponent wykonuje template
      bindings które jest wynikiem changeDetection.
    </p>

    <ul class="list-disc ml-4">
      <li class="pb-1">Inicjalne CD w momencie startu aplikacji</li>
      <li class="pb-1">Klikanie przycisku "Increment" trigeruje standardowy <code>OnPush</code> CD (sub-tree)</li>
      <li class="pb-1">
        Sygnały aktualizowane bez uruchamiania CD np. timeout, interval lub z jakiś serwisów, triggerują jedynie lokalny
        CD dla komponentów z ustawioną strategią <code>OnPush</code>
      </li>
    </ul>

    <div class="flex gap-4">
      <mtap-child [depth]="3" />
      <mtap-child />
    </div> `,
})
export class AppComponent {
  private highlight = inject(HighlightDirective);

  protected cdCount = 0;

  cd() {
    this.cdCount++;
    this.highlight.highlight();
  }
}
