import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController, MenuController, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FireBaseService } from 'src/app/services/fire-base.service';
import { StorageService } from 'src/app/services/storage.service';
import { DataService } from 'src/app/services/data-service.service';
import { VerDocPage } from 'src/app/components/ver-doc/ver-doc.page';
import { map } from 'rxjs/operators';
import { IonicComponentsService } from 'src/app/services/ionic-components.service';
import { sha256 } from 'js-sha256';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(
    private barcodeScanner: BarcodeScanner,
    private _modal: ModalController,
    public router: Router,
    public _fireBase: FireBaseService,
    public _storage: StorageService,
    public alertController: AlertController,
    public _comp: IonicComponentsService,
    private route: ActivatedRoute,
    private _data: DataService,
    private menu: MenuController
  ) { }

  listFirmas: any;
  firmados: any = [];
  segment = 'proceso';
  firmProceso = [];
  firmFirmado = [];
  firmCancelado = [];


  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
  ngOnInit() {

    this._data.currentMessage.subscribe(message => {
      console.log('ESTE MENSAJE LLEGO', message);
      this.getStatus(message);
    })
    if (!this._storage.appIniciado) this.getAll();

  }




  async singBox() {
    console.log('********************************  INICIAR SIN BOX  ********************************');
    let signBox_Id = sha256(this._storage.datos.EMAIL.toLowerCase().trim());
    console.log('signBox_Id',signBox_Id);
    
    this._fireBase.singBox(signBox_Id).stateChanges(['child_added']).pipe(
      map((changes: any) => {
        const data = changes.payload.val();
        const id = changes.payload.key;
        return { id, ...data };
      })
    ).subscribe(async child_added => {
      let valor: any = child_added;
      console.log('MOSTRAR VALOR',child_added);

      if (valor.type == 'validate_email') await this._storage.setLocalStorage('VALID_EMAIL',true);
      
      if (valor.type == 'credit') {
        let trans = await this._storage.getLocalStorage('TRANSFERENCIAS');
        let cf = await this._storage.getLocalStorage('CREDIFIRMAS');
        this._storage.setLocalStorage('CREDIFIRMAS', Number(cf) + Number(valor.value));
        valor.from = 'RECIBIR';
        trans.unshift(valor);
        this._storage.setLocalStorage('TRANSFERENCIAS', trans);
        this._comp.presentToast('Felicidades recibiste ' + Number(valor.value) + ' credifirmas', 'success', 2500);

        /*  ELIMINAR DE SIGNBOX*/
        this._fireBase.updateSignBox(signBox_Id, valor.id, { status: 'PROC' }).then(res => {
          console.log('MENSAJE PUESTO EN PROCESO ', valor.id);
        }, err => {
          this._comp.presentToast('Error con servidor', 'danger', 3000);
        })
      }

      if (valor.type == 'sign') {

        let firmados_aux: any = await this._storage.getLocalStorage('FIRMAS');

        let rep = firmados_aux.findIndex(d1 => d1.pathFireBase == valor.value);//Validar que documento no este en el dispositivo ya sea por que
        //lo leyo o porque ya se le envio el mensaje antes
        if (rep == -1) {//No encontrado en listado

          this._fireBase.singFirma(valor.value).then(async (res: any) => {

            res.fileimg = res.fileimg.replace(' ', '');
            res.pathFireBase = valor.value;
            res.keySingBox = valor.id;

            if (res.fileimg.substring(0, 4).toLowerCase() != 'http') res.fileimg = await this._comp.resizeImage(res.fileimg.replace(' ', ''), 200, 168);

            let dataGuardar = {
              pathFireBase: res.pathFireBase,
              filestatus: res.filestatus,
              filestatuscode: res.filestatuscode,
              filetitle: res.filetitle,
              timestamp: res.timestamp,
              fileimg: res.fileimg,
              creatorname: res.creatorname,
              lacchain_tx: res.lacchain_tx,
              signature: res.signature,
              keySingBox: res.keySingBox
            }

            this.firmados.unshift(dataGuardar);
            this.listFirmas = this.firmados;
            await this._storage.setLocalStorage('FIRMAS', this.listFirmas);
            this.getStatus(res.pathFireBase);

            /*  ELIMINAR DE SIGNBOX*/
            this._fireBase.updateSignBox(signBox_Id, valor.id, { status: 'PROC' }).then(res => {
              console.log('MENSAJE PUESTO EN PROCESO ', valor.id);
            }, err => {
              this._comp.presentToast('Error con servidor', 'danger', 3000);
            })

          })
        }

      }


    }, err => {
      this._comp.presentToast('Error con servidor', 'danger', 3000);
    });
  }


  async presentAlertPrompt() {

    let cf = await this._storage.getLocalStorage('CREDIFIRMAS');
    if (Number(cf) <= 0) {
      this._comp.presentToast('Ya no tiene crédifirmas disponibles', 'danger', 3000);
      return;
    }
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Código de documento',
      inputs: [
        {
          name: 'codigo',
          id: 'codigo',
          type: 'textarea',
          placeholder: 'Ingrese código de documento a firmar'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (res) => {
            console.log('Confirm Ok', res);
            let doc = this.firmados.find(d => d.pathFireBase == res.codigo);
            console.log('Mostrar busqueda FIND', doc);

            if (doc) this._comp.presentToast('Documento ya fue firmado', 'danger', 2000);
            else this.router.navigate(['/app/firma/', res.codigo]);

          }
        }
      ]
    });

    await alert.present();
  }


  async cancelarFirmaConfirm(doc) {

    let textHeader = 'Cancelar firma!';
    let textMessage = 'Quiere <strong>cancelar</strong> su firma del documento?';

    if (doc.keySingBox) {
      textHeader = 'Cancelar documento!';
      textMessage = 'Quiere <strong>cancelar</strong> documento a firmar?';
    }


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
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          handler: async () => {
            this.cancelar(doc.pathFireBase);
            this._fireBase.cancelarFirma(doc.pathFireBase, this._storage.datos.DID).then(res => {
            })
          }
        }
      ]
    });

    await alert.present();
  }



  async eliminarDocConfirm(pathFireBase) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar documento!',
      message: 'Quiere <strong>eliminar</strong> documento de dispositivo?',
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
            this.delete(pathFireBase);
          }
        }
      ]
    });

    await alert.present();
  }


  getStatus(pathFireBase): void {
    this._fireBase.getDocStatus(pathFireBase).valueChanges()
      .subscribe(async (data: any) => {
        if (data) {
          let index = this.firmados.findIndex(d => d.pathFireBase == pathFireBase);
          if (index != -1) {
            this.firmados[index].filestatus = data.filestatus;
            this.firmados[index].filestatuscode = data.filestatuscode;
          }
          this.listFirmas.firmados = this.firmados;

          if (data.filestatuscode != 'PROC') {
            await this._storage.setLocalStorage('FIRMAS', this.listFirmas);
            this.refresh();
          } else this.refresh();
        }
      }, err => {
        this._comp.presentToast('Error con servidor', 'danger', 3000);
      });
  }

  async refresh(event?) {

    this.listFirmas = await this._storage.getLocalStorage('FIRMAS') || [];
    this.firmProceso = [];
    this.firmFirmado = [];
    this.firmCancelado = [];
    this.firmados = this.listFirmas || [];
    let repetido = [];

    if (this.firmados.length == 0 && event) event.target.complete();

    for (var i = 0; i < this.firmados.length; i++) {

      if (this.firmados[i].filestatuscode != 'CANC') {
        let rep = repetido.findIndex(p => p == this.firmados[i].pathFireBase);
        if (i == (this.firmados.length - 1)) {
          if (event) event.target.complete();
        }
        if (rep != -1) continue;
      }

      if (this.firmados[i].filestatuscode == 'TERM') this.firmFirmado.push(this.firmados[i]);
      if (this.firmados[i].filestatuscode == 'PROC' || this.firmados[i].filestatuscode == 'INI') this.firmProceso.push(this.firmados[i]);
      if (this.firmados[i].filestatuscode == 'CANC') this.firmCancelado.push(this.firmados[i]);
      repetido.push(this.firmados[i].pathFireBase);
      if (i == (this.firmados.length - 1)) {
        if (event) event.target.complete();
      }
    }

  }

  async verDoc(data) {
    console.log('VER DOC', data);
    const modal = await this._modal.create({
      component: VerDocPage,
      componentProps: { data: data, cancel: false }
    }).then((modal) => modal.present());;
  }

  async verCancelado(data) {
    const modal = await this._modal.create({
      component: VerDocPage,
      componentProps: { data: data, cancel: true }
    }).then((modal) => modal.present());
  }


  docStatus = 'En proceso...';

  segmentChanged(e) {
    this.segment = e.detail.value;
  }

  ionViewDidEnter() {
    this.refresh();
  }


  firmados_aux = [];


  async getAll(event?) {
    this._storage.appIniciado = true;
    this.listFirmas = await this._storage.getLocalStorage('FIRMAS') || [];
    this.firmProceso = [];
    this.firmFirmado = [];
    this.firmCancelado = [];
    this.firmados = this.listFirmas.firmados || [];

    if (this.firmados.length == 0) {
      this.singBox();
      if (event) event.target.complete();
    }

    for (var i = 0; i < this.firmados.length; i++) {
      if (this.firmados[i].filestatuscode != 'CANC') {
        this.getStatus(this.firmados[i].pathFireBase);
      } else {
        if (this.firmados[i].filestatuscode == 'TERM') this.firmFirmado.push(this.firmados[i]);
        if (this.firmados[i].filestatuscode == 'PROC' || this.firmados[i].filestatuscode == 'INI') this.firmProceso.push(this.firmados[i]);
        if (this.firmados[i].filestatuscode == 'CANC') this.firmCancelado.push(this.firmados[i]);
      }

      if (i == (this.firmados.length - 1)) {
        if (event) event.target.complete();
        else {
          this.singBox();
          event.target.complete();
        }
      }
    }
  }

  async delete(pathFirebase) {
    let doc = this.firmados.findIndex(d => d.pathFireBase == pathFirebase);
    if (doc == -1) {
      this.refresh();
      this._comp.presentToast('Error al eliminar documento', 'danger', 2000);
    } else {
      this.firmados.splice(doc, 1);
      this.listFirmas.firmados = this.firmados;
      await this._storage.setLocalStorage('FIRMAS', this.listFirmas);
      this.refresh();
      this._comp.presentToast('Documento se eliminó con éxito', 'success', 2500);
    }

  }



  async cancelar(pathFirebase) {

    let text = 'Firma cancelada de documento';
    let doc = this.firmados.findIndex(d => d.pathFireBase == pathFirebase);
    if (doc == -1) this._comp.presentToast('Error al cancelar firma', 'danger', 2000);
    else {
      if (this.firmados[doc].keySingBox) {
        let signBox_Id = sha256(this._storage.datos.EMAIL.toLowerCase().trim())
        this._fireBase.updateSignBox(signBox_Id, this.firmados[doc].keySingBox, { status: 'CANC' }).then(res => {
        })
        text = 'Documento a firmar cancelado';
      }

      this.firmados[doc].filestatuscode = 'CANC';
      this.firmados[doc].filestatus = 'Cancelado';
      this.firmados[doc].pathCancelado = this.firmados[doc].pathFireBase;
      this.firmados[doc].pathFireBase = 'CANCELADO';
      this.listFirmas.firmados = this.firmados;
      await this._storage.setLocalStorage('FIRMAS', this.listFirmas);

      this.refresh();
      this._comp.presentToast(text, 'success', 2500);
    }

  }


  async scan() {
    let cf = await this._storage.getLocalStorage('CREDIFIRMAS');
    if (Number(cf) <= 0) {
      this._comp.presentToast('Ya no tiene crédifirmas disponibles', 'danger', 3000);
      return;
    }
    this.barcodeScanner.scan({ prompt: "Lee el código para firmar documento" }).then(async barcodeData => {
      if (!barcodeData.cancelled) {
        barcodeData.text = barcodeData.text.replace('https://appcuerdo.com/www/?code=', '');
        barcodeData.text = barcodeData.text.replace('http://appcuerdo.com/www/?code=', '');

        let doc = this.firmados.find(d => d.pathFireBase == barcodeData.text);

        if (doc) this._comp.presentToast('Documento ya esta en su aplicativo', 'warning', 2000);
        else this.router.navigate(['/app/firma/', barcodeData.text]);

      }
    }).catch(err => {
      console.log('Error', err);
    })
  }

  async docSingBox(path) {
    let cf = await this._storage.getLocalStorage('CREDIFIRMAS');
    if (Number(cf) <= 0) this._comp.presentToast('Ya no tiene crédifirmas disponibles', 'danger', 3000);
    else this.router.navigate(['/app/firma/', path]);
  }

  perfil() {
    this.router.navigate(['/app/tab3']);
  }

  prueba() {
    this.router.navigate(['/app/firma/', 'jkDEt7rNfKUZTuhWWCt6u8QX9d42/12d3fa10-418c-4300-935e-1dd99f93f1eb']);
  }

}
