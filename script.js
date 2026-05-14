/* =========================
   点字 → かな
========================= */

const brailleToKana = {

  "1": "あ",
  "12": "い",
  "14": "う",
  "124": "え",
  "24": "お",

  "16": "か",
  "126": "き",
  "146": "く",
  "1246": "け",
  "246": "こ",

  "156": "さ",
  "1256": "し",
  "1456": "す",
  "12456": "せ",
  "2456": "そ",

  "135": "た",
  "1235": "ち",
  "1345": "つ",
  "12345": "て",
  "2345": "と",

  "13": "な",
  "123": "に",
  "134": "ぬ",
  "1234": "ね",
  "234": "の",

  "136": "は",
  "1236": "ひ",
  "1346": "ふ",
  "12346": "へ",
  "2346": "ほ",

  "1356": "ま",
  "12356": "み",
  "13456": "む",
  "123456": "め",
  "23456": "も",

  "34": "や",
  "346": "ゆ",
  "345": "よ",

  "15": "ら",
  "125": "り",
  "145": "る",
  "1245": "れ",
  "245": "ろ",

  "3": "わ",
  "35": "を",
  "356": "ん",

  /* 記号 */
  "56": "、",
  "256": "。",
  "26": "？",
  "235": "！",
  "25": "ー"
};

/* =========================
   点字 → 実際の点字
========================= */

const dotsToBrailleChar = {

  "1": "⠁",
  "12": "⠃",
  "14": "⠉",
  "124": "⠋",
  "24": "⠊",

  "16": "⠡",
  "126": "⠣",
  "146": "⠩",
  "1246": "⠫",
  "246": "⠪",

  "156": "⠱",
  "1256": "⠳",
  "1456": "⠹",
  "12456": "⠻",
  "2456": "⠺",

  "135": "⠕",
  "1235": "⠗",
  "1345": "⠝",
  "12345": "⠟",
  "2345": "⠞",

  "13": "⠅",
  "123": "⠇",
  "134": "⠍",
  "1234": "⠏",
  "234": "⠎",

  "136": "⠥",
  "1236": "⠧",
  "1346": "⠭",
  "12346": "⠯",
  "2346": "⠮",

  "1356": "⠵",
  "12356": "⠷",
  "13456": "⠽",
  "123456": "⠿",
  "23456": "⠾",

  "34": "⠌",
  "346": "⠬",
  "345": "⠜",

  "15": "⠑",
  "125": "⠓",
  "145": "⠙",
  "1245": "⠛",
  "245": "⠚",

  "3": "⠄",
  "35": "⠔",
  "356": "⠴",

  "56": "、",
  "256": "。",
  "26": "？",
  "235": "！",

  "4": "⠈",
  "5": "⠐",
  "6": "⠠",

  "25": "⠒"
};

/* =========================
   かな → 点字数字
========================= */

const kanaToBraille = Object.fromEntries(
  Object.entries(brailleToKana).map(
    ([dots, kana]) => [kana, dots]
  )
);

/* =========================
   特殊点字（濁音・拗音）
========================= */

const specialBrailleMap = {

  /* 濁音 */
  "5-16": "が",
  "5-126": "ぎ",
  "5-146": "ぐ",
  "5-1246": "げ",
  "5-246": "ご",

  "5-156": "ざ",
  "5-1256": "じ",
  "5-1456": "ず",
  "5-12456": "ぜ",
  "5-2456": "ぞ",

  "5-135": "だ",
  "5-1235": "ぢ",
  "5-1345": "づ",
  "5-12345": "で",
  "5-2345": "ど",

  "5-136": "ば",
  "5-1236": "び",
  "5-1346": "ぶ",
  "5-12346": "べ",
  "5-2346": "ぼ",

  /* 半濁音 */
  "6-136": "ぱ",
  "6-1236": "ぴ",
  "6-1346": "ぷ",
  "6-12346": "ぺ",
  "6-2346": "ぽ",

  /* 拗音 */
  "4-126": "きゃ",
  "4-146": "きゅ",
  "4-246": "きょ",

  "4-1256": "しゃ",
  "4-1456": "しゅ",
  "4-2456": "しょ",

  "4-1235": "ちゃ",
  "4-1345": "ちゅ",
  "4-2345": "ちょ",

  "4-123": "りゃ",
  "4-145": "りゅ",
  "4-245": "りょ",

  /* 濁拗音 */
  "4-5-126": "ぎゃ",
  "4-5-146": "ぎゅ",
  "4-5-246": "ぎょ",

  "4-5-1256": "じゃ",
  "4-5-1456": "じゅ",
  "4-5-2456": "じょ",

  "4-5-1236": "びゃ",
  "4-5-1346": "びゅ",
  "4-5-2346": "びょ",

  /* 半濁拗音 */
  "4-6-1236": "ぴゃ",
  "4-6-1346": "ぴゅ",
  "4-6-2346": "ぴょ"
};

