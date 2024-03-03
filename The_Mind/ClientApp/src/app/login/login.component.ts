import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SignalrService} from "../services/signal-r.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form : FormGroup
  constructor(private fb : FormBuilder,
              private router :Router,
              private signalrService : SignalrService
  ) { }

  ngOnInit(): void {
    this.createForm()
  }
  createForm(){
    this.form = this.fb.group({
      userName : [null , [Validators.required]]
    })
  }
  joinRoom() {
    // console.log('User Name: ', this.form.value.userName);
    this.signalrService.registerPlayer(this.form.value.userName)
      .then(() => {
        // Navigate only if registration is successful
      })
      .catch(err => {
        // Handle error, e.g., show an error message to the user
        console.error(err);
        // Optionally, display an error message to the user using some form of UI feedback mechanism
      });
  }

}
