import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/global.css';

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    nickname: '',
    birth: '',
    gender: 'M',
    address: '',
    phone: '',
    email: '',
    introduction: '',
    portfolio: '',
    schoolName: '',
    major: '',
    grade: '',
    entranceDate: '',
    graduationDate: '',
    degree: '',
    skillCategory: [],
    desiredJob: [],
    experiences: [],
    careers: [],
    awards: [],
    profileImage: null
  });
  const [nicknameMessage, setNicknameMessage] = useState('');
const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);


  const handleChange = (e) => {
    if (e.target.name === 'profileImage') {
      setFormData({ ...formData, profileImage: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleNicknameCheck = async () => {
    if (!formData.nickname.trim()) {
      setNicknameMessage('닉네임을 입력해주세요.');
      setIsNicknameAvailable(false);
      return;
    }
  
    try {
      console.log('닉네임 중복 확인 요청:', formData.nickname); // ✅ 요청 전에 콘솔 출력
  
      const response = await fetch(`https://sequence.agong.store/api/users/check_username`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: formData.nickname }), // ✅ 변경된 요청 방식: JSON 본문에 username 전달
      });
  
      console.log('API 응답 상태 코드:', response.status); // ✅ 응답 상태 코드 확인
      const result = await response.json();
      console.log('닉네임 중복 확인 응답:', result); // ✅ API 응답 데이터 확인
  
      if (result.available) {
        setNicknameMessage('사용 가능한 닉네임입니다.');
        setIsNicknameAvailable(true);
      } else {
        setNicknameMessage('이미 사용 중인 닉네임입니다.');
        setIsNicknameAvailable(false);
      }
    } catch (error) {
      console.error('닉네임 중복 확인 오류:', error);
      setNicknameMessage('서버 오류가 발생했습니다. 다시 시도해주세요.');
      setIsNicknameAvailable(false);
    }
  };
  
  

  

  const handleNextStep = () => {
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // ✅ FormData 객체 생성
    const data = new FormData();
    data.append(
      'memberDTO',
      JSON.stringify(formData)
    );
    if (formData.profileImage) {
      data.append('authImgFile', formData.profileImage);
    }
    const response = await fetch('https://sequence.agong.store/api/users/join', {
      method: 'POST',
      body: data
    });
    const result = await response.json();
    alert(result.message);
    if (result.message === '회원가입 성공!') {
      navigate('/signup-success');
    }
    const addExperience = () => {
        setFormData({
          ...formData,
          experiences: [...formData.experiences, { experienceType: "", experienceName: "" }]
        });
      };
      
      const addCareer = () => {
        setFormData({
          ...formData,
          careers: [...formData.careers, { companyName: "" }]
        });
      };
      
      const addAward = () => {
        setFormData({
          ...formData,
          awards: [...formData.awards, { awardType: "", awardName: "" }]
        });
      };      
  };

  return (
    <div>
      <Navbar />
      <section className="signup-container">
        <h1>회원가입</h1>
        <h2>{step === 1 ? '1/2' : '2/2'}</h2>
        {step === 1 ? (
          <form className="signup-form">
            <div className="form-group">
              <label>이름</label>
              <input type="text" name="name" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>생년월일</label>
              <input type="date" name="birth" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>성별</label>
              <select name="gender" onChange={handleChange}>
                <option value="M">남성</option>
                <option value="F">여성</option>
              </select>
            </div>
            <div className="form-group">
              <label>휴대전화 번호</label>
              <input type="text" name="phone" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>이메일</label>
              <input type="email" name="email" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>주소</label>
              <input type="text" name="address" onChange={handleChange} required />
            </div>
            <button type="button" className="auth-button" onClick={handleNextStep}>다음</button>
          </form>
        ) : (
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="profile-section">
              <h2>프로필 *</h2>
              <div className="profile-container">
                <div className="profile-image-upload">
                  <label htmlFor="profileImage" className="profile-upload-box">
                    {formData.profileImage ? (
                      <img src={URL.createObjectURL(formData.profileImage)} alt="프로필 사진" />
                    ) : (
                      <span className="upload-icon">+</span>
                    )}
                  </label>
                  <input type="file" id="profileImage" name="profileImage" accept="image/*" onChange={handleChange} hidden />
                </div>
                <div className="form-group nickname-group">
  <label>별명</label>
  <div className="nickname-input-container">
    <input
      type="text"
      name="nickname"
      placeholder="사용할 별명을 입력해주세요."
      value={formData.nickname}
      onChange={handleChange}
      maxLength={10}
    />
    <button type="button" className="duplicate-check" onClick={handleNicknameCheck}>
      중복확인
    </button>
  </div>
  <p className={`nickname-message ${isNicknameAvailable ? 'success' : 'error'}`}>{nicknameMessage}</p>
</div>

              </div>
            </div>
            <div className="education-section">
              <h2>학력 *</h2>
              <div className="education-container">
                <input type="text" name="schoolName" placeholder="학교명을 입력해주세요" value={formData.schoolName} onChange={handleChange} />
                <input type="text" name="major" placeholder="전공명을 입력해주세요" value={formData.major} onChange={handleChange} />
                <select name="grade" value={formData.grade} onChange={handleChange}>
                  <option value="">학년 선택</option>
                  <option value="1학년">1학년</option>
                  <option value="2학년">2학년</option>
                  <option value="3학년">3학년</option>
                  <option value="4학년">4학년</option>
                </select>
              </div>
            </div>
            {/* 🔴 스킬 선택 */}
<div className="skill-section">
  <h2>스킬 <span className="required">*</span></h2>
  <div className="skill-container">
    {["Adobe Illustration", "Adobe Photoshop", "Adobe Indesign", "JavaScript", "TypeScript", "Figma",
      "Adobe Premiere Pro", "Adobe XD", "Adobe After Effect", "Adobe Lightroom", "Cinema 4D", "ProtoPie", "Blender"]
      .map(skill => (
        <button
          type="button"
          key={skill}
          className={`skill-button ${formData.skillCategory.includes(skill) ? "selected" : ""}`}
          onClick={() => {
            setFormData(prev => ({
              ...prev,
              skillCategory: prev.skillCategory.includes(skill)
                ? prev.skillCategory.filter(s => s !== skill)
                : [...prev.skillCategory, skill]
            }));
          }}
        >
          {skill}
        </button>
      ))}
  </div>
</div>

{/* 🔴 희망 역할 */}
<div className="desired-job-section">
  <h2>희망 역할 <span className="required">*</span></h2>
  <div className="desired-job-container">
    {["UX/UI Design", "BX Design", "Front-end", "Back-end", "PM"]
      .map(job => (
        <button
          type="button"
          key={job}
          className={`desired-job-button ${formData.desiredJob.includes(job) ? "selected" : ""}`}
          onClick={() => {
            setFormData(prev => ({
              ...prev,
              desiredJob: prev.desiredJob.includes(job)
                ? prev.desiredJob.filter(j => j !== job)
                : [...prev.desiredJob, job]
            }));
          }}
        >
          {job}
        </button>
      ))}
  </div>
</div>

{/* 🔴 경험 및 활동 추가 섹션 */}
<div className="experience-section">
  <h2>경험 및 활동이력</h2>
  {formData.experiences.map((exp, index) => (
    <div key={index} className="experience-container">
      <select name="experienceType" value={exp.experienceType} onChange={(e) => handleExperienceChange(e, index)}>
        <option value="">유형 선택</option>
        <option value="EXTERNAL_ACTIVITY">대외활동</option>
        <option value="CLUB">동아리</option>
      </select>
      <input type="text" name="experienceName" placeholder="활동명을 입력해주세요." value={exp.experienceName} onChange={(e) => handleExperienceChange(e, index)} />
      <button type="button" className="add-button" onClick={addExperience}>+</button>
    </div>
  ))}
</div>

{/* 🔴 경력 섹션 */}
<div className="career-section">
  <h2>경력</h2>
  {formData.careers.map((career, index) => (
    <div key={index} className="career-container">
      <input type="text" name="companyName" placeholder="회사명을 입력하세요." value={career.companyName} onChange={(e) => handleCareerChange(e, index)} />
      <button type="button" className="add-button" onClick={addCareer}>+</button>
    </div>
  ))}
</div>

{/* 🔴 자격 및 수상 섹션 */}
<div className="award-section">
  <h2>자격 및 수상</h2>
  {formData.awards.map((award, index) => (
    <div key={index} className="award-container">
      <select name="awardType" value={award.awardType} onChange={(e) => handleAwardChange(e, index)}>
        <option value="">유형 선택</option>
        <option value="CERTIFICATE">자격증</option>
        <option value="AWARD">수상</option>
      </select>
      <input type="text" name="awardName" placeholder="자격증 또는 수상명을 입력하세요." value={award.awardName} onChange={(e) => handleAwardChange(e, index)} />
      <button type="button" className="add-button" onClick={addAward}>+</button>
    </div>
  ))}
</div>

{/* 🔴 포트폴리오 섹션 */}
<div className="portfolio-section">
  <h2>포트폴리오</h2>
  <input type="file" id="portfolioFile" hidden />
  <label htmlFor="portfolioFile">포트폴리오 업로드 또는 URL 입력</label>
</div>

{/* 🔴 자기소개 */}
<div className="introduction-section">
  <h2>자기소개</h2>
  <textarea
    name="introduction"
    placeholder="팀원을 모집할 때 참고할 자기소개를 500자 이내로 적어주세요!"
    maxLength={500}
    value={formData.introduction}
    onChange={handleChange}
  />
  <span className="char-count">{formData.introduction.length}/500</span>
</div>


            
            <button type="submit" className="signup-button">회원가입</button>
          </form>
        )}
      </section>
    </div>
  );
};

export default Signup;
