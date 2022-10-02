import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { AuthClientService } from 'src/app/services/auth-client.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;

  constructor(private authClientService: AuthClientService, private router: Router , private flashMessage:FlashMessagesService) { }

  ngOnInit(): void {
  }

  onRegister(){
    this.authClientService.register(this.email, this.password)
        .then(register => {

          if(register){
            this.flashMessage.show('configuration you are logged', {cssClass : 'alert-success',timeout: 5000});
            this.router.navigate(['/']);
          }

        })
        .catch(error => {
          this.flashMessage.show(error.message, {cssClass : 'alert-danger',timeout: 5000});
        })
  }

}
