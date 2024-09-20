import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-section',
  templateUrl: './video-section.component.html',
  styleUrls: ['./video-section.component.css'],

})
export class VideoSectionComponent implements OnInit {
  showVideo: boolean = false
  videoUrl: string = 'https://www.youtube.com/embed/K4YqVUoDyWM?autoplay=1';
  sanitizedVideoUrl: SafeResourceUrl | undefined;

  constructor(
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID
  ) { }


  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {

    }
  }

  openVideo() {
    if (isPlatformBrowser(this.platformId)) {
      this.showVideo = true
      this.sanitizedVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
    }
  }
}
