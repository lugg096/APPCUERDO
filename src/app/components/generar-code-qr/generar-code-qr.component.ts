import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { IonicComponentsService } from 'src/app/services/ionic-components.service';
import domtoimage from "dom-to-image";

var imagenB64;

@Component({
  selector: 'app-generar-code-qr',
  templateUrl: './generar-code-qr.component.html',
  styleUrls: ['./generar-code-qr.component.scss'],
})
export class GenerarCodeQRComponent implements OnInit {

  @ViewChild("container", { read: ElementRef, static: true }) container: ElementRef;

  constructor(
    private _modal: ModalController,
    public _storage: StorageService,
    private socialSharing: SocialSharing,
    private clipboard: Clipboard,
    public _comp: IonicComponentsService) {
  }

  title: any = '';
  codeQR: any = '';
  texto: any = '';
  subTitle: any = '';
  label1: any = '';
  text1: any = '';
  label2: any = '';
  text2: any = '';
  textoShare: any = '';

  ngOnInit() {
  }

  ngAfterViewInit() {
    domtoimage
      .toPng(this.container.nativeElement)
      .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        imagenB64 = img.src;
        console.log('momstrar IMG', img.src)

      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      })
  }

  closeModal() {
    this._modal.dismiss({ dataPersonal: null });
  }

  continuar() {
    this._modal.dismiss({
      dataPersonal: {}
    });
  }

  copyText() {
    this.clipboard.copy(this.codeQR);
    this._comp.presentToast('Copiado', 'primary', 100);
  }

  async compartirDireccion() {

    this.socialSharing.share(
      '',
      '',
      imagenB64,
      this.textoShare
    );
  }

}
