import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { ProfileService } from 'src/app/service/profile.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-shared-modal',
  templateUrl: './shared-modal.component.html',
  styleUrls: ['./shared-modal.component.css']
})
export class SharedModalComponent implements OnInit {
  allPatients:any = []
  constructor(
    private _profile: ProfileService,
    private _cart: CartService,
    private _auth: AuthService,
  ) { }

  ngOnInit(): void {
    let payload2 = {
      schemaName: 'nir1691144565',
      user_id: Number(localStorage.getItem('USER_ID'))
    }

    this._profile.getPatient(payload2).subscribe((res:any) => {
      if(res.status==1) {
        this.allPatients = res.data
      }
    })
  }
    prodDetails:any = {}
  async patientSelect(id:number, name:any) {
    let payload = {
      "schemaName": "nir1691144565",
      "user_id": localStorage.getItem('USER_ID')
    }
    let cartItemLength = await this._cart.getCartList(payload).toPromise();
    // if (cartItemLength.status == 1) {
      let payload2 = {
        "schemaName": "nir1691144565",
        "user_id": localStorage.getItem('USER_ID'),
        "patient_id": id,
        "prod_type": this.prodDetails.type,
        "prod_id": this.prodDetails.productId,
        "price": this.prodDetails.amount,
        "location_id": localStorage.getItem('LOCATION_ID')
      }
      
      this._cart.addToCart(payload2).subscribe(async(res: any) => {
        if (res.status == 1) {
          this._auth.sendQtyNumber(Number(cartItemLength.data.testCount) + 1);
          $("#patientModal").hide();
          $('body').removeClass('modal-open');
          $(".modal-backdrop").removeClass("modal-backdrop show");
          Swal.fire({
            position: "center",
            icon: "success",
            text: `Added successfully for ${name}`,
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          alert(res.data)
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.data,
          });
          // this.toast.presentAlert('Already added!',"Same test you cant't repeat",'Please add another test.')
        }
      })
    // }
  }
}
