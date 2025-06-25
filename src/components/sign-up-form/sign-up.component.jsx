import { useState } from "react";

import FormInput from "../form-in/form-in.component";
import Button from "../button/button.component";

import './sign-up.styles.scss';
import { 
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword 
} from "../../utils/firebase/firebase.utils";


const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
};


const SignUpForm = () => {
   const [formFields, setFormFields] = useState(defaultFormFields);
   const { displayName, email, password, confirmPassword} = formFields;
   
   const resetFormFields = ()  => {
    setFormFields(defaultFormFields)
   }


//just to get input values and set them
   const handleChange = (event) => {
     const {name, value} = event.target;
     setFormFields({...formFields, [name]: value});
   }

    const handleSubmit = async (event) => {
      event.preventDefault();
      if (password!==confirmPassword) {
         alert('passwords do not match');
         return;
      }
      
      try{
         const { user } = await createAuthUserWithEmailAndPassword(
            email, 
            password
          );
        const userDocRef = await createUserDocumentFromAuth(user, { displayName });
        resetFormFields();

      } catch (error) {
        if (error.code=='auth/email-already-in-use') {
          alert('Cannot create user, email already in use');
        }
        if (error.code=='auth/weak-password') {
          alert('Password should be at least 6 characters');
        }
        
        console.log('user creation encountered and error',error);
      }
    }  
       
    return (
      <div>
        <h2>Don't have an account?</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={handleSubmit}>
            <FormInput 
            label="Display Name"
            type="text" 
            required 
            onChange={handleChange} 
            name="displayName" 
            value={displayName}
            />
       
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

            <FormInput 
            label="Confrim Password"
            type="password" 
            required 
            onChange={handleChange} 
            name="confirmPassword" 
            value={confirmPassword}
            />  
            <Button buttonType='default' type='submit'>Sign Up</Button>
        </form>
      </div>
    );
}

export default SignUpForm;
