import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { StorageService } from 'src/app/services/storage.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router';
import { sha256, sha224 } from 'js-sha256';
import { IonicComponentsService } from 'src/app/services/ionic-components.service';

@Component({
  selector: 'app-perfil-biocard',
  templateUrl: './perfil-biocard.page.html',
  styleUrls: ['./perfil-biocard.page.scss'],
})
export class PerfilBiocardPage implements OnInit {
  constructor(
    private location: Location,
    public _storage: StorageService,
    private barcodeScanner: BarcodeScanner,
    public router: Router,
    public _comp: IonicComponentsService,
  ) { }

  public listBiocard:any=[null];
  

  ngOnInit() {}

  ionViewDidEnter() {
    this.getAll();
  }

  myBackButton() {
    this.location.back();
  }

  scan() {

    this.barcodeScanner.scan({ prompt: "Lee el código para firmar documento" }).then(async barcodeData => {
      console.log('MostrarCode', barcodeData.text);
      if (!barcodeData.cancelled) {

        let barcode: string = barcodeData.text;
        if (barcode.length > 6) {
          console.log('Mostrar substring', barcode.substring(0, 7));
          if(barcode.substring(0, 7)=='BIOCARD'){
            let listBiocard = await this._storage.getLocalStorage('BIOCARDS') || [];

            let doc = listBiocard.find(d => sha256(d.pathFireBase) == barcode);
            console.log('Mostrar busqueda FIND', doc);
    
            if (doc) this._comp.presentToast('BioCard ya fue registrado','warning',2000);
            else this.router.navigate(['/app/tab3/registrar-biocard/', barcode]);

          }else this._comp.presentToast('Código inválido','danger',2000);
        } else this._comp.presentToast('Código inválido','danger',2000);
      }
    }).catch(err => {
      console.log('Error', err);
    })
  }

  async getAll() {
    
    this.listBiocard = await this._storage.getLocalStorage('BIOCARDS') || [];
    console.log('mostrar biocards',this.listBiocard);
    
    /* for(var i =0;i<this.listBiocard.length;i++){
     
      this.listBiocard[i].name_aux=this.listBiocard[i].name;
      if(this.listBiocard[i].name.length>16){
        this.listBiocard[i].name_aux=this.listBiocard[i].name.substring(0,17)+'...';
        console.log('mostrar',this.listBiocard[i].name_aux);
        
      }
    } */

    console.log('listlistBiocard ', this.listBiocard);
  }

}
