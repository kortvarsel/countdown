import { Component } from "@angular/core";
import { DateInputComponent } from "../date-input/date-input.component";
import { StringInputComponent } from "../string-input/string-input.component";
import { TimerComponent } from "../timer/timer.component";
import { FormsModule } from "@angular/forms";
import { FitTextComponent } from "../fit-text/fit-text.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";

@Component({
    selector: "app-countdown",
    standalone: true,
    templateUrl: "./countdown.component.html",
    providers: [
        MatDatepickerModule,
    ],
    imports: [TimerComponent, DateInputComponent, StringInputComponent, FormsModule, FitTextComponent, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule],
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

    private _date: string = "";

    get date(): string {
        return this._date;
    }

    set date(value: string) {
        this._date = value;
        this.saveDateToLocalStorage(value);
    }

    private saveTitleToLocalStorage(title: string) {
        localStorage.setItem('title', title);
    }

    private saveDateToLocalStorage(date: string) {
        localStorage.setItem('date', date);
    }

    private loadTitleFromLocalStorage(): void {
        const storedTitle = localStorage.getItem('title');
        if (storedTitle) {
            this._title = storedTitle;
        }
    }

    private loadDateFromLocalStorage(): void {
        const storedDate = localStorage.getItem('date');
        if (storedDate) {
            this.date = storedDate;
        }
    }
}