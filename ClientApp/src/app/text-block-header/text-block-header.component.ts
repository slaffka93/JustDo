import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'text-block-header',
  templateUrl: './text-block-header.component.html'
})
export class TextBlockHeader {
  @Input() header: string;

  constructor(private location: Location) { }

  back() {
    this.location.back();
  }
}
