import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { AuthClientService } from 'src/app/services/auth-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  email : string;
  password : string;

  constructor(private authClientService: AuthClientService,private flashMessage: FlashMessagesService,private router: Router) { }

  ngOnInit(): void {
    this.authClientService.getAuth().subscribe(auth => {
      if(auth){
         this.router.navigate(['/']);
      }
    })
  }

  onLogin(){
    this.authClientService.login(this.email,this.password)
        .then(auth =>{
            if(auth){
              this.flashMessage.show('You are logged successufully' , {
                cssClass: "alert-success", timeout : 3000
              })

              this.router.navigate(['/']);
            }
        })
      .catch(error =>{
        this.flashMessage.show(error.message , {
          cssClass: "alert-danger", timeout :10000
        })
      })



  }

  onLoginWithGoogle() {

    this.authClientService.loginWithGoogle()
    .then(auth =>{
        if(auth){
          this.flashMessage.show('You are logged successufully' , {
            cssClass: "alert-success", timeout : 3000
          })

          this.router.navigate(['/']);
        }
    })
  .catch(error =>{
    this.flashMessage.show(error.message , {
      cssClass: "alert-danger", timeout :10000
    })
  })

  }

}
