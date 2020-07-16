import { Component, Input, OnInit, Sanitizer } from '@angular/core';
import { environment } from '@env';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html'
})
export class PDFComponent implements OnInit {

  @Input() src: string;

  @Input() width: string | number;
  @Input() height: string | number;

  @Input() type: 'native' | 'external' = 'external';

  public API_BASE_URL = environment.pdfViewer;

  constructor(private sanitazer: DomSanitizer) {}

  ngOnInit(): void {
    if (!this.src) {
      throw new Error('Informe um source para o app-pdf!');
    }
    if (!this.width) {
      this.width = 0;
    }
    if (!this.height) {
      this.height = 0;
    }
  }

  public getWidth() {
    return typeof this.width === 'string' ? this.width : `${this.width}px`;
  }

  public getHeight() {
    return typeof this.height === 'string' ? this.height : `${this.height}px`;
  }

  public getStyle() {
    return `width: ${this.getWidth()}; height: ${this.getHeight()};`;
  }

  public getSecurityUrl() {
    const url = this.type === 'external' ? `${this.API_BASE_URL}?url=${this.src}` : this.src;
    return this.sanitazer.bypassSecurityTrustResourceUrl(url);
  }
}
