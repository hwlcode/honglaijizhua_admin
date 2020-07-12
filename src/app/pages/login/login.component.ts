import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Md5} from 'ts-md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  errMsg: any;
  hidden = true;

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private router: Router) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    this.validateForm.value.password = Md5.hashStr(this.validateForm.value.password).toString();

    if (this.validateForm.valid) {
      this.http.post('/api/admin/login', this.validateForm.value)
        .subscribe(json => {
          if (json['status'] === 200) {
            this.router.navigateByUrl('/admin');
            this.hidden = true;
            this.errMsg = '';
            if (window.sessionStorage && window.sessionStorage.getItem('_token')) {
              window.sessionStorage.removeItem('_token');
              window.sessionStorage.setItem('_token', json['token']);
            } else {
              window.sessionStorage.setItem('_token', json['token']);
            }
          } else {
            this.hidden = false;
            this.errMsg = json['msg'];
          }
        });
    }
  }
}
