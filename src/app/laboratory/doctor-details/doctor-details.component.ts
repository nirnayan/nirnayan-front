import { ChangeDetectionStrategy, Component, Inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { SeoService } from '../../service/seo.service';
import { isPlatformBrowser } from '@angular/common';
declare var $: any;
@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css'],

})
export class DoctorDetailsComponent implements OnInit {

  Award:any[]=[
    {
      iconImage:"../../../assets/images/award-icon.png", title:'1. Poster on “VP Shunt Infection Caused by Serratia marcescens- a case report” in IAMM paper Award category in MICROCON-2014 (west Bengal)' ,desc:'To detect pulmonary tuberculosis by IGRA and/or fluorescence microscopy in patients attending Central Referral Hospital (CRH). Study of MDR and XDR TB by real-time PCR (RT PCR) among pulmonary tuberculosis patients diagnosed by IGRA and/or fluorescence microscopy. Extended Analysis: Study of MDR and XDR TB by real-time PCR among pulmonary tuberculosis patients diagnosed negative by IGRA and/or fluorescence microscopy.To find out the socio-demographic correlates amongst the suspected cases of pulmonary tuberculosis.',id:1
    },
    
    {
      iconImage:"../../../assets/images/award-icon.png", title:'1. Poster on “VP Shunt Infection Caused by Serratia marcescens- a case report” in IAMM paper Award category in MICROCON-2014 (west Bengal)' ,desc:'To detect pulmonary tuberculosis by IGRA and/or fluorescence microscopy in patients attending Central Referral Hospital (CRH). Study of MDR and XDR TB by real-time PCR (RT PCR) among pulmonary tuberculosis patients diagnosed by IGRA and/or fluorescence microscopy. Extended Analysis: Study of MDR and XDR TB by real-time PCR among pulmonary tuberculosis patients diagnosed negative by IGRA and/or fluorescence microscopy.To find out the socio-demographic correlates amongst the suspected cases of pulmonary tuberculosis.',id:2
    },
    
    {
      iconImage:"../../../assets/images/award-icon.png", title:'1. Poster on “VP Shunt Infection Caused by Serratia marcescens- a case report” in IAMM paper Award category in MICROCON-2014 (west Bengal)' ,desc:'To detect pulmonary tuberculosis by IGRA and/or fluorescence microscopy in patients attending Central Referral Hospital (CRH). Study of MDR and XDR TB by real-time PCR (RT PCR) among pulmonary tuberculosis patients diagnosed by IGRA and/or fluorescence microscopy. Extended Analysis: Study of MDR and XDR TB by real-time PCR among pulmonary tuberculosis patients diagnosed negative by IGRA and/or fluorescence microscopy.To find out the socio-demographic correlates amongst the suspected cases of pulmonary tuberculosis.',id:3
    },
    
  ]

