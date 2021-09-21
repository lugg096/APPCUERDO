import { ICountry } from './country.interface';

export class Country implements ICountry {
  name: string;
  flag?: string;
  get flagUrl(): string {
    return `https://lipis.github.io/flag-icon-css/flags/4x3/${this.flag}.svg`;
  }

  constructor(country: ICountry) {
    this.name = country.name;
    this.flag = country.flag;
  }
}
