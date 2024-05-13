import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, SimpleChanges } from '@angular/core';
import { FitTextComponent } from '../fit-text/fit-text.component';

@Component({
    selector: 'app-timer',
    standalone: true,
    templateUrl: './timer.component.html',
    imports: [CommonModule, FitTextComponent],
    styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnDestroy {
    countdown: number = 0;
    private _countdownInterval!: NodeJS.Timeout;
    @Input() targetDate!: Date;
    remainingTime: RemainingTime = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    };

    ngOnChanges(changes: SimpleChanges) {
        if (!changes) return;
        this.endCountdown();
        this.startCountdown()
    }

    ngOnDestroy() {
        this.endCountdown();
    }

    private calculateCountdown(targetDate: Date): number {
        const now = new Date();
        const difference = targetDate.getTime() - now.getTime();
        return difference;
    }

    private startCountdown() {
        this._countdownInterval = setInterval(() => {
            this.countdown = this.calculateCountdown(this.targetDate);
            this.calculateRemainingTime();
            if (this.countdown <= 0) {
                this.endCountdown();
            }
        }, 1000);
    }

    private endCountdown() {
        if (!this._countdownInterval) return;
        clearInterval(this._countdownInterval);
    }

    private calculateRemainingTime() {
        this.remainingTime = {
            days: Math.floor(this.countdown / (1000 * 60 * 60 * 24)),
            hours: Math.floor((this.countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((this.countdown % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((this.countdown % (1000 * 60)) / 1000)
        };
    }
}