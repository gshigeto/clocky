import { Injectable, Pipe } from '@angular/core';
import { Shift } from '../../models';

import * as moment from 'moment';

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
      let dur = moment.duration(moment(shift.clockOut).diff(moment(shift.clockIn)));
      return `${dur.hours()}H ${dur.minutes()}M ${dur.seconds()}S`;
    }
    return 'MISSING OUT';
  }
}
