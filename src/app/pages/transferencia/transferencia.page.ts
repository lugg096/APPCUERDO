import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { sha256 } from 'js-sha256';
import { FireBaseService } from 'src/app/services/fire-base.service';
import { StorageService } from 'src/app/services/storage.service';
import * as firebase from 'firebase';
import { AlertController, IonSlides, LoadingController } from '@ionic/angular';
import { IonicComponentsService } from 'src/app/services/ionic-components.service';
import { Clipboard } from '@ionic-native/clipboard/ngx';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.page.html',
  styleUrls: ['./transferencia.page.scss'],
})
export class TransferenciaPage implements OnInit {

  @ViewChild('slidesPadre', { static: false }) private slidesPadre: IonSlides;

  constructor(
    private clipboard: Clipboard,
    public _fireBase: FireBaseService,
    public router: Router,
    public _storage: StorageService,
    public loadingController: LoadingController,
    public _comp: IonicComponentsService,
    public alertController: AlertController,) { }

  slideOptsOnboarding = {
    allowSlideNext: false,
    allowSlidePrev: false,
    slidesPerView: 1,
    initialSlide: 0,
    speed: 400
  };

  comprar = '';
  email = '';
  cred = '0.0';
  credifirmas = '';
  transferencias = [];
  data: any = {
    PHOTO: ''
  };


  ngOnInit() {
  }

  ionViewDidEnter() {
    this.email = '';
    this.cred = '';
    this.getData();
  }

  nextSlidePadre() {
    this.slidesPadre.lockSwipeToNext(false);
    this.slidesPadre.slideNext();
    this.slidesPadre.lockSwipeToNext(true);
  }

  backSlidePadre() {
    this.slidesPadre.lockSwipeToPrev(false);
    this.slidesPadre.slidePrev();
    this.slidesPadre.lockSwipeToPrev(true);
  }

  async recibir() {
    const alert = await this.alertController.create({
      cssClass: 'alert-validar',
      message: ' <div class="text-center">' +
        ' </div> <p class="text-wrap text-center mt-2"><b style="font-size: 11px; color: rgba(0, 0, 0, 0.768);">Recibir credifirmas </b> <br>' +
        ' <small style="color: darkgrey;">Comparte email con otros usuarios para recibir transferencias. <br><b>' + this._storage.datos.EMAIL + '</b></small> ',
      buttons: [
        {
          text: 'Copiar email',
          handler: async () => {
            this.clipboard.copy(this._storage.datos.EMAIL);
            this._comp.presentToast('Copiado', 'primary', 1000);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });

    await alert.present();
  }

  async getData() {
    this.transferencias = await this._storage.getLocalStorage('TRANSFERENCIAS');
    this.credifirmas = await this._storage.getLocalStorage('CREDIFIRMAS');
    this.comprar = 'https://appcuerdo.com/sales/?i=' + this._storage.datos.SINBOX_ID + '&e=' + this._storage.datos.EMAIL_B64 + '&n=' + this._storage.datos.NAME_B64 + '&d=' + this._storage.datos.DNI_B64;
  }

  goInicio() {
    this.router.navigate(['/app/inicio']);
  }

  campoInvalidos() {
    const re = /[^@]+@[^@]+\.[^@]+$/;
    if (this.cred == '' || this.email.trim() == '' || !re.test(this.email)) return true;
    return false;
  }

  async validar() {

    if (this.email == this._storage.datos.EMAIL) {
      this._comp.presentToast('No puedo usar su propio email', 'danger', 3000);
      return;
    }

    if (Number(this.cred) < 1) {
      this._comp.presentToast('Cantidad a transferir inválida', 'danger', 3000);
      return;
    }

    if (this.cred > this.credifirmas) {
      this._comp.presentToast('No tiene cantidad de credefirmas a transferir', 'danger', 3000);
      return;
    }


    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmar',
      message: 'Transferir ' + this.cred + ' credifirmas al usuario de email <b>' + this.email + '</b>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          handler: async () => {
            this.enviar();
          }
        }
      ]
    });

    await alert.present();



  }

  async enviar() {
    let signBox_Id = sha256(this.email.toLowerCase().trim());
    let data = {
      did: this._storage.datos.DID,
      status: "INI",
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      transaction: "Tranfderencia",
      type: "credit",
      value: this.cred + ''
    }

    const loading = await this.loadingController.create({
      message: 'Por favor espere...',
      backdropDismiss: false,
      showBackdrop: true,
      spinner: "bubbles"
    });

    await loading.present();
    this._fireBase.insertSignBox(signBox_Id, data).then(async res => {
      let cf = await this._storage.getLocalStorage('CREDIFIRMAS');
      this._storage.setLocalStorage('CREDIFIRMAS', Number(cf) - Number(this.cred));

      let enviado = {
        did: this.email,
        from: "ENVIADO",
        timestamp: new Date(),
        value: this.cred
      }
      let trans = await this._storage.getLocalStorage('TRANSFERENCIAS');
      trans.unshift(enviado);
      this._storage.setLocalStorage('TRANSFERENCIAS', trans);

      this.getData();
      loading.dismiss();
      this.backSlidePadre();
      this._comp.presentToast('Tranferencia con éxito', 'success', 3000);
    },err=>{
      this.getData();
      loading.dismiss();
      this.backSlidePadre();
      this._comp.presentToast('Error en tranferencia', 'danger', 2000);
    })
  }
}
