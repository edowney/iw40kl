import { FormControl } from '@angular/forms';
import * as moment from 'moment';

export class DateValidator {
    static notFutureDate(fc: FormControl) {
        
        let now = moment();
        let dateplayed = moment(fc.value);
        
        if (now.isAfter(dateplayed))
        {
            return (null);
        }
        else
        {
            return ({notFutureDate: true});
        }
 
    }
}