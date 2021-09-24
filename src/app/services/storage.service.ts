import { environment as env } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';


import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  appIniciado: boolean = false;

  barcodeData: '';
  datos = {
    PIN: '',
    ADDRESS: '',
    DID: '',
    privateKey: '',
    publicKey: '',
    PHOTO: '',
    PHOTO_MIN: '',
    creadentialSignature: null,
    SINBOX_ID: '',
    NAME: '',
    DNI: '',
    EMAIL: '',
    NAME_B64: '',
    DNI_B64: '',
    EMAIL_B64: '',
    ALIAS: ''
  }
  url_api: '';

  constructor() { }

  resetData() {
    this.datos = {
      PIN: '',
      ADDRESS: '',
      DID: '',
      privateKey: '',
      publicKey: '',
      PHOTO: '',
      PHOTO_MIN: '',
      creadentialSignature: null,
      SINBOX_ID: '',
      NAME: '',
      DNI: '',
      EMAIL: '',
      NAME_B64: '',
      DNI_B64: '',
      EMAIL_B64: '',
      ALIAS: ''
    }
  }

  async validarAuth(): Promise<boolean> {
    let data = await this.getLocalStorage('DATA');
    console.log('DATA..............1',data);
    
    if (data) return Promise.resolve(true);
    return Promise.resolve(false);
  }

  async getLocalStorage(name) {
    let item = await Storage.get({ key: name }) || null;
    if (!item) return null;
    return JSON.parse(item.value);
  }

  async setLocalStorage(name, data) {
    await Storage.set({ key: name, value: JSON.stringify(data) });
  }


  async clearData() {
    await Storage.clear();
  }


}
