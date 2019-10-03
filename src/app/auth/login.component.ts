import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  error = '';
  currentUser;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.logout();
    this.currentUser = false;
  }

  login() {
    this.model.action = 'login';
    this.loading = true;
    this.authService.loginForm(this.model).subscribe(response => {
      if (response.status === 'success') {
        this.authService.setUser(response);
      }
      if (response.status === 'invalid') {
        this.error = 'Bład logowania';
        this.loading = false;
      }
    }, error => {
      this.error = 'Bład logowania';
      this.loading = false;
    });
  }

}
