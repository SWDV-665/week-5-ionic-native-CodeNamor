import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { GroceriesServiceService } from '../groceries-service.service';
import { SocialSharing} from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(public alertController: AlertController, public toastCtrl: ToastController, public dataService: GroceriesServiceService, public socialSharing: SocialSharing) {}

  title = "Grocery";

  loadItem() {
    return this.dataService.getItems();
  }

  addItem() {
    console.log("Adding Item:")
    this.showItemPromt();
  }

  async showItemPromt() {
    const alert = await this.alertController.create({
      header: 'Add item',
      message: "Please enter Item Content",
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name'
        },
        {
          name: 'quantity',
          type: 'text',
          placeholder: 'quantity'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: item => {
            console.log('Confirm Ok', item);
            this.dataService.addItem(item)
          }
        }
      ]
    });

    await alert.present();
  }

  async removeItem(item, index) {
    console.log("Removing Item - ", item, index);
    const toast = await this.toastCtrl.create({
      message: 'Removing Item - ' + index + " ...",
      duration: 3000
    });
    toast.present();

    this.dataService.removeItem(index)
  }

  async editItem(item, index) {
    console.log("Edit Item - ", item, index);
    const toast = await this.toastCtrl.create({
      message: 'Editing Item - ' + index + " ...",
      duration: 3000
    });
    toast.present();
    this.showEditItemPromt(item, index);''

  }

  async showEditItemPromt(item, index) {
    const alert = await this.alertController.create({
      header: 'Edit item',
      message: "Please edit Item ...",
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name',
          value: item.name
        },
        {
          name: 'quantity',
          type: 'text',
          placeholder: 'quantity',
          value: item.quantity
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: item => {
            console.log('Confirm Ok', item);
            this.dataService.editItem(item, index);
          }
        }
      ]
    });

    await alert.present();
  }

  async shareItem(item, index) {
    console.log("Sharing Item - ", item, index);
    const toast = await this.toastCtrl.create({
      message: 'Sharing Item - ' + index + " ...",
      duration: 3000
    });
    toast.present();

    let message = "Grocery Item - Name : " + item.name + " - Quantity: " + item.quantity;
    let subject = "Shared via Grocery App";
    this.socialSharing.share(message, subject).then(() => {
      // Sharing via email is possible
      console.log("Shared Successfully!")
    }).catch((error) => {
      // Sharing via email is not possible
      console.error("Error while sharing", error
      )
    });
  }
}
