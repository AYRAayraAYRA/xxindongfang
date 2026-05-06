// ============== App ===============
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
const teacherById = id => TEACHERS.find(t => t.id === id);
const groupById = id => CAMPUS_GROUPS.find(g => g.id === id);

let currentGroupId = CAMPUS_GROUPS[0].id;

// 50/50 ordering — shuffle the two contacts on every render so neither name is always first
function shuffledContacts() {
  return Math.random() < 0.5 ? CONTACTS.slice() : CONTACTS.slice().reverse();
}

// ============== Group tabs ===============
function renderGroupTabs() {
  $('#groupTabs').innerHTML = CAMPUS_GROUPS.map(g => {
    const teacherCount = g.teacherIds.length;
    const campusCount = g.campuses.length;
    const meta = `${campusCount} 校区 · ${teacherCount} 位老师`;
    const crown = g.crown ? '<span class="crown">👑</span>' : '';
    return `
      <button class="group-tab ${g.id===currentGroupId?'active':''} ${g.crown?'has-crown':''}" data-id="${g.id}">
        <span class="gt-name">${crown}${g.name}</span>
        <span class="gt-meta">${g.area} · ${meta}</span>
      </button>
    `;
  }).join('');
  $$('#groupTabs .group-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      currentGroupId = btn.dataset.id;
      renderGroupTabs();
      renderGroupDetail();
    });
  });
}

// ============== Group detail (campuses + teachers) ===============
function renderGroupDetail() {
  const g = groupById(currentGroupId);
  const teachers = g.teacherIds.map(teacherById).filter(Boolean);

  const campusesHTML = g.campuses.map(c => `
    <div class="campus-card">
      <div class="cc-info">
        <div class="cc-name">
          ${g.crown && c.id === 'wangdun_main' ? '<span class="crown">👑</span>' : ''}
          ${c.name}
          <span class="cc-area">${g.area}</span>
        </div>
        <div class="cc-classes">
          ${c.classTypes.map(ct => `<span class="class-pill">${ct}</span>`).join('')}
        </div>
        <div class="cc-addr">${c.address}</div>
      </div>
      ${c.qr
        ? `<div class="cc-qr">
             <img src="${c.qr}" alt="${c.name}导航二维码" data-zoom>
             <div class="qr-cap">扫码导航</div>
           </div>`
        : `<div class="cc-qr empty">导航<br>请咨询<br>学习规划老师</div>`
      }
    </div>
  `).join('');

  $('#groupDetail').innerHTML = `
    <div class="group-detail">
      <div class="group-intro">
        <div class="gi-icon">${g.crown ? '👑' : (g.area === '湖东' ? '🏫' : '🏛️')}</div>
        <div>${g.intro}${g.campuses.length > 1 ? '（同组校区共享老师 · 任选一处即可咨询）' : ''}</div>
      </div>

      <div class="campus-list">
        ${campusesHTML}
      </div>

      <div class="teachers-head">
        <h3>校区老师</h3>
        <span class="count">共 ${teachers.length} 位骨干教师</span>
      </div>
      <div class="teacher-grid">
        ${teachers.map(teacherCardHTML).join('')}
      </div>
    </div>
  `;

  $$('#groupDetail .teacher-card').forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.id));
  });
  $$('#groupDetail [data-zoom]').forEach(img => {
    img.addEventListener('click', e => { e.stopPropagation(); openLightbox(img.src); });
  });
}

function teacherCardHTML(t) {
  const tags = (t.tags || []).slice(0, 2);
  return `
    <button class="teacher-card" data-id="${t.id}">
      <div class="tc-photo">
        <img src="${t.photo}" alt="${t.name} 老师" loading="lazy">
        <span class="tc-years">${t.years}教龄</span>
      </div>
      <div class="tc-body">
        <div class="tc-name">${t.name}<span class="tc-en">老师</span></div>
        <div class="tc-role">${t.role}</div>
        <div class="tc-tags">${tags.map(x=>`<span class="tc-tag">${x}</span>`).join('')}</div>
        <div class="tc-cta"><span>查看简介与好评</span><span class="arr">→</span></div>
      </div>
    </button>
  `;
}

