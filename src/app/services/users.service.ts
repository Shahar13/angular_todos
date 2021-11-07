import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})

export class UsersService {

  url = "https://jsonplaceholder.typicode.com/users";
  // public allUsers: any = {};

  constructor(
    private httpClient: HttpClient
  ) {}

//   getAllUsers(){
//     return this.httpClient.get(this.url + "getUsers");
//   }
  

//   addFriend(friendshipData: any){    
//     return this.httpClient.post(this.url + "addFriend", {friendshipData});
//   }

}
