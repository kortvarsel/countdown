import { Component, Input } from '@angular/core';
import { FitTextComponent } from '../fit-text/fit-text.component';

@Component({
    selector: 'app-title-header',
    standalone: true,
    templateUrl: './title-header.component.html',
    imports: [FitTextComponent],
    styleUrls: ['./title-header.component.scss']
})
export class TitleHeaderComponent {
    @Input() title: string = '';
}