const userIdInput = document.getElementById('user-id');
const userEmailInput = document.getElementById('user-email');
const recoveryButton = document.getElementById('recovery-button');
const errorMessage = document.getElementById('error-message');

userIdInput.addEventListener('input', toggleButtonState);
userEmailInput.addEventListener('input', toggleButtonState);

function toggleButtonState() {
  const userId = userIdInput.value.trim();
  const userEmail = userEmailInput.value.trim();

  recoveryButton.disabled = !(userId && userEmail);
}

recoveryButton.addEventListener('click', async () => {
  const userId = userIdInput.value.trim();
  const userEmail = userEmailInput.value.trim();

  if (!validateEmail(userEmail)) {
    showMessage('유효한 이메일을 입력하세요.', 'red');
    return;
  }

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
      userIdInput.value = '';
      userEmailInput.value = '';
      toggleButtonState();
    } else {
      showMessage(data.message || '에러가 발생했습니다.', 'red');
    }
  } catch (error) {
    showMessage('서버에 연결할 수 없습니다.', 'red');
  }
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function showMessage(msg, color) {
  errorMessage.textContent = msg;
  errorMessage.style.color = color;
  errorMessage.style.display = 'block';
}
