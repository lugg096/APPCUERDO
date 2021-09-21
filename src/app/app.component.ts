import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonMenu } from '@ionic/angular';
import { ApiAppcuerdoService } from './services/api-appcuerdo.service';
import { IonicComponentsService } from './services/ionic-components.service';
import { StorageService } from './services/storage.service';


import { Plugins, StatusBarStyle } from '@capacitor/core'
const { StatusBar } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  @ViewChild('menu', { static: false }) public menu: IonMenu;

  public credifirmas = 0;
  public validEmail = false;
  public urlPolPriv: string = '';
  public urlTerCon: string = '';
  public comprar: string = '';

  constructor(
    public router: Router,
    public alertController: AlertController,
    public _storage: StorageService,
    public _apiAppcuedo: ApiAppcuerdoService,
    public _comp: IonicComponentsService) {
    StatusBar.setStyle({ style: StatusBarStyle.Dark });
    StatusBar.setBackgroundColor({ color: "#044483" });
    this.initApp();
  }

  async initApp() {
    this._storage.datos = await this._storage.getLocalStorage('DATA') || this._storage.datos;

    this._storage.url_api = await this._storage.getLocalStorage('URL') || this._storage.url_api;
    this.comprar = 'https://appcuerdo.com/sales/?i=' + this._storage.datos.SINBOX_ID + '&e=' + this._storage.datos.EMAIL_B64 + '&n=' + this._storage.datos.NAME_B64 + '&d=' + this._storage.datos.DNI_B64;
    this.urlPolPriv = 'https://appcuerdo.com/agreementConds/?i=' + this._storage.datos.SINBOX_ID + '&e=' + this._storage.datos.EMAIL_B64 + '&n=' + this._storage.datos.NAME_B64 + '&d=' + this._storage.datos.DNI_B64;
    this.urlTerCon = 'https://appcuerdo.com/agreementPriv/?i=' + this._storage.datos.SINBOX_ID + '&e=' + this._storage.datos.EMAIL_B64 + '&n=' + this._storage.datos.NAME_B64 + '&d=' + this._storage.datos.DNI_B64;
  }

  async willOpen() {
    this.credifirmas = await this._storage.getLocalStorage('CREDIFIRMAS') || 0;
    this.validEmail = await this._storage.getLocalStorage('VALID_EMAIL'); 
  }

  async validar() {

    const alert = await this.alertController.create({
      cssClass: 'alert-validar',
      message: ' <div class="text-center"><img class="imgIcon"   src="../assets/images/msjsignBox.png">' +
        ' </div> <p class="text-wrap text-center mt-2"><b style="font-size: 11px; color: rgba(0, 0, 0, 0.768);">Se envio solicitud a ' + this._storage.datos.EMAIL + '</b> <br>' +
        ' <small style="color: darkgrey;">Valide su email para hacer transacciones y poder recibir documentos a firmar.</small> <br>  <br>' +
        '<small class="colorPregunta">¿No le llego ningún mensaje?</small> <br> <small style="color: darkgrey;">Intente enviar nuevamente</small></p>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Enviar nuevamente',
          handler: async () => {
            this._apiAppcuedo.sendValidationEmail({
              email: this._storage.datos.EMAIL,
              dni: this._storage.datos.DNI,
              did: this._storage.datos.DID
            }).subscribe(async (res: any) => {
              console.log('comprobarCode', res);
              this._comp.presentToast('Se envio solicitud con exito', 'success', 3000);
              await alert.dismiss()
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async closeMenu() {
    await this.menu.close();
  }

}
