import { Injectable } from '@angular/core';
import {NgFlashMessageComponent} from 'ng-flash-messages/components/ng-flash-message.component';
import {NgFlashMessageService} from 'ng-flash-messages';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private ngFlashMessageService: NgFlashMessageService) { }

   public flashErrorMessage(errorMessage, errorCode) {
    this.ngFlashMessageService.showFlashMessage({
      // Array of messages each will be displayed in new line
      messages: [errorMessage, errorCode],
      // Whether the flash can be dismissed by the user defaults to false
      dismissible: true,
      // Time after which the flash disappears defaults to 2000ms
      timeout: false,
      // Type of flash message, it defaults to info and success, warning, danger types can also be used
      type: 'danger'
    });
  }
  public flashSuccessMessage(message) {
    this.ngFlashMessageService.showFlashMessage({
      // Array of messages each will be displayed in new line
      messages: [message],
      // Whether the flash can be dismissed by the user defaults to false
      dismissible: true,
      // Time after which the flash disappears defaults to 2000ms
      timeout: false,
      // Type of flash message, it defaults to info and success, warning, danger types can also be used
      type: 'success'
    });
  }
}
