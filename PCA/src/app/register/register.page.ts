import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})

export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  errorMessage: any;
  
  formErrors = {
    name: [
      { type: 'required', message: 'El nombre es obligatorio' },
      { type: 'minlength', message: 'El nombre debe tener al menos 2 caracteres' }
    ],
    lastname: [
      { type: 'required', message: 'El apellido es obligatorio' },
      { type: 'minlength', message: 'El apellido debe tener al menos 2 caracteres' }
    ],
    email: [
      { type: 'required', message: 'El correo es obligatorio' },
      { type: 'email', message: 'El correo no es válido' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 6 caracteres' }
    ],
    passwordConfirmation: [
      { type: 'required', message: 'Debe confirmar la contraseña' },
      { type: 'mismatch', message: 'Las contraseñas no coinciden' }
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController
  ) { 
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])),
      lastname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
      passwordConfirmation: new FormControl('', Validators.compose([
        Validators.required
      ]))
    }, { 
      validator: this.passwordMatchValidator 
    });
  }

  ngOnInit() {}

  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const passwordConfirmation = form.get('passwordConfirmation')?.value;
    if (password !== passwordConfirmation) {
      form.get('passwordConfirmation')?.setErrors({ mismatch: true });
    } else {
      form.get('passwordConfirmation')?.setErrors(null);
    }
  }

  registerUser(registerData: any) {
    if (this.registerForm.valid) {
      this.authService.register(registerData).then(res => {
        console.log(res);
        this.errorMessage = '';
        this.navCtrl.navigateForward('/login');
      }).catch(err => {
        console.log(err);
        this.errorMessage = err;
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}
