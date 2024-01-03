import {
  updatePassword,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc } from "firebase/firestore";
// import { serverTimestamp } from "firebase/firestore";
// import { useUser } from "@/app/context";
import { doc, getDoc } from "firebase/firestore";
// import { Redirect } from "next";
// import { redirect } from "next/navigation";

export const createUser = async (
  auth: any,
  db: any,
  email: string,
  password: string,
  role: String
) => {
  try {
    const docRef = doc(db, "userList", "Admin");
    const docSnap = await getDoc(docRef);
    if (role === "admin") {
     
      if (docSnap.exists()) {
        console.log("admin alredy exist ");
        return false;
      }
    }

  const result = await createUserWithEmailAndPassword(auth, email, password);
  
    const { uid } = result.user;
    if (role === "admin") {
      // result.user.displayName= 'admin';
    const setAdmin = await setDoc(docRef, {
        admin: uid,
      });
      // result.user.displayName = "admin";
      console.log("admin is set ");
    }
    // result.user.displayName= 'user';
    await setDoc(doc(db, "userList", uid), {
      email: email,
      photoURL:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRony1PUEAFW_rKWuriSeChlMZK05SNCoyhblOQpH5tBq1m5C_HHsKEJvveSdHRdSj_zJ4&amp;usqp=CAU",
      uid: uid,
      role: role,
    });
    console.log("success");
return true
    
  } catch (error:any) {
    console.log(error.message)
    // console.log(error.status)
    return false
  }
};

export const signIn = async (auth: any, email: string, password: string) => {
  
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const {currentUser} = auth;
    if (typeof window !== 'undefined'){
      window.sessionStorage.setItem('user', JSON.stringify(currentUser));
      console.log("sucessful");
    }

    return true;
  } catch (error: any) {
   
    console.log(error.message);
   
    return false;
  }
  // return state
};


export const resetPassword = async (user:any,newPassword:string)=>{
  try {

    const result = await updatePassword(user,newPassword);
    return true;

    
  } catch (error: any) {
    console.log(error.messaage)
    return false
  }
}

export const comparePassword = (password: string, confirmPassword: string) =>
  password === confirmPassword;
