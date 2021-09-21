import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FireBaseService {

  constructor(public afDb: AngularFireDatabase,
    public router: Router) { }

  getAll(ruta): AngularFireList<any> {
    let documentoRef: AngularFireList<any> = null;
    let dbPath = `/sign/${ruta}/address`;
    documentoRef = this.afDb.list(dbPath);
    return documentoRef;
  }


  getDocStatus(ruta): AngularFireObject<any> {
    let documentoRef: AngularFireObject<any> = null;
    let dbPath = `/sign/${ruta}`;
    documentoRef = this.afDb.object(dbPath);
    return documentoRef;
  }


  deleteDocSignBox(sinBoxId, key): Promise<void> {
    let documentoRef: AngularFireList<any> = null;
    let dbPath = `/SIGNBOX/${sinBoxId}`;
    documentoRef = this.afDb.list(dbPath);
    return documentoRef.remove(key);
  }



  singFirma(ruta) {
    return new Promise((resolve, reject) => {
      this.afDb.database.ref(`/sign/${ruta}`)
        .once("value")
        .then(function (valor) {
          resolve(valor.val());
        }).catch((error) => {
          reject(null);
        });
    });
  }

  cancelarFirma(ruta, did) {
    return new Promise((resolve, reject) => {
      this.afDb.database.ref(`/sign/${ruta}/address/${did}`)
        .set(null)
        .then(function (valor) {
          console.log('MOSTRAR VALOOOOR ACTUALIZADO', valor);
          resolve(true);
        }).catch((error) => {
          console.log('Error en servicio confirmarFirma');
          reject(null);
        });
    });
  }


  geBIOCard(ruta) {
    return new Promise((resolve, reject) => {
      this.afDb.database.ref(`/${ruta}`)
        .once("value")
        .then(function (valor) {
          resolve(valor.val());
        }).catch((error) => {
          reject(null);
        });
    });
  }


  putBIOcard(ruta, data) {
    return new Promise((resolve, reject) => {
      this.afDb.database.ref(`/${ruta}`)
        .update(data)
        .then(function (valor) {
          console.log('MOSTRAR VALOOOOR', valor);
          resolve(true);
        }).catch((error) => {
          console.log('Error en servicio confirmarFirma');
          reject(null);
        });
    });
  }


  confirmarFirma(ruta, data) {
console.log('ruta',`/sign/${ruta}/address/${data.did}`);
console.log('DID',data);
    return new Promise((resolve, reject) => {
      this.afDb.database.ref(`/sign/${ruta}/address/${data.did}`)
        .update(data)
        .then(function (valor) {
          console.log('MOSTRAR VALOOOOR', valor);
          resolve(true);
        }).catch((error) => {
          console.log('Error en servicio confirmarFirma');
          reject(null);
        });
    });
  }

  putDocumento(ruta, data) {
    return new Promise((resolve, reject) => {
      this.afDb.database.ref(`/sign/${ruta}`)
        .update(data)
        .then(function (valor) {
          console.log('MOSTRAR VALOOOOR', valor);
          resolve(true);
        }).catch((error) => {
          console.log('Error en servicio confirmarFirma');
          reject(null);
        });
    });
  }



  insertSignBox(sinBoxId, data) {
    return new Promise((resolve, reject) => {
      let documentoRef: AngularFireList<any> = null;
      let dbPath = `/SIGNBOX/${sinBoxId}`;
      documentoRef = this.afDb.list(dbPath);
      resolve(documentoRef.push(data));
    });
  }



  /*  singBox(sinBoxId): AngularFireList<any> {
     let documentoRef: AngularFireList<any> = null;
     let dbPath = `/SIGNBOX/${sinBoxId}`;
     documentoRef = this.afDb.list(dbPath);
     return documentoRef;
   }
  */
  singBox(sinBoxId): AngularFireList<any> {
    let documentoRef: AngularFireList<any> = null;
    let dbPath = `/SIGNBOX/${sinBoxId}`;
    documentoRef = this.afDb.list(dbPath, ref => ref.orderByChild('status').equalTo('INI'));
    return documentoRef;
  }


  singBox2(sinBoxId): any{
  // return this.afDb.database.ref(`/SIGNBOX/${sinBoxId}`).orderByChild('status').equalTo('INI');

  let documentoRef: AngularFireList<any> = null;
  documentoRef = this.afDb.list(`/SIGNBOX/${sinBoxId}`, ref => ref.orderByChild('status').equalTo('INI'));
  documentoRef.stateChanges(['child_added'])
    .subscribe(actions => {
      console.log('MOSTRAR ACCION',actions);
      
    /*   actions.forEach(action => {
        console.log(action.type);
        console.log(action.key);
        console.log(action.payload.val());
      }); */
    });



/*     this.afDb.database.ref(`/SIGNBOX/${sinBoxId}`).orderByChild('status').equalTo('INI').on('child_added',function(childSnapshot, prevChildKey) {
      console.log('childSnapshot',childSnapshot.val());
      console.log('prevChildKey',prevChildKey);
    }); */

  }





  updateSignBox(sinBoxId: string, key: string, value: any): Promise<void> {
    let documentoRef: AngularFireList<any> = null;
    documentoRef = this.afDb.list(`/SIGNBOX/${sinBoxId}`);
    return documentoRef.update(key, value);
  }

  msjSignBoxRecibido(sinBoxId, id) {
    return new Promise((resolve, reject) => {
      this.afDb.database.ref(`/SIGNBOX/${sinBoxId}/${id}`)
        .update({ status: 'PROC' })
        .then(function (valor) {
          console.log('MOSTRAR VALOOOOR', valor);
          resolve(true);
        }).catch((error) => {
          console.log('Error en servicio confirmarFirma');
          reject(null);
        });
    });
  }





}
