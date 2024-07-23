import { Component } from '@angular/core';
import { MasterService } from 'src/app/service/master.service';

@Component({
  selector: 'app-about-footer',
  templateUrl: './about-footer.component.html',
  styleUrl: './about-footer.component.css'
})
export class AboutFooterComponent {
  allPartners: any = []



constructor(private _master: MasterService){

}
ngOnInit(){
this.partners(11)
}



partners(id:any) {
  const formData = new FormData();
  formData.append('category_id', id);
  this._master.getAllPost(formData).subscribe((res:any) => {
    if(res.message == 'Success') {
      this.allPartners = res.data;
    }
  })
};

}
