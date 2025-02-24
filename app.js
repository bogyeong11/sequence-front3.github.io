// 요소 참조
const userIdInput = document.getElementById('user-id');
const userEmailInput = document.getElementById('user-email');
const recoveryButton = document.getElementById('recovery-button');
const errorMessage = document.getElementById('error-message');

// 입력 필드에 이벤트 리스너 추가
userIdInput.addEventListener('input', toggleButtonState);
userEmailInput.addEventListener('input', toggleButtonState);

// 버튼 활성화/비활성화 로직
function toggleButtonState() {
  const userId = userIdInput.value.trim();
  const userEmail = userEmailInput.value.trim();

  // 아이디와 이메일이 모두 입력되었을 때 버튼 활성화
  recoveryButton.disabled = !(userId && userEmail);
}

// 버튼 클릭 이벤트 리스너
recoveryButton.addEventListener('click', async () => {
  const userId = userIdInput.value.trim();
  const userEmail = userEmailInput.value.trim();

  // 간단한 유효성 검사
  if (!validateEmail(userEmail)) {
    showMessage('유효한 이메일을 입력하세요.', 'red');
    return;
  }

  // API 호출
  try {
    const response = await fetch('http://localhost:3000/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, email: userEmail })
    });

    const data = await response.json();

    if (response.ok) {
      showMessage(data.message || '임시 비밀번호가 발급되었습니다.', 'green');
      // 입력 필드 초기화
      userIdInput.value = '';
      userEmailInput.value = '';
      toggleButtonState();
    } else {
      // 백엔드에서 보낸 에러 메시지를 표시
      showMessage(data.message || '에러가 발생했습니다.', 'red');
    }
  } catch (error) {
    showMessage('서버에 연결할 수 없습니다.', 'red');
  }
});

// 이메일 유효성 검사
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// 메시지 표시 함수
function showMessage(msg, color) {
  errorMessage.textContent = msg;
  errorMessage.style.color = color;
  errorMessage.style.display = 'block';
}
