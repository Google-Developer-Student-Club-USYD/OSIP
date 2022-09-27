import styled from 'styled-components';
import { Link } from 'react-router-dom';

import appLogo from '../resources/appLogo.png';
import googleLogo from '../resources/googleLogo.png';
import gdscLogo from '../resources/gdscLogo.png';
import { signInWithGoogle, logInWithEmailAndPassword, sendPasswordReset } from '../firebase';

export const LoginUI = styled.div`
    display: flex;
`;

// left view
export const LeftView = styled.div`
    height: 100vh;
    width: 50%;
    display: flex;
`;

export const Form = styled.form`
    width: 65%;
    margin: auto;
`;

export const Title = styled.h1`
    text-align: left;
    margin: 0;
`;

export const Subtext = styled.p`
    text-align: left;
    color: #A1A1A1;
    margin: 6px 0 24px 0;
`;

// field
export const Field = styled.div`
    display: flex;
    flex-direction: column;
    margin: 16px 0;
`;

export const Label = styled.span`
    text-align: left;
    margin: 5px 0;
`;

export const TextBox = styled.input`
    padding: 14px 8px;
    border: solid 1px #B4B4B4;
    border-radius: 10px;
    font-size: 14px;
`;

export const linkStyle = {
    textAlign: "right",
    fontWeight: "bold",
    color: "#141414",
    textDecoration: "none"
}

const buttonStyle = `
    height: 44px;
    border: solid 1px;
    border-radius: 10px;
    font-size: 16px;
    width: 80%;
    margin: 5px auto;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Buttons = styled.div`
    display: flex;
    flex-direction: column;
`;

export const SignInButton = styled.div`
    ${buttonStyle}
    background: #000;
    border-color: #000;
    color: #fff;
`;

export const GoogleSignInButton = styled.div`
    ${buttonStyle}
    background: #fff;
    border-color: #B4B4B4;
    cursor: pointer;
`;

export const GoogleLogo = styled.img`
    width: 24px;
    margin: 0 10px 0 0;
`;


export const link = {
    fontWeight: "bold",
    color: "#222",
    textDecoration: "none"
};

export const LastLine = styled.p`
    margin: 30px 0 0 0;
    color: #777;
`;

// right view
const RightViewContainer = styled.div`
    background: #efefef;
    height: 100vh;
    width: 50%;
    display: flex;
`;

const Logo = styled.img`
    width: calc(100% - 50px);
    margin: auto 25px;
`;

export const GDSCLogo = styled.img`
    width: 60px;
    position: fixed;
    top: 20px;
    left: 20px;
`;

export const RightView = () => {
    return (
        <RightViewContainer>
            {/* <Logo src={appLogo} /> */}
        </RightViewContainer>
    )
};

const fields = [
    {id: 'email', label: 'Email', type: 'email', placeholder: "john.doe11@gmail.com"},
    {id: 'password', label: 'Password', type: 'password', placeholder: "•••••••••••••••", extra: {text: "Forgot password", link: "#"}},
];

const test = () => {
    console.log(fields[0])
    console.log(fields[1])
}

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = (event) => {
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
            
            logInWithEmailAndPassword(data.email, data.password)
            .then((response) => {                
                sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
                sessionStorage.setItem('userId', response.user.uid);
                sessionStorage.setItem('userEmail', data.email);

                window.location.href = "/dashboard";
            })
            .catch((error) => {
                if (error.message === "Firebase: Error (auth/wrong-password).") {
                    alert("Incorrect password");
                } else if (error.message === "Firebase: Error (auth/user-not-found).") {
                    alert("User not found");
                } else {
                    alert(error.message);
                }

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
                <Form action={signIn}>
                    <Title>Welcome back</Title>
                    <Subtext>Welcome back! Please enter your details!</Subtext>
                    {fields.map(field => {
                        return (<Field>
                            <Label>{field.label}</Label>
                            <TextBox id={field.id} type={field.type} placeholder={field.placeholder} value={field.value}/>
                            {field.extra ? <Link style={linkStyle} to={field.extra.link} onClick={() => {sendPasswordReset(email)}}>{field.extra.text}</Link> : null}
                        </Field>)
                    })}
                    <Buttons>
                        <SignInButton>Sign in</SignInButton>
                        <GoogleSignInButton onClick={signInWithGoogle}><GoogleLogo src={googleLogo}/>Sign in with Google</GoogleSignInButton>
                    </Buttons>
                    <LastLine>Don't have an account? <Link style={link} to="/sign-up">Sign up</Link></LastLine>
                </Form>
            </LeftView>
            <RightView />
        </LoginUI>
    )
}

export default SignIn;