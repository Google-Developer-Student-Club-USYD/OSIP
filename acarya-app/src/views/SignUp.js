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

import { registerWithEmailAndPassword, signInWithGoogle } from '../firebase';

const fields = [
    {id: 'fname', label: 'Full Name', type: 'text', placeholder: "John Doe"},
    {id: 'email', label: 'Email', type: 'email', placeholder: "john.doe11@gmail.com"},
    {id: 'password', label: 'Password', type: 'password', placeholder: "•••••••••••••••"},
    {id: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: "•••••••••••••••"},
];

const SignUp = () => {
    const [fname, setFname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <LoginUI>
            <GDSCLogo src={gdscLogo} />
            <LeftView>
                <Form>
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
                        <SignInButton onClick={() => {registerWithEmailAndPassword(fname, email, password)}}>Create account</SignInButton>
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