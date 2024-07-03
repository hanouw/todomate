import React, { useState } from 'react';
import BasicLayout from '../layouts/BasicLayout';

const initState = {
  email: '',
  password: '',
  name: '',
  verify: '',
  passwordVerify: '',
};

const SignupPage = () => {
  const [inputVal, setInputVal] = useState({ ...initState });
  const [pwResult, setPwResult] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  const handleChange = (e) => {
    inputVal[e.target.name] = e.target.value;
    setInputVal({ ...inputVal });

    if (e.target.name == 'email') {
      validateEmail(e.target.value);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(email));
  };

  const passwordCheck = () => {
    console.log('passwordCheck', inputVal.password.length);
    if (inputVal.password.length < 4) {
      setPwResult(false);
      console.log(pwResult);
      alert('4자리 이상의 비밀번호를 입력해주세요.');
      return;
    }
    if (inputVal.password !== inputVal.passwordVerify) {
      alert('비밀번호가 일치하지 않습니다.');
      setPwResult(false);
    } else {
      setPwResult(true);
    }
  };

  const handleClickRegister = () => {
    passwordCheck();
    if (!pwResult) {
      return;
    }
    if (pwResult) {
      // register({
      // 	email: inputVal.email,
      // 	password: inputVal.password,
      // 	name: inputVal.name,
      // }).then((data) => {
      // 	console.log(data);
      // 	if (data.error) {
      // 		alert("회원가입을 실패하였습니다. 다시 시도해주세요.");
      // 	} else {
      // 		execLogin({ email: inputVal.email, password: inputVal.password });
      // 		removeCookie("emailVerify");
      // 		alert("회원가입을 성공하였습니다.");
      // 		moveToMain();
      // 	}
      // });
    }
  };

  const inputClassName =
    'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 font-[Pretendard-Regular]';

  return (
    <BasicLayout>
      <div className="font-[Pretendard-Bold] text-3xl grid place-items-center mt-12 mb-12">회원가입</div>
      <div className="w-full grid place-items-center gap-5">
        <div className="w-full sm:w-1/2 md:w-1/3 px-4">
          <span className="font-[Pretendard-Regular]">이메일 주소</span>
          <div className="flex">
            <input
              name="email"
              type="email"
              value={inputVal.email}
              onChange={handleChange}
              className={`${inputClassName} flex-grow`}
              placeholder="Befree@befree.com"
              required
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 px-4">
          <span className="font-[Pretendard-Regular]">비밀번호</span>
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
          <span className="font-[Pretendard-Regular]">비밀번호 재확인</span>
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
          <span className="font-[Pretendard-Regular]">이름</span>
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
