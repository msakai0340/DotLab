const brailleToKana = {
  "1": "あ", "12": "い", "14": "う", "124": "え", "24": "お",

  "16": "か", "126": "き", "146": "く", "1246": "け", "246": "こ",

  "156": "さ", "1256": "し", "1456": "す", "12456": "せ", "2456": "そ",

  "135": "た", "1235": "ち", "1345": "つ", "12345": "て", "2345": "と",

  "13": "な", "123": "に", "134": "ぬ", "1234": "ね", "234": "の",

  "136": "は", "1236": "ひ", "1346": "ふ", "12346": "へ", "2346": "ほ",

  "1356": "ま", "12356": "み", "13456": "む", "123456": "め", "23456": "も",

  "34": "や", "346": "ゆ", "345": "よ",

  "15": "ら", "125": "り", "145": "る", "1245": "れ", "245": "ろ",

  "3": "わ", "35": "を", "356": "ん",

  "56": "、",
  "256": "。",
  "26": "？",
  "235": "！",
  "25": "ー"
};

const kanaToBraille = Object.fromEntries(
  Object.entries(brailleToKana).map(([dots, kana]) => [kana, dots])
);

/* 濁音 */
const dakutenMap = {
  "か": "が", "き": "ぎ", "く": "ぐ", "け": "げ", "こ": "ご",
  "さ": "ざ", "し": "じ", "す": "ず", "せ": "ぜ", "そ": "ぞ",
  "た": "だ", "ち": "ぢ", "つ": "づ", "て": "で", "と": "ど",
  "は": "ば", "ひ": "び", "ふ": "ぶ", "へ": "べ", "ほ": "ぼ"
};

/* 半濁音 */
const handakutenMap = {
  "は": "ぱ", "ひ": "ぴ", "ふ": "ぷ", "へ": "ぺ", "ほ": "ぽ"
};

/* 拗音 */
const youonMap = {
  "きゃ": "き", "きゅ": "く", "きょ": "こ",
  "しゃ": "さ", "しゅ": "す", "しょ": "そ",
  "ちゃ": "た", "ちゅ": "つ", "ちょ": "と",
  "にゃ": "な", "にゅ": "ぬ", "にょ": "の",
  "ひゃ": "は", "ひゅ": "ふ", "ひょ": "ほ",
  "みゃ": "ま", "みゅ": "む", "みょ": "も",
  "りゃ": "ら", "りゅ": "る", "りょ": "ろ"
};

/* 濁音拗音 */
const dakuYouonMap = {
  "ぎゃ": "き", "ぎゅ": "く", "ぎょ": "こ",
  "じゃ": "さ", "じゅ": "す", "じょ": "そ",
  "びゃ": "は", "びゅ": "ふ", "びょ": "ほ"
};

/* 半濁拗音 */
const handakuYouonMap = {
  "ぴゃ": "は", "ぴゅ": "ふ", "ぴょ": "ほ"
};

const voicedKanaToBase = Object.fromEntries(
  Object.entries(dakutenMap).map(([base, voiced]) => [voiced, base])
);

const handakutenKanaToBase = Object.fromEntries(
  Object.entries(handakutenMap).map(([base, semi]) => [semi, base])
);

function normalizeDots(dots) {
  return dots.split("").sort().join("");
}

/* 点字数字 → ひらがな */
function liveBrailleConvert() {
  const input = document.getElementById("brailleNumberInput").value;
  const resultBox = document.getElementById("brailleNumberResult");

  const cells = input.trim().split(/\s+/);

  let result = "";
  let mode = "";

  for (let cell of cells) {
    if (cell === "") continue;

    const key = normalizeDots(cell);

    if (key === "4") {
      mode = "youon";
      continue;
    }

    if (key === "5") {
      mode = mode === "youon" ? "dakuYouon" : "dakuten";
      continue;
    }

    if (key === "6") {
      mode = mode === "youon" ? "handakuYouon" : "handakuten";
      continue;
    }

    let kana = brailleToKana[key] || "？";

    if (mode === "dakuten") {
      kana = dakutenMap[kana] || "？";
    }

    else if (mode === "handakuten") {
      kana = handakutenMap[kana] || "？";
    }

    else if (mode === "youon") {
      kana = Object.keys(youonMap).find(k => youonMap[k] === kana) || "？";
    }

    else if (mode === "dakuYouon") {
      kana = Object.keys(dakuYouonMap).find(k => dakuYouonMap[k] === kana) || "？";
    }

    else if (mode === "handakuYouon") {
      kana = Object.keys(handakuYouonMap).find(k => handakuYouonMap[k] === kana) || "？";
    }

    result += kana;
    mode = "";
  }

  resultBox.textContent = result;
}

