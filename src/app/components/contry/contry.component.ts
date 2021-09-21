import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PortService } from 'src/app/services/port.service';
import { Country } from 'src/app/types/country.type';

@Component({
  selector: 'app-contry',
  templateUrl: './contry.component.html',
  styleUrls: ['./contry.component.scss'],
})
export class ContryComponent implements OnInit {

  public countries: Country[];
  @Input() country :Country;
  public textFilter: string = '';
  constructor(
    private _modal: ModalController,
    private _conuntry: PortService) { }

  ngOnInit() {
    this.getItems();
  }

  filter(event) {
    const texto = event.target.value;
    this.textFilter =texto;
  }

  getItems() {
    this.countries = this._conuntry.getCountries();
  }

  closeModal(country:Country) {
    this._modal.dismiss({
      country:country
    });
  }
}
