import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-details-client',
  templateUrl: './details-client.component.html',
  styleUrls: ['./details-client.component.css']
})
export class DetailsClientComponent implements OnInit {

  id :string ;
  client : Client = {};
  showBalance :boolean = false;
  constructor(private clientService: ClientService, private router: ActivatedRoute, private route: Router, private flashMessage: FlashMessagesService) { }

  ngOnInit(): void {
    //recuperer ID
    this.id =this.router.snapshot.params['id'];

    //recuperer Client
    this.clientService.getClient(this.id).subscribe(client => {
    this.client = client;
      //console.log(client);
      
    })
  }


  onSumbit(){
    this.client.id = this.id;
    this.clientService.updateClient(this.client);
    this.flashMessage.show('balance update', {cssClass : 'alert-warning',timeout:5000});
    this.showBalance = false;
  }


  deleteClient(id:string){
    if(confirm('Are you sure you want to delete this client ? ')){

      this.clientService.deleteClient(id);
      this.flashMessage.show('client deleted ', {cssClass : 'alert-danger',timeout:3000});

      this.route.navigate(['/'])  
    }

  }



}
