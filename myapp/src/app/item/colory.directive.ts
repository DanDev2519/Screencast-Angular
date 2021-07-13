import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appColory]',
  exportAs: 'coloryDirective' // экспорт класса ColoryDirective
})
export class ColoryDirective {
  public counter: number = 0;

  // Декоратор для обновления свойств, на котором весит эта директива
  @HostBinding('style.color') textColor: string;

  // Декоратор для обработки событий
  @HostListener('click', ['$event']) changeColor(event: any) {
    this.setRandomColor();
    this.counter++;
    // console.log(this.counter);
    // console.log(event.target.textContent);
  };

  constructor() {
    this.textColor = 'red';
    setTimeout(() => {
      this.textColor = 'blue';
    }, 1000);
  }

  setRandomColor() {
    this.textColor = '#' + Math.floor(Math.random() * 16954321).toString(16);
  }


}
