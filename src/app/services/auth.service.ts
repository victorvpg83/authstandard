import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1'
  private apiKey = 'AIzaSyBfA5nrro0huNRo-QBoNN11WQAp3UdHvmM'

  // create new users
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // Login users
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  // tslint:disable-next-line: no-shadowed-variable
  constructor( private http: HttpClient ) { }

  logout() {

  }

  login( user: UserModel ) {

  }

  signup( user: UserModel ) {
    const authData = {
      ...user,
      returnSecureToken: true
    }

    return this.http.post(`${ this.url }/accounts:signUp?key=${ this.apiKey }`, authData )
  }
}
