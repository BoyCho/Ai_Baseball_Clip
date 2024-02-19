import { instance } from '@/api';
import { requestLogin } from '@/api/Login';
import { FailResponse } from '@/api/type';
import { SignUpFormValues } from '@/pages/SignUp/type';
import { isAxiosError } from 'axios';
import { authActions } from '@/store/slice/authSlice';
import { NavigateFunction } from 'react-router-dom';
import { setRequestId } from '@/store/slice/requestIdSlice';

const useLogin = (userData: SignUpFormValues, dispatch: any, navigate: NavigateFunction) => {
    requestLogin(userData)
        .then((response) => {
            // addAxiosInterceptor(instance);
            sessionStorage.setItem('accessToken', response.data.accessToken);
            sessionStorage.setItem('refreshToken', response.data.refreshToken);
            dispatch(authActions.login());
            if (userData.email === 'kt@long.com') dispatch(setRequestId(17));
            if (userData.email === 'samsung@short.com') dispatch(setRequestId(84));
            if (userData.email === 'samsung@long.com') dispatch(setRequestId(90));
            navigate('/');
        })
        .catch((error) => {
            if (isAxiosError<FailResponse>(error)) {
                alert(error.response?.data.message);
            }
        });
};

export default useLogin;
