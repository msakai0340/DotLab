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

const dotsToBrailleChar = {
  "1": "⠁", "12": "⠃", "14": "⠉", "124": "⠋", "24": "⠊",

  "16": "⠡", "126": "⠣", "146": "⠩", "1246": "⠫", "246": "⠪",

  "156": "⠱", "1256": "⠳", "1456": "⠹", "12456": "⠻", "2456": "⠺",

  "135": "⠕", "1235": "⠗", "1345": "⠝", "12345": "⠟", "2345": "⠞",

  "13": "⠅", "123": "⠇", "134": "⠍", "1234": "⠏", "234": "⠎",

  "136": "⠥", "1236": "⠧", "1346": "⠭", "12346": "⠯", "2346": "⠮",

  "1356": "⠵", "12356": "⠷", "13456": "⠽", "123456": "⠿", "23456": "⠾",

  "34": "⠌", "346": "⠬", "345": "⠜",

  "15": "⠑", "125": "⠓", "145": "⠙", "1245": "⠛", "245": "⠚",

  "3": "⠄", "35": "⠔", "356": "⠴",

  "56": "、",
  "256": "。",
  "26": "？",
  "235": "！",

  "4": "⠈",
  "5": "⠐",
  "6": "⠠",

  "25": "⠒"
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
  "きゃ": "き",
  "きゅ": "く",
  "きょ": "こ",

  "しゃ": "さ",
  "しゅ": "す",
  "しょ": "そ",

  "ちゃ": "た",
  "ちゅ": "つ",
  "ちょ": "と",

  "にゃ": "な",
  "にゅ": "ぬ",
  "にょ": "の",

  "ひゃ": "は",
  "ひゅ": "ふ",
  "ひょ": "ほ",

  "みゃ": "ま",
  "みゅ": "む",
  "みょ": "も",

  "りゃ": "ら",
  "りゅ": "る",
  "りょ": "ろ"
};

/* 濁音拗音 */
const dakuYouonMap = {
  "ぎゃ": "き",
  "ぎゅ": "く",
  "ぎょ": "こ",

  "じゃ": "さ",
  "じゅ": "す",
  "じょ": "そ",

  "びゃ": "は",
  "びゅ": "ふ",
  "びょ": "ほ"
};

/* 半濁拗音 */
const handakuYouonMap = {
  "ぴゃ": "は",
  "ぴゅ": "ふ",
  "ぴょ": "ほ"
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

function showTextOneByOne(elementId, text, speed = 70) {

  const box = document.getElementById(elementId);

  if (!box) return;

  box.innerHTML = "";

  let i = 0;

  const timer = setInterval(() => {

    const span = document.createElement("span");

    span.className = "fade-letter";
    span.textContent = text[i];

    box.appendChild(span);

    i++;

    if (i >= text.length) {
      clearInterval(timer);
    }

  }, speed);
}

function showBrailleOneByOne(elementId, textArray, speed = 80) {

  const box = document.getElementById(elementId);

  if (!box) return;

  box.innerHTML = "";

  let i = 0;

  const timer = setInterval(() => {

    const span = document.createElement("span");

    span.className = "braille-cell";
    span.textContent = textArray[i];

    box.appendChild(span);

    i++;

    if (i >= textArray.length) {
      clearInterval(timer);
    }

  }, speed);
}

/* 点字数字 → ひらがな */
function liveBrailleConvert() {

  const input = document.getElementById("brailleNumberInput").value;

  const cells = input.split(/\s+/);

  let result = "";

  let mode = "";

  for (let cell of cells) {

    if (cell === "") continue;

    const key = normalizeDots(cell);

    /* 拗音 */
    if (key === "4") {
      mode = "youon";
      continue;
    }

    /* 濁音 */
    if (key === "5") {
      mode = mode === "youon" ? "dakuYouon" : "dakuten";
      continue;
    }

    /* 半濁音 */
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
      kana =
        Object.keys(youonMap).find(k => youonMap[k] === kana) || "？";
    }

    else if (mode === "dakuYouon") {
      kana =
        Object.keys(dakuYouonMap).find(k => dakuYouonMap[k] === kana) || "？";
    }

    else if (mode === "handakuYouon") {
      kana =
        Object.keys(handakuYouonMap).find(k => handakuYouonMap[k] === kana) || "？";
    }

    result += kana;

    mode = "";
  }

  document.getElementById("brailleNumberResult").textContent = result;
}

