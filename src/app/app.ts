import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuizComponent } from './features/quiz/quiz';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, QuizComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('pokemon-type-chart-quiz');
}
