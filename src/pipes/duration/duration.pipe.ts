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
      let hrs = ((parseInt(shift.clockOut) - parseInt(shift.clockIn)) / 3600000).toFixed(0);
      let mins = (((parseInt(shift.clockOut) - parseInt(shift.clockIn)) / 60000) % 60).toFixed(0);
      let secs = (((parseInt(shift.clockOut) - parseInt(shift.clockIn)) / 1000) % 60).toFixed(0);
      return `${hrs}H ${mins}M ${secs}S`;
    }
    return 'MISSING OUT';
  }
}
