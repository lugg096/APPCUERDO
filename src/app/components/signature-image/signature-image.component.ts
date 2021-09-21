import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import SignaturePad from 'signature_pad'


@Component({
  selector: 'app-signature-image',
  templateUrl: './signature-image.component.html',
  styleUrls: ['./signature-image.component.scss'],
})
export class SignatureImageComponent implements OnInit {

  @ViewChild('canvas') signaturePadElement;
 /*  @Input() imageSignature: string; */

  signaturePad: any;
  canvasWidth: number;
  canvasHeight: number;

  @Output() imageSignature = new EventEmitter<string>();

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.init();
  }


  init() {
    const canvas: any = this.elementRef.nativeElement.querySelector('canvas');
    canvas.width = window.innerWidth - 50;
    canvas.height = window.innerHeight - 380;
    if (this.signaturePad) {
      this.signaturePad.clear(); 
    }
  }

  public ngAfterViewInit(): void {
    this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement);
    this.signaturePad.clear();
    this.signaturePad.minWidth = 1;
    this.signaturePad.maxWidth = 2.5;
    this.signaturePad.penColor = '#000';
  }

  save(): void {
    const img:string = this.signaturePad.toDataURL();
/*     this.imageSignature = img; */
    console.log('IMAGEN', img);
    this.imageSignature.emit(img);
  }

  isCanvasBlank(): boolean {
    if (this.signaturePad) {
      return this.signaturePad.isEmpty() ? true : false;
    }
  }

  clear() {
    this.signaturePad.clear();
  }

  undo() {
    const data = this.signaturePad.toData();
    if (data) {
      data.pop();
      this.signaturePad.fromData(data);
    }
  }

}
