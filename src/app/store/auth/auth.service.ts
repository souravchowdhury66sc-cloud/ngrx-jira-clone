import { inject, Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword } from "@angular/fire/auth";
import { doc, Firestore, setDoc } from "@angular/fire/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { from } from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor() {}
  private auth: Auth= inject(Auth); // Replace with actual Auth type from Firebase
  private firestore: Firestore = inject(Firestore); // Replace with actual Firestore type from Firebase
//login
login(email: any, password: any) {
  return from(signInWithEmailAndPassword(this.auth, email, password));
}
//register
register(email: any, password: any) {
  return from(createUserWithEmailAndPassword(this.auth, email, password));
}
//logout
logout() {
    return from(this.auth.signOut());
  }

  createUserDocument(uid: string, email: string, name: string)
  {const userDocRef = doc(this.firestore, `users/${uid}`);
  const userData = {uid,email,name,};
  return from(setDoc(userDocRef, userData));
}

}
