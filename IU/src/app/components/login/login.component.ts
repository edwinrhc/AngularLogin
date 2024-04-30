import { Component } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {User} from "../../interfaces/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string= '';
  password: string='';

  constructor(private toastr: ToastrService,
              private _userService: UserService) {
  }


  login(){
  // Validamos que el usuario ingrese datos
    if(this.username == '' || this.password == ''){
        this.toastr.error('Todos los campos son obligatorios','Error');
        return;
    }

    //Creamos el body objeto
    const user: User = {
      username: this.username,
      password: this.password
    }

    this._userService.login(user).subscribe({
      next: (data) => {
        console.log(data);
      }
    })

  }

}


