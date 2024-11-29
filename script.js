// 기본 설정
const canvas = document.getElementById('scratchCanvas');
const ctx = canvas.getContext('2d');
const resultText = document.getElementById('resultText');
const resetButton = document.getElementById('resetButton');

// 복권 당첨 여부 설정
const outcomes = ['꽝!', '당첨!'];
const winningOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];

// 결과 텍스트 미리 삽입
resultText.textContent = winningOutcome;

// 캔버스에 스크래치 레이어 채우기
ctx.fillStyle = 'gray';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// 긁는 부분 구현
let isDrawing = false;

canvas.addEventListener('mousedown', function () {
    isDrawing = true;
});

canvas.addEventListener('mouseup', function () {
    isDrawing = false;
});

canvas.addEventListener('mousemove', function (event) {
    if (isDrawing) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        ctx.globalCompositeOperation = 'destination-out'; // 긁힌 부분 지우기
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2, false);
        ctx.fill();
    }
});

// 긁을 때 텍스트를 노출시키는 방식으로 처리
canvas.addEventListener('mouseleave', function () {
    isDrawing = false;
});

canvas.addEventListener('mouseup', function () {
    // 긁으면 라벨이 사라지고 텍스트가 드러남
    resultText.style.zIndex = 1;
});

// 리셋 기능
resetButton.addEventListener('click', function () {
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    resultText.style.zIndex = -1; // 텍스트 다시 숨기기
    // 결과 텍스트를 새롭게 설정
    const newOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
    resultText.textContent = newOutcome;
});
