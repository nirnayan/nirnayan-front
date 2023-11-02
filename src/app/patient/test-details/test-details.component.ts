import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;
import AOS from 'aos';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { MasterService } from 'src/app/service/master.service';




@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css']
})
export class TestDetailsComponent implements OnInit {
  details:any;
  parameters:any;
  cartTestArr: any = []
  cartlist:any = []

  constructor(private _master: MasterService,
    private _route: ActivatedRoute,
    private _auth: AuthService,
    private _cart: CartService,
    private _toastr: ToastrService,
    private _router: Router) { }

  ngOnInit(): void {
    AOS.init();
    $(document).ready(function() {
      $('.parameterBoxHead').on('click', function() {
        $(this).parent(".parameterBox").toggleClass("open");
        $(this).parent().siblings().removeClass("open");
      });
    });

    this._route.params.subscribe((param:any) => {
      const formData = new FormData();
      formData.append('test_id', param.id);
      this._master.getDetailsByTestId(formData).subscribe((res:any) => {
        $("#loader").hide();
        if(res.message == 'Success') {
          this.details = res.data;
          
        }
      }, err => {
        console.log(err)
        $("#loader").hide();
      })
    })
    let payload1 = {
      "schemaName": "nir1691144565",
      "user_id": Number(localStorage.getItem('USER_ID')),
      "location_id": Number(localStorage.getItem('LOCATION_ID'))
    }
    this._cart.getCartList(payload1).subscribe((res:any) => {
      if(res.status == 1) {
        this.cartlist = res.data
      }
      else if(res.status == 503 || res.status == 403) {
        localStorage.clear();
        this._router.navigate(['/auth/login'])
      }
    })
    // this._toastr.success('everything is broken', 'Major Error');
  }

  addToCart(testId: any, type: any) {
    let test = {
      "schemaName": "nir1691144565",
      "user_id": localStorage.getItem('USER_ID'),
      "patient_id": 0,
      "prod_type": type,
      "prod_id": testId
    }
    this.cartTestArr.push(test)
    this._auth.sendQtyNumber(this.cartlist.length + 1);

    this._cart.addToCart(test).subscribe((res:any) => {
      if(res.status ==1) {
        document.getElementById('cart').innerHTML = 'Added'
        this.ngOnInit()

      }
    })
  }
}