// ============== Modal ===============
function openModal(id) {
  const t = teacherById(id);
  if (!t) return;
  const group = groupById(t.groupId);
  const campusNames = group ? group.campuses.map(c => c.name) : [];

  // Reviews categorized
  const reviewsCats = REVIEWS_BY_TEACHER[t.id] || {};
  const order = ['exam', 'progress', 'daily', 'general'];
  const cats = order.filter(k => reviewsCats[k] && reviewsCats[k].length);
  const totalReviews = cats.reduce((s, k) => s + reviewsCats[k].length, 0);

  let reviewsHTML = '';
  if (cats.length) {
    const subtabsHTML = cats.length > 1 ? `
      <div class="rev-subtabs">
        ${cats.map((k, i) => {
          const meta = REVIEW_CATEGORIES[k];
          return `<button class="rev-subtab ${i===0?'active':''}" data-cat="${k}">
            ${meta.icon} ${meta.label}<span class="ct">${reviewsCats[k].length}</span>
          </button>`;
        }).join('')}
      </div>
    ` : '';
    const panesHTML = cats.map((k, i) => {
      const files = reviewsCats[k];
      const imgs = files.map(f => {
        const src = `assets/teachers/${t.id}/reviews/${k}/${encodeURIComponent(f)}`;
        return `<img src="${src}" alt="" loading="lazy" data-zoom>`;
      }).join('');
      return `<div class="rev-pane ${i===0?'active':''}" data-pane="${k}"><div class="review-grid">${imgs}</div></div>`;
    }).join('');
    reviewsHTML = `
      <div class="modal-section">
        <h4>学员好评 <span class="sec-count">${totalReviews} 张</span></h4>
        ${subtabsHTML}
        ${panesHTML}
      </div>
    `;
  }

  const crown = t.groupId === 'wangdun' ? 'crown' : '';

  $('#modalContent').innerHTML = `
    <div class="modal-hero">
      <div class="modal-photo">
        <img src="${t.photo}" alt="${t.name} 老师">
      </div>
      <div class="modal-hero-text">
        <div class="modal-name">${t.name} <span style="font-size:16px;color:#888;font-weight:600;">老师</span></div>
        <div class="modal-name-en">${(t.subject||'').toUpperCase()} · ${t.grades}</div>
        <div class="modal-role">${t.role}</div>
        <div class="modal-meta">
          <div class="meta-item"><div class="lab">学科</div><div class="val">${t.subject}</div></div>
          <div class="meta-item"><div class="lab">年级</div><div class="val">${t.grades}</div></div>
          <div class="meta-item"><div class="lab">教龄</div><div class="val">${t.years}</div></div>
          ${t.education ? `<div class="meta-item"><div class="lab">背景</div><div class="val">${t.education}</div></div>` : ''}
        </div>
        <div class="meta-item">
          <div class="lab">任职校区</div>
          <div class="modal-campuses">
            ${campusNames.map(n => `<span class="campus-pill ${crown && n.startsWith('旺墩路')?'crown':''}">${n}</span>`).join('')}
          </div>
        </div>
      </div>
    </div>
    <div class="modal-body">
      ${t.motto ? `
        <div class="modal-section">
          <h4>匠心语录</h4>
          <div class="modal-motto">"${t.motto}"</div>
        </div>` : ''}
      ${t.teachingStyle ? `
        <div class="modal-section">
          <h4>授课风格</h4>
          <div class="modal-style">${t.teachingStyle}</div>
        </div>` : ''}
      ${(t.certificates && t.certificates.length) ? `
        <div class="modal-section">
          <h4>持有证书</h4>
          <ul class="cert-list">${t.certificates.map(c=>`<li>${c}</li>`).join('')}</ul>
        </div>` : ''}
      ${(t.achievements && t.achievements.length) ? `
        <div class="modal-section">
          <h4>授课成就与荣誉</h4>
          <ul class="ach-list">${t.achievements.map(a=>`<li>${a}</li>`).join('')}</ul>
        </div>` : ''}
      ${reviewsHTML}

      <div class="modal-contact">
        <div class="mc-text">
          <strong>如需规划课程，请联系下方两位学习规划老师</strong>
          扫码加微信咨询 · 试听 / 班型 / 报名
        </div>
        <div class="mc-qr-row">
          ${shuffledContacts().map(c => `
            <div class="mc-qr-item">
              <img class="mc-qr" src="${c.qr}" alt="${c.name}二维码"
                   onerror="this.style.display='none'" data-zoom>
              <div class="mc-qr-name">${c.name}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
  $('#modalMask').classList.add('show');
  document.body.style.overflow = 'hidden';

  // wire review subtabs
  $$('#modalContent .rev-subtab').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.cat;
      $$('#modalContent .rev-subtab').forEach(b => b.classList.remove('active'));
      $$('#modalContent .rev-pane').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      $(`#modalContent .rev-pane[data-pane="${cat}"]`).classList.add('active');
    });
  });
  // attach lightbox
  $$('#modalContent [data-zoom]').forEach(img => {
    img.addEventListener('click', () => openLightbox(img.src));
  });

  // scroll modal to top
  $('#modalMask').scrollTop = 0;
}
function closeModal() {
  $('#modalMask').classList.remove('show');
  document.body.style.overflow = '';
}
$('#modalClose').addEventListener('click', closeModal);
$('#modalMask').addEventListener('click', (e) => {
  if (e.target.id === 'modalMask') closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeModal(); closeLightbox(); }
});

