import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController, ModalController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { sha256, sha224 } from 'js-sha256';
import * as sha1 from 'js-sha1';
import { Router } from '@angular/router';
import { IonicComponentsService } from '../services/ionic-components.service';
import { ApiAppcuerdoService } from '../services/api-appcuerdo.service';

import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
const { Camera } = Plugins;

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContryComponent } from '../components/contry/contry.component';
import { Country } from '../types/country.type';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  @ViewChild('slidesPadre', { static: false }) private slidesPadre: IonSlides;

  public dataUserForm: FormGroup;
  public submitAttempt: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    public _storage: StorageService,
    public router: Router,
    public _modal: ModalController,
    public _comp: IonicComponentsService,
    public loadingController: LoadingController,
    public _onboarding: ApiAppcuerdoService) {

    this.country = new Country({
      name: 'Perú',
      flag: 'pe',
    });

    this.dataUserForm = formBuilder.group({
      country: ['pe', Validators.required],
      dni: ['', Validators.required],
      name: ['', Validators.required],
      apellido: ['', Validators.required],
      alias: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("[^@]+@[^@]+\.[^@]+$")]]
      /* email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]] */
    });
  }

  country: Country;
  claveValida = false;
  pin: string = "";
  alias = "Nueva wallet";
  wallets = [];
  imagen = '';

  fraseSeguridad = false;
  fotoSeguridad = false;
  palabrasPrincipal = []; //Palbras Slide 1 
  textValue = '';
  palabras = [];
  palabrasVerif = [];


  slideOptsOnboarding = {
    allowSlideNext: false,
    allowSlidePrev: false,
    slidesPerView: 1,
    initialSlide: 0,
    speed: 400
  };


  ngOnInit() {
    /*     this._onboarding.validarDNI('72930739').subscribe(res=>{
          console.log('RESPUESTA',res);
          
        }) */
  }

   getStorage(name) {
    let item =  localStorage.getItem(name) || null;
    if (!item) return null;
    return JSON.parse(item);
  }

  updateDataVersion() {
    return new Promise(async (resolve, reject) => {
      let addx = this.getStorage('ADDRESS');
      console.log('addx', addx);

      if (addx == '') {
        resolve(false);
        return;
      }

      let datos = {
        PIN: '',//ok
        ADDRESS: '',//ok
        DID: '',//ok
        privateKey: '',//ok
        publicKey: '',//ok
        PHOTO: '',//ok
        PHOTO_MIN: '',//ok
        creadentialSignature: null,//ok
        SINBOX_ID: '',//ok

        NAME: '',//ok
        DNI: '',//ok
        EMAIL: '',//ok

        NAME_B64: '',//ok
        DNI_B64: '',//ok
        EMAIL_B64: '',//ok
        ALIAS: ''//ok
      };

      datos.ADDRESS = this.getStorage('ADDRESS');
      datos.DID = this.getStorage('DID');
      datos.privateKey = this.getStorage('privateKey');
      datos.publicKey = this.getStorage('publicKey');
      
      datos.PHOTO =  'data:image/jpg;base64,' + this.getStorage('PHOTO');
      datos.PHOTO_MIN = this.getStorage('PHOTO_MIN');
      datos.creadentialSignature = this.getStorage('creadentialSignature');
      
      datos.NAME = this.getStorage('NAME');
      datos.DNI = this.getStorage('DNI');
      datos.ALIAS = this.getStorage('ALIAS');
      datos.EMAIL = this.getStorage('EMAIL');
      datos.PIN = this.getStorage('pin');

      datos.SINBOX_ID = sha256(datos.EMAIL.toLowerCase());
      datos.NAME_B64 = btoa(datos.NAME);
      datos.EMAIL_B64 = btoa(datos.EMAIL);
      datos.DNI_B64 = btoa(datos.DNI);

      this._storage.datos = datos;

      console.log('DATA',datos);
      //Actualizar datos de usuario
      await this._storage.setLocalStorage('DATA', datos);
      await this._storage.setLocalStorage('CREDIFIRMAS', 5);

      //Actualizar firmas
      let firmas: any = this._storage.getLocalStorage('FIRMAS');
      await this._storage.setLocalStorage('FIRMAS', firmas.firmados);
      localStorage.removeItem('ADDRESS')
      this.router.navigate(['/app/inicio']);
      resolve(true);
    });
  }

  async ionViewDidEnter() {
    this._storage.appIniciado = false;
    this.initData();
    this.firstSlide();
  }

  async initData() {
 /*    let updateVersion = await this.updateDataVersion();
    if (!updateVersion)  */this.getAccount();
  }

  async selectContry() {
    const modal = await this._modal.create({
      component: ContryComponent,
      componentProps: {
        country: this.country,
      }
    });

    modal.onDidDismiss().then(async (res: any) => {
      this.country = res.data.country;
      this.dataUserForm.controls['country'].setValue(res.data.country.flag)

    });
    return await modal.present();
  }

  firstSlide() {
    this.backSlidePadre();
    this.backSlidePadre();
    this.backSlidePadre();
    this.backSlidePadre();
  }

  dataSetCredential = {
    operacion: 'setCredential',
    dniHash: '',
    nameHash: '',
    emailHash: '',
    aliasHash: '',
    photoHash: '',
    dataHash: 'appcuerdo',
    privateKey: ''
  }

  async getAccount() {
    const loading = await this.loadingController.create({
      message: 'Por favor espere...',
      backdropDismiss: false,
      showBackdrop: true,
      spinner: "bubbles"
    });
    await loading.present();


    await this._onboarding.getAPIS();

    this._onboarding.getAccount().subscribe((res: any) => {
      loading.dismiss();
      this._storage.datos.ADDRESS = res.address;
      this._storage.datos.DID = sha1(sha256(res.address));
      this._storage.datos.privateKey = res.privateKey;
      this.dataSetCredential.privateKey = res.privateKey;
      this._storage.datos.publicKey = res.publicKey;
      console.log(res);
      console.log('this.dataSetCredential', this.dataSetCredential);
    }, err => {
      console.log(err);
      loading.dismiss();
      this._comp.presentToast('Error con servidor getAccount', 'danger', 1000);
    })
  }

  async procesarImagen() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      correctOrientation: true
    }).then((imageData) => {
      if (imageData) {
        this._storage.datos.PHOTO = 'data:image/jpg;base64,' + imageData.base64String;// hash Foto
        this._comp.resizeImage('data:image/png;base64,' + imageData.base64String).then((res: any) => {
          this._storage.datos.PHOTO_MIN = res;
        })
        this.nextSlidePadre();
      }
    }, (err) => {
      console.log('Ocurrió un problema, vuelva a intentarlo porfavor: ' + err);
    });
  }


  async setCredential() {
    const loading = await this.loadingController.create({
      message: 'Por favor espere...',
      backdropDismiss: false,
      showBackdrop: true,
      spinner: "bubbles"
    });
    await loading.present();
    console.log('this.dataSetCredentia', this.dataSetCredential);

    this._onboarding.setCredential(this.dataSetCredential).subscribe(async (res: any) => {

      try {
        this._storage.datos.creadentialSignature = res;
        await this._storage.setLocalStorage('DATA', this._storage.datos);
        await this._storage.setLocalStorage('FIRMAS', []);
        await this._storage.setLocalStorage('BIOCARDS', []);
        await this._storage.setLocalStorage('TRANSFERENCIAS', []);
        await this._storage.setLocalStorage('CREDIFIRMAS', 5);
        await this._storage.setLocalStorage('VALID_EMAIL', false);

      } catch (e) {
        alert('Ocurrió un problema en storage de su equipo: ' + e);
        this.firstSlide();
      }
      loading.dismiss();
      this.nextSlidePadre();
    }, err => {
      this.firstSlide();
      loading.dismiss();
      console.log(err);
      this._comp.presentToast('Error con servidor setCredential', 'danger', 1000);
    })

    this._onboarding.sendValidationEmail({
      email: this._storage.datos.EMAIL,
      dni: this._storage.datos.DNI,
      did: this._storage.datos.DID
    }).subscribe(async (res: any) => {
      console.log('comprobarCode', res);


    }, err => {
      console.log(err);
      this._comp.presentToast('Error con servidor validacion email', 'danger', 1000);
    })
  }

  async saveData() {
    this.submitAttempt = true;

    if (this.dataUserForm.valid) {
      this._storage.datos.NAME = this.dataUserForm.value.name.trim() + ' ' + this.dataUserForm.value.apellido.trim();
      this._storage.datos.DNI = this.dataUserForm.value.dni.toString().trim();
      this._storage.datos.EMAIL = this.dataUserForm.value.email.trim();
      this._storage.datos.ALIAS = this.dataUserForm.value.alias.trim();

      /* Base64 */
      this._storage.datos.NAME_B64 = btoa(this._storage.datos.NAME);
      this._storage.datos.DNI_B64 = btoa(this._storage.datos.DNI);
      this._storage.datos.EMAIL_B64 = btoa(this._storage.datos.EMAIL);

      /* SIMBOX ID */
      this._storage.datos.SINBOX_ID = sha256(this._storage.datos.EMAIL.toLowerCase());

      this.dataSetCredential.nameHash = sha256(this._storage.datos.NAME);
      this.dataSetCredential.dniHash = sha256(this._storage.datos.DNI);
      this.dataSetCredential.emailHash = sha256(this._storage.datos.EMAIL);
      this.dataSetCredential.aliasHash = sha256(this._storage.datos.ALIAS);
      this.dataSetCredential.photoHash = sha256(this._storage.datos.PHOTO);

      /*  this._onboarding.validarDNI(this._storage.datos.DNI).subscribe((res:any)=>{
         console.log(res);
         alert(res.apellido_paterno)
         
       }) */
      /* let data = {
        id: '111111111',
        dni: '72930739',
        pic: this._storage.datos.PHOTO
      }
      this._onboarding.validarPhoto(data).subscribe(res=>{
        console.log('RESPUESTA',res);
        
      }) */

      this.nextSlidePadre();

    }
  }

  async goInicio() {
    this.router.navigate(['/app/inicio']);
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

  /* Codigo pin */
  public dataSlideCreate = {
    titulo: "PASO 2",
    subTitulo: "Crear ePIN",
    texto: "Nuevo ePIN de 6 dígitos"
  }

  public dataSlideValidacion = {
    titulo: "PASO 3",
    subTitulo: "Confirme su ePIN",
    texto: "Ingrese nuevamente ePIN de 6 dígitos"
  }

  getClave($event) {
    this.pin = $event;
    this.nextSlidePadre();
  }


  async getClaveValid($event) {
    if (this.pin == $event) {

      this._storage.datos.PIN = sha256(sha256(this.pin.toString()));

      let position = Number(this.pin.substr(0, 2));
      if (position > 62) position = position - 62;
      if (position == 0) position = 2;
      let n1 = Number(this.pin.substr(2, 2));
      let n2 = Number(this.pin.substr(4, 2))

      let str = this._storage.datos.privateKey.substr(position, 4);

      let hex1 = str.substr(0, 2);
      let number1 = parseInt(hex1, 16) + n1;

      let hex2 = str.substr(2, 2);
      let number2 = parseInt(hex2, 16) + n2;

      this._storage.datos.privateKey = this._storage.datos.privateKey.substr(0, position) +
        this._storage.datos.privateKey.substr(position + 4, this._storage.datos.privateKey.length) +
        number1 + 'G' + number2;

      this.setCredential();
    } else this._comp.presentToast('Clave no es la misma', 'danger', 1000);

  }

}
