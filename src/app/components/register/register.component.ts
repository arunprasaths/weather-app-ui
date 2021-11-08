import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  newUser:User = {
    FirstName: '',
    LastName: '',
    UserName: '',
    Password: ''
  };

  constructor(private fb: FormBuilder,
              private authService:AuthService,
              private router:Router) {
    
  }  
  registerForm:FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    userName: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });
    
  onSubmit(){
    delete this.registerForm.value.confirmPassword;

    this.authService.register(this.registerForm.value).subscribe((data:any) => {
    //  console.log(data);
      localStorage.setItem('userName',data.UserName);  
      localStorage.setItem('token_value',data.Token);  
      localStorage.setItem('name',data.Name);  

      this.router.navigate(['/login']);
    });
    
  }

}

