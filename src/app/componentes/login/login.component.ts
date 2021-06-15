import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogearUser } from 'src/app/clases/logear-user';
import swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string = "";
  password:string = "";
  grande : any = "";
  unUsuario: LogearUser = new LogearUser();

  guardar!:string;
  public formGroup!: FormGroup;
  
  constructor(public data:AuthService, public router:Router,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      'usuario': ['',[Validators.required,Validators.pattern(/\w+@\w+\.+[a-z]/)]],
      'contraseña': ['',Validators.required],
    });
  }
  salir()
  {
    swal.fire({
      title: 'Estas seguro que deseas salir?',
      text: "Mira que no tardaras mas de 5 min !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, quiero salir.'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['home']);
      }
    })
  }
  public aceptar()
  {
    console.log(this.formGroup.getRawValue());
    this.unUsuario.usuario = this.formGroup.getRawValue().usuario;
    this.unUsuario.contraseña = this.formGroup.getRawValue().contraseña;

      this.data.login(this.unUsuario.usuario,this.unUsuario.contraseña).then((res:any) => {
        this.unUsuario.contraseña = res.user.uid;
        this.guardar =  JSON.stringify(this.unUsuario);
        localStorage.setItem("usuario",this.guardar);
          this.data.boolean = true;
          this.router.navigate(['/home']);
      }).catch((err:any) => swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error, datos incorrectos',
        showConfirmButton: false,
        timer: 2000,
      }));
  
        
//    console.log(this.formGroup.get('email')?.value)
//  console.log(this.formGroup.controls['email'].value);
  }
  Hardcodear()
  {
    this.email = "test@test.com";
    this.password = "123456";
  }

}
