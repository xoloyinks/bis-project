"use client"
import { useUser } from "@/app/context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


const withAdmin = (WrappedComponent: React.ComponentType)=>{

    const AdminComponent: React.FC = (props) => {

        const router = useRouter();
        const {auth} = useUser();
        const {currentUser} = auth;
        const {displayName} = currentUser;
        const isadmin = displayName === "admin";

        useEffect(()=>{
            if(!currentUser){
                router.push('/auth/signIn')
            }
            if(currentUser && !isadmin){
                router.push('/auth/restricted')
            }

        },[currentUser,isadmin,router])
 
        return currentUser && isadmin ? <WrappedComponent {...props}/>: <p>confirming status</p>

    };


return AdminComponent;

}

export default withAdmin