function clearBrailleInput() {
  document.getElementById("brailleNumberInput").value = "";
  document.getElementById("brailleNumberResult").textContent = "";
}

/* ひらがな1文字・拗音などを点字数字に変換 */
function convertKanaToDots(input) {
  const result = [];

  for (let i = 0; i < input.length; i++) {
    const twoChars = input.slice(i, i + 2);

    if (dakuYouonMap[twoChars]) {
      result.push({
        kana: twoChars,
        dots: ["4", "5", kanaToBraille[dakuYouonMap[twoChars]]]
      });
      i++;
      continue;
    }

    if (handakuYouonMap[twoChars]) {
      result.push({
        kana: twoChars,
        dots: ["4", "6", kanaToBraille[handakuYouonMap[twoChars]]]
      });
      i++;
      continue;
    }

    if (youonMap[twoChars]) {
      result.push({
        kana: twoChars,
        dots: ["4", kanaToBraille[youonMap[twoChars]]]
      });
      i++;
      continue;
    }

    const char = input[i];

    if (voicedKanaToBase[char]) {
      result.push({
        kana: char,
        dots: ["5", kanaToBraille[voicedKanaToBase[char]]]
      });
    }

    else if (handakutenKanaToBase[char]) {
      result.push({
        kana: char,
        dots: ["6", kanaToBraille[handakutenKanaToBase[char]]]
      });
    }

    else if (kanaToBraille[char]) {
      result.push({
        kana: char,
        dots: [kanaToBraille[char]]
      });
    }

    else {
      result.push({
        kana: char,
        dots: ["？"]
      });
    }
  }

  return result;
}

/* ひらがな → 点字数字 */
function hiraganaToBrailleNumber() {
  const input = document.getElementById("hiraganaInput").value.trim();
  const resultBox = document.getElementById("brailleNumberResult2");

  if (input === "") {
    resultBox.textContent = "入力してください";
    return;
  }

  const converted = convertKanaToDots(input);

  resultBox.innerHTML = "";

  converted.forEach(item => {
    const span = document.createElement("span");
    span.className = "number-token";
    span.textContent = item.dots.join(" ");
    resultBox.appendChild(span);
  });
}

/* 点字マスHTML */
function makeDotGrid(dots) {
  if (dots === "？") {
    return "？";
  }

  const activeDots = dots.split("");
  const positions = ["1", "4", "2", "5", "3", "6"];

  let html = '<div class="result-dot-grid">';

  for (let num of positions) {
    if (activeDots.includes(num)) {
      html += '<span class="result-dot active"></span>';
    } else {
      html += '<span class="result-dot"></span>';
    }
  }

  html += '</div>';

  return html;
}

/* 複数マスを1つの文字のまとまりとして表示 */
function makeDotGroup(dotArray) {
  let html = '<div class="result-dot-group">';

  dotArray.forEach(dots => {
    html += makeDotGrid(dots);
  });

  html += '</div>';

  return html;
}

/* ひらがな → 表で表示 */
function hiraganaToRealBraille() {
  const input = document.getElementById("hiraganaBrailleInput").value.trim();
  const box = document.getElementById("realBrailleResult");

  if (input === "") {
    box.textContent = "入力してください";
    return;
  }

  const converted = convertKanaToDots(input);

  let html = '';

  html += '<div class="result-table-wrap">';
  html += '<table class="result-table">';

  html += '<tr>';
  html += '<th>ひらがな</th>';
  converted.forEach(item => {
    html += `<td>${item.kana}</td>`;
  });
  html += '</tr>';

  html += '<tr>';
  html += '<th>点字数字</th>';
  converted.forEach(item => {
    html += `<td>${item.dots.join(" ")}</td>`;
  });
  html += '</tr>';

  html += '<tr>';
  html += '<th>点字の形</th>';
  converted.forEach(item => {
    html += `<td>${makeDotGroup(item.dots)}</td>`;
  });
  html += '</tr>';

  html += '</table>';
  html += '</div>';

  box.innerHTML = html;
}