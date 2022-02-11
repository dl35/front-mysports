export interface Activite {

      id: number;
      date: Date;
      type: TypeActivite      
      dist:number;
      desc?:string;
}



export enum TypeActivite {

    BIKE = 'BIKE',
    SWIM = 'SWIM',
    RUN = 'RUN' 
    


}
