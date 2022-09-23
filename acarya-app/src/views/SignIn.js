import styled from 'styled-components';
import { Link } from 'react-router-dom';

import appLogo from '../resources/appLogo.png';
import googleLogo from '../resources/googleLogo.png';

export const LoginUI = styled.div`
    display: flex;
`;

// left view
export const LeftView = styled.div`
    height: 100vh;
    width: 50%;
    display: flex;
`;

export const Container = styled.form`
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

const linkStyle = {
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

export const SignInButton = styled.button`
    ${buttonStyle}
    background: #000;
    border-color: #000;
    color: #fff;
`;

export const GoogleSignInButton = styled.button`
    ${buttonStyle}
    background: #fff;
    border-color: #B4B4B4;
`;

export const GoogleLogo = styled.img`
    width: 24px;
    margin: 0 10px 0 0;
`;

export const EndLine = styled.span;

export const link = {
    fontWeight: "bold",
    color: "#222",
};

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

export const RightView = () => {
    return (
        <RightViewContainer>
            <Logo src={appLogo} />
        </RightViewContainer>
    )
};

const fields = [
    {id: 'email', label: 'Email', type: 'email', placeholder: "john.doe11@gmail.com"},
    {id: 'password', label: 'Password', type: 'password', placeholder: "•••••••••••••••", extra: {text: "Forgot password", link: "#"}},
];

const SignIn = () => {
    return (
        <LoginUI>
            <LeftView>
                <Container>
                    <Title>Welcome back</Title>
                    <Subtext>Welcome back! Please enter your details!</Subtext>
                    {fields.map(field => {
                        return (<Field>
                            <Label>{field.label}</Label>
                            <TextBox id={field.id} type={field.type} placeholder={field.placeholder}/>
                            {field.extra ? <Link style={linkStyle} to={field.extra.link}>{field.extra.text}</Link> : null}
                        </Field>)
                    })}
                    <Buttons>
                        <SignInButton>Sign in</SignInButton>
                        <GoogleSignInButton><GoogleLogo src={googleLogo} />Sign in with Google</GoogleSignInButton>
                    </Buttons>
                </Container>
            </LeftView>
            <RightView />
        </LoginUI>
    )
}

export default SignIn;