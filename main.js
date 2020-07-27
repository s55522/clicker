let flag = true;
//プレイヤーデータ
let plyLv = 1;
let plyHp = 6;
let plyHpMax = 6;
let plyAtt = 1;
let plyHeal = 1;
let plyExp = 0;
let plyExpNext = 5;
let plyExpNeed = [5, 15, 50, 150, 300, 600, 1200, 2500, 5000, 10000];
let plyImg = document.getElementById("plyImg");

let plySt = new Array(7);
for (let a = 0; a < plySt.length; a++) {
  plySt[a] = document.getElementById("plySt" + [a]);
}
//プレイヤー回復
if (flag) {
  plyImg.addEventListener("mousedown", () => {
    plyImg.src = "img/playerC.png";
  });
  plyImg.addEventListener("mouseup", () => {
    plyImg.src = "img/playerA.png";
    plyHp += plyHeal;
    if (plyHp > plyHpMax) {
      plyHp = plyHpMax;
    }
    plySt2.textContent = "HP:" + plyHp;
  });
}
//敵データ
let Lv = 0;
let eneLv = new Array(10);
let eneHp = 10;
let eneHpMax = new Array(10);
let eneAtt = new Array(10);
let eneKill = new Array(10);
let eneExp = new Array(10);
let eneCnt = 5;
let eneCntMax = 5;
let eneImg = document.getElementById("eneImg");
let eneSt = new Array(5);
for (let b = 0; b < eneSt.length; b++) {
  eneSt[b] = document.getElementById("eneSt" + [b]);
}
for (let c = 0; c < 10; c++) {
  eneLv[c] = c + 1;
  eneHpMax[c] = 10 + c * 10;
  eneAtt[c] = 2 + c * 2;
  eneKill[c] = 0;
  eneExp[c] = 1 + c * 2;
}

//敵を攻撃
if (flag) {
  eneImg.addEventListener("mousedown", () => {
    eneImg.src = "img/enemyB" + Lv + ".png";
  });
  eneImg.addEventListener("mouseup", () => {
    eneImg.src = "img/enemyA" + Lv + ".png";
    if (eneHp > 0) {
      eneHp -= plyAtt;
    } else {
      eneHp = eneHpMax[Lv];
      eneKill[Lv]++;
      eneSt4.textContent = "倒した回数:" + eneKill[Lv];
      //経験値
      plyExp += eneExp[Lv];
      plySt5.textContent = "経験値:" + plyExp;
      plyExpNext -= eneExp[Lv];
      //レベルアップ
      if (plyExpNext <= 0) {
        plyExpNext = plyExpNeed[plyLv];
        plyLv++;
        plySt1.textContent = "レベル:" + plyLv;
        plyHpMax = plyLv * 2 + 6;
        plyHp = plyHpMax;
        plySt2.textContent = "HP:" + plyHp;
        plyAtt++;
        plySt3.textContent = "攻撃力:" + plyAtt;
        plyHeal++;
        plySt4.textContent = "回復魔法:" + plyHeal;
      }
      plySt6.textContent = "次のレベルまでの経験値" + plyExpNext + "ポイント";
    }
    eneSt2.textContent = "HP:" + eneHp;
  });
}
//敵が時間ごとに攻撃
let eneSec = document.getElementById("eneSec");
let loop = setInterval(() => {
  if (eneCnt > 0) {
    eneCnt--;
    eneSec.textContent = "モンスターの攻撃まで" + eneCnt + "秒";
  } else {
    plyImg.src = "img/playerB.png";
    plyHp -= eneAtt[Lv];
    setTimeout(() => {
      eneCnt = eneCntMax;
      plyImg.src = "img/playerA.png";
    }, 500);
  }
  if (plyHp > 0) {
    plySt2.textContent = "HP:" + plyHp;
  } else {
    flag = false;
    plyHp = 0;
    clearInterval(loop);
    plySt2.textContent = "HP:" + 0;
    eneSec.textContent = "ゲームオーバー";
  }
  if (eneKill[9] > 0) {
    flag = false;
    clearInterval(loop);
    eneSec.textContent = "ゲームクリア";
  }
}, 1000);
//次の敵,逃げ
let left = document.getElementById("left");
let right = document.getElementById("right");
left.addEventListener("click", () => {
  if (Lv > 0) {
    Lv--;
    eneImg.src = "img/enemyA" + Lv + ".png";
    eneSt1.textContent = "レベル:" + eneLv[Lv];
    eneSt2.textContent = "HP:" + eneHpMax[Lv];
    eneSt3.textContent = "攻撃力:" + eneAtt[Lv];
    eneSt4.textContent = eneKill[Lv];
  }
});

right.addEventListener("click", () => {
  if (Lv < 9) {
    Lv++;
    eneHp = eneHpMax;
    eneImg.src = "img/enemyA" + Lv + ".png";
    eneSt1.textContent = "レベル:" + eneLv[Lv];
    eneSt2.textContent = "HP:" + eneHpMax[Lv];
    eneSt3.textContent = "攻撃力:" + eneAtt[Lv];
    eneSt4.textContent = eneKill[Lv];
  }
});
