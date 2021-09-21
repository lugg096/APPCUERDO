import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ver-foto',
  templateUrl: './ver-foto.component.html',
  styleUrls: ['./ver-foto.component.scss'],
})
export class VerFotoComponent implements OnInit {


  @ViewChild('slider', { read: ElementRef }) slider: ElementRef;

  constructor(private _modal: ModalController) { }

  ngOnInit() { }

  public img;

  sliderOpts = {
    preventInteractionOnTransition:true,
    zoom: {
      maxRatio: 5
    }
  }

  closeModal() {
    this._modal.dismiss();
  }

  zoom(zoomIn: boolean) {
    let zoom = this.slider.nativeElement.swiper.zoom;
    if (zoomIn) zoom.in();
    else zoom.out();
  }

}
