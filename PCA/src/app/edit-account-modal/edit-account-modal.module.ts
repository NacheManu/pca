import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAccountModalPageRoutingModule } from './edit-account-modal-routing.module';

import { EditAccountModalPage } from './edit-account-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditAccountModalPageRoutingModule
  ],
  declarations: [EditAccountModalPage]
})
export class EditAccountModalPageModule {}
