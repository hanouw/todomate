import React, { useState } from 'react';
import BasicLayout from '../layouts/BasicLayout';
import { register } from '../api/memberApi';
import useCustomLogin from '../hooks/useCustomLogin';
import useCustomMove from '../hooks/useCustomMove';

const initState = {
  email: '',
  password: '',
  passwordVerify: '',
  name: '',
};

const SignupPage = () => {
  const [inputVal, setInputVal] = useState(initState);
  const [emailValid, setEmailValid] = useState(false);

  const { execLogin } = useCustomLogin();
  const { moveToMain } = useCustomMove()

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputVal((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      validateEmail(value);
    }
    if (name === "password" || name === "passwordVerify") {
      validatePassword();
    }
  };

  const validatePassword = () => {
    const passwordErrors = [];
    if (inputVal.password.length < 4) {
      passwordErrors.push('비밀번호는 4자리 이상이어야 합니다.');
    }
    if (inputVal.password !== inputVal.passwordVerify) {
      passwordErrors.push('비밀번호가 일치하지 않습니다.');
    }
    return passwordErrors;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setEmailValid(isValid);
    return isValid;
  };

  const handleClickRegister = async () => {
    if (!validateEmail(inputVal.email)) {
      alert('유효하지 않은 이메일입니다.');
      return;
    }

    const passwordErrors = validatePassword();
    if (passwordErrors.length > 0) {
      alert(passwordErrors.join('\n'));
      return;
    }

    if (inputVal.name.trim().length === 0) {
      alert("이름을 입력해주세요!")
      return
    }

    register({
      email: inputVal.email,
      password: inputVal.password,
      name: inputVal.name,
    }).then((response) => {
      console.log("register 결과:", response)
      if (response === 'exist') {
        alert('이미 존재하는 회원입니다. 로그인을 해주세요.');
      } else {
        alert(response + '님, 환영합니다!');
        execLogin({ email: inputVal.email, password: inputVal.password }).then((data) => {
          moveToMain()
        })
      }
    }).catch((error) => {
      console.error('회원가입 에러:', error);
      alert('회원가입을 실패했습니다. 다시 시도해주세요.');
    })
  };

  const inputClassName =
    'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 font-[Pretendard-Regular]';

  return (
    <BasicLayout>
      <div className="font-[Pretendard-Bold] text-3xl grid place-items-center mt-12 mb-12">회원가입</div>
      <div className="w-full grid place-items-center gap-5">
        <div className="w-full sm:w-1/2 md:w-1/3 px-4">
          <span className="font-[Pretendard-Regular]">이메일 주소<span className="text-red-500 text-sm"> 필수</span></span>
          <div className="flex">
            <input
              name="email"
              type="email"
              value={inputVal.email}
              onChange={handleChange}
              className={`${inputClassName} flex-grow`}
              placeholder="todomate@gmail.com"
              required
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 px-4">
          <span className="font-[Pretendard-Regular]">비밀번호<span className="text-red-500 text-sm"> 필수</span></span>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            value={inputVal.password}
            className={inputClassName}
            placeholder="4자리 이상의 비밀번호"
            required
          />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 px-4">
          <span className="font-[Pretendard-Regular]">비밀번호 재확인<span className="text-red-500 text-sm"> 필수</span></span>
          <input
            name="passwordVerify"
            type="password"
            onChange={handleChange}
            value={inputVal.passwordVerify}
            className={inputClassName}
            placeholder="같은 비밀번호를 입력해주세요"
            required
          />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 px-4 mb-4">
          <span className="font-[Pretendard-Regular]">이름<span className="text-red-500 text-sm"> 필수</span></span>
          <input
            name="name"
            type="text"
            value={inputVal.name}
            onChange={handleChange}
            className={inputClassName}
            placeholder="홍길동"
            required
          />
        </div>
        <div className="space-x-16 font-[Pretendard-Regular] mt-4">
          <button
            className="bg-black text-white text-sm rounded-lg px-6 py-2 font-[Pretendard-Regular]"
            onClick={handleClickRegister}
          >
            확인
          </button>
        </div>
      </div>
    </BasicLayout>
  );
};

export default SignupPage;