// ============== Lightbox ===============
function openLightbox(src) {
  $('#lbImg').src = src;
  $('#lightbox').classList.add('show');
}
function closeLightbox() { $('#lightbox').classList.remove('show'); }
$('#lightbox').addEventListener('click', closeLightbox);

// ============== Reviews section ===============
function renderReviews() {
  $('#resultsStrip').innerHTML = REVIEWS_GLOBAL.results.map(r => `
    <div class="result-card">
      <img src="${r.src}" alt="${r.caption}" data-zoom>
      <div class="cap">🏆 ${r.caption}</div>
    </div>
  `).join('');

  const resultExtra = REVIEWS_GLOBAL.parentFeedback.filter(s => s.includes('能提分'));
  $('#resultsExtra').innerHTML = resultExtra.map(s => `<img src="${s}" alt="提分反馈" loading="lazy" data-zoom>`).join('');

  const parentsList = REVIEWS_GLOBAL.parentFeedback.filter(s => s.includes('老师好'));
  $('#parentsGrid').innerHTML = parentsList.map(s => `<img src="${s}" alt="家长反馈" loading="lazy" data-zoom>`).join('');

  $('#methodGrid').innerHTML = REVIEWS_GLOBAL.method.map(s => `<img src="${s}" alt="教学模式好评" loading="lazy" data-zoom>`).join('');

  $$('#reviews [data-zoom]').forEach(img => img.addEventListener('click', () => openLightbox(img.src)));
}

// Review cards: click to expand/collapse the corresponding pane (accordion)
$$('.rev-card').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    const pane = $('#pane-' + tab);
    const wasActive = btn.classList.contains('active');
    $$('.rev-card').forEach(b => b.classList.remove('active'));
    $$('.review-pane').forEach(p => p.classList.remove('active'));
    if (!wasActive) {
      btn.classList.add('active');
      pane.classList.add('active');
      // smooth scroll the pane into view a bit
      setTimeout(() => pane.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
    }
  });
});

// ============== Boot ===============
renderGroupTabs();
renderGroupDetail();
renderReviews();
