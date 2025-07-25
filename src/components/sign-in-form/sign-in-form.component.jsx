import { useState } from "react";

import FormInput from "../../components/form-in/form-in.component";
import Button from "../../components/button/button.component";


import { 
   signInWithGooglePopup, 
   createUserDocumentFromAuth,
   signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";
import './sign-in-form.styles.scss';


const defaultFormFields = {
  email: '',
  password: '',
};


const SignInForm = () => {
const [formFields, setFormFields ] = useState(defaultFormFields);
const { email, password } = formFields;

const resetFormFields = () => {
    setFormFields(defaultFormFields);
}
   const signInWithGoogle = async () => {
     await signInWithGooglePopup();
   }


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
       const {user} = await signInAuthUserWithEmailAndPassword(
        email, 
        password
       );
      resetFormFields();
    } catch (error) {
        switch (error.code) {
         case error.code=='auth/invalid-credential':
             alert('No user associated with this email');
            break;
         case error.code=='auth/wrong-password':
             alert('Incorrect password for email');
            break; 
         default:
            console.log(error)
            break;
        }
      
      console.log(error)
    } 
  }
 
  const handleChange = (event) => {
   const { name, value} = event.target;
   setFormFields({...formFields, [name]: value });
  }

   

   return (
     <div className="sign-up-container">
        <h1>I already have an account</h1>
        <span>Sign in with your email and password</span>
        <form onSubmit={handleSubmit}>
         <FormInput 
          label="Email"
          type="email"
          required

          onChange={handleChange}
          name="email" 
          value={email}
          />
          <FormInput 
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password" 
          value={password}
          />
        <div className="buttons-container">
           <Button type='submit'>Sign in</Button>
           <Button type='button' buttonType="google" onClick={signInWithGoogle}>
              Google sign in
           </Button> 
           </div>
        </form>
     </div>
   )
}


export default SignInForm;