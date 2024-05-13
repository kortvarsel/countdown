import { Component, OnInit } from "@angular/core";
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

export class CountdownComponent implements OnInit {
    private _title: string = '';
    private _date!: Date;

    get title(): string {
        return this._title;
    }

    set title(value) {
        this._title = value;
        this.saveTitleToLocalStorage(value);
    }

    get date(): Date {
        return this._date;
    }

    set date(value) {
        if (!value) return;
        this._date = value;
        this.saveDateToLocalStorage(value.toString());
    }

    ngOnInit() {
        this.loadTitleFromLocalStorage();
        this.loadDateFromLocalStorage();
    }

    private saveTitleToLocalStorage(title: string) {
        localStorage.setItem('title', title);
    }

    private loadTitleFromLocalStorage() {
        const storedTitle = localStorage.getItem('title');
        if (storedTitle) {
            this._title = storedTitle;
        }
    }

    private saveDateToLocalStorage(date: string) {
        localStorage.setItem('date', date);
    }

    private loadDateFromLocalStorage() {
        const storedDate = localStorage.getItem('date');
        if (storedDate) {
            this.date = new Date(storedDate);
        }
    }
}