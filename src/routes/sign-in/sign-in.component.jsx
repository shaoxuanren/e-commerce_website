import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils"; 
import { createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const Signin = () => {

    const logGoogleuser = async() => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);    
    }
    return (
        <div>
            <h1>Sign in Page</h1>
            <button onClick={logGoogleuser}>
                Sign in with Google
            </button>
        </div>
    )
}

export default Signin;