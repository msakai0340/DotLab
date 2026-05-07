const brailleToKana = {

  /* あ行 */
  "1": "あ", "12": "い", "14": "う", "124": "え", "24": "お",

  /* か行 */
  "16": "か", "126": "き", "146": "く", "1246": "け", "246": "こ",

  /* さ行 */
  "156": "さ", "1256": "し", "1456": "す", "12456": "せ", "2456": "そ",

  /* た行 */
  "135": "た", "1235": "ち", "1345": "つ", "12345": "て", "2345": "と",

  /* な行 */
  "13": "な", "123": "に", "134": "ぬ", "1234": "ね", "234": "の",

  /* は行 */
  "136": "は", "1236": "ひ", "1346": "ふ", "12346": "へ", "2346": "ほ",

  /* ま行 */
  "1356": "ま", "12356": "み", "13456": "む", "123456": "め", "23456": "も",

  /* や行 */
  "34": "や", "346": "ゆ", "345": "よ",

  /* ら行 */
  "15": "ら", "125": "り", "145": "る", "1245": "れ", "245": "ろ",

  /* わ行 */
  "3": "わ", "35": "を", "356": "ん",

  /* 句読点・記号 */
  "56": "、",
  "256": "。",
  "26": "？",
  "235": "！",
  "5": "・"
};

const dotsToBrailleChar = {

  /* あ行 */
  "1": "⠁", "12": "⠃", "14": "⠉", "124": "⠋", "24": "⠊",

  /* か行 */
  "16": "⠡", "126": "⠣", "146": "⠩", "1246": "⠫", "246": "⠪",

  /* さ行 */
  "156": "⠱", "1256": "⠳", "1456": "⠹", "12456": "⠻", "2456": "⠺",

  /* た行 */
  "135": "⠕", "1235": "⠗", "1345": "⠝", "12345": "⠟", "2345": "⠞",

  /* な行 */
  "13": "⠅", "123": "⠇", "134": "⠍", "1234": "⠏", "234": "⠎",

  /* は行 */
  "136": "⠥", "1236": "⠧", "1346": "⠭", "12346": "⠯", "2346": "⠮",

  /* ま行 */
  "1356": "⠵", "12356": "⠷", "13456": "⠽", "123456": "⠿", "23456": "⠾",

  /* や行 */
  "34": "⠌", "346": "⠬", "345": "⠜",

  /* ら行 */
  "15": "⠑", "125": "⠓", "145": "⠙", "1245": "⠛", "245": "⠚",

  /* わ行 */
  "3": "⠄", "35": "⠔", "356": "⠴",

  /* 記号 */
  "56": "、",
  "256": "。",
  "26": "？",
  "235": "！",
  "5": "・"
  

  /* モード記号 */
  "4": "⠈",
  "5": "⠐",
  "6": "⠠"
};

const kanaToBraille = Object.fromEntries(
  Object.entries(brailleToKana).map(([dots, kana]) => [kana, dots])
);

const dakutenMap = {
  "か": "が", "き": "ぎ", "く": "ぐ", "け": "げ", "こ": "ご",
  "さ": "ざ", "し": "じ", "す": "ず", "せ": "ぜ", "そ": "ぞ",
  "た": "だ", "ち": "ぢ", "つ": "づ", "て": "で", "と": "ど",
  "は": "ば", "ひ": "び", "ふ": "ぶ", "へ": "べ", "ほ": "ぼ"
};

const handakutenMap = {
  "は": "ぱ", "ひ": "ぴ", "ふ": "ぷ", "へ": "ぺ", "ほ": "ぽ"
};

const youonMap = {
  "か": "きゃ", "く": "きゅ", "こ": "きょ",
  "さ": "しゃ", "す": "しゅ", "そ": "しょ",
  "た": "ちゃ", "つ": "ちゅ", "と": "ちょ",
  "な": "にゃ", "ぬ": "にゅ", "の": "にょ",
  "は": "ひゃ", "ふ": "ひゅ", "ほ": "ひょ",
  "ま": "みゃ", "む": "みゅ", "も": "みょ",
  "ら": "りゃ", "る": "りゅ", "ろ": "りょ"
};

const dakuYouonMap = {
  "か": "ぎゃ", "く": "ぎゅ", "こ": "ぎょ",
  "さ": "じゃ", "す": "じゅ", "そ": "じょ",
  "た": "ぢゃ", "つ": "ぢゅ", "と": "ぢょ",
  "は": "びゃ", "ふ": "びゅ", "ほ": "びょ"
};

const handakuYouonMap = {
  "は": "ぴゃ", "ふ": "ぴゅ", "ほ": "ぴょ"
};

const voicedKanaToBase = Object.fromEntries(
  Object.entries(dakutenMap).map(([base, voiced]) => [voiced, base])
);

const handakutenKanaToBase = Object.fromEntries(
  Object.entries(handakutenMap).map(([base, semi]) => [semi, base])
);

const youonKanaToBase = Object.fromEntries(
  Object.entries(youonMap).map(([base, youon]) => [youon, base])
);

const dakuYouonKanaToBase = Object.fromEntries(
  Object.entries(dakuYouonMap).map(([base, youon]) => [youon, base])
);

const handakuYouonKanaToBase = Object.fromEntries(
  Object.entries(handakuYouonMap).map(([base, youon]) => [youon, base])
);

function normalizeDots(dots) {
  return dots.split("").sort().join("");
}

function convertDotsToKana() {

  const input = document.getElementById("dotsInput").value.trim();

  if (input === "") {
    document.getElementById("kanaResult").textContent = "入力してください";
    return;
  }

  const cells = input.split(/\s+/).map(normalizeDots);

  let result = "";
  let mode = null;

  for (let cell of cells) {

    if (cell === "4") {
      mode = "youon";
      continue;
    }

    if (cell === "5") {
      mode = mode === "youon" ? "dakuYouon" : "dakuten";
      continue;
    }

    if (cell === "6") {
      mode = mode === "youon" ? "handakuYouon" : "handakuten";
      continue;
    }

    let kana = brailleToKana[cell] || "？";

    if (mode === "dakuten") {
      kana = dakutenMap[kana] || "？";
    }
    else if (mode === "handakuten") {
      kana = handakutenMap[kana] || "？";
    }
    else if (mode === "youon") {
      kana = youonMap[kana] || "？";
    }
    else if (mode === "dakuYouon") {
      kana = dakuYouonMap[kana] || "？";
    }
    else if (mode === "handakuYouon") {
      kana = handakuYouonMap[kana] || "？";
    }

    result += kana;
    mode = null;
  }

  document.getElementById("kanaResult").textContent = result;
}

function convertKanaToDots() {

  const input = document.getElementById("kanaInput").value.trim();

  if (input === "") {
    document.getElementById("dotsResult").textContent = "入力してください";
    return;
  }

  const result = [];

  for (let i = 0; i < input.length; i++) {

    const twoChars = input.slice(i, i + 2);

    /* 濁拗音 */
    if (dakuYouonKanaToBase[twoChars]) {

      const baseKana = dakuYouonKanaToBase[twoChars];

      result.push(dotsToBrailleChar["4"]);
      result.push(dotsToBrailleChar["5"]);
      result.push(dotsToBrailleChar[kanaToBraille[baseKana]]);

      i++;
      continue;
    }

    /* 半濁拗音 */
    if (handakuYouonKanaToBase[twoChars]) {

      const baseKana = handakuYouonKanaToBase[twoChars];

      result.push(dotsToBrailleChar["4"]);
      result.push(dotsToBrailleChar["6"]);
      result.push(dotsToBrailleChar[kanaToBraille[baseKana]]);

      i++;
      continue;
    }

    /* 拗音 */
    if (youonKanaToBase[twoChars]) {

      const baseKana = youonKanaToBase[twoChars];

      result.push(dotsToBrailleChar["4"]);
      result.push(dotsToBrailleChar[kanaToBraille[baseKana]]);

      i++;
      continue;
    }

    const char = input[i];

    /* 濁音 */
    if (voicedKanaToBase[char]) {

      const baseKana = voicedKanaToBase[char];

      result.push(dotsToBrailleChar["5"]);
      result.push(dotsToBrailleChar[kanaToBraille[baseKana]]);
    }

    /* 半濁音 */
    else if (handakutenKanaToBase[char]) {

      const baseKana = handakutenKanaToBase[char];

      result.push(dotsToBrailleChar["6"]);
      result.push(dotsToBrailleChar[kanaToBraille[baseKana]]);
    }

    /* 通常文字・句読点 */
    else if (kanaToBraille[char]) {

      result.push(dotsToBrailleChar[kanaToBraille[char]]);
    }

    else {

      result.push("？");
    }
  }

  document.getElementById("dotsResult").textContent =
    result.join("");
}
