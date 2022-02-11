import { User } from "./user";


export interface Paginate {

    search: string;
    page: number;
  
}




export interface UserPage {

    datas: Array<User> ;
    next: boolean;
    previous: boolean;
    lastPage: number;

}