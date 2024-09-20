import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common'; // Import isPlatformBrowser for SSR
import { MasterService } from '../../service/master.service';
import { SeoService } from '../../service/seo.service';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Apollo, gql } from 'apollo-angular';
import AOS from 'aos';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css'],
})
export class BlogDetailsComponent implements OnInit {
  details: any;
  commentForm: FormGroup;
  isSubmitted = false;  // Flag to check if the form has been submitted
  categoryItems1: any[] = [
    { image: 'v1_328.png',  description: 'The Impact of Technology on the Workplace: How Technology is Changing' , date:'August 20,2022'},
    { image: 'v1_333.png', description: 'The Impact of Technology on the Workplace: How Technology is Changing.', date:'August 20,2022' },
    { image: 'v1_328.png', description: 'The Impact of Technology on the Workplace: How Technology is Changing', date:'August 20,2022' },
    { image: 'v1_328.png',  description: 'The Impact of Technology on the Workplace: How Technology is Changing.', date:'August 20,2022' },
    { image: 'v1_328.png',  description: 'The Impact of Technology on the Workplace: How Technology is Changing.', date:'August 20,2022' },
    { image: 'v1_328.png',  description: 'The Impact of Technology on the Workplace: How Technology is Changing.', date:'August 20,2022' },
    { image: 'v1_328.png',  description: 'The Impact of Technology on the Workplace: How Technology is Changing.', date:'August 20,2022' },
    { image: 'v1_328.png',  description: 'The Impact of Technology on the Workplace: How Technology is Changing.', date:'August 20,2022' },
  ];

  

  featuredPosts: any[] = [
    {
      authorImage: 'v1_389.png',
      author: 'Amit Das',
      date: '4 days ago',
      title: 'Your portfolio is stopping you from getting first',
      excerpt: 'An intense way to learn about the process and practice your design skills - My 1st hackathon Hackathons have been on my mind...',
      image: 'v1_389.png'
    },
    {
      authorImage: 'v1_415.png',
      author: 'Amit Das',
      date: '4 days ago',
      title: 'Your portfolio is stopping you from getting second',
      excerpt: 'An intense way to learn about the process and practice your design skills - My 1st hackathon Hackathons have been on my mind...',
      image: 'v1_415.png'

    },
    {
      authorImage: 'v1_402.png',
      author: 'Amit Das',
      date: '4 days ago',
      title: 'Your portfolio is stopping you from getting third',
      excerpt: 'An intense way to learn about the process and practice your design skills - My 1st hackathon Hackathons have been on my mind...',
      image: 'v1_402.png  '
    }
  ];

  testList: string[] = ['Heart', 'Lungs', 'Lungs', 'Lungs', 'Lungs'];

  categoryPostCounts: any[] = [];

  owlOptions: OwlOptions = {
    // loop: true,
    // margin: 10,
    // nav: false,
    // dots: true,
    // autoplay: true,
    // autoplaySpeed:200,
    // autoplayTimeout: 2000,
    loop: true,
    margin: 10,
    nav: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 6000, // Increased speed for smooth effect
    autoplayTimeout: 1000, // Minimal timeout for continuous effect
    slideTransition: 'linear', // Smooth linear transition
    
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 3
      },
      1500: {
        items: 5
      }
    },
    rewind: true,
  };  

  centerName: any;
  isLogin: boolean = false;
  pageData: any;
  myContent: any;
  // relatedTest: any = [];
  activeGroupName: any = '';
  basePath = environment.BaseLimsApiUrl;
  currentLocationName: any;
  currentShareUrl: any;
  SecondmapUrl: any;
  mapUrl: any;
  FirstmapUrl: any;
  isFieldActive: boolean;
  isPopupVisible: any;
  testname: any;
  itemId: any;
  currentRoute: string;
  showFullContent: boolean = false;
  initialContentLength: number = 1000; // Adjust this to control the initial visible content
  visibleContentLength: number;
  commentText: string = '';
  fullName: string = '';
  email: string = '';
  saveInfo: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _master: MasterService,
    private seoService: SeoService,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object, // Inject PLATFORM_ID
    private formBuilder: FormBuilder,
    private apollo: Apollo,
    private Uiloader: NgxUiLoaderService
  ) {}


  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      commentText: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      saveInfo: [false]
    });
    this.visibleContentLength = this.initialContentLength;
    if (isPlatformBrowser(this.platformId)) {
      $("#loader").show();
      const payload = {
        blogId: localStorage.getItem('BLOG_ID'),
        limit: 1,
        state: 36
      };
      this._master.getBlogsById(payload).subscribe((res: any) => {
        $("#loader").hide();
        if (res.status === 1) {
          this.details = res.data.blogData;
          this.pageData = res.data.metaContent;
          // this.relatedTest = res.data.relatedTests;
          this.changeTitleMetaTag();
          this.fetchContent(this.basePath + res.data.blogData.blogContent);
          if (window.innerWidth > 992) {
            this.initTicker();
          }
        }
      }, err => {
        console.log(err);
        $("#loader").hide();
      });
    }

    this.Uiloader.start();
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
      this.loadBlogCategories();
    }
  }


  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadBlogCategories();
    }
  }

  loadBlogCategories(): void {
    const GET_BLOG_DATA = gql`
      query {
        blogPage{
          categoryCount{
            categoryName
            postCount
          }
        }
      }
    `;
    this.apollo.query<any>({
      query: GET_BLOG_DATA
    }).subscribe(({ data }) => {
      this.Uiloader.stop();
      if (data.blogPage.categoryCount) {
        this.categoryPostCounts = data.blogPage.categoryCount
          .filter((category: { postCount: number }) => category.postCount > 0)
          .map((category: { categoryName: any; postCount: number; }) => ({
            name: category.categoryName,
            number: category.postCount
          }));
      }
    }, (error) => {
      console.error('Error loading blog categories:', error);
    });
  }

  addComment(): void {
    this.isSubmitted = true;  // Set the flag to true on form submission
    
    if (this.commentForm.invalid) {
      return;  // Do not proceed if the form is invalid
    }

    const { commentText, fullName, email, saveInfo } = this.commentForm.value;
    console.log('Comment:', commentText);
    console.log('Full Name:', fullName);
    console.log('Email:', email);
    console.log('Save Info:', saveInfo);

    this.commentForm.reset();
    this.isSubmitted = false;  // Reset the flag after form submission
  }

  toggleContent(): void {
    this.showFullContent = !this.showFullContent;
    if (this.showFullContent) {
      this.visibleContentLength = this.myContent.length;
    } else {
      this.visibleContentLength = this.initialContentLength;
    }
  }

  private initTicker(): void {
    if (isPlatformBrowser(this.platformId)) {
      const container = $('.sideBarBox');
      const tickerItems = container.find('.ListBox');
      const tickerHeight = tickerItems.outerHeight();
      container.css('marginTop', -tickerHeight);

      function moveTop() {
        container.animate({
          marginTop: 0
        }, {
          duration: 600,
          easing: 'swing',
          complete: function () {
            container.find('.ListBox').first().appendTo(container);
            container.css('marginTop', -tickerHeight);
          }
        });
      }

      setInterval(moveTop, 3000);
    }
  }

  fetchContent(url: string) {
    this.http.get(url, { responseType: 'text' }).subscribe((data: string) => {
      this.myContent = data;
    }, err => {
      console.log(err);
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

  formattedName(name: any): any {
    const formattedName = name.trim().replace(/(^\w|\s\w)/g, match => match.toUpperCase());
    return formattedName;
  }


  detailsPage(testId: string, testName: string, groupName: string) {
    this.activeGroupName = groupName.replace(/[\s.,()-]+/g, '-').trim();
    // this.formattedName = testName.replace(/[\s.,-]+/g, '-').trim();
    this.itemId = testId;
  }

  togglePopup(item: any): void {
    this.isPopupVisible = !this.isPopupVisible;
    this.testname = item.test_name;
    this.itemId = item.id;
    this.formattedName = this.testname.replace(/[\s.,-]+/g, '-').trim();
    this.currentRoute = `https://www.nirnayanhealthcare.com/patient/test-details/${this.itemId}/${this.activeGroupName}/${this.formattedName}`;
  }

  copyLink(inputElement: HTMLInputElement): void {
    if (isPlatformBrowser(this.platformId)) {
      inputElement.select();
      document.execCommand('copy');
      this.isFieldActive = true;
      setTimeout(() => {
        this.isFieldActive = false;
      }, 2000);
    }
  }

  shareUsingWebShare(): void {
    if (isPlatformBrowser(this.platformId)) {
      const shareData = {
        title: `Share Of ${this.testname}`,
        text: `Check out this location: ${this.currentRoute}`,
        url: this.currentRoute
      };

      if (navigator.share) {
        navigator.share(shareData).then(() => {
          console.log('Location shared successfully');
        }).catch((error) => {
          console.error('Error sharing location:', error);
        });
      } else {
        this.copyLinkFallback();
        alert('Web Share API is not supported in your browser. Link copied to clipboard.');
      }
    }
  }

  private copyLinkFallback(): void {
    if (isPlatformBrowser(this.platformId)) {
      const tempInput = document.createElement('input');
      tempInput.value = this.currentRoute;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      this.isFieldActive = true;
      setTimeout(() => {
        this.isFieldActive = false;
      }, 2000);
    }
  }
}
