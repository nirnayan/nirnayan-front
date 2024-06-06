import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.css']
})
export class PresenceComponent implements OnInit {

  collectionPoint: number = 0;
  logisticStrength: number = 0;
  doctors: number = 0;

  collectionPointTarget: number = 5000;
  logisticStrengthTarget: number = 3000;
  doctorsTarget: number = 100;

  private duration: number = 2000;  // Duration for all counters to complete (in milliseconds)

  ngOnInit(): void {
    this.startCounter('collectionPoint', this.collectionPointTarget);
    this.startCounter('logisticStrength', this.logisticStrengthTarget);
    this.startCounter('doctors', this.doctorsTarget);
  }

  startCounter(property: string, target: number) {
    let current = 0;
    const stepTime = this.duration / target;

    const interval = setInterval(() => {
      current++;
      this[property] = current;
      if (current >= target) {
        clearInterval(interval);
      }
    }, stepTime);
  }
}
