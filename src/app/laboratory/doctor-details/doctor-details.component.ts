import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(document).ready(function() {
      $('.accordion-collapse').collapse('hide');
      $('#flush-collapseOne').collapse('show');
  
      $('.accordion-button').click(function() {
          $('.accordion-collapse').collapse('hide');
          $(this).closest('.accordion-item').find('.accordion-collapse').collapse('show');
      });
  });
  }

}
