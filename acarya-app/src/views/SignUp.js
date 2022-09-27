import { 
    LoginUI, 
    LeftView, 
    Form, 
    Title, 
    Subtext, 
    Field, 
    Label, 
    TextBox, 
    Buttons, 
    SignInButton, 
    GoogleSignInButton, 
    GoogleLogo, 
    RightView, 
    linkStyle,
    link,
    LastLine,
    GDSCLogo
} from './SignIn';
import { Link } from 'react-router-dom';

import googleLogo from '../resources/googleLogo.png';
import gdscLogo from '../resources/gdscLogo.png';

import { auth, registerWithEmailAndPassword, signInWithGoogle } from '../firebase';

const fields = [
    {id: 'fname', label: 'Full Name', type: 'text', placeholder: "John Doe"},
    {id: 'email', label: 'Email', type: 'email', placeholder: "john.doe11@gmail.com"},
    {id: 'password', label: 'Password', type: 'password', placeholder: "•••••••••••••••"},
    {id: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: "•••••••••••••••"},
];

const SignUp = () => {
    const signUp = async (event) => {
        event.preventDefault();

        const elementsArray = [...event.target.elements];

        const data = elementsArray.reduce((acc, element) => {
            if (element.id) {
                acc[element.id] = element.value;
            }

            return acc;
        }, {});

        try {
            if (data.email === '') throw("Please enter an email")
            if (data.password === '') throw("Please enter a password")
            if (data.password.length < 8) throw("Your password should be at least 8 characters long")
            if (data.password !== data.confirmPassword) throw("Passwords do not match")
            
            await registerWithEmailAndPassword(data.fname, data.email, data.password)
            .then(() => {              
                sessionStorage.setItem('userId', auth.currentUser.uid);
                sessionStorage.setItem('userEmail', data.email);

                window.location.href = "/dashboard";
            })
            .catch((error) => {
                alert(error.message);

            })
        }
        catch (error) {
            alert(error);
        }

    }
    return (
        <LoginUI>
            <GDSCLogo src={gdscLogo} />
            <LeftView>
                <Form onSubmit={signUp}>
                    <Title>Create an account</Title>
                    <Subtext>Let's get you started! Please fill in your details!</Subtext>
                    {fields.map(field => {
                        return (<Field>
                            <Label>{field.label}</Label>
                            <TextBox id={field.id} type={field.type} placeholder={field.placeholder}/>
                            {field.extra ? <Link style={linkStyle} to={field.extra.link}>{field.extra.text}</Link> : null}
                        </Field>)
                    })}
                    <Buttons>
                        <SignInButton>Create account</SignInButton>
                        <GoogleSignInButton onClick={signInWithGoogle}><GoogleLogo src={googleLogo}/>Sign up with Google</GoogleSignInButton>
                    </Buttons>
                    <LastLine>Already have an account? <Link style={link} to="/sign-in">Sign in</Link></LastLine>
                </Form>
            </LeftView>
            <RightView />
        </LoginUI>
    )
}


export default SignUp;