function clearBrailleInput() {

  document.getElementById("brailleNumberInput").value = "";

  document.getElementById("brailleNumberResult").textContent = "";
}

/* ひらがな → 点字数字 */
function hiraganaToBrailleNumber() {

  const input = document.getElementById("hiraganaInput").value.trim();

  if (input === "") {

    showTextOneByOne("brailleNumberResult2", "入力してください");

    return;
  }

  const result = [];

  for (let i = 0; i < input.length; i++) {

    const twoChars = input.slice(i, i + 2);

    /* 濁拗音 */
    if (dakuYouonMap[twoChars]) {

      result.push("4");
      result.push("5");
      result.push(kanaToBraille[dakuYouonMap[twoChars]]);

      i++;

      continue;
    }

    /* 半濁拗音 */
    if (handakuYouonMap[twoChars]) {

      result.push("4");
      result.push("6");
      result.push(kanaToBraille[handakuYouonMap[twoChars]]);

      i++;

      continue;
    }

    /* 拗音 */
    if (youonMap[twoChars]) {

      result.push("4");
      result.push(kanaToBraille[youonMap[twoChars]]);

      i++;

      continue;
    }

    const char = input[i];

    /* 濁音 */
    if (voicedKanaToBase[char]) {

      result.push("5");
      result.push(kanaToBraille[voicedKanaToBase[char]]);
    }

    /* 半濁音 */
    else if (handakutenKanaToBase[char]) {

      result.push("6");
      result.push(kanaToBraille[handakutenKanaToBase[char]]);
    }

    else if (kanaToBraille[char]) {

      result.push(kanaToBraille[char]);
    }

    else {

      result.push("？");
    }
  }

  showTextOneByOne("brailleNumberResult2", result.join(" "));
}

/* ひらがな → 点字 */
function hiraganaToRealBraille() {

  const input = document.getElementById("hiraganaBrailleInput").value.trim();

  if (input === "") {

    showTextOneByOne("realBrailleResult", "入力してください");

    return;
  }

  const result = [];

  for (let i = 0; i < input.length; i++) {

    const twoChars = input.slice(i, i + 2);

    /* 濁拗音 */
    if (dakuYouonMap[twoChars]) {

      result.push(dotsToBrailleChar["4"]);
      result.push(dotsToBrailleChar["5"]);
      result.push(dotsToBrailleChar[kanaToBraille[dakuYouonMap[twoChars]]]);

      i++;

      continue;
    }

    /* 半濁拗音 */
    if (handakuYouonMap[twoChars]) {

      result.push(dotsToBrailleChar["4"]);
      result.push(dotsToBrailleChar["6"]);
      result.push(dotsToBrailleChar[kanaToBraille[handakuYouonMap[twoChars]]]);

      i++;

      continue;
    }

    /* 拗音 */
    if (youonMap[twoChars]) {

      result.push(dotsToBrailleChar["4"]);
      result.push(dotsToBrailleChar[kanaToBraille[youonMap[twoChars]]]);

      i++;

      continue;
    }

    const char = input[i];

    /* 濁音 */
    if (voicedKanaToBase[char]) {

      result.push(dotsToBrailleChar["5"]);
      result.push(dotsToBrailleChar[kanaToBraille[voicedKanaToBase[char]]]);
    }

    /* 半濁音 */
    else if (handakutenKanaToBase[char]) {

      result.push(dotsToBrailleChar["6"]);
      result.push(dotsToBrailleChar[kanaToBraille[handakutenKanaToBase[char]]]);
    }

    else if (kanaToBraille[char]) {

      result.push(dotsToBrailleChar[kanaToBraille[char]]);
    }

    else {

      result.push("？");
    }
  }

  showBrailleOneByOne("realBrailleResult", result);
}
