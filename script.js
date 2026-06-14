// ===== NAVIGATION =====
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  document.querySelectorAll('.nav-link').forEach(l => {
    if (l.dataset.page === pageId) l.classList.add('active');
  });

  // Re-animate stat bars when fenomena is shown
  if (pageId === 'fenomena') animateBars();
  // Start kuis fresh when interaktif is opened
  if (pageId === 'interaktif') startKuis();
}

// Smooth nav link handler
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    showPage(link.dataset.page);
    // close mobile menu
    document.getElementById('nav-links').classList.remove('open');
  });
});

// Hamburger
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('nav-links').classList.toggle('open');
});

// Scroll-to-top button
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollTopBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
  scrollTopBtn.style.alignItems = 'center';
  scrollTopBtn.style.justifyContent = 'center';
});

// ===== STAT BARS ANIMATION =====
function animateBars() {
  document.querySelectorAll('.fill').forEach(el => {
    const target = el.style.width;
    el.style.width = '0';
    setTimeout(() => { el.style.width = target; el.style.transition = 'width 1.2s ease'; }, 100);
  });
}

// ===== TAB NAVIGATION =====
function showTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + tabId).classList.add('active');
  event.target.classList.add('active');
}

// ===== SIMULASI KOMENTAR =====
const commentData = {
  toxic: {
    cls: 'res-bad',
    icon: '😔',
    text: `<strong>Ini adalah komentar TOXIC.</strong><br/><br/>
Kata-kata seperti ini terasa kecil bagi pengirim, tetapi bisa menghancurkan kepercayaan diri seseorang dalam sekejap. 
Korban cyberbullying sering mengulang komentar negatif ini dalam benaknya berkali-kali.<br/><br/>
<em>Sila ke-2 mengajarkan kita untuk memperlakukan sesama dengan adil dan beradab — termasuk di kolom komentar.</em>`
  },
  neutral: {
    cls: 'res-neutral',
    icon: '🤔',
    text: `<strong>Komentar netral, tapi bisa lebih baik.</strong><br/><br/>
Tidak menyakiti, namun juga tidak membantu. Ketika seseorang berbagi karya pertama mereka dengan keberanian, 
sedikit apresiasi bisa berarti sangat besar.<br/><br/>
<em>Kemanusiaan yang Beradab mendorong kita untuk aktif saling mendukung, bukan sekadar tidak menyakiti.</em>`
  },
  good: {
    cls: 'res-good',
    icon: '💚',
    text: `<strong>Komentar ini mencerminkan nilai Sila ke-2! ✨</strong><br/><br/>
Kamu memberi apresiasi yang tulus dan semangat yang nyata. Penelitian menunjukkan bahwa satu komentar 
positif bisa menetralkan dampak 5 komentar negatif.<br/><br/>
<em>Inilah wujud nyata "Kemanusiaan yang Adil dan Beradab" di era digital — mudah dilakukan, berdampak besar.</em>`
  }
};

