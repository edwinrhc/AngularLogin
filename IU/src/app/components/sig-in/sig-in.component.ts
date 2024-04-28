import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {User} from "../../interfaces/user";
import {UserService} from "../../services/user.service";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-sig-in',
  templateUrl: './sig-in.component.html',
  styleUrls: ['./sig-in.component.css']
})
export class SigInComponent {

  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading: boolean = false;

  constructor(private toaastr: ToastrService,
              private _userService: UserService,
              private router: Router) {

  }

  addUser(){
    //Validar el formulario
   if(this.username == ''|| this.password == ''|| this.confirmPassword == ''){
     this.toaastr.error('Todos los campos son obligatorios','Error');
    return;
   }

   //Validar el password sean iguales
    if(this.password != this.confirmPassword){
      this.toaastr.error('Las contraseña no coincides','Error')
    }

    // Creamos el objeto
    const user: User = {
      username: this.username,
      password: this.password
    }

    this.loading = true;
    this._userService.signIn(user).subscribe(data => {
      this.loading = false;
     this.toaastr.success(`El usuario ${this.username} fue registrado con exito`,'Usuario Registrado');
     this.router.navigate(['/login']);
    }, (event : HttpErrorResponse) => {
       this.loading = false;
       if(event.error.msg){
        this.toaastr.error(event.error.msg,'Error');
       }else{
         this.toaastr.error('Upps ocurrio un error, comuniquese con el administrador','Error');
       }
    })
  }
}

