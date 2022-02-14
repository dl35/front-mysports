import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'kmsPipe'
})
export class KmsPipe implements PipeTransform {

  transform(value: number, type: string): unknown {
    return ( type == "SWIM" ) ? ( value  + " m" ): (value / 1000 ) + " km" ;
  }

}
