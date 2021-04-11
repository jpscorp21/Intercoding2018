import { Component, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.html'
})
export class ProgressBarComponent {

  @ViewChild('barra') barra: ElementRef;
  @Input('numero') numero: string = "2";

  constructor() {

  }

}
