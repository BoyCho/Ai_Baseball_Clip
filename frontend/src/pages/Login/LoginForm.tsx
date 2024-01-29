import TextField from '@/components/TextField';
import './Login.scss';
import Button from '@/components/Button';
import NavigateMessage from '@/components/NavigateMessage';
import useLoginInput from '@/hooks/useLoginInput';
import { emailCheck, passwordCheck } from '@/utils/signUpValidCheck';
import requestLogin from '@/api/requestLogin';

export default function LoginForm() {
    const { loginFormValues, handleLoginFormValues } = useLoginInput({
        email: '',
        password: '',
    });

    return (
        <div className="loginform-container">
            <h1>Login</h1>
            <TextField
                name="email"
                label="이메일"
                placeholder="이메일을 입력해주세요."
                onChange={handleLoginFormValues}
                length={loginFormValues.email.length}
                hasError={!emailCheck(loginFormValues.email)}
            />
            <TextField
                name="password"
                label="비밀번호"
                placeholder="비밀번호를 입력해주세요."
                onChange={handleLoginFormValues}
                length={loginFormValues.password.length}
                hasError={!passwordCheck(loginFormValues.password)}
            />
            <button className="forgot-password">비밀번호를 잊어버리셨나요?</button>
            <Button
                styleType="login-form"
                onClick={() => {
                    requestLogin(loginFormValues);
                }}
            >
                로그인
            </Button>
            <NavigateMessage
                textMessage="계정이 없으신가요?"
                linkMessage="가입하기"
                type="signup"
            />
        </div>
    );
}
