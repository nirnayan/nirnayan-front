import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;
import AOS from 'aos';
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
  isLogin: boolean = false
  testItems:any[];



  constructor(private _master: MasterService,
    private _route: ActivatedRoute,
    private _auth: AuthService,
    private _cart: CartService,
    private _router: Router,
    private elementRef: ElementRef) { }

  ngOnInit(): void {
    AOS.init();
    this.isLogin = this._auth.isLoggedIn()
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
    $(document).ready(function() {
      $('.accordion-collapse').collapse('hide');
      $('#flush-collapseOne').collapse('show');
  
      $('.accordion-button').click(function() {
          $('.accordion-collapse').collapse('hide');
          $(this).closest('.accordion-item').find('.accordion-collapse').collapse('show');
      });
  });
    // this._toastr.success('everything is broken', 'Major Error');
    this.getProductDetails();
    this.setupButtonClickListeners();
    this.getAllTestData();
  }
  prodDetails:any = {}
  addToCart(productId: number, type: string, amount: number) {
    if (!this.isLogin) {
      this._router.navigate(['/pages/login']);
      return
    } else {
      this.prodDetails = {
        'productId': productId,
        'type': type,
        'amount': amount
      }
      this._master.sharePriceInfo(this.prodDetails)
    }
  }


  getAllTestData(){
    const state = 36; 
    const limit = 6; 
    const lastId = 0; 
    this._master.getAllNewTests(state,limit,lastId).subscribe((res:any) => {
      if(res.status==1) {
        this.testItems = res.data
      }
    })
  }

  setupButtonClickListeners() {
    const buttons = this.elementRef.nativeElement.querySelectorAll('.cartbutton');
    buttons.forEach(button => {
      button.addEventListener('click', (e: Event) => {
        if (!button.classList.contains('loading')) {
          button.classList.add('loading');
          setTimeout(() => button.classList.remove('loading'), 3700);
        }
        e.preventDefault();
      });
    });
  }
  getProductDetails(){
    this._route.params.subscribe((param:any) => {
      const formData = param.id
      // formData.append('test_id', param.id);
      const state =  36;
      this._master.getTestById(formData,state).subscribe(
        (res:any) => {
        $("#loader").hide();
        if(res.status == 1) {
          console.log(res.data)
          this.details = res.data;
        }
      }, err => {
        console.log(err)
        $("#loader").hide();
      })
    })
  }

  
}
