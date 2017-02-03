import { Injectable, Pipe } from '@angular/core';
import { Shift } from '../../models';

/*
  Generated class for the Duration pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'duration'
})
@Injectable()
export class Duration {
  /*
    Takes a shift and returns the duration in HR:MIN:SEC
   */
  transform(shift: Shift) {
    if (shift.clockOut) {
      let hrs = Math.floor((parseInt(shift.clockOut) - parseInt(shift.clockIn)) / 3600000);
      let mins = Math.floor(((parseInt(shift.clockOut) - parseInt(shift.clockIn)) / 60000) % 60);
      let secs = Math.round(((parseInt(shift.clockOut) - parseInt(shift.clockIn)) / 1000) % 60);
      return `${hrs}H ${mins}M ${secs}S`;
    }
    return 'MISSING OUT';
  }
}
