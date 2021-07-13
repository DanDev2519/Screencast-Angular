import { Component, ComponentFactoryResolver, OnInit, ViewContainerRef } from '@angular/core';
import { DinamicItemComponent } from './dinamic-item/dinamic-item.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  constructor(private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    setTimeout(() => {
      // фабрика для создания компонента
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DinamicItemComponent);
      // в контейнере создаем динамический компонент с помощью фабрики
      const componentRef = this.viewContainerRef.createComponent(componentFactory);
    }, 3000);
  }

}
