import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginResponse } from '../model/loginresponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rolelist = [
    { value: 'Doctor', viewValue: 'Doctor' },
    { value: 'Patient', viewValue: 'Patient' },
  ];

loginForm: FormGroup = new FormGroup({
  email: new FormControl("", Validators.required),
  password: new FormControl("", Validators.required),
  role: new FormControl("", Validators.required)
});

constructor(private authService: AuthService, private router: Router) {
}

ngOnInit(): void {
    this.initForm();
}

initForm() {
    this.loginForm = new FormGroup({
        email: new FormControl("", Validators.required),
        password: new FormControl("", Validators.required),
        role: new FormControl("", Validators.required)
});
}

loginProcess() {
if (this.loginForm.valid) {
  this.authService.login(this.loginForm.value).subscribe((result: LoginResponse) => {
    if (result.success) {
        alert(result.message)
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        if(currentUser['role'] === 'Doctor'){
          this.router.navigate(['dashboard/doctor/home']);  
        }else{
          this.router.navigate(['dashboard/patient/home']);
        }
        
      } else {
        alert(result.message);
      }
    })
}
}

}


