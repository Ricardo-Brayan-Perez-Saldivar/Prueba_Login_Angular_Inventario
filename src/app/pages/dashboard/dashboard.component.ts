import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { User } from 'src/app/services/auth/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  userLoginOn:boolean=false;
  UserData?:User;

  constructor(private loginservice: LoginService){}
  ngOnDestroy(): void {
    this.loginservice.currentUserData.unsubscribe();
    this.loginservice.currentUserLoginOn.unsubscribe();
  }

  ngOnInit():void{
    this.loginservice.currentUserLoginOn.subscribe({
      next:(userLoginOn) =>{
        this.userLoginOn=userLoginOn;
      }
    })

    this.loginservice.currentUserData.subscribe({
      next:(UserData) =>{
        this.UserData=UserData;
      }
    })
  }

}
