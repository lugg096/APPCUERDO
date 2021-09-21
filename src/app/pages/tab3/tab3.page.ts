import { Component, OnInit } from '@angular/core';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { VerFotoComponent } from 'src/app/components/ver-foto/ver-foto.component';
import { GenerarCodeQRComponent } from 'src/app/components/generar-code-qr/generar-code-qr.component';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  public codeQRmin;

  constructor(
    public loadingController: LoadingController,
    public _storage: StorageService,
    private socialSharing: SocialSharing,
    public actionSheetController: ActionSheetController,
    public dataLocal: StorageService,
    private _modal: ModalController,
    public router: Router) { }

  addres: any = 'null';

  ngOnInit() {
    this.getData();
  }

  async getData() {
    this.addres = this._storage.datos.ADDRESS;
    this.codeQRmin = this.addres.substring(0, 7) + "..." + this.addres.substring(this.addres.length - 7, this.addres.length);
  }

  slideOpts = {
    slidesPerView: 1,
    initialSlide: 0,
    speed: 400
  };

  async verQR(title, codeQR, subTitle) {

    const modal = await this._modal.create({
      component: GenerarCodeQRComponent,
      componentProps: {
        title: title,
        codeQR: codeQR,
        subTitle: subTitle,
        label1: '',
        text1: codeQR,
        textoShare: 'Mi ' + subTitle + ' de Appcuerdo es ' + codeQR
      },
    }).then((modal) => modal.present());
  }


  async compartirDireccion() {
    this.socialSharing.share(
      'Este es mi DID de Appcuerdo : ',
      '',
      '',
      this.addres
    );
  }



  goInicio() {
    this.router.navigate(['/app/inicio']);
  }

  verFoto(path) {
    this._modal.create({
      component: VerFotoComponent,
      componentProps: {
        img: path
      }
    }).then((modal) => modal.present());
  }

  generarQR() {

    this._modal.create({
      component: GenerarCodeQRComponent,
      componentProps: {
        codeQR: localStorage.getItem('ADDRESS')
      }
    }).then((modal) => modal.present());
  }
}
