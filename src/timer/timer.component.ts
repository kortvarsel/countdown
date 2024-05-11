import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FitTextComponent } from '../fit-text/fit-text.component';

@Component({
    selector: 'app-timer',
    standalone: true,
    templateUrl: './timer.component.html',
    imports: [CommonModule, FitTextComponent],
    styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
    countdown: number = 0;
    countdownInterval!: NodeJS.Timeout;
    @Input() targetDate: string = "";
    remainingTime: { days: number, hours: number, minutes: number, seconds: number } = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    constructor() {
        this.countdownInterval = setInterval(() => { }, 1000);
    }

    ngOnInit() {
        if (this.targetDate) {
            this.countdown = this.calculateCountdown(new Date(this.targetDate));
        }
        this.startCountdown();
    }

    calculateCountdown(targetDate: Date): number {
        const now = new Date();
        const difference = targetDate.getTime() - now.getTime();
        return difference;
    }

    startCountdown() {
        this.countdownInterval = setInterval(() => {
            this.countdown = this.calculateCountdown(new Date(this.targetDate));
            this.calculateRemainingTime();
            if (this.countdown <= 0) {
                clearInterval(this.countdownInterval);
            }
        }, 1000);
    }

    calculateRemainingTime() {
        this.remainingTime = {
            days: Math.floor(this.countdown / (1000 * 60 * 60 * 24)),
            hours: Math.floor((this.countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((this.countdown % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((this.countdown % (1000 * 60)) / 1000)
        };
    }
}