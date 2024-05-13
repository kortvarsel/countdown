import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit, Input, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-fit-text',
    standalone: true,
    templateUrl: './fit-text.component.html',
    imports: [CommonModule],
    styleUrls: ['./fit-text.component.scss']
})
export class FitTextComponent implements AfterViewInit {
    @ViewChild('fitTextContainer') container!: ElementRef<HTMLDivElement>;

    private _fontSize = 16;
    private _windowWidth: number = 0;
    private _contentWidth: number = 0;
    @Input() dependencies: any[] = [];

    ngOnChanges(changes: SimpleChanges) {
        if (!changes) return;
        this.fitText();
    }

    ngAfterViewInit() {
        this.fitText();
        window.addEventListener('resize', () => this.fitText());
    };

    private fitText() {
        if (!this.container) return;
        this._windowWidth = Math.min(window.innerWidth, window.outerWidth);
        this._contentWidth = this.container.nativeElement.clientWidth;
        while (this._contentWidth + 32 > this._windowWidth && this._fontSize > 1) {
            this._fontSize -= 1;
            this.updateFontSize();
        }
        while (this._windowWidth > this._contentWidth + 32 && this._fontSize < 10000) {
            this._fontSize += 1;
            this.updateFontSize();
        }
    }
    private updateFontSize() {
        this.container.nativeElement.style.fontSize = `${this._fontSize}px`;
        this._contentWidth = this.container.nativeElement.clientWidth;
    }
}
