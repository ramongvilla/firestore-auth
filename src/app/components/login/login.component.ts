import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/cliente.model';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private flashMessages: FlashMessagesService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    
    this.loginService.getAuth().subscribe(auth =>{
      if (auth) {
        this.router.navigate(['/']);
      }
    })


  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
      // registeredOn: today,
      // name: [name.toLowerCase(), Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required,
          // Validators.minLength(minPassLength),
          // this.validatePassword,
        ]
      ]
    });
    // const name = 'JOHN DOE';
    // const minPassLength = 4;
  }

  register() {
    const user: User = this.formGroup.value;
  
    this.loginService.login(user)
      .then(res=>{
        this.router.navigate(['/']);
      })
      .catch(error =>{
        this.flashMessages.show(error.message, {
          cssClass: 'alert-danger',
          setTimeout: 4000,
        });
      });
    console.log(user);
  }

  registrarse(){
    const user: User = this.formGroup.value;
    this.loginService.registrarse(user)
    .then( res => {
      this.router.navigate(['/']);
    })
    .catch(error => {
      this.flashMessages.show(error.message, {
        cssClass: 'alert-danger',
        setTimeout: 4000,
      });
    })
   }


}
