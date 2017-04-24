import { Component, ElementRef } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { VaultPage } from './../vault/vault';
import { NgForm } from '@angular/forms/src/directives';
import { UserApi, User, AuthService, UserGlobals } from './../shared/user-api.service';
import { ReceiptModel } from './../../models/receiptForm.model';

/*
  Generated class for the ReceiptForm page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-receipt-form',
  templateUrl: 'receipt-form.html'
})
export class ReceiptFormPage {

  model = new ReceiptModel(0);

  searchJson: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public elementRef: ElementRef, public authService: AuthService, public user: User, public userGlobals: UserGlobals, public loadingController: LoadingController) {
    /*this.searchJson = [
      {
        item: 'Product something',
        amount: '4.99'
      },
      {
        item: 'Something Product',
        amount: '2.59'
      },
      {
        item: 'This is Stupid',
        amount: '4.36'
      },
      {
        item: 'Almost done with this shit!',
        amount: '5.99'
      }
    ];
    */
    this.searchJson = this.userGlobals.getParsedPrices();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceiptFormPage');
    console.log(this.searchJson);
  }

  receipt = {
    totalPrice: 0
  };

  receiptForm(form: NgForm) {

    let loader = this.loadingController.create({
      content: 'Loading your receipt information...',
    });
    loader.present();

    function sleep (time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }

    sleep(1600).then(() => {
      if(this.userGlobals.getDidRegister()) {
        loader.dismissAll();
        console.log("user did register, yay");
        //this.toast.show("Successfully logged in! Redirecting you now...", "1800", "bottom");
        this.navCtrl.push(VaultPage);
      }
      else {
        loader.dismissAll();
        //this.toast.show("Invalid username or password.", "1800", "center");
        console.log("Login error.");
      }
    }, err => {
      loader.dismissAll();
      //this.toast.show("Invalid username or password.", "1800", "center");
      console.log("err: ", err);
    });
  }
}
