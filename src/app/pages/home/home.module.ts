import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { homeRouting } from './home.routing';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home.component';

@NgModule({
  imports: [
    RouterModule.forChild(homeRouting),
    CommonModule,
  ],
  declarations: [
    HomePageComponent
  ],
  providers: [],
})
export class HomeModule { }
