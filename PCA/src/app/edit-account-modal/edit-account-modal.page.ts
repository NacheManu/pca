import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-edit-account-modal',
  templateUrl: './edit-account-modal.page.html',
  styleUrls: ['./edit-account-modal.page.scss'],
  standalone: false
})

export class EditAccountModalPage implements OnInit {
  user_data: any = {
    id: '',
    name: '',
    last_name: ''
  };
  isLoading = false;

  constructor(
    private modalController: ModalController,
    private userService: UserService
  ) {}

  ngOnInit() {}

  async closeModal(save: boolean) {
    if (save) {
      this.updateUser();
    } else {
      await this.modalController.dismiss(null);
    }
  }

  async updateUser() {
    this.isLoading = true;
    try {
      const updatedUser: any = await this.userService.updateUser(this.user_data);
      console.log('Usuario actualizado:', updatedUser);
      this.isLoading = false;
      await this.modalController.dismiss(updatedUser);
    } catch (error) {
      console.log('Error al actualizar el usuario:', error);
      this.isLoading = false;
    }
  }
}