function pickComment(type, btn) {
  const data = commentData[type];
  const result = document.getElementById('comment-result');
  const icon   = document.getElementById('result-icon');
  const text   = document.getElementById('result-text');

  result.className = 'comment-result ' + data.cls;
  icon.textContent = data.icon;
  text.innerHTML   = data.text;
  result.classList.remove('hidden');

  // Disable buttons
  document.querySelectorAll('.choice-btn').forEach(b => {
    b.style.opacity = '0.5';
    b.style.pointerEvents = 'none';
  });
  btn.style.opacity = '1';
  btn.style.pointerEvents = 'none';
  btn.style.boxShadow = '0 0 0 3px rgba(192,57,43,0.3)';

  result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function resetSimulasi() {
  document.getElementById('comment-result').classList.add('hidden');
  document.querySelectorAll('.choice-btn').forEach(b => {
    b.style.opacity = '';
    b.style.pointerEvents = '';
    b.style.boxShadow = '';
  });
}

// ===== KUIS =====
const kuisData = [
  {
    q: "Apa makna utama dari Sila ke-2 Pancasila \"Kemanusiaan yang Adil dan Beradab\" dalam konteks digital?",
    opts: [
      "Bebas mengekspresikan diri tanpa batasan di internet",
      "Memperlakukan setiap pengguna internet dengan hormat dan empati",
      "Membuat konten sebanyak-banyaknya untuk mendapat followers",
      "Hanya berkomentar positif, tidak pernah kritik"
    ],
    correct: 1,
    fb: "Benar! Sila ke-2 menegaskan bahwa setiap manusia memiliki hak dan martabat yang sama — termasuk di dunia digital. Berinteraksi online harus tetap mencerminkan rasa hormat dan empati."
  },
  {
    q: "Seorang teman memposting foto liburannya dan mendapat komentar hinaan tentang penampilannya. Respons yang paling mencerminkan Sila ke-2 adalah...",
    opts: [
      "Diam dan scroll ke bawah",
      "Like komentar yang lucu meskipun sedikit menghina",
      "Berkomentar positif untuk mengimbangi komentar negatif dan melaporkan komentar hinaan",
      "Screenshot dan share ke grup lain"
    ],
    correct: 2,
    fb: "Tepat sekali! Bela korban dengan komentar positif dan laporkan konten negatif. Diam saat menyaksikan perundungan adalah bentuk pembiaran yang bertentangan dengan nilai kemanusiaan."
  },
  {
    q: "Mengapa orang lebih mudah bersikap kasar di internet dibanding tatap muka langsung?",
    opts: [
      "Karena internet memiliki aturan berbeda dari kehidupan nyata",
      "Karena anonimitas dan jarak mengurangi rasa empati — disebut efek dehumanisasi digital",
      "Karena tulisan tidak menimbulkan dampak psikologis",
      "Karena tidak ada sanksi hukum untuk komentar biasa"
    ],
    correct: 1,
    fb: "Betul! Efek dehumanisasi digital terjadi karena kita tidak melihat ekspresi dan reaksi korban secara langsung, sehingga otak kita tidak memproses rasa bersalah yang sama seperti bertatap muka."
  },
  {
    q: "Sebelum mengirim komentar, filter THINK membantu kita. THINK adalah singkatan dari...",
    opts: [
      "True, Humble, Important, Nice, Knowledgeable",
      "True, Helpful, Inspiring, Necessary, Kind",
      "Timely, Honest, Informative, Notable, Known",
      "Thoughtful, Helpful, Intelligent, Needed, Kindly"
    ],
    correct: 1,
    fb: "Tepat! T-H-I-N-K: True (benar), Helpful (membantu), Inspiring (menginspirasi), Necessary (perlu), Kind (baik). Lima pertanyaan ini adalah kompas moral sebelum mengetik apapun."
  },
  {
    q: "Manakah perilaku yang PALING mencerminkan nilai Sila ke-2 di media sosial?",
    opts: [
      "Tidak menyebarkan hoaks, tapi juga diam saat melihat perundungan",
      "Aktif membela korban, melaporkan konten negatif, dan menjaga privasi orang lain",
      "Hanya memfollow akun-akun positif saja",
      "Membatasi penggunaan media sosial agar tidak terpengaruh"
    ],
    correct: 1,
    fb: "Benar! Sila ke-2 mendorong tindakan aktif — bukan hanya menghindari hal buruk, tetapi secara aktif membangun lingkungan digital yang adil dan beradab. Membela korban adalah implementasi nyata kemanusiaan."
  }
];

let kuisIndex = 0;
let kuisScore = 0;
let kuisAnswered = false;

function startKuis() {
  kuisIndex = 0;
  kuisScore = 0;
  kuisAnswered = false;
  document.getElementById('kuis-container').style.display = 'block';
  document.getElementById('kuis-result').style.display = 'none';
  renderKuis();
}

function renderKuis() {
  const q = kuisData[kuisIndex];
  const pct = ((kuisIndex + 1) / kuisData.length) * 100;

  document.getElementById('kuis-num').textContent = `Soal ${kuisIndex + 1} / ${kuisData.length}`;
  document.getElementById('kuis-bar').style.width = pct + '%';
  document.getElementById('kuis-question').textContent = q.q;
  document.getElementById('kuis-feedback').className = 'kuis-feedback hidden';
  document.getElementById('kuis-feedback').textContent = '';

  const optsEl = document.getElementById('kuis-options');
  optsEl.innerHTML = '';
  q.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'kuis-opt';
    btn.textContent = opt;
    btn.onclick = () => answerKuis(i);
    optsEl.appendChild(btn);
  });
  kuisAnswered = false;
}

