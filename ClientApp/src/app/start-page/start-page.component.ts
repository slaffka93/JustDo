import { Component, TemplateRef, Input } from '@angular/core';

@Component({
  selector: 'start-page',
  templateUrl: './start-page.component.html',
})

export class StartPageComponent {
  @Input() contentControl: TemplateRef<any>;
}
