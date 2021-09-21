import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { VerFotoComponent } from 'src/app/components/ver-foto/ver-foto.component';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-data',
  templateUrl: './perfil-data.page.html',
  styleUrls: ['./perfil-data.page.scss'],
})
export class PerfilDataPage implements OnInit {

  constructor(
    public _storage: StorageService,
    private _modal: ModalController,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public router: Router) { }

  ngOnInit() {}

  myBackButton() {
    this.router.navigate(['/app/perfil']);
  }

  async eliminarDatos() {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar todos los datos!',
      message: 'Quiere <strong>eliminar</strong> todos los datos de Appcuerdo en su dispositivo?',
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
            await this._storage.clearData();
            this.router.navigate(['/home'])
          }
        }
      ]
    });

    await alert.present();
  }


  verFoto(path) {
    this._modal.create({
      component: VerFotoComponent,
      componentProps: {
        img: path
      }
    }).then((modal) => modal.present());
  }

}
