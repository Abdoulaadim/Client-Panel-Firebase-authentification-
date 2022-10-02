import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { AuthClientService } from 'src/app/services/auth-client.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  isLoggedIn: boolean = false;
  userLoggedIn: string;

  constructor(private authClientService: AuthClientService, private router: Router, private flashMessage: FlashMessagesService) { }


  ngOnInit(): void {

    this.authClientService.getAuth().subscribe(auth => {
      if(auth){
         this.isLoggedIn = true;
         this.userLoggedIn = auth.email;
      }else{
        this.isLoggedIn = false;
      }
    })
    
  }

  onLogout(){

    this.authClientService.logout();
    return this.router.navigate(['/login']);

  }



}
