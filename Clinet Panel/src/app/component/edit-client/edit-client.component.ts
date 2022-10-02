import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  id :string ;
  client: Client = {
    firstName : "",
    lastName : "",
    email : "",
    phone : null,
    balance : 0
  }

  constructor(private  clientService: ClientService, private router: ActivatedRoute , private route : Router, private flashMessage:FlashMessagesService) { }

  ngOnInit(): void {
        //recuperer ID
        this.id =this.router.snapshot.params['id'];

        //recuperer Client
        this.clientService.getClient(this.id).subscribe(client => {
        this.client = client;
          
        })
  }

  onSubmit(){
    this.client.id = this.id;
    this.clientService.updateClient(this.client);
    this.flashMessage.show('Client Update avec success', {cssClass :'alert-success', timeout:4000});
    this.route.navigate(['/client/',this.id]);
  }

}
