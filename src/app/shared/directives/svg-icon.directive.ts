import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Directive({
  selector: '[appSvgIcon]',
  standalone: true
})
export class SvgIconDirective implements OnInit {
  @Input() appSvgIcon: string = '';
  @Input() width: string = '24px';
  @Input() height: string = '24px';
  @Input() color: string = 'currentColor';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private http: HttpClient
  ) {}

  ngOnInit() {
    if (this.appSvgIcon) {
      this.loadSvg();
    }
  }

  private loadSvg() {
    const url = `assets/icons/${this.appSvgIcon}.svg`;
    
    this.http.get(url, { responseType: 'text' })
      .subscribe({
        next: (svg) => {
          this.renderSvg(svg);
        },
        error: (err) => {
          console.error(`Error loading SVG icon: ${this.appSvgIcon}`, err);
        }
      });
  }

  private renderSvg(svgContent: string) {
    // Create a DOM parser to convert the SVG string to SVG element
    const div = this.renderer.createElement('div');
    div.innerHTML = svgContent;
    
    // Get the SVG element
    const svgElement = div.querySelector('svg');
    
    if (!svgElement) {
      return;
    }
    
    // Apply styles
    this.renderer.setAttribute(svgElement, 'width', this.width);
    this.renderer.setAttribute(svgElement, 'height', this.height);
    this.renderer.setStyle(svgElement, 'fill', this.color);
    
    // Clear the host element and append the SVG
    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', '');
    this.renderer.appendChild(this.el.nativeElement, svgElement);
  }
} 