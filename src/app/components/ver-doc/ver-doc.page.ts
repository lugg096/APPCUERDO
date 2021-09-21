import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
/* import { LacchainQrComponent } from '../lacchain-qr/lacchain-qr.component'; */
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { FireBaseService } from 'src/app/services/fire-base.service';
import { map } from 'rxjs/operators';
import { IonSlides } from '@ionic/angular';
import { GenerarCodeQRComponent } from '../generar-code-qr/generar-code-qr.component';

@Component({
  selector: 'app-ver-doc',
  templateUrl: './ver-doc.page.html',
  styleUrls: ['./ver-doc.page.scss'],
})
export class VerDocPage implements OnInit {

  constructor(
    private _modal: ModalController,
    private socialSharing: SocialSharing,
    private _fireBase: FireBaseService,
    public alertController: AlertController) { }

  @ViewChild('slides', { static: false }) private slides: IonSlides;

  cancel = null;
  data: any; //data Storage
  dataFire: any = {//data de firebase
    filename: '',
    filesize: '',
    creatoricon: '',
    fileimg: '',
    fileurl: ''
  };

  path = '';
  listDataDoc: any = [];
  listDataDoc_aux: any = []

  slideOpts = {
    slidesPerView: 1,
    initialSlide: 0,
    speed: 400
  };


  compartir() {
    this.socialSharing.share(
      'Puedes ver el documento ' + this.dataFire.filetitle + ' desde: ',
      '',
      '',
      'http://appcuerdo.com/filesout/sign_' + this.pathDoc
    );
  }

  myBackButton() {
    this._modal.dismiss();
  }


  invitar() {
    this._modal.create({
      component: GenerarCodeQRComponent,
      componentProps: {
        title: 'Invitar a firmar',
        codeQR: this.cancel ? this.data.pathCancelado : this.data.pathFireBase,
        subTitle: this.dataFire.filetitle,
        label1: 'Código de seguridad',
        text1: this.dataFire.pinvalue,
        textoShare: 'Firma el documento ' + this.dataFire.filetitle + ' usando el código este seguridad: ' + this.dataFire.pinvalue
      }
    }).then((modal) => modal.present());
  }


  verFirma() {
    let p1 = this.data.signature.substring(0, 10);
    let p2 = this.data.signature.substring(this.data.signature.length - 10, this.data.signature.length);


    let p3 = this.data.lacchain_tx.substring(0, 10);
    let p4 = this.data.lacchain_tx.substring(this.data.lacchain_tx.length - 10, this.data.lacchain_tx.length);

    this._modal.create({
      component: GenerarCodeQRComponent,
      componentProps: {
        title: 'Firma electrónica',
        codeQR: 'http://explorer.lacchain.net/tx/' + this.data.lacchain_tx,
        subTitle: 'Lacchain',
        label1: 'Firma (rawTransaction)',
        text1: p1 + '...' + p2,
        label2: 'Transacción (transactionHash)',
        text2: p3 + '...' + p4,
        textoShare: 'http://explorer.lacchain.net/tx/' + this.data.lacchain_tx
      }
    }).then((modal) => modal.present());
  }

  retrieveDoc(): void {
    console.log('Entro');

    this._fireBase.getAll(this.cancel ? this.data.pathCancelado : this.data.pathFireBase).snapshotChanges().pipe(
      map(changes =>
        changes.map((c: any) =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.listDataDoc = data;
      this.listDataDoc_aux = [];
      if (data.length < 4) this.listDataDoc_aux = data;
      else for (var i = 0; i < 4; i++) this.listDataDoc_aux.push(data[i]);
      console.log('REAL TIMEEEEE', data);
      ;
    });
  }

  name(nombre) {
    nombre = nombre.split(" ");
    if (nombre.length > 1) nombre = nombre[0] + " " + nombre[1].substr(0, 1);
    return nombre;
  }

  nextSlide() {
    this.slides.slideNext();
  }

  pathOriginal = '';
  pathCredencial = '';
  pathDocCred = '';


  public codeDoc = '';
  public typeDoc = '';
  public pathDoc = ''

  public load = true;

  ionViewDidEnter() {
    this.load = true;

    this._fireBase.singFirma(this.cancel ? this.data.pathCancelado : this.data.pathFireBase).then(async (res: any) => {
      this.dataFire = res;
      console.log('mostrar RESSS', res);

      this.path = this.dataFire.fileimg.replace(' ', '');

      console.log('IMG ORIGINAL', this.path);

      this.pathDoc = this.dataFire.fileurl.substr(27, this.dataFire.fileurl.length);
      let pathDocArray = this.pathDoc.split(".");


      this.codeDoc = pathDocArray[0];
      this.typeDoc = pathDocArray[1].toUpperCase();
      console.log('VER CODE111', this.codeDoc);
      console.log('VER PDF', this.typeDoc);
      this.load = false;
    })


    this.retrieveDoc();
  }
  ngOnInit() {

  }


  async verUser(user) {
    console.log(user);

    const alert = await this.alertController.create({
      cssClass: 'aler-imgDidUser',
      message: ' <div class="text-center"><img class="imgUser" src="data:image/jpg;base64,' + user.photo + '"> </div> <p class="text-wrap text-left mt-2"><b style="font-size: 11px; color: rgba(0, 0, 0, 0.768);">' + user.name + ' </b> <br> <small style="color: darkgrey;"> <b>DID.</b>' + user.did + '</b> <br> <b>PublicKey.</b>' + user.public_key + '</small> </p>',
      buttons: ['OK']
    });

    await alert.present();
  }

}
