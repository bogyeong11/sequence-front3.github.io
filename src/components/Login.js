import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/global.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await fetch('https://sequence.agong.store/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.token) {
        localStorage.setItem('token', result.token);
        alert('로그인 성공!');
        navigate('/');
      } else {
        setErrorMessage(result.message || '로그인 실패. 아이디 또는 비밀번호를 확인해주세요.');
      }
    } catch (error) {
      setErrorMessage('서버 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="login-container">
      <Navbar />
      <section className="auth-container">
        <div className="login-logo">
          <img src="../images/basic-logo.png" alt="Logo" />
        </div>

        <h1>Login</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="email"
              placeholder="아이디를 입력해주세요."
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요."
              onChange={handleChange}
              required
            />
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <div className="login-links">
            <a href="/find-id">아이디찾기 &gt;</a>
            <a href="/find-password">비밀번호 찾기 &gt;</a>
          </div>

          <button type="submit" className="login-button">로그인</button>
        </form>

        <button className="signup-button" onClick={() => navigate('/signup')}>
          회원가입하기 <span className="arrow-icon">→</span>
        </button>
      </section>
    </div>
  );
};

export default Login;
