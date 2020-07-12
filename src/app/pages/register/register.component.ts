import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Md5} from 'ts-md5';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
  validateForm: FormGroup;
  errMsg: any;
  hidden = true;
  show = true;

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private router: Router) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      email: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
    });
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.validateForm.controls.password.value) {
      return {confirm: true, error: true};
    }
    return {};
  };

  submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      this.validateForm.value.password = Md5.hashStr(this.validateForm.value.password).toString();
      this.validateForm.value.checkPassword = Md5.hashStr(this.validateForm.value.checkPassword).toString();

      this.http.post('/api/admin/register', this.validateForm.value)
        .subscribe(json => {
          if (json['status'] !== 200) {
            this.errMsg = json['msg'];
            this.hidden = false;
          } else {
            this.errMsg = '注册成功,去登录';
            this.show = false;
            this.hidden = true;
          }
        });
    }
  }

}
