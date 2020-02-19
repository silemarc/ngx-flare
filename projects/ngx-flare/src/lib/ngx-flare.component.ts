import {AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {FlarePlayer} from './flare-player';

@Component({
  selector: 'ngx-flare',
  template: `
    <canvas class="fill" id="canvas" #canvas></canvas>
  `,
  styles: ['.fill{width: 100%; height: 100%}']
})
export class NgxFlareComponent implements OnChanges, AfterViewInit {
  @ViewChild('canvas')
  canvas: ElementRef;

  @Input()
  source?: string;

  @Input()
  animation?: string;

  @Input()
  playing = true;
  loaded = false;
  example: FlarePlayer;

  get playPosition() {
    return this.example.getPosition();
  }

  @Input()
  set playPosition(position: number) {
    if (this.example) {
      this.example.setPosition(position);
    }
  }

  ngAfterViewInit() {
    this.initializePlayer();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.source || changes.animation) {
      if (this.example) {
        this.example.reset();

        if (changes.playing) {
          this.playing ? this.example.play() : this.example.pause();
        }
      }
      if (this.canvas) {
        this.initializePlayer();
      }
    }

  }

  initializePlayer() {
    this.example = new FlarePlayer(this.canvas.nativeElement, this.source, this.animation);
    this.example.init();
    this.example.setPosition(this.playPosition);
    if (this.playing) {
      this.example.play();
    }
  }
}
