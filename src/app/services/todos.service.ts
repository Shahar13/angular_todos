import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})

export class TodosService {

  url = "https://jsonplaceholder.typicode.com/";
  // public allUsers: any = {};

  constructor(
    private httpClient: HttpClient,
  ) {}

  getAllItems(){
    return this.httpClient.get(this.url + "todos");
  }
  

//   addItem(item: any){    
//     return this.httpClient.post(this.url + "addItem", {item});
//   }

}
