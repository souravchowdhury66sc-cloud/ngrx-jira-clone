import { Component, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { selectAuthState } from '../../store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { authActions } from '../../store/auth/auth.action';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ CommonModule,FormsModule,RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private store= inject(Store);

  //form fields
  email='';
  password='';
  //error & isLoading
  isLoading$ :Observable<boolean>=this.store.select(selectAuthState).pipe(
    map(state => state.isLoading));
  error$ :Observable<string | null>=this.store.select(selectAuthState).pipe(
    map(state => state.error));

    onSubmit(){
      //dispatch login action
      this.store.dispatch(authActions.login({
         email: this.email,
         password: this.password }));
      }
}
