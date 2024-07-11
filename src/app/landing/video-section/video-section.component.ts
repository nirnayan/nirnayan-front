import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-section',
  templateUrl: './video-section.component.html',
  styleUrls: ['./video-section.component.css']
})
export class VideoSectionComponent implements OnInit {
  showVideo:boolean = false
  videoUrl: string = 'https://www.youtube.com/embed/K4YqVUoDyWM?autoplay=1';
  sanitizedVideoUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) { }


  ngOnInit(): void {

  }
  
  openVideo(){
    this.showVideo = true
    this.sanitizedVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
  }
}
