import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-fit-text',
    standalone: true,
    templateUrl: './fit-text.component.html',
    imports: [CommonModule],
    styleUrls: ['./fit-text.component.scss']
})
export class FitTextComponent implements AfterViewInit {
    @ViewChild('textContainer') textContainer!: ElementRef<HTMLDivElement>;
    fontSize = 16;
    containerWidth: number = 0;
    contentWidth: number = 0;

    ngAfterViewInit() {
        this.fitText();
        window.addEventListener('resize', () => this.fitText());
    }

    private fitText() {
        this.containerWidth = window.innerWidth;
        this.contentWidth = this.textContainer.nativeElement.clientWidth;
        while (this.contentWidth > this.containerWidth && this.fontSize > 12) {
            this.fontSize -= 1;
            this.textContainer.nativeElement.style.fontSize = `${this.fontSize}px`;
            this.contentWidth = this.textContainer.nativeElement.clientWidth;
        }
        while (this.containerWidth > this.contentWidth && this.fontSize < 10000) {
            this.fontSize += 1;
            this.textContainer.nativeElement.style.fontSize = `${this.fontSize}px`;
            this.contentWidth = this.textContainer.nativeElement.clientWidth;
        }
    }
}
