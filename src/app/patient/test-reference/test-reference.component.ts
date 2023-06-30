import { Component, OnInit } from '@angular/core';
import AOS from 'aos';
import { MasterService } from 'src/app/service/master.service';


@Component({
  selector: 'app-test-reference',
  templateUrl: './test-reference.component.html',
  styleUrls: ['./test-reference.component.css']
})
export class TestReferenceComponent implements OnInit {
  testList:any;
  groupList:any;
  departmentList:any;
  searchResult:any;
  isShowtable: boolean = false;



  constructor(private _master:MasterService) { }

  ngOnInit(): void {
    AOS.init();
    this.getAllTests();
    console.log(this.testList);
  }
  getAllTests(){
    this._master.getTestReferenceData().subscribe((response:any) => {
      if(response.message == "Success"){
        this.testList = response.data?.tests;
        this.groupList = response.data?.groups;
        this.departmentList = response.data?.departments;
      }
    });
  }
  resetForm(){
    (document.getElementById("input_test") as HTMLInputElement).value = "";
    (document.getElementById("input_groups") as HTMLInputElement).value = "";
    (document.getElementById("input_depts") as HTMLInputElement).value = "";
  }
  changeTestByDepartment(event:any){
    const departName = event.target.value;
    const formData = new FormData();
    formData.append("depart_name", departName);
    this._master.getGroupDepartWiseTestReference(formData).subscribe((response:any) => {
      if(response.message == "Success"){
        (document.getElementById("input_test") as HTMLInputElement).value = "";
        this.testList = response.data;
      }
    });
  }
  changeTestByGroup(event:any){
    const groupName = event.target.value;
    const formData = new FormData();
    formData.append("group_name", groupName);
    this._master.getGroupDepartWiseTestReference(formData).subscribe((response:any) => {
      if(response.message == "Success"){
        (document.getElementById("input_test") as HTMLInputElement).value = "";
        this.testList = response.data;
      }
    });
  }
  searchReference(){
    let search_test = (document.getElementById("input_test") as HTMLInputElement).value;
    const test_code = search_test.split("/")[1].trim();
    const formData = new FormData();
    formData.append("test_code", test_code);
    this.isShowtable = true;
    this._master.getTestSearchResults(formData).subscribe((response:any) => {
      if(response.message == "Success"){
        this.searchResult = response?.data;
      }
    });
  }
}
