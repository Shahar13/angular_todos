import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-user-connect',
  templateUrl: './user-connect.component.html',
  styleUrls: ['./user-connect.component.css']
})
export class UserConnectComponent implements OnInit {

  angForm: FormGroup;
  @Output() userNameEmitter = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {
      this.createForm();
  }

  ngOnInit(): void {
    // angForm.controls['userName'].value
  }
  
  createForm() {
    this.angForm = this.fb.group({
       userName: ['', Validators.required ],
      //  address: ['', Validators.required ]
    });
  }

  saveUserName(){
    this.userNameEmitter.emit(this.angForm.controls['userName'].value);
  }
}
