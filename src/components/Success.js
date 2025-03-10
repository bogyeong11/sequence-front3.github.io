import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/global.css';

const Success = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <section className="signup-success">
        <h1>회원가입이 완료되었습니다!</h1>
        <button className="auth-button" onClick={() => navigate('/')}>
          시작하기 →
        </button>
      </section>
    </div>
  );
};

export default Success;
