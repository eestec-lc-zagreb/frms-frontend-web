import { ToastData, ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';
import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {

  constructor(private toastyService: ToastyService, private toastyConfig: ToastyConfig) {
    this.toastyConfig.theme = 'bootstrap';
  }

  public notify(title: string, message: string, notificationType: string) {

    // Or create the instance of ToastOptions
    const toastOptions: ToastOptions = {
      title: title,
      msg: message,
      showClose: true,
      timeout: 5000,
      theme: 'bootstrap',
      onAdd: (toast: ToastData) => {
      },
      onRemove: function (toast: ToastData) {
      }
    };
    // Add see all possible types in one shot
    switch (notificationType) {
      case 'success': {
        this.toastyService.success(toastOptions);
        break;
      }
      case 'info': {
        this.toastyService.info(toastOptions);
        break;
      }
      case 'warning': {
        this.toastyService.warning(toastOptions);
        break;
      }
      case 'wait': {
        this.toastyService.wait(toastOptions);
        break;
      }
      case 'error': {
        this.toastyService.error(toastOptions);
        break;
      }
      default: {
        break;
      }
    }
  }
}