  experiences:any[]=[
    {
      title:'1. Poster on “VP Shunt Infection Caused by Serratia marcescens- a case report” in IAMM paper Award category in MICROCON-2014 (west Bengal)' ,desc:'To detect pulmonary tuberculosis by IGRA and/or fluorescence microscopy in patients attending Central Referral Hospital (CRH). Study of MDR and XDR TB by real-time PCR (RT PCR) among pulmonary tuberculosis patients diagnosed by IGRA and/or fluorescence microscopy. Extended Analysis: Study of MDR and XDR TB by real-time PCR among pulmonary tuberculosis patients diagnosed negative by IGRA and/or fluorescence microscopy.To find out the socio-demographic correlates amongst the suspected cases of pulmonary tuberculosis.',id:1
    },
    
    {
      title:'1. Poster on “VP Shunt Infection Caused by Serratia marcescens- a case report” in IAMM paper Award category in MICROCON-2014 (west Bengal)' ,desc:'To detect pulmonary tuberculosis by IGRA and/or fluorescence microscopy in patients attending Central Referral Hospital (CRH). Study of MDR and XDR TB by real-time PCR (RT PCR) among pulmonary tuberculosis patients diagnosed by IGRA and/or fluorescence microscopy. Extended Analysis: Study of MDR and XDR TB by real-time PCR among pulmonary tuberculosis patients diagnosed negative by IGRA and/or fluorescence microscopy.To find out the socio-demographic correlates amongst the suspected cases of pulmonary tuberculosis.',id:2
    },
    
    {
      title:'1. Poster on “VP Shunt Infection Caused by Serratia marcescens- a case report” in IAMM paper Award category in MICROCON-2014 (west Bengal)' ,desc:'To detect pulmonary tuberculosis by IGRA and/or fluorescence microscopy in patients attending Central Referral Hospital (CRH). Study of MDR and XDR TB by real-time PCR (RT PCR) among pulmonary tuberculosis patients diagnosed by IGRA and/or fluorescence microscopy. Extended Analysis: Study of MDR and XDR TB by real-time PCR among pulmonary tuberculosis patients diagnosed negative by IGRA and/or fluorescence microscopy.To find out the socio-demographic correlates amongst the suspected cases of pulmonary tuberculosis.',id:3
    },
    {
      title:'1. Poster on “VP Shunt Infection Caused by Serratia marcescens- a case report” in IAMM paper Award category in MICROCON-2014 (west Bengal)' ,desc:'To detect pulmonary tuberculosis by IGRA and/or fluorescence microscopy in patients attending Central Referral Hospital (CRH). Study of MDR and XDR TB by real-time PCR (RT PCR) among pulmonary tuberculosis patients diagnosed by IGRA and/or fluorescence microscopy. Extended Analysis: Study of MDR and XDR TB by real-time PCR among pulmonary tuberculosis patients diagnosed negative by IGRA and/or fluorescence microscopy.To find out the socio-demographic correlates amongst the suspected cases of pulmonary tuberculosis.',id:4
    },
    
    {
      title:'1. Poster on “VP Shunt Infection Caused by Serratia marcescens- a case report” in IAMM paper Award category in MICROCON-2014 (west Bengal)' ,desc:'To detect pulmonary tuberculosis by IGRA and/or fluorescence microscopy in patients attending Central Referral Hospital (CRH). Study of MDR and XDR TB by real-time PCR (RT PCR) among pulmonary tuberculosis patients diagnosed by IGRA and/or fluorescence microscopy. Extended Analysis: Study of MDR and XDR TB by real-time PCR among pulmonary tuberculosis patients diagnosed negative by IGRA and/or fluorescence microscopy.To find out the socio-demographic correlates amongst the suspected cases of pulmonary tuberculosis.',id:5
    },
    
    {
      title:'1. Poster on “VP Shunt Infection Caused by Serratia marcescens- a case report” in IAMM paper Award category in MICROCON-2014 (west Bengal)' ,desc:'To detect pulmonary tuberculosis by IGRA and/or fluorescence microscopy in patients attending Central Referral Hospital (CRH). Study of MDR and XDR TB by real-time PCR (RT PCR) among pulmonary tuberculosis patients diagnosed by IGRA and/or fluorescence microscopy. Extended Analysis: Study of MDR and XDR TB by real-time PCR among pulmonary tuberculosis patients diagnosed negative by IGRA and/or fluorescence microscopy.To find out the socio-demographic correlates amongst the suspected cases of pulmonary tuberculosis.',id:6
    },
  ]
  pageData: any;

  constructor(
    private seoService: SeoService,
    private _master: MasterService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupAccordion();
    }
    this.getPageDataById();
  }

  setupAccordion() {
    this.renderer.listen('document', 'DOMContentLoaded', () => {
      this.renderer.listen(this.renderer.selectRootElement('.accordion-button'), 'click', () => {
        this.renderer.setAttribute(this.renderer.selectRootElement('.accordion-collapse'), 'class', 'collapse');
        this.renderer.setAttribute(this.renderer.selectRootElement('#flush-collapseOne'), 'class', 'collapse show');
      });
    });
  }

  getPageDataById() {
    const payload = {
      page_id: 21
    };
    this._master.getDataPageById(payload).subscribe((res: any) => {
      if (res.status == 1) {
        this.pageData = res.data.seoContent;
        this.changeTitleMetaTag();
      }
    });
  }

  changeTitleMetaTag() {
    if (this.pageData) {
      this.seoService.updateTitle(this.pageData.title);

      const metaTags = this.pageData.name.map(nameObj => ({
        name: nameObj.title,
        content: nameObj.description
      }));
      this.seoService.updateMetaTags(metaTags);

      const propertyTags = this.pageData.propertyType.map(propertyObj => ({
        property: propertyObj.title,
        content: propertyObj.description
      }));
      this.seoService.updatePropertyTags(propertyTags);
    }
  }
}
