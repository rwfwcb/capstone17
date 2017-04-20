import { UserApi } from './../shared/user-api.service';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the AccountDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-account-detail',
  templateUrl: 'account-detail.html'
})
export class AccountDetailPage {
  
  accountType = "HSA";
  user = "umbcapstone17%40gmail.com";

  transactions: any;
  success: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userApi: UserApi) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountDetailPage');
    this.userApi.user = this.user;

    /*if (this.accountType == "HSA"){
      this.loadHsaTransaction();
    }
    else{
      this.loadFsaTransaction();
    }*/
    this.userApi.getHsaTransaction().then(data => this.transactions = data);
    
  }

  goBack() {
    this.navCtrl.pop();
  }

}