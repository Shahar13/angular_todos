import { Component } from '@angular/core';
import { HttpClient} from "@angular/common/http";

import { Observable, Subscription } from 'rxjs';

import { UsersService } from "../app/services/users.service";
import { TodosService } from "./services/todos.service";
import { UserConnectComponent } from './user-connect/user-connect.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  private userConnectComponent: UserConnectComponent;

  subscriptionGet: Subscription;

  userName = '';

  pageTitle = 'NG-TODO';

  today: number = Date.now();

  // tasks from external source
  itemsExternal: any = [];

  // filter options
  filter: 'all' | 'active' | 'done' = 'all';

  // paging like
  numOfItems: 5 | 10 | 15 = 15;
  currentPage = 0;
  totalPages = 0;

  newItemFeedback = '';
  currNewItem = '';

  constructor(
    private usersService: UsersService,
    private todosService: TodosService,
    ) {
  }

  ngOnInit() {
    this.subscriptionGet = this.todosService.getAllItems()
    .subscribe(
      (res)=>{
        // add date field to each node in the JSON
        this.itemsExternal = res;
        this.itemsExternal.map(this.refineItemsExternalData);
      },
      (error) => {
        console.error("ERROR GETTING DATA ITEMS: ", error);
        console.error("Error name: ", error.name);
        console.error("Error status: ", error.status);
        console.error("Error msg: ", error.message);
        // this.toastr.error(error.error.message, "Error in register");
      }
    );
  }

  // destroy subscription
  ngOnDestroy() {
    this.subscriptionGet.unsubscribe();
  }

  get items() {
    let filteredItems;
    // return filtered items (all, completed, active)
    switch (this.filter) {
      case 'all':
        filteredItems = this.itemsExternal;
        break;

      case 'active':
        filteredItems = this.itemsExternal.filter(item => !item.completed);
        break;

      case 'done':
        filteredItems = this.itemsExternal.filter(item => item.completed);
        break;

      default:
        filteredItems = this.itemsExternal;
        break;
    }

    // page numbers
    const firstItemIndex = this.currentPage * this.numOfItems;
    this.totalPages = this.numOfItems % this.itemsExternal.length-1 ;

    return filteredItems.slice(
      firstItemIndex,
      firstItemIndex + this.numOfItems,
    );

  }

  addItem(title) {
    if(!title){
      this.currNewItem = '';
      this.newItemFeedback = 'Please insert a text at the new task';
      return;
    }
    else{
      this.currNewItem = title;
      this.itemsExternal.unshift({userId: 1, id: this.itemsExternal+1, date: this.today, title, completed: false, new: true});
      this.newItemFeedback = "Item was added to your list.";
    }
  }

  remove(item) {
    console.log("ITEM TO REMOVE: ", item);
    this.itemsExternal.splice(this.itemsExternal.indexOf(item), 1);
  }

  prevPage(){
    if(this.currentPage === 0) return;
    this.currentPage = this.currentPage - 1;
  }

  nextPage(){
    if(this.currentPage === this.totalPages-1) return;
    this.currentPage = this.currentPage + 1;
  }

  refineItemsExternalData(singleItemExternalData){
      singleItemExternalData['date'] = "Sep 13, 2021";
      singleItemExternalData['completed'] = true;
      return singleItemExternalData;
  }

  loginLike(userName){
    // console.log("userName from emitter: ", userName);
    this.userName = userName;
  }
}




  