import { MyVaultPage } from './../my-vault/my-vault';
import { AddReceiptPage } from './../add-receipt/add-receipt';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { ReceiptPoster } from './../shared/receipt-post.service';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet'
import { ActionSheetController } from 'ionic-angular';
import { OcrUploadImageModel } from './../../models/ocruploadimage.model';

/*
  Generated class for the Vault page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-vault',
  templateUrl: 'vault.html'
})
export class VaultPage {

  receiptImage: any;
  model = new OcrUploadImageModel('');
  
  ocrreply: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public camera: Camera, public receiptPoster: ReceiptPoster, private actionSheet: ActionSheet, private actionSheetCtrl: ActionSheetController, private loadingController: LoadingController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad VaultPage');
  }

  image_fire() {
    const options = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: this.camera.PictureSourceType.CAMERA,
      mediaType: this.camera.MediaType.PICTURE
    }

    let loader = this.loadingController.create({
      content: 'Please wait...'
    });

    loader.present().then(() => {
          this.camera.getPicture(options).then((imageData) => {
          console.log("imageData from image_fire() here: ", imageData);
          return imageData;
        }, (err) => {
            console.log("We couldn't grab the picture. Probably running in a browser or the camera failed. Error follows: ", err);
        });
        this.receiptPoster.postReceiptForm(this.model)
        .subscribe(
          data => this.ocrreply = data.somethingReturned,
          err => console.log('error: ', err),
          () => console.log('Something returned: ', this.ocrreply),
        );
        loader.dismiss();
    });
  }

  image_pick() {
    const options = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
			sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.PICTURE
    }

    let loader = this.loadingController.create({
      content: 'Please wait...'
    });

    loader.present().then(() => {
          this.camera.getPicture(options).then((imageData) => {
          console.log("imageData from image_pick() here: ", imageData);
          return imageData;
        }, (err) => {
            console.log("We couldn't grab the picture. Probably running in a browser or the camera failed. Error follows: ", err);
        });
        this.receiptPoster.postReceiptForm(this.model)
        .subscribe(
          data => this.ocrreply = data.somethingReturned,
          err => console.log('error: ', err),
          () => console.log('Something returned: ', this.ocrreply),
        );
        loader.dismiss();
    });
  }

  fireUploadSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select an image from:',
      buttons: [
        {
          text: 'Camera Roll',
          handler: () => {
            this.image_pick();
          }
        },
        {
          text: 'Take Photo with Camera',
          handler: () => {
            this.image_fire();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  loadAddRecieptPage(){
    this.navCtrl.push(AddReceiptPage)
  }

  loadUploadPage(){

  }

  loadMyVaultPage(){
    this.navCtrl.push(MyVaultPage);
  }

}
