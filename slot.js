const slot1 = document.getElementById('slot1');
const slot2 = document.getElementById('slot2');
const slot3 = document.getElementById('slot3');
const slots = [slot1, slot2, slot3];
const symbol = ['🌰','🍁','📖','🎨','🍠','🎃','🐟','🍇','🏃','💤','🎑'];

let slotTimers = [null, null, null];
let isSpinning = [false, false, false]; 
let currentLevel = 1; // 初期はレベル1

document.querySelectorAll("#level-buttons button").forEach(button => {
  button.addEventListener("click", (e) => {
    currentLevel = parseInt(e.target.getAttribute("data-level"));
    document.getElementById('result').textContent = "レベル " + currentLevel + " が選ばれました！";
    document.getElementById('level-status').textContent = "<< 現在レベル" + currentLevel + "を選択中です >>";
  });
});

function getSymbolsByLevel(level) {
  if (level === 1) {
    return ['🌰','🍁','📖','🎨','🍠','🎃']; 
  } else if (level === 2) {
    return ['🌰','🍁','📖','🎨','🍠','🎃','🍇','🏃']; 
  } else {
    return ['🌰','🍁','📖','🎨','🍠','🎃','🍇','🏃','💤','🎑'];
  }
}


function getSpeedByLevel(level) {
  if (level === 1) return 500;   // ゆっくり
  if (level === 2) return 490;   // ふつう
  return 480;                    // そこそこ速い
}



// スロットを開始する関数
function startSlot() {
    document.getElementById('result').textContent = ''; 

    const symbols = getSymbolsByLevel(currentLevel);
    const speed = getSpeedByLevel(currentLevel);

    for (let i = 0; i < slots.length; i++) {
        if (!isSpinning[i]) {
            isSpinning[i] = true;
            slotTimers[i] = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * symbols.length);
                slots[i].textContent = symbols[randomIndex];
            }, speed);
        }
    }
}



// スロットを停止する関数（リールごと）
function stopSlot(reelIndex) {
    if (isSpinning[reelIndex]) {
        clearInterval(slotTimers[reelIndex]);
        isSpinning[reelIndex] = false;

        // 全てのリールが停止したら結果を判定
        if (!isSpinning.includes(true)) {
            checkResult();
        }
    }
}

// 結果の判定関数
function checkResult() { 
    const result = slots.map(slot => slot.textContent);

    if (result[0] === result[1] && result[1] === result[2]) {
        document.getElementById('result').textContent = 'おめでとう！絵柄が揃いました！';
        showPopup(result[0]); // ←揃ったときにポップアップを出す
    } else if (
        (result[0] === result[1] && result[0] !== result[2]) ||
        (result[0] === result[2] && result[0] !== result[1]) ||
        (result[1] === result[2] && result[1] !== result[0])
    ) {
        document.getElementById('result').textContent = '惜しい！もう一度チャレンジしよう！';
    } else {
        document.getElementById('result').textContent = '残念！もう一度チャレンジしよう！';
    }
}

function showPopup(symbol) {
  const popup = document.getElementById("popup");
  const img = popup.querySelector("img");
  const message = popup.querySelector("p");

  if (symbol === "🌰") {
    img.src = "img/chestnut.png"; 
    message.textContent = "収穫の秋！栗拾いに行こう！";
  } else if (symbol === "🍁") {
    img.src = "img/maple.png"; 
    message.textContent = "紅葉の秋！お散歩に行こう！";
  } else if (symbol === "📖") {
    img.src = "img/book.png"; 
    message.textContent = "読書の秋！お気に入りの本を読もう！";
  } else if (symbol === "🎨") {
    img.src = "img/art.png"; 
    message.textContent = "芸術の秋！絵を描いてみよう！";
  } else if (symbol === "🍠") {
    img.src = "img/yakiimo.png"; 
    message.textContent = "食欲の秋！甘い焼き芋はいかが？";
  } else if (symbol === "🎃") {
    img.src = "img/pumpkin.png";
    message.textContent = "ハロウィン気分！トリックオアトリート！";
  }else if (symbol === "🍇") {
    img.src = "img/grape.png";
    message.textContent = "実りの秋！ぶどう狩りに行こう！";
  }else if (symbol === "🏃") {
    img.src = "img/run.png";
    message.textContent = "スポーツの秋！からだを動かそう！";
  }else if (symbol === "💤") {
    img.src = "img/sleep.png";
    message.textContent = "睡眠の秋！たくさん寝よう！";
  }else if (symbol === "🎑") {
    img.src = "img/natsume_souseki.png";
    message.textContent = "月が綺麗ですね。お月見しませんか？";
  }
  popup.classList.add("show"); // 表示


// Xへのシェア機能

const shareBtn = popup.querySelector("#shareButton");
  if (shareBtn) {
    shareBtn.onclick = () => shareOnX(currentLevel, symbol, message);
  }

// X共有用関数
function shareOnX(level, symbol, message) {
const text = message.textContent;
const appURL = "https://raira51.github.io/app00_mini/";
const tweetText = `【Lv${level}クリア】${symbol} ${text} \n ${appURL}`;
const encodedText = encodeURIComponent(tweetText);
const url = `https://twitter.com/intent/tweet?text=${encodedText}`;
window.open(url, "_blank");
}
}
function closePopup() {
  const popup = document.getElementById("popup");
  popup.classList.remove("show");
}

// ボタンにイベントを追加
document.getElementById('startButton').addEventListener('click', startSlot);
document.getElementById('stopButton1').addEventListener('click', () => stopSlot(0));
document.getElementById('stopButton2').addEventListener('click', () => stopSlot(1));
document.getElementById('stopButton3').addEventListener('click', () => stopSlot(2));
