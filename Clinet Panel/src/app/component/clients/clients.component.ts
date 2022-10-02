import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Client } from 'src/app/models/client';
import { AuthClientService } from 'src/app/services/auth-client.service';
import { ClientService } from 'src/app/services/client.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {


  clients : Client[];
  total : number = 0;
  oldClients: Client[] = [];
  search: string = "";

  constructor(private clientService: ClientService ,private authClientService: AuthClientService, private route: Router , private flashMessage: FlashMessagesService) { }

  ngOnInit(): void {
    this.authClientService.getAuth().subscribe(auth =>{

      this.clientService.getClients(auth.uid).subscribe(clients => { this.clients = clients

        this.oldClients=this.clients = clients;
        //console.log(this.clients);
  
        this.total = this.getTotal();
  
      }); 

    })


  }

  getTotal(){
    return this.clients.reduce((total,client) =>{
     // return total + client.balance;
      return total + parseFloat (client.balance.toString());
    },0) //colback de 0
  }

  
  deleteClient(id:string){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
          this.clientService.deleteClient(id);
          this.flashMessage.show('client deleted ', {cssClass : 'alert-danger',timeout:3000});
          this.route.navigate(['/']) 
        Swal.fire(
          {
            title: 'Deleted',
            text: "This client is deleted",
            icon: 'success',
            timer : 3000
          }
          // 'Deleted!',
          // 'Client deleted.',
          // 'success'
          
        )
      }
    })
    
    // if(confirm('Are you sure you want to delete this client ? ')){

    //   this.clientService.deleteClient(id);
    //   this.flashMessage.show('client deleted ', {cssClass : 'alert-danger',timeout:3000});

    //   this.route.navigate(['/'])  
    // }
  }


  searchClient(){
    


   if(!this.search) {
    this.clients = this.oldClients;
    this.getTotal();
    return;
  }
  

    this.clients = this.clients.filter(client => client.firstName.toLowerCase().includes(this.search.toLowerCase()) ||
       client.lastName.toLowerCase().includes(this.search.toLowerCase()) || 
       client.phone.toString().includes(this.search) || 
       client.email.toLowerCase().includes(this.search.toLowerCase()))

       this.getTotal();
    
  }
   //this.clients = this.oldClients.filter(client => client.firstName.includes(this.search) || client.lastName.includes(this.search) ||  client.phone.toString(parseInt(this.search)) );

}
