import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Client } from 'src/app/models/client';
import { AuthClientService } from 'src/app/services/auth-client.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client: Client = {
    firstName : "",
    lastName : "",
    email : "",
    phone : null,
    balance : 0,
    user : ""
  }

  constructor(private  clientService: ClientService, private router: Router , private flashMessage:FlashMessagesService , private authClientService:AuthClientService) { }

  ngOnInit(): void {

    this.authClientService.getAuth().subscribe(auth => {
     this.client.user = auth.uid
    })
  }

  onSubmit(){
    this.clientService.newClient(this.client);
    this.flashMessage.show('client add succesfully', {cssClass: ' alert-success', timeout: 5000});
    return this.router.navigate(['/']);
  }

}
