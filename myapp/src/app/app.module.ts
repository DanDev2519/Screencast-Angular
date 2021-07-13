import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { UserCardComponent } from './user/user-card/user-card.component';
import { ItemComponent } from './item/item.component';
import { ColoryDirective } from './item/colory.directive';
import { DelayDirective } from './item/delay.directive';
import { DinamicItemComponent } from './item/dinamic-item/dinamic-item.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserCardComponent,
    ItemComponent,
    ColoryDirective,
    DelayDirective,
    DinamicItemComponent
  ],
  entryComponents: [DinamicItemComponent], // компоненты которые будут добалвены динамически
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
