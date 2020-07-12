import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {
  isCollapsed = false;

  constructor(private http: HttpClient,
              private router: Router) {
  }

  ngOnInit() {
  }

  loginOut() {
    this.http.get('/api/admin/logout')
      .subscribe(json => {
        if (json['status'] === 200) {
          window.sessionStorage.removeItem('_token');
          this.router.navigateByUrl('/login');
        }
      });
  }
}
