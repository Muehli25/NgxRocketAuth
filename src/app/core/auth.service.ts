import {HttpClient} from '@angular/common/http';
import {Credentials} from '@app/core/authentication/authentication.service';

export class AuthService {
  constructor(private http: HttpClient) {
  }

  validateUser(username: string, password: string) {
    const userdata = {
      'username': username,
      'password': password
    };
    console.log(userdata);
    return this.http.post<Credentials>('/login', userdata);
  }
}
