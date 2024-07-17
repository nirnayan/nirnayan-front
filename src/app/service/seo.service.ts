import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private titleService: Title, private metaService: Meta) { }

  updateTitle(title: string) {
    this.titleService.setTitle(title);
  }

  updateMetaTags(metaTags: { name: string, content: string }[]) {
    metaTags.forEach(tag => this.metaService.updateTag({ name: tag.name, content: tag.content }));
  }

  updatePropertyTags(metaTags: { property: string, content: string }[]) {
    metaTags.forEach(tag => this.metaService.updateTag({ property: tag.property, content: tag.content }));
  }
}
