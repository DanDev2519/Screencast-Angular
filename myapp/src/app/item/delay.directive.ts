import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDelay]'
})
export class DelayDirective implements OnInit {

  // Входящий параметр
  @Input() appDelay!: number;

  constructor( //инжектирум сервисы в конструктор
    private template: TemplateRef<any>, // тип указывается, потому что он дженерик
    private view: ViewContainerRef
  ) { }

  ngOnInit() {
    // компонента появится после заданного количества времени
    setTimeout(() => {
      this.view.createEmbeddedView(this.template);
    }, this.appDelay * 1000);
  }
}
