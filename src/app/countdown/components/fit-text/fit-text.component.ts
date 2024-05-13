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

    private _fontSize: number = 16;
    minFontSize: number = 1;
    maxFontSize: number = 10000;
    sizeIncrement: number = .2;
    private _windowWidth: number = 0;
    private _contentWidth: number = 0;
    padding: number = 24;

    //dependencies type is to avoid 'any' and can be expanded, as of now it only listens to changes to trigger fitText
    @Input() dependencies: (string | number)[] = [];

    ngOnChanges(changes: SimpleChanges) {
        if (!changes) return;
        //this timeout is to ensure that the view is updated before fitting text
        setTimeout(() => {
            this.fitText();
        }, 1);
    }

    ngAfterViewInit() {
        this.fitText();
        window.addEventListener('resize', () => this.fitText());
    };

    private fitText() {
        if (!this.container) return;

        //Math.min is to avoid case where browser provides inaccurate window.innerWidth in dev responsive mode
        this._windowWidth = Math.min(window.innerWidth, window.outerWidth);
        this._contentWidth = this.container.nativeElement.clientWidth;
        while (this._contentWidth + (this.padding * 2) > this._windowWidth && this._fontSize > this.minFontSize) {
            this._fontSize -= this.sizeIncrement;
            this.updateFontSize();
        }
        while (this._windowWidth > this._contentWidth + (this.padding * 2) && this._fontSize < this.maxFontSize) {
            this._fontSize += this.sizeIncrement;
            this.updateFontSize();
        }
    }
    private updateFontSize() {
        this.container.nativeElement.style.fontSize = `${this._fontSize}px`;
        this._contentWidth = this.container.nativeElement.clientWidth;
    }
}
