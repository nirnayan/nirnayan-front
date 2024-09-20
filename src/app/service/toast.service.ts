import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor() {}

  showToast(title: string, icon: 'success' | 'error' | 'warning' | 'info' = 'success', position: 'top' | 'top-start' | 'top-end' | 'center' | 'center-start' | 'center-end' | 'bottom' | 'bottom-start' | 'bottom-end' = 'top-end') {
    const Toast = Swal.mixin({
      toast: true,
      position: position,
      iconColor: 'white',
      customClass: {
        popup: 'colored-toast',
      },
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

    Toast.fire({
      icon: icon,
      titleText:title,
    });
  }
}