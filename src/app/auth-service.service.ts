import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  isLoggedIn = false;
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private http: HttpClient, private router: Router) {
  }

  checkLogin() {
    const token = window.sessionStorage.getItem('_token');
    if (token == null) {
      this.isLoggedIn = false;
    } else {
      this.http.get('/api/admin/checkLogin')
        .subscribe(json => {
          if (json['status'] === 200) {
            this.isLoggedIn = true;
            this.router.navigateByUrl(this.redirectUrl);
          } else {
            this.isLoggedIn = false;
          }
        });
    }
  }
}
