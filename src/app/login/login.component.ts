import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, FormsModule, IonicModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController
  ) { }

  onLogin() {
    const credentials = {
      email: this.email,
      password: this.password
    };

    this.authService.login(credentials).subscribe(
      async (response) => {
        console.log('Login exitoso', response);
        this.router.navigate(['/home']);
      },
      async (error) => {
        console.error('Error en el login', error);
        const toast = await this.toastController.create({
          message: 'Error en el login. Verifica tus credenciales.',
          duration: 3000,
          position: 'bottom'
        });
        await toast.present();
      }
    );
  }

  onForgotPassword() {
    console.log('Forgot password clicked');
  }
}

