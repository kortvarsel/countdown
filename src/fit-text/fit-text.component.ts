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

    fontSize = 16;
    containerWidth: number = 0;
    contentWidth: number = 0;
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
        this.containerWidth = window.innerWidth;
        this.contentWidth = this.container.nativeElement.clientWidth;
        while (this.contentWidth + 32 > this.containerWidth && this.fontSize > 12) {
            this.fontSize -= 1;
            this.container.nativeElement.style.fontSize = `${this.fontSize}px`;
            this.contentWidth = this.container.nativeElement.clientWidth;
        }
        while (this.containerWidth > this.contentWidth + 32 && this.fontSize < 10000) {
            this.fontSize += 1;
            this.container.nativeElement.style.fontSize = `${this.fontSize}px`;
            this.contentWidth = this.container.nativeElement.clientWidth;
        }
    }
}
