import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { FireBaseService } from 'src/app/services/fire-base.service';
import { IonicComponentsService } from 'src/app/services/ionic-components.service';
import { sha256, sha224 } from 'js-sha256';
import * as firebase from 'firebase';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-registrar-biocard',
  templateUrl: './registrar-biocard.page.html',
  styleUrls: ['./registrar-biocard.page.scss'],
})
export class RegistrarBiocardPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private _fireBase: FireBaseService,
    public router: Router,
    public _comp: IonicComponentsService,
    public loadingController: LoadingController,
    public _storage: StorageService,) { }
  barcodeData = '';

  nonceTitle = '';
  valueTitle = '';
  nonce = '';
  value = '';

  data: any;

  ngOnInit() {
  }

  inValidString(data) {
    if (data.trim() == '') return true;
    else return false;
  }

  campoInvalidos() {
    if (this.nonce.trim() == '' || this.value.trim() == '') return true;
    return false;
  }


  async ionViewDidEnter() {

    this.barcodeData = this.route.snapshot.params.valor;
    console.log('barcodeData11111', this.barcodeData);

    const loading = await this.loadingController.create({
      message: 'Por favor espere...',
      backdropDismiss: false,
      showBackdrop: true,
      spinner: "bubbles"
    });

    await loading.present();

    this._fireBase.geBIOCard(this.barcodeData).then(async (res: any) => {
      console.log('LLEGO', res);

      this.data = res;
      this.nonceTitle = res.nonceTitle;
      this.valueTitle = res.valueTitle;
      loading.dismiss();

    }, err => {
      console.log('EOOOOORRRRRROOO', err);
      loading.dismiss();
      this._comp.presentToast('Código inválido','danger',2000);
    }

    )


  }

  myBackButton() {
    this.router.navigate(['/app/tab3/perfil-biocard']);
  }


  async verificar() {
    console.log('this.value', this.value);
    console.log('this.data.secret', this.data.secret);
    console.log('this.nonce', this.nonce);

    let a_sha256 = sha256(this.nonce)
    console.log('sha256(this.nonce)', a_sha256);

    let codeHash = sha256(this.value + this.data.secret.toString() + a_sha256);
    console.log('codeHash', codeHash);

    if (this.data.hash == codeHash) {
      let did: any = await this._storage.getLocalStorage('DID');

      let data = {
        DID: did,
        dateActivation: firebase.database.ServerValue.TIMESTAMP,
        nonce: this.nonce,
        value: this.value,
        status: 'ACTIVE'
      }

      this.data.dateActivation = firebase.database.ServerValue.TIMESTAMP;
      this.data.nonce = this.nonce;
      this.data.value = this.value;
      this.data.status = 'ACTIVE';
      this.data.pathFireBase = sha256(this.barcodeData);
      this.data.servidor = sha256(this.barcodeData.split("/")[1].toString());

      const loading = await this.loadingController.create({
        message: 'Por favor espere...',
        backdropDismiss: false,
        showBackdrop: true,
        spinner: "bubbles"
      });
      await loading.present();

      this._fireBase.putBIOcard(this.barcodeData, data).then(async (res: any) => {
        console.log(res);
        let biocards: any = [];
        biocards = await this._storage.getLocalStorage('BIOCARDS') || [];
        console.log('Data');

        biocards.unshift(this.data);

        console.log('Almacenar', biocards);

        await this._storage.setLocalStorage('BIOCARDS', biocards);


        loading.dismiss();
        this._comp.presentToast('BIOCard registrado con éxito','success',2000);
        this.myBackButton();
  
      }, err => {
        this._comp.presentToast('Error','danger',2000);
        this.myBackButton();
       
      });


    } else this._comp.presentToast('Datos inválidos','danger',1000);

  }
}
