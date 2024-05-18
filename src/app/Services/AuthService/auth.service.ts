import { Injectable, inject } from '@angular/core';
import { Auth, UserCredential, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { CookieService } from 'ngx-cookie-service';
import { Firestore, addDoc, collection, setDoc, getDocs, query, collectionData, doc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {  GoogleAuthProvider, signInWithRedirect , signInWithPopup} from '@angular/fire/auth';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _auth = inject(Auth);
  private _cookie = inject(CookieService);
  private _firestore = inject(Firestore);


  constructor() { }



  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this._auth, email.trim(), password.trim());

  }

  signUp( email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this._auth, email, password);
  }


  loginWithGoogle(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(this._auth, provider)
      .then((result: UserCredential) => {
        console.log(result.user);
        return result;
      })
      .catch((error) => {
        alert(error.message);
        throw error;
      });
  }



  async generateUser( email: string, userID: string) {
    const userRef = doc(collection(this._firestore, 'users'), userID); // Using provided userID as document ID

    let userObj = {
      Email: email,
      userID: userID,
      created:new Date(),
      accountType:"Employee"
    }
    return setDoc(userRef, userObj)
  }


  setCookie(userID: string) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 15);

    this._cookie.set("userID", userID, expirationDate, '/', undefined, true, 'Strict');
    this._cookie.set("accountType", "Personal", expirationDate, '/', undefined, true, 'Strict');
    console.log('Cookie set:', userID);
  }

  addCookie(cookieName: string, cookieValue:string) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 15);
    this._cookie.set(`${cookieName}`, cookieValue, expirationDate, '/', undefined, true, 'Strict');
    // this._cookie.set("accountType", "Personal", expirationDate, '/', undefined, true, 'Strict');
    // console.log('Cookie set:', cookieName);
  }

  getCookie() {
    const cookieExists = this._cookie.check("userID");
    // console.log('Cookie exists:', cookieExists);
    return cookieExists;
  }

  checkCookie(nameofCookie:string) {
    // console.log("Cookie: " , this._cookie.get(nameofCookie));
    return this._cookie.get(nameofCookie)
  }

  deleteCookie() {

    this._cookie.delete('userID')
    window.location.reload()
  }


  getUserCollection() {
    let userRef = collection(this._firestore, 'users')
  }

  async getUserProfileImage() {
    // Assuming you have a Firestore instance initialized as this._firestore
    // and a method this._cookie.get() to get the current user ID from cookies
    const userID = this._cookie.get("userID");
    const userRef = doc(this._firestore, "users", userID);

    try {
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            const userProfile = userDoc.data();
            // Assuming the user's profile image URL is stored in the profileImageUrl field
            const imageUrl = userProfile['userImage'];

            // You might need to handle Firebase Storage separately if the URL requires more processing
            // or if the URL is a reference path to Firebase Storage
            return imageUrl;
        } else {
            console.log("No such user!");
            return null; // Handle the case where there is no user found
        }
    } catch (error) {
        console.error("Error getting document:", error);
        return null; // Handle error cases appropriately
    }
}

}