function answerKuis(idx) {
  if (kuisAnswered) return;
  kuisAnswered = true;

  const q = kuisData[kuisIndex];
  const opts = document.querySelectorAll('.kuis-opt');
  const fb   = document.getElementById('kuis-feedback');

  opts.forEach(btn => btn.disabled = true);
  opts[q.correct].classList.add('correct');

  if (idx === q.correct) {
    kuisScore++;
    fb.textContent = '✅ ' + q.fb;
    fb.className = 'kuis-feedback fb-good';
  } else {
    opts[idx].classList.add('wrong');
    fb.textContent = '❌ ' + q.fb;
    fb.className = 'kuis-feedback fb-bad';
  }

  setTimeout(() => {
    kuisIndex++;
    if (kuisIndex < kuisData.length) {
      renderKuis();
    } else {
      showKuisResult();
    }
  }, 2800);
}

function showKuisResult() {
  document.getElementById('kuis-container').style.display = 'none';
  const res = document.getElementById('kuis-result');
  res.style.display = 'block';

  const pct = (kuisScore / kuisData.length) * 100;
  document.getElementById('kuis-score-text').textContent = `Skor kamu: ${kuisScore} / ${kuisData.length}`;

  let comment, trophy;
  if (pct >= 80) {
    trophy = '🏆';
    comment = 'Luar biasa! Kamu benar-benar memahami nilai Sila ke-2 Pancasila. Teruslah menjadi contoh warga digital yang beradab!';
  } else if (pct >= 60) {
    trophy = '👏';
    comment = 'Bagus! Pemahamanmu sudah cukup baik. Pelajari lagi bagian yang kamu lewatkan untuk menjadi lebih paham.';
  } else {
    trophy = '📚';
    comment = 'Jangan menyerah! Baca ulang materi Nilai Moral & Etika, lalu coba lagi. Belajar adalah proses.';
  }

  document.querySelector('.result-trophy').textContent = trophy;
  document.getElementById('kuis-comment').textContent = comment;
}

// ===== POLLING =====
const pollLabels = [
  "Langsung laporkan kontennya",
  "DM ke korban, beri dukungan",
  "Tinggalkan komentar positif",
  "Diam dan scroll terus"
];

// Base simulation votes
let pollVotes = [42, 31, 19, 8];
let voted = false;

function vote(idx) {
  if (voted) return;
  voted = true;
  pollVotes[idx] += 1;

  document.getElementById('poll-options').style.display = 'none';

  const resultEl = document.getElementById('poll-result');
  resultEl.classList.remove('hidden');

  const total = pollVotes.reduce((a, b) => a + b, 0);
  const barsEl = document.getElementById('poll-bars');
  barsEl.innerHTML = '';

  pollVotes.forEach((v, i) => {
    const pct = Math.round((v / total) * 100);
    const isYours = i === idx;
    const item = document.createElement('div');
    item.className = 'poll-bar-item';
    item.innerHTML = `
      <div class="poll-bar-label">
        <span>${isYours ? '▶ ' : ''}${pollLabels[i]}${isYours ? ' (pilihanmu)' : ''}</span>
        <span class="pct">${pct}%</span>
      </div>
      <div class="poll-bar-track">
        <div class="poll-bar-fill" style="width:0%" data-target="${pct}"></div>
      </div>`;
    barsEl.appendChild(item);
  });

  // Animate bars
  setTimeout(() => {
    document.querySelectorAll('.poll-bar-fill').forEach(bar => {
      bar.style.width = bar.dataset.target + '%';
    });
  }, 100);
}

function resetPoll() {
  voted = false;
  document.getElementById('poll-options').style.display = 'flex';
  document.getElementById('poll-result').classList.add('hidden');
  document.querySelectorAll('.poll-btn').forEach(b => b.style.opacity = '');
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  showPage('home');
  startKuis();
});
