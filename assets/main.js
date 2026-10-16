// 株式会社buy4 サイト共通スクリプト
(function () {
  // スマホのメニュー開閉
  var btn = document.querySelector('.menu-btn');
  var nav = document.querySelector('.gnav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = open ? '閉じる' : 'メニュー';
    });
  }

  // トップのネットワーク図（人づてにつながる人の輪）
  var c = document.getElementById('net');
  function draw() {
    if (!c) return;
    var r = c.getBoundingClientRect();
    if (!r.width) return;
    var d = window.devicePixelRatio || 1;
    c.width = r.width * d; c.height = r.height * d;
    var g = c.getContext('2d'); g.setTransform(d, 0, 0, d, 0, 0);
    var W = r.width, H = r.height, seed = 7;
    function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
    var cx = W * 0.5, cy = H * 0.5, R = Math.min(W, H);
    var nodes = [{ x: cx, y: cy, r: 8, lv: 0 }];
    for (var lv = 1; lv <= 3; lv++) {
      var n = lv * 6 + (lv === 3 ? 4 : 0);
      for (var i = 0; i < n; i++) {
        var a = i / n * Math.PI * 2 + lv * 0.4 + rnd() * 0.3;
        var rad = lv * R * 0.135 + rnd() * 10;
        nodes.push({ x: cx + Math.cos(a) * rad, y: cy + Math.sin(a) * rad, r: 6 - lv * 1.2, lv: lv });
      }
    }
    g.clearRect(0, 0, W, H);
    g.strokeStyle = 'rgba(141,184,232,.38)'; g.lineWidth = 1;
    nodes.forEach(function (p, i) {
      if (!i) return;
      var best = null, bd = 1e9;
      nodes.forEach(function (m) {
        if (m.lv === p.lv - 1) { var dd = (m.x - p.x) * (m.x - p.x) + (m.y - p.y) * (m.y - p.y); if (dd < bd) { bd = dd; best = m; } }
      });
      g.beginPath(); g.moveTo(best.x, best.y); g.lineTo(p.x, p.y); g.stroke();
    });
    nodes.forEach(function (p) {
      g.beginPath(); g.arc(p.x, p.y, p.r + 1, 0, Math.PI * 2);
      g.fillStyle = p.lv === 0 ? '#FFFFFF' : p.lv === 3 ? '#8DB8E8' : '#3D8BD6'; g.fill();
    });
  }
  draw();
  window.addEventListener('resize', draw);

  // お問い合わせ：入力内容をメール本文にしてメールソフトを開く
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = form.querySelector('.form-msg');
      var v = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; };
      var kind = form.querySelector('input[name="kind"]:checked');
      if (!v('f-company') || !v('f-name') || !v('f-email') || !kind) {
        msg.className = 'form-msg';
        msg.textContent = '会社名・お名前・メールアドレス・ご相談の内容は必須です。';
        return;
      }
      var to = form.getAttribute('data-to');
      var body = [
        '会社名：' + v('f-company'),
        'お名前：' + v('f-name'),
        'メールアドレス：' + v('f-email'),
        '電話番号：' + v('f-tel'),
        'ご相談の内容：' + kind.value,
        '集めたい対象者の条件：' + v('f-target'),
        '実施希望時期：' + v('f-when'),
        '調査手法：' + v('f-method'),
        '',
        'その他ご要望：',
        v('f-memo')
      ].join('\n');
      var subject = '【お問い合わせ】' + v('f-company') + ' ' + v('f-name') + '様';
      location.href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      msg.className = 'form-msg ok';
      msg.textContent = 'メールソフトが開きます。内容を確認して送信してください。開かない場合は ' + to + ' まで直接お送りください。';
    });
  }
})();
