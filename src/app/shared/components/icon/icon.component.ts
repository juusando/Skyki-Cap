import { Component, Input, HostBinding, ElementRef, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `<div *ngIf="svgContent" [innerHTML]="svgContent"></div>`,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    :host ::ng-deep svg {
      width: 100%;
      height: 100%;
    }
    div {
      display: contents;
    }
  `]
})
export class IconComponent implements OnInit {
  @Input() name: string = '';
  
  // Host element class bindings for easier styling
  @HostBinding('class')
  get hostClasses(): string {
    return `icon icon-${this.name}`;
  }

  svgContent: SafeHtml | null = null;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private el: ElementRef
  ) {}

  ngOnInit() {
    if (this.name) {
      this.loadSvg();
    }
  }

  private loadSvg() {
    const url = `assets/icons/${this.name}.svg`;
    
    this.http.get(url, { responseType: 'text' })
      .subscribe({
        next: (svg) => {
          const processedSvg = this.processSvg(svg);
          this.svgContent = this.sanitizer.bypassSecurityTrustHtml(processedSvg);
        },
        error: (err) => {
          console.error(`Error loading SVG icon: ${this.name}`, err);
        }
      });
  }

  private processSvg(svg: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svg, 'image/svg+xml');
    const svgElement = doc.querySelector('svg');
    
    if (svgElement) {
      // Remove fixed dimensions from SVG
      ['width', 'height'].forEach(attr => {
        if (svgElement.hasAttribute(attr)) {
          svgElement.removeAttribute(attr);
        }
      });
      
      // Ensure it has a viewBox
      if (!svgElement.hasAttribute('viewBox') && 
          svgElement.hasAttribute('width') && 
          svgElement.hasAttribute('height')) {
        const width = svgElement.getAttribute('width') || '24';
        const height = svgElement.getAttribute('height') || '24';
        svgElement.setAttribute('viewBox', `0 0 ${width} ${height}`);
      }
      
      return new XMLSerializer().serializeToString(doc);
    }
    
    return svg;
  }
} 