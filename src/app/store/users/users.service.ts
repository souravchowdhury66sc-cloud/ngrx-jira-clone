import { inject, Injectable } from "@angular/core";
import { collectionData, Firestore } from "@angular/fire/firestore";
import { User } from "firebase/auth";
import { collection } from "firebase/firestore";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor() {}
  private firestore: Firestore=inject(Firestore);

  getUsers(): Observable<User[]>{
    const usersCollection = collection(this.firestore, 'users');
    return collectionData(usersCollection) as Observable<User[]>;
  }
}
