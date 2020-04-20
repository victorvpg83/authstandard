import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';

import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1'
  private apiKey = 'AIzaSyBfA5nrro0huNRo-QBoNN11WQAp3UdHvmM'

  userToken: string

  // create new users
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // Login users
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private http: HttpClient ) {
    this.readToken()
  }

  logout() {
    localStorage.removeItem('token')
  }

  login( user: UserModel ) {
    const authData = {
      ...user,
      returnSecureToken: true
    }

    return this.http.post(`${ this.url }/accounts:signInWithPassword?key=${ this.apiKey }`, authData )
    .pipe(
      map( response => {
        this.saveToken( response['idToken'] )
        return response
      })
    )

  }

  signup( user: UserModel ) {
    const authData = {
      ...user,
      returnSecureToken: true
    }

    return this.http.post(`${ this.url }/accounts:signUp?key=${ this.apiKey }`, authData )
      .pipe(
        map( response => {
          this.saveToken( response['idToken'] )
          return response
        })
      )
  }

  private saveToken( idToken: string ) {

    this.userToken = idToken
    localStorage.setItem( 'token', idToken )

    let today = new Date()
    today.setSeconds( 3600 )

    localStorage.setItem( 'Expire', today.getTime().toString() )

  }

  readToken() {

    localStorage.getItem('token') ? this.userToken = localStorage.getItem('token') : this.userToken = ''
    return this.userToken
  }

  isAuthenticated(): boolean {

    if ( this.userToken.length < 2 ) {
      return false
    }

    const expire = Number(localStorage.getItem( 'Expire' ))
    const expiredDate = new Date()
    expiredDate.setTime(expire)

    if ( expiredDate > new Date() ) {
      return true
    } else {
      return false
    }

    return this.userToken.length > 2
  }

}
