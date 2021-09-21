import { Pipe, PipeTransform } from '@angular/core';
import { Country } from '../types/country.type';

@Pipe({
  name: 'filtroCountry'
})
export class FiltroCountryPipe implements PipeTransform {

  transform(countries: Country[], text: string): Country[] {

    if (text.length == 0) return countries;

    text = text.toLocaleLowerCase();

    return countries.filter(country => {
      return country.name.toLocaleLowerCase().includes(text);
    });
  }

}
