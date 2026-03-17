import { Component,inject } from '@angular/core';
import { map,Observable } from 'rxjs';
import { selectAuthState } from '../../store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { authActions } from '../../store/auth/auth.action';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
private store= inject(Store);

//form fields
name='';
email='';
password='';
//error & isLoading
isLoading$ :Observable<boolean>=this.store.select(selectAuthState).pipe(
  map(state => state.isLoading));
error$ :Observable<string | null>=this.store.select(selectAuthState).pipe(
  map(state => state.error));
  onSubmit(){
    this.store.dispatch(authActions.register({
      name: this.name,
      email: this.email,
      password: this.password }));
  }
}
