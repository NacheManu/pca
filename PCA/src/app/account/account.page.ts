import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage-angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { AlertController, ModalController } from '@ionic/angular';
import { EditAccountModalPage } from '../edit-account-modal/edit-account-modal.page';

defineCustomElements(window);

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: false
})
export class AccountPage implements OnInit {
  user_data: any = {
    id: '',
    name: '',
    email: '',
    image: '',
    followees: [],
    followers: []
  };

  constructor(
    private userService: UserService,
    private storage: Storage,
    public alertController: AlertController,
    private modalController: ModalController
  ) {}

  async ngOnInit() {
    await this.loadUserData();
  }

  async loadUserData() {
    try {
      const user: any = await this.storage.get('user');
      console.log(user, "usuario");

      const data = await this.userService.getUser(user.id);
      console.log('Datos actualizados del usuario:', data);

      await this.storage.set('user', data);
      this.user_data = data;
    } catch (error) {
      console.log('Error al obtener los datos del usuario:', error);
    }
  }

  async openEditModal() {
    const modal = await this.modalController.create({
      component: EditAccountModalPage,
      componentProps: { user_data: { ...this.user_data } }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
  
    if (data) {
      await this.loadUserData();
    }
  }

  async takePhoto(source: CameraSource) {
    console.log('Take Photo');
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: source,
      quality: 100
    });

    console.log(capturedPhoto.dataUrl);
    this.user_data.image = capturedPhoto.dataUrl;
    this.update();
  }

  async update() {
    try {
      const data = await this.userService.updateUser(this.user_data);
      console.log('Usuario actualizado:', data);
      await this.loadUserData();
    } catch (error) {
      console.log('Error al actualizar el usuario:', error);
    }
  }

  async presentPhotoOptions() {
    const alert = await this.alertController.create({
      header: "Seleccione una opción",
      message: "¿De dónde desea obtener la imagen?",
      buttons: [
        {
          text: "Cámara",
          handler: () => {
            this.takePhoto(CameraSource.Camera);
          }
        },
        {
          text: "Galería",
          handler: () => {
            this.takePhoto(CameraSource.Photos);
          }
        },
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {
            console.log('Cancelado');
          }
        }
      ]
    });

    await alert.present();
  }
}
