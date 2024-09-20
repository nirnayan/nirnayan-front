import { Component, OnInit, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { ProfileService } from '../../service/profile.service';
import { formatDate, isPlatformBrowser } from '@angular/common';
import $ from 'jquery'
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MasterService } from '../../service/master.service';
import { environment } from '../../../environments/environment';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
  oderItem: any = [];
  pastItem: any = [];
  bookingId: number;
  basePath:any = environment.BaseApiUrl
  orderData: any;
  constructor(
    private _profile: ProfileService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    private uiLoader: NgxUiLoaderService,
    private _master: MasterService,
    private apollo: Apollo,
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.uiLoader.start();
      // $('#loader').hide()
      this.setupEventListeners();
    }

    this.loadOrders();
  }

  private setupEventListeners(): void {
    this.renderer.listen('window', 'load', () => {
      this.renderer.listen(document, 'click', (event) => {
        if ((event.target as HTMLElement).classList.contains('arrow')) {
          const target = (event.target as HTMLElement).closest('.arrow');
          const ptTstNm = target?.parentElement?.parentElement?.querySelector('.ptTstNm');
          if (ptTstNm) {
            ptTstNm.classList.toggle('show'); // Use CSS classes for showing/hiding
            target.classList.add('close');
          }
        }
      });
    });
  }

  private loadOrders(): void {
    const payload = {
      schemaName: "nir1691144565",
      user_id: this.getUserId()
    };
    this.showLoader();
    this._profile.getMyOrderItems(payload).subscribe((res: any) => {
      this.hideLoader();
      if (res.status === 1) {
        this.uiLoader.stop();
        this.oderItem = Object.values(res.data.bookings);
        console.log(this.oderItem);
      }
    });
  }

  formatDate(timestamp: string | number): string {
    if (!timestamp) {
      return '';
    }
    const timestampNumber = typeof timestamp === 'string' ? parseInt(timestamp, 10) : timestamp;
    const validTimestamp = timestampNumber.toString().length === 10 ? timestampNumber * 1000 : timestampNumber;
    const date = new Date(validTimestamp);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    return formatDate(date, 'dd MMM yyyy, h:mm a', 'en-US');
  }
  

  pastOrder(): void {
    const payload = {
      schemaName: "nir1691144565",
      user_id: this.getUserId()
    };
    this.showLoader();
    this._profile.getPastOrder(payload).subscribe((res: any) => {
      this.hideLoader();
      if (res.success === true) {
        this.pastItem = res.data;
      }
    });
  }

  private getUserId(): string | null {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem('USER_ID') : null;
  }

  private showLoader(): void {
    if (isPlatformBrowser(this.platformId)) {
      const loader = document.getElementById('loader');
      if (loader) {
        loader.style.display = 'block';
      }
    }
  }

  private hideLoader(): void {
    if (isPlatformBrowser(this.platformId)) {
      const loader = document.getElementById('loader');
      if (loader) {
        loader.style.display = 'none';
      }
    }
  }

  viewOrder(id:number){
    this.bookingId = id
    this.getOrderDetails(id)
  }

  async downloadInvce() {
    if(this.bookingId){
      let request = {
        bookingId: this.bookingId
      }
      this._master.DownloadInvoice(request).subscribe((res:any) => {
        if(res) {
          window.open(this.basePath+res.data, '_blank');
        }
      })
    }
  }
  getOrderDetails(id: number) {
    this.apollo
      .watchQuery({
        query: gql`
          query {
        order(id: ${id}) {
        user_id
        booking_id
        gross_amount
        discount_amount
        received_amount
        net_amount
        due_amount
        booking_date
        coins
        address {
            id 
            addressName
            fullName
            contactNumber
            alt_contactNumber
            addressLine_1
            addressLine_2
            landMark
            latitude
            longitude
        }
        patientDetails {
            patient_name
            doctor_name
            tests{
                test_id
                test_name
                test_code
                costAmount
                mrpAmount
            }
              }
            }
          }
        `,
      }).valueChanges.subscribe((result: any) => {
        this.orderData = result?.data?.order;
      });
  }
}
