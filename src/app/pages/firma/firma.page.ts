import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { sha256, sha224 } from 'js-sha256';
import * as sha1 from 'js-sha1';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicComponentsService } from 'src/app/services/ionic-components.service';

import { StorageService } from 'src/app/services/storage.service';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { FireBaseService } from 'src/app/services/fire-base.service';
import * as firebase from 'firebase';
import { DataService } from 'src/app/services/data-service.service';
import { subscribeOn } from 'rxjs/operators';
import { ApiAppcuerdoService } from 'src/app/services/api-appcuerdo.service';


@Component({
  selector: 'app-firma',
  templateUrl: './firma.page.html',
  styleUrls: ['./firma.page.scss'],
})
export class FirmaPage implements OnInit {

  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('slidesPadre', { static: false }) private slidesPadre: IonSlides;
  public data: any;

  /* Variables PIN */
  public pin: string = '';
  public codigo: string = '';

  public imgSiganture: string = '';
  public barcodeData: string = '';
  public servidorCard: any = null;
  public load = true;

  /* Variables tipo de firma */
  public solicitarPk = false;
  public pinKey = false;
  public signKey = false;


  formInvalid = true;
  vote: any = {};
  optionsVote: any = [];
  camposFormulario: any = [];
  datosEnStorage: any = [];

  constructor(
    private barcodeScanner: BarcodeScanner,
    public router: Router,
    public _comp: IonicComponentsService,
    public _onboarding: ApiAppcuerdoService,
    public _storage: StorageService,
    private _modal: ModalController,
    private _fireBase: FireBaseService,
    private route: ActivatedRoute,
    public loadingController: LoadingController,
    private _data: DataService,
    public alertController: AlertController,
  ) { }

  dataFireBase: any = {
    datarequest: '',
    creatoricon: '',
    filestatus: '',
    filestatuscode: '',
    filetitle: '',
    creatorname: '',
    fileimg: ''
  };


  dataReqFirma: any = {
    operacion: 'sendTransaction',
    message: '',
    publicKeyTo: '',
    privateKey: ''
  };

  slideOptsOnboarding = {
    allowSlideNext: false,
    allowSlidePrev: false,
    slidesPerView: 1,
    initialSlide: 0,
    speed: 400
  };

  ngOnInit() {
  }


  inValidString(data) {
    if (data.trim() == '') return true;
    else return false;
  }

  fin() {
    this.router.navigate(['/app/inicio']);
  }

  async updateDataLocal() {
    let cf = await this._storage.getLocalStorage('CREDIFIRMAS');
    this._storage.setLocalStorage('CREDIFIRMAS', Number(cf) - 1);
    this._data.changeMessage(this.dataFireBase.pathFireBase);
  }

  closeModal() {
    this._modal.dismiss({ dataPersonal: null });
  }

  inputformInvalid() {
    let valid = 0;
    for (var i = 0; i < this.camposFormulario.length; i++) {

      if (this.camposFormulario[i].valor == '' || this.camposFormulario[i].valor.trim() == '') {
        console.log(this.camposFormulario[i].valor);
        valid++;
      }

      if (this.camposFormulario.length - 1 == i) {
        if (valid == 0) this.formInvalid = false;
        else this.formInvalid = true;
      }
    }
  }


  scanBIOCard() {
    this.barcodeScanner.scan({ prompt: "Por favor, lea el código QR de su BIO-CARD." }).then(async (pathFB: any) => {
      if (!pathFB.cancelled) {
        this._fireBase.geBIOCard(pathFB.text).then(async (res: any) => {
          if (!res) {
            this._comp.presentToast('Código inválido', 'danger', 2000);
            this.router.navigate(['/app/inicio']);
          }

          let did = await this._storage.getLocalStorage('DID');

          if (res.status == 'ACTIVE' && did == res.DID) {
            this.nextSlidePadre();
          } else {
            this.router.navigate(['/app/inicio']);
            if (res.status != 'ACTIVE') this._comp.presentToast('BIOCard inactivo', 'danger', 2000);
            if (did != res.DID) this._comp.presentToast('BIOCard no registrada en su aplicativo', 'danger', 2000);
          }
        }, err => {
          this._comp.presentToast('Código inválido', 'danger', 2000);
          this.router.navigate(['/app/inicio']);
        })

      }
    }).catch(err => {
      this._comp.presentToast('Error en lectura QR', 'danger', 2000);
      this.router.navigate(['/app/inicio']);
    })
  }


  validarCode() {
    if (sha256(this.codigo.toString()) == this.dataFireBase.hashcode) this.nextSlidePadre();
    else this._comp.presentToast('Código de seguridad inválido', 'danger', 2000);
  }


  public camposRequeridos = [];
  public servidorBIOCard;
  path = '';
  public isDocSingbox = false;


  async confirmarVoto(data) {
    let textHeader = 'Confirmar voto!';
    let textMessage = 'Quiere confirmar su voto a <strong>' + data.opcion + '</strong>?';

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: textHeader,
      message: textMessage,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Aceptar',
          handler: async () => {
            this.vote = data;
            this.nextSlidePadre();
          }
        }
      ]
    });

    await alert.present();
  }

  getDataFirma() {
    this.load = true;
    console.log(this.barcodeData);

    this._fireBase.singFirma(this.barcodeData).then(async (res: any) => {
      this.dataFireBase = res;
      console.log(res);
      if (!res) {
        this._comp.presentToast('Código inválido', 'danger', 2000);
        this.router.navigate(['/app/inicio']);
        return;
      }
      if (res.filestatuscode != 'PROC') {
        this._comp.presentToast('Documento inactivo', 'danger', 2000);
        this.router.navigate(['/app/inicio']);
        return;
      }

      /* OPCION DE VOTOS */
      if (this.dataFireBase.modesign == "VOTES") this.optionsVote = JSON.parse(this.dataFireBase.votes).votes;

      this.dataFireBase.fileimg = this.dataFireBase.fileimg.replace(' ', '');//Correccion de espacion 
      this.dataFireBase.pathFireBase = this.barcodeData;
      this.dataReqFirma.publicKeyTo = res.publicKeyTo;

      await this.configCampos(res.datarequest);
      await this.configPermisos(res.type);
      this.load = false;
    }, err => {
      this.load = false;
      this._comp.presentToast('Error en servidor', 'danger', 2000);
      this.router.navigate(['/app/inicio']);
    })
  }

  async ionViewDidEnter() {
    this.data = await this._storage.getLocalStorage('DATA');
    this.camposFormulario = [];
    this.backSlidePadre();

    this.barcodeData = this.route.snapshot.params.valor;
    console.log('LLEVO PARAMETRO', this.barcodeData);

    if (this.barcodeData.substring(0, 7) == 'SINGBOX') {/* Para saber si esta en singBox */
      this.isDocSingbox = true;
      this.barcodeData = this.barcodeData.substring(7, this.barcodeData.length);
    }
    this.getDataFirma();

  }

  configCampos(dataReq) {
    /* ERROR -> FUNCION EN DESUSO  */
    return new Promise(async (resolve) => {
      if (dataReq == '') resolve(true);

      let campos = dataReq.split("|");

      for (var i = 0; i < (campos.length - 1); i++) {
        let campo = campos[i].split(":");
        let dtStorage = await this._storage.getLocalStorage(campo[0]);
        if (dtStorage) {
          this.datosEnStorage.push(campo[0]);
        } else {
          this.camposFormulario.push({
            nombre: campo[0],
            descripcion: campo[1] || '',
            type: campo[2] || 'text',
            valor: ''
          })
        }
        if (i == campos.length - 2) resolve(true);
      }
    })
  }


  configPermisos(docType) {
    return new Promise((resolve) => {
      let permisos: string[] = docType.split("|");
      permisos.forEach((p: string, index) => {
        if (p.length > 9) {
          if (p.substring(0, 10) == 'privateKey') {
            this.solicitarPk = true; //Escanear QR de BIOCard
            this.servidorBIOCard = p.substring(11, p.length);
            this.verificarCardStorage(p.substring(11, p.length));
          }
        }
        if (p == 'pinKey') this.pinKey = true;
        if (p == 'signKey') this.signKey = true;
        if (index == permisos.length - 1) resolve(true);

      });

    })
  }


  async verificarCardStorage(servidor) {
    let listBiocard = await this._storage.getLocalStorage('BIOCARDS') || [];

    let doc = listBiocard.find(d => d.servidor == sha256(servidor));
    console.log('Mostrar busqueda FIND', doc);

    if (doc) this.servidorCard = doc;
    else {
      this._comp.presentToast('Necesita BIOCard requerido', 'danger', 2000);
      this.router.navigate(['/app/inicio']);
    }

  }


  compartiDatosBack() {
    if (this.solicitarPk) this.backSlidePadre();
    else this.router.navigate(['/app/inicio']);
  }

  signKeyBack() {
    if (this.dataFireBase.datarequest != '' || this.solicitarPk) this.backSlidePadre();
    else this.router.navigate(['/app/inicio']);
  }

  codeBack() {
    if (this.dataFireBase.datarequest != '' || this.solicitarPk || this.signKey) this.backSlidePadre();
    else this.router.navigate(['/app/inicio']);
  }


  nextSlidePadre() {
    this.slidesPadre.lockSwipeToNext(false);//Bloquear movimiento a siguiente Slide
    this.slidesPadre.slideNext();//Siguiente Slide
    this.slidesPadre.lockSwipeToNext(true);
  }

  backSlidePadre() {
    this.slidesPadre.lockSwipeToPrev(false);//Bloquear movimiento a siguiente Slide
    this.slidesPadre.slidePrev();//Anterior Slide
    this.slidesPadre.lockSwipeToPrev(true);
    this.pin = "";
  }


  compartirData() {
    this.nextSlidePadre();
  }

  imageSignature($event) {
    this.imgSiganture = $event;
    this._comp.resizeImage(this.imgSiganture).then((res: string) => {
      this.imgSiganture = res;
    })
    this.nextSlidePadre();
  }

  /* *******************  FUNCIONES CODIGO PIN  ************************/
  public dataSlideValid = {
    titulo: "",
    subTitulo: "Ingresar ePIN",
    texto: "Ingrese ePIN de 6 dígitos de appCuerdo"
  }

  loading: any = null;

  async getClave($event) {
    console.log('DATA', this.data);

    this.pin = $event;
    let hash_PINsha256 = sha256(sha256(this.pin.toString()));
    if (hash_PINsha256 == this.data.PIN) {

     this.loading = await this.loadingController.create({
        message: 'Por favor espere...',
        backdropDismiss: false,
        showBackdrop: true,
        spinner: "bubbles"
      });
      await this.loading.present();

      let position = Number(this.pin.substr(0, 2));
      if (position > 62) position = position - 62;
      if (position == 0) position = 2;
      let n1 = Number(this.pin.substr(2, 2));
      let n2 = Number(this.pin.substr(4, 2))

      let dataSegure = this.data.privateKey.substr(62, this.data.privateKey.length);
      let number01 = Number(dataSegure.split("G")[0]) - n1;
      let number02 = Number(dataSegure.split("G")[1]) - n2;

      let privateKey = this.data.privateKey.substr(0, position)
        + number01.toString(16) + number02.toString(16) + this.data.privateKey.substring(position, 62);

        console.log('LLAVE PRIVADA',privateKey);
        
      this.firmar(privateKey);
    } else this._comp.presentToast('ePin es incorrecto', 'danger', 1500);
  }



  async firmar(privateKey) {

    this.dataReqFirma.privateKey = privateKey;
    this.dataReqFirma.message = '{"hashfile":"' + this.dataFireBase.filehash + '", "filehashbin":"' + this.dataFireBase.filehashbin + '", "hashcode":"' + this.dataFireBase.hashcode + '" }'
    console.log('MOSTRAR MESSAGE', this.dataReqFirma);

    this._onboarding.sendTransaction(this.dataReqFirma).subscribe(async (res: any) => {
      console.log('RESPUESTA sendTransaction ', res);

      if (this.dataFireBase.modesign == 'API_REST') this.singApiRest();

      this.dataFireBase.lacchain_tx = res.transactionHash;
      this.dataFireBase.signature = res.rawTransaction;
      this.dataFireBase.codigo = this.codigo;
      this.dataFireBase.signKey = this.imgSiganture;
      var date = new Date();
      this.dataFireBase.timestamp = date.getTime();

      /* ENVIAR DATA A GUARDAR EN FIREBASE */
      this.sendDataFireBase(res);


    },err=>{
      this.loading.dismiss();
      this._comp.presentToast('Error en servidor', 'danger', 2000);
      this.router.navigate(['/app/inicio']);
    })


  }

  sendDataFireBase(res) {
    console.log('sendDataFireBase',res);
    
    let dataRequestSend = '';
    for (var i = 0; i < this.camposFormulario.length; i++) {
      dataRequestSend = dataRequestSend + this.camposFormulario[i].nombre + ':' + this.camposFormulario[i].valor + '|';
    }


    let data: any = {
      device: 'APP',
      did: sha1(sha256(this.data.ADDRESS)),
      name: this.data.NAME,
      dni: this.data.DNI,
      datarequest: dataRequestSend,
      signature: res.rawTransaction,
      lacchain_tx: res.transactionHash,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      photo: this.data.PHOTO_MIN.substring(22, this.data.PHOTO_MIN.length),
      signKey: this.imgSiganture,
      public_key: this.data.publicKey,
      value: this.servidorCard ? this.servidorCard.value : null,
      cardId: this.servidorCard ? sha256(this.servidorCard.hash) : null,
      proofCardId: this.servidorCard ? sha256(this.servidorCard.hash) : null,

    }

    if (this.dataFireBase.modesign == 'VOTES') {
      data.opt_opcionID = this.vote.opcionID;
      data.opt_opcion = this.vote.opcion
    }

    console.log('this.barcodeData',this.barcodeData);
    console.log('data',data);
    this._fireBase.confirmarFirma(this.barcodeData, data).then(async (res: any) => {
      console.log('respuesta FIREBASE ', res);
      /* GUARDAR FIRMA EN STORAGE */
      this.saveStorage();
    });

  }


  async saveStorage() {
    let firmas: any = await this._storage.getLocalStorage('FIRMAS') || [];
    let typeDoc: string = this.dataFireBase.filename.substring(this.dataFireBase.filename.length - 4, this.dataFireBase.filename.length);
    if (typeDoc.toLowerCase() == '.pdf') this.dataFireBase.fileimg = await this._comp.resizeImage(this.dataFireBase.fileimg, 200, 168);

    let dataGuardar = {
      pathFireBase: this.dataFireBase.pathFireBase,
      filestatus: this.dataFireBase.filestatus,
      filestatuscode: this.dataFireBase.filestatuscode,
      filetitle: this.dataFireBase.filetitle,
      timestamp: this.dataFireBase.timestamp,
      fileimg: this.dataFireBase.fileimg,
      creatorname: this.dataFireBase.creatorname,
      lacchain_tx: this.dataFireBase.lacchain_tx,
      signature: this.dataFireBase.signature
    }

    let doc = firmas.findIndex(d1 => d1.pathFireBase == this.dataFireBase.pathFireBase);
    if (doc == -1) {
      console.log('MOSTRAR DATA ACTUIALIZADA', firmas);
      firmas.unshift(dataGuardar);
      await this._storage.setLocalStorage('FIRMAS', firmas);
      this.load = false;
      this.updateDataLocal();
      this.nextSlidePadre();
      console.log('ES UN DOCUEWMNTO LEIDO con QR');
    } else {//Si el doc ya esta en tu dispositivo es decir que es por singBOX
      console.log('ESTE DOCUEMNTO SE REMPLZARA', firmas[doc]);
      console.log('NUEVO VALOR', this.dataFireBase);
      firmas[doc] = dataGuardar;
      console.log('NUEVO VALOR DELISTA', firmas);
      await this._storage.setLocalStorage('FIRMAS', firmas);
      this.load = false;
      this.updateDataLocal();
      this.nextSlidePadre();
      console.log('DATO SE ACTUALIZO POR QUE ERA DE SINGBOX');

    }
    this.loading.dismiss();

  }


  singApiRest() {

    let get1 = {
      aCode: this.dataFireBase.pathFireBase,
      aFileHashBase64: this.dataFireBase.filehashbin,
      hash: this.dataFireBase.filehash,
      sello: this.dataFireBase.watermark
    }

    this._onboarding.get1(get1).subscribe(res => {
      this._fireBase.putDocumento(this.dataFireBase.pathFireBase, { filestatus: "Firmado", filestatuscode: "TERM" }).then(res => {
        console.log('BIEN');
      }, err => {
        this._comp.presentToast('Problemas con firma ApiRest', 'danger', 2000);
      })


      let postSendApc = {
        aCode: this.dataFireBase.pathFireBase,
        emailAdm: this.dataFireBase.email,
        pURL: this.dataFireBase.fileurl,
        aName: this.dataFireBase.filename,
        aSize: this.dataFireBase.filesize,
        aType: this.dataFireBase.fileext2,
        aFileTitle: this.dataFireBase.filetitle,
        aFileHash: this.dataFireBase.filehash,
        aTypeSign: this.dataFireBase.type,
      }
      this._onboarding.postFirebase(postSendApc).subscribe(res => {
        console.log('BIEN');
      }, err => {
        this._comp.presentToast('Problemas con firma ApiRest', 'danger', 2000);
      })

    })

  }
}
