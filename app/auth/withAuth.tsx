"use client"
// import { useUser } from "@/app/context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


//authentiation component

const withAuth = (WrappedComponent: React.ComponentType) => {
const  AuthenticatedComponent: React.FC = (props) =>{
    let currentUser: string | null = null;
    if (typeof window !== 'undefined'){
        const storedUser = window.sessionStorage.getItem('user');
        currentUser = storedUser;
    }
    // const {auth} = useUser();
    const router = useRouter();


useEffect(()=>{
    if(!currentUser){
        router.push('/app/auth/signIn')
    }
},[currentUser,router]);

if(currentUser){
    // JSON.parse(currentUser).providerData[0].displayName = "user";
    // console.log(JSON.parse(currentUser).providerData[0].displayName)
    // console.log(currentUser,'user')
}
return currentUser? <section><WrappedComponent {...props}/></section>: <h1>authentiating</h1>

}

return AuthenticatedComponent;
}

export default withAuth;