import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserModel = new UserModel()

  constructor() { }

  ngOnInit() {
  }

  login( form: NgForm ) {

    if ( form.invalid ) { return }

    console.log(this.user)
    console.log(form)
  }

}
