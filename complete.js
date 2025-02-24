// ✅ 이메일 정보 가져오기 (localhost:3000에서 요청)
document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId');  // URL에서 userId 가져오기
    const emailBox = document.getElementById('user-email-box');

    if (!userId) {
        showMessage('사용자 정보가 없습니다.', 'red');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/get-email?userId=${userId}`);

        if (!response.ok) {
            throw new Error('사용자 정보를 가져오지 못했습니다.');
        }

        const data = await response.json();
        emailBox.textContent = data.email || '이메일 정보 없음';
    } catch (error) {
        console.error('에러:', error);
        emailBox.textContent = '이메일 정보를 가져오는 데 실패했습니다.';
    }

    // ✅ 로그인 버튼 이벤트
    const loginButton = document.getElementById('login-btn');
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            window.location.href = 'login.html'; // 로그인 페이지 경로
        });
    } else {
        console.error('로그인 버튼을 찾을 수 없습니다.');
    }

    // ✅ 아이디 찾기 버튼 이벤트
    const findIdButton = document.getElementById('find-id-btn');
    if (findIdButton) {
        findIdButton.addEventListener('click', () => {
            window.location.href = 'find-id.html'; // 아이디 찾기 페이지 경로
        });
    } else {
        console.error('아이디 찾기 버튼을 찾을 수 없습니다.');
    }
});

// 메시지 표시 함수
function showMessage(msg, color) {
    const emailBox = document.getElementById('user-email-box');
    emailBox.textContent = msg;
    emailBox.style.color = color;
}
