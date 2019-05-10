import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LandlordService } from '../../_services/landlord.service';
import { Url } from '../../mygloabal';
@Component({
  selector: 'app-tenant-nav',
  templateUrl: './tenant-nav.component.html',
  styleUrls: ['./tenant-nav.component.css']
})
export class TenantNavComponent implements OnInit {
 public profilephoto:any;
 url=Url;
 public notification:any;
 
  constructor(private router:Router , public landlord_Service:LandlordService) { 

    let userInfo= JSON.parse(localStorage.getItem('currentUser'));
   this.profilephoto=userInfo.userinfo.profilephoto;

  }

  ngOnInit() {
    this.getNotificationdata();
  }

  
logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  this.router.navigate(['/login']);
}

getNotificationdata()
  {

      this.landlord_Service.getNotification().subscribe((data)=>{
        this.notification=data;
        console.log(data);
      })  
      setInterval(()=> {
        this.landlord_Service.getNotification().subscribe((data)=>{
          this.notification=data;
          console.log(data);
        }) ; },2000); 
  }
}
