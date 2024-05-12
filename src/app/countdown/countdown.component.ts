import { Component } from "@angular/core";
import { TimerComponent } from "./components/timer/timer.component";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";
import { TitleHeaderComponent } from "./components/title-header/title-header.component";

@Component({
    selector: "app-countdown",
    standalone: true,
    templateUrl: "./countdown.component.html",
    providers: [
        MatDatepickerModule,
    ],
    imports: [
        TimerComponent,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        TitleHeaderComponent
    ],
    styleUrls: ["./countdown.component.scss"],
})

export class CountdownComponent {
    constructor() {
        this.loadTitleFromLocalStorage();
        this.loadDateFromLocalStorage();
    }

    private _title = '';

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
        this.saveTitleToLocalStorage(value);
    }

    private saveTitleToLocalStorage(title: string) {
        localStorage.setItem('title', title);
    }

    private loadTitleFromLocalStorage(): void {
        const storedTitle = localStorage.getItem('title');
        if (storedTitle) {
            this._title = storedTitle;
        }
    }

    private _date!: Date;

    get date(): Date {
        return this._date;
    }

    set date(value) {
        this._date = value;
        this.saveDateToLocalStorage(value.toString()); // Convert the Date object to a string
    }

    private saveDateToLocalStorage(date: string) {
        localStorage.setItem('date', date);
    }

    private loadDateFromLocalStorage(): void {
        const storedDate = localStorage.getItem('date');
        if (storedDate) {
            this.date = new Date(storedDate);
        }
    }
}