/* =========================
   点並び正規化
========================= */

function normalizeDots(dots) {

  return dots
    .split("")
    .sort()
    .join("");
}

/* =========================
   1文字ずつ表示
========================= */

function showTextOneByOne(
  elementId,
  text,
  speed = 70
) {

  const box =
    document.getElementById(elementId);

  if (!box) return;

  box.innerHTML = "";

  let i = 0;

  const timer = setInterval(() => {

    const span =
      document.createElement("span");

    span.className = "fade-letter";

    span.innerHTML =
      text[i] === " "
      ? "&nbsp;"
      : text[i];
    span.textContent = text[i];

    box.appendChild(span);

    i++;

    if (i >= text.length) {
      clearInterval(timer);
    }

  }, speed);
}

function showNumberGroupsOneByOne(elementId, items, speed = 120) {

  const box = document.getElementById(elementId);

  if (!box) return;

  box.innerHTML = "";

  let i = 0;

  const timer = setInterval(() => {

    const span = document.createElement("span");

    span.className = "fade-letter number-token";
    span.textContent = items[i];

    box.appendChild(span);

    i++;

    if (i >= items.length) {
      clearInterval(timer);
    }

  }, speed);
}

function showBrailleOneByOne(elementId, textArray, speed = 80) {
/* =========================
   点字を1文字ずつ表示

function showBrailleOneByOne(
  elementId,
  textArray,
  speed = 80
) {

  const box =
    document.getElementById(elementId);

  if (!box) return;

  box.innerHTML = "";

  let i = 0;

  const timer = setInterval(() => {

    const span =
      document.createElement("span");

    span.className = "braille-cell";

    span.textContent = textArray[i];

    box.appendChild(span);

    i++;

    if (i >= textArray.length) {
      clearInterval(timer);
    }

  }, speed);
}

/* =========================
   点字数字 → かな
========================= */

function liveBrailleConvert() {

  const input =
    document.getElementById(
      "brailleNumberInput"
    ).value.trim();

  const cells =
    input.split(/\s+/);

  let result = "";

  for (let i = 0; i < cells.length; i++) {

    /* 3セル */
    if (i + 2 < cells.length) {

      const three =
        cells[i] +
        "-" +
        cells[i + 1] +
        "-" +
        cells[i + 2];

      if (specialBrailleMap[three]) {

        result +=
          specialBrailleMap[three];

        i += 2;

        continue;
      }
    }

    /* 2セル */
    if (i + 1 < cells.length) {

      const two =
        cells[i] +
        "-" +
        cells[i + 1];

      if (specialBrailleMap[two]) {

        result +=
          specialBrailleMap[two];

        i += 1;

        continue;
      }
    }

    /* 清音 */
    const key =
      normalizeDots(cells[i]);

    result +=
      brailleToKana[key] || "？";
  }

 showNumberGroupsOneByOne("brailleNumberResult2", result);
  document.getElementById(
    "brailleNumberResult"
  ).textContent = result;
}

/* =========================
   入力クリア
========================= */

function clearBrailleInput() {

  document.getElementById(
    "brailleNumberInput"
  ).value = "";

  showBrailleOneByOne("realBrailleResult", result);
}
  document.getElementById(
    "brailleNumberResult"
  ).textContent = "";
}
