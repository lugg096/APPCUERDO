import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { NavController } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiAppcuerdoService {

  constructor(
    private _storage: StorageService,
    private _httpIonic: HTTP,
    private _http: HttpClient,
    private navCtrl: NavController
  ) {
    this.getAPIS();
  }

  /* dominio: any = env.url; */
  dominio: any;


  getAccount() {
    const parametro = { operacion: 'getAccount' };
    let dominio = this._storage.url_api;
    return this._http.get(dominio, { params: parametro });
  }

  setCredential(data) {
    const parametro = data;
    console.log('Parametro', parametro);
    let dominio = this._storage.url_api;
    return this._http.get(dominio, { params: parametro });
  }

  sendValidationEmail(data) {
    /*     console.log('MOSTRAR data', data); */
    const URL = env.appcuerdo_api + 'send.php?mode=mail&to=' + data.email + '&did=' + data.did + '&dni=' + data.dni;
    return this._http.get(URL);
  }

  /* VALIDACION RENIEC */
  validarDNI(dni) {
    const URL = 'https://api.reniec.cloud/dni/' + dni;
    return this._http.get(URL);
  }

  validarPhoto(data) {
    const URL = 'http://identidad.bigdavi.com/api/facial';
    return this._http.post(URL, data);
  }


  /* FIRMAR */
  sendTransaction(data) {
    const parametro = data;
    console.log('Parametro', parametro);
    let dominio = this._storage.url_api;
    return this._http.get(dominio, { params: parametro });
  }


  get1(data: any) {
    const URL = env.appcuerdo_api + 'v1/document/create/?modo=P&channel=' + data.aCode + '&hashBase64=' + data.aFileHashBase64 + '&hash=' + data.hash + "&sello=" + data.sello;
    return this._http.get(URL);
  }

  postFirebase(data: any) {
    const URL = env.appcuerdo_api + 'send.php/?mode=emailAdm&to=' + data.emailAdm + '&channel=' + data.aCode + "&html=" + btoa(data.pURL) + "&name=" + data.aName + "&size=" + data.aSize + "&type=" + data.aType + "&title=" + data.aFileTitle + "&hash=" + data.aFileHash + "&typeSign=" + data.aTypeSign;
    return this._http.get(URL);
  }


  getQR(url) {
    return this._http.get(url);
  }


  getAPIS() {
    return new Promise((resolve, reject) => {
      this.getQR(env.stmp + 'getServers.php').subscribe((res: any) => {
        console.log('res_api', res.appcuerdo.api_server);
        this._storage.url_api = res.appcuerdo.api_server
        resolve(res.appcuerdo.api_server);
      })

    });
  }


}
