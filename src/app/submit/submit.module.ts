import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubmitPage } from './submit.page';

import { FactionsComponent } from './factions/factions.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: SubmitPage }]),
    ReactiveFormsModule
  ],
  declarations: [SubmitPage, FactionsComponent]
})
export class SubmitPageModule {}
