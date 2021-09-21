import { Injectable } from '@angular/core';
import { Country } from '../types/country.type';

@Injectable()
export class PortService {
  private countries: Country[] = [
    new Country({
      name: 'Perú',
      flag: 'pe',
    })
    , new Country({
      name: 'Chile',
      flag: 'cl',
    }), new Country({
      name: 'Argentina',
      flag: 'ar',
    }), new Country({
      name: 'Brazil',
      flag: 'br',
    }),
    new Country({
      name: 'Bolivia',
      flag: 'bo',
    }),
    new Country({
      name: 'Colombia',
      flag: 'co',
    }),
    new Country({
      name: 'Costa Rica',
      flag: 'cr',
    }),
    new Country({
      name: 'Cuba',
      flag: 'cu',
    }),
    new Country({
      name: 'El Salvador',
      flag: 'sv',
    }),
    new Country({
      name: 'Guatemala',
      flag: 'gt',
    }),
    new Country({
      name: 'Honduras',
      flag: 'hn',
    }),
    new Country({
      name: 'Mexico',
      flag: 'mx',
    }),
    new Country({
      name: 'Nicaragua',
      flag: 'ni',
    }),
    new Country({
      name: 'Paraguay',
      flag: 'py',
    }),
    new Country({
      name: 'Republica Dominicana',
      flag: 'do',
    }),
    new Country({
      name: 'Uruguay',
      flag: 'uy',
    }),

    new Country({
      name: 'España',
      flag: 'es',
    }),
    new Country({
      name: 'Italy',
      flag: 'it',

    }), new Country({
      name: 'Spain',
      flag: 'es',

    }), new Country({
      name: 'Panama',
      flag: 'pa',

    }), new Country({
      name: 'United States',
      flag: 'us',

    }), new Country({
      name: 'Australia',
      flag: 'au',

    }), new Country({
      name: 'Venezuela',
      flag: 've',

    }), new Country({
      name: 'Ecuador',
      flag: 'ec',

    }), new Country({
      name: 'France',
      flag: 'fr',

    })];
/* 
  getCountries(page?: number, size?: number): Country[] {
    let countries = [];

    if (page && size) {
      countries = this.countries.slice((page - 1) * size, ((page - 1) * size) + size);
    } else {
      countries = this.countries;
    }

    return countries;
  } */

  getCountries(): Country[] {
    return this.countries;
  }

  getCountry(flag: string) {
    return this.countries.filter(port => {
      return port.name.toLowerCase().indexOf(flag) !== -1
    })
  }

  /*   filterPorts(ports: Port[], text: string){
      return ports.filter(port => {
        return port.name.toLowerCase().indexOf(text) !== -1 ||
          port.country.name.toLowerCase().indexOf(text) !== -1;
      });
    } */

  isInteger(value: any): boolean {
    return value === parseInt(value, 10);
  }

  formatNumber(value: number, length: number): string {
    let formattedNumber = '';

    for (let i = 0; i < length; i++) {
      formattedNumber += '0';
    }

    return (formattedNumber + value).slice(-length);
  }

  formatTimeZone(offset: number): string {
    if (offset === 0) {
      return 'Z';
    }

    if (!this.isInteger(offset)) {
      return '';
    }

    // Time zones vary from -12:00 to 14:00.
    if (offset < -720 || offset > 840) {
      return '';
    }

    let sign = '+';

    if (offset < 0) {
      offset *= -1;
      sign = '-';
    }

    let minutes = offset % 60,
      hours = (offset - minutes) / 60;

    return sign + this.formatNumber(hours, 2) + ':' + this.formatNumber(minutes, 2);
  }
}
