const muscleImage = "assets/muscle-map.png";

const seed = {
  role: "trainer",
  view: "home",
  workoutStarted: false,
  completed: false,
  exercises: [
    { id: 1, name: "Жим гантелей лёжа", muscles: "Грудь · трицепс · передняя дельта", category: "Грудь", description: "Опусти лопатки, держи предплечья вертикально и контролируй нижнюю точку." },
    { id: 2, name: "Вертикальная тяга", muscles: "Широчайшие · бицепс", category: "Спина", description: "Начинай движение сведением лопаток и веди локти вниз вдоль корпуса." },
    { id: 3, name: "Жим ногами", muscles: "Квадрицепс · ягодичные", category: "Ноги", description: "Сохраняй поясницу прижатой и направляй колени по линии носков." },
    { id: 4, name: "Жим гантелей сидя", muscles: "Дельты · трицепс", category: "Плечи", description: "Не прогибай поясницу, держи локти немного впереди линии корпуса." },
    { id: 5, name: "Румынская тяга", muscles: "Бицепс бедра · ягодичные", category: "Ноги", description: "Отводи таз назад, сохраняя нейтральную спину и мягкие колени." },
    { id: 6, name: "Сгибание рук", muscles: "Бицепс · предплечье", category: "Руки", description: "Фиксируй плечо и избегай раскачивания корпуса." }
  ],
  templates: [
    { id: 1, name: "Push A", note: "Грудь · плечи · трицепс", duration: 65 },
    { id: 2, name: "Legs A", note: "Квадрицепс · ягодичные", duration: 58 },
    { id: 3, name: "Pull B", note: "Спина · бицепс", duration: 62 }
  ],
  sets: [
    { label: "Разминка", planWeight: 12, planReps: 15, actualWeight: 12, actualReps: 15, done: true },
    { label: "Подход 1", planWeight: 22, planReps: 10, actualWeight: 22, actualReps: 10, done: true },
    { label: "Подход 2", planWeight: 24, planReps: 8, actualWeight: 24, actualReps: 8, done: false },
    { label: "Подход 3", planWeight: 24, planReps: 8, actualWeight: "", actualReps: "", done: false },
    { label: "Подход 4", planWeight: 22, planReps: 10, actualWeight: "", actualReps: "", done: false }
  ]
};

let state = loadState();

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem("gen-sport-v1"));
    return saved ? { ...structuredClone(seed), ...saved } : structuredClone(seed);
  } catch { return structuredClone(seed); }
}

function saveState() { localStorage.setItem("gen-sport-v1", JSON.stringify(state)); }
function esc(value = "") { return String(value).replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c])); }

const navByRole = {
  trainer: [
    ["home", "⌂", "Главная"], ["clients", "◉", "Клиенты"], ["workouts", "▦", "Тренировки"], ["exercises", "＋", "Упражнения"]
  ],
  client: [
    ["home", "⌂", "Главная"], ["session", "▶", "Тренировка"], ["progress", "↗", "Прогресс"], ["history", "◷", "История"]
  ]
};

function shell(content) {
  const trainer = state.role === "trainer";
  return `<div class="page ${trainer ? "role-trainer" : "role-client"}">
    <header class="topbar">
      <div class="brand"><span class="brand-dot"></span>GEN SPORT</div>
      <button class="profile-switch" data-action="switch-profile" aria-label="Переключить профиль">
        <span class="profile-copy"><strong>${trainer ? "Artem" : "Dan"}</strong><small>${trainer ? "Режим тренера" : "Режим подопечного"}</small></span>
        <span class="avatar">${trainer ? "A" : "D"}</span>
      </button>
    </header>
    ${content}
  </div>`;
}

function renderNav() {
  const items = navByRole[state.role];
  const buttons = items.map(([id, icon, label]) => `<button class="${state.view === id ? "active" : ""}" data-view="${id}" aria-label="${label}"><i>${icon}</i><span>${label}</span></button>`).join("");
  document.querySelector("#mobile-nav").innerHTML = buttons;
  document.querySelector("#desktop-nav").innerHTML = items.map(([id, icon, label]) => `<button class="${state.view === id ? "active" : ""}" data-view="${id}" aria-label="${label}" title="${label}">${icon}</button>`).join("");
  document.querySelector(".rail-avatar").textContent = state.role === "trainer" ? "A" : "D";
}

function trainerHome() {
  return shell(`
    <section class="greeting"><p class="eyebrow">Вторник · 15 сентября</p><h1>Доброе утро, Artem</h1><p class="subtle">Сегодня у Dan силовая тренировка Push A.</p></section>
    <div class="dashboard-grid">
      <article class="card hero-workout">
        <div class="hero-copy">
          <p class="eyebrow">Следующая тренировка</p><h2>Push A</h2><p>6 упражнений на грудь, плечи и трицепс. План обновлён сегодня.</p>
          <div class="hero-meta"><span class="chip">Dan</span><span class="chip">≈ 65 мин</span><span class="chip">Силовая</span></div>
          <button class="btn btn-primary" data-view="workouts">Открыть программу <span>→</span></button>
        </div>
        <div class="hero-visual"><img src="${muscleImage}" alt="Активные группы мышц"><div class="hero-score"><div><strong>92%</strong><small>прошлый раз</small></div></div></div>
      </article>
      <div class="metric-stack">
        <article class="metric"><div class="metric-top"><div><span>Выполнение плана</span><strong>92%</strong></div><small>+6%</small></div><div class="progress-track"><div class="progress-fill" style="width:92%"></div></div></article>
        <article class="metric"><div class="metric-top"><div><span>Недельный объём</span><strong>8.4т</strong></div><small>+4.8%</small></div><div class="progress-track"><div class="progress-fill" style="width:78%"></div></div></article>
        <article class="metric"><div class="metric-top"><div><span>Тренировок подряд</span><strong>7</strong></div><small>стабильно</small></div><div class="progress-track"><div class="progress-fill" style="width:70%"></div></div></article>
      </div>
    </div>
    <div class="section-head"><h2>Сегодня</h2><button class="btn btn-ghost" data-view="workouts">Все тренировки</button></div>
    <div class="schedule-list">
      <article class="schedule-item"><div class="schedule-time">18:30</div><div class="schedule-main"><strong>Dan · Push A</strong><span>6 упражнений · назначено Artem</span></div><span class="status active">Ожидает</span></article>
      <article class="schedule-item"><div class="schedule-time">Вчера</div><div class="schedule-main"><strong>Dan · Legs A</strong><span>58 минут · объём 8 420 кг</span></div><span class="status done">92% выполнено</span></article>
    </div>`);
}

function clientHome() {
  return shell(`
    <section class="greeting"><p class="eyebrow">Следующая тренировка</p><h1>Dan, пора на Push A</h1><p class="subtle">Artem обновил рекомендации сегодня в 09:40.</p></section>
    <div class="dashboard-grid">
      <article class="card hero-workout">
        <div class="hero-copy"><p class="eyebrow">Сегодня</p><h2>Грудь, плечи и трицепс</h2><p>Начинай с разминки. План тренера останется отдельно от твоих фактических результатов.</p><div class="hero-meta"><span class="chip">6 упражнений</span><span class="chip">≈ 65 мин</span><span class="chip">Отдых 90 сек</span></div><button class="btn btn-primary" data-action="start-workout">${state.workoutStarted ? "Продолжить тренировку" : "Начать тренировку"} <span>→</span></button></div>
        <div class="hero-visual"><img src="${muscleImage}" alt="Мышцы, задействованные в тренировке"><div class="hero-score"><div><strong>${state.completed ? "100%" : "6"}</strong><small>${state.completed ? "готово" : "упражнений"}</small></div></div></div>
      </article>
      <div class="metric-stack">
        <article class="metric"><div class="metric-top"><div><span>Серия тренировок</span><strong>7</strong></div><small>личный рекорд</small></div><div class="progress-track"><div class="progress-fill" style="width:70%"></div></div></article>
        <article class="metric"><div class="metric-top"><div><span>Сила за 30 дней</span><strong>+8%</strong></div><small>уверенный рост</small></div><div class="progress-track"><div class="progress-fill" style="width:84%"></div></div></article>
        <article class="metric"><div class="metric-top"><div><span>Среднее выполнение</span><strong>94%</strong></div><small>+2%</small></div><div class="progress-track"><div class="progress-fill" style="width:94%"></div></div></article>
      </div>
    </div>
    ${progressChart("Прогресс жима гантелей", "+12.4% за 30 дней")}`);
}

function exerciseCard(ex, i) {
  return `<button class="exercise-card" data-action="exercise-detail" data-id="${ex.id}"><span class="exercise-index">${String(i+1).padStart(2,"0")}</span><div class="exercise-art"><img src="${muscleImage}" alt=""></div><div class="exercise-info"><h3>${esc(ex.name)}</h3><span>${esc(ex.muscles)}</span></div></button>`;
}

function exercisesView() {
  return shell(`<section class="greeting"><p class="eyebrow">Библиотека</p><h1>Упражнения</h1><p class="subtle">Создавай упражнения и подтверждай предложенные описания.</p></section>
    <div class="toolbar"><input id="exercise-search" class="search" type="search" placeholder="Найти упражнение" aria-label="Поиск упражнений"><button class="btn btn-primary btn-icon" data-action="new-exercise" aria-label="Добавить упражнение">+</button></div>
    <div id="exercise-grid" class="exercise-grid">${state.exercises.map(exerciseCard).join("")}</div>`);
}

function workoutsView() {
  const rows = state.sets.map((s,i) => `<tr><td>${esc(s.label)}</td><td><input type="number" value="${s.planWeight}" data-plan="weight" data-set="${i}" aria-label="Вес, ${s.label}"></td><td><input type="number" value="${s.planReps}" data-plan="reps" data-set="${i}" aria-label="Повторения, ${s.label}"></td></tr>`).join("");
  return shell(`<section class="greeting"><p class="eyebrow">Программы Artem</p><h1>Тренировки</h1><p class="subtle">Выбери шаблон, настрой план и назначь его Dan.</p></section>
    <div class="section-head"><h2>Шаблоны</h2><button class="btn btn-primary" data-action="new-workout">+ Создать тренировку</button></div>
    <div class="workout-builder">
      <section class="card template-list">${state.templates.map((t,i)=>`<button class="${i===0?"active":""}"><div><strong>${esc(t.name)}</strong><br><span>${esc(t.note)}</span></div><span>${t.duration} мин</span></button>`).join("")}</section>
      <section>
        <article class="builder-exercise"><button class="builder-head" data-action="toggle-builder"><span class="drag-handle">⠿</span><strong>Жим гантелей лёжа</strong><span>✎</span></button><div class="builder-body"><table class="set-table"><thead><tr><th>Этап</th><th>Вес, кг</th><th>Повторы</th></tr></thead><tbody>${rows}</tbody></table></div></article>
        <article class="builder-exercise"><button class="builder-head" data-action="toggle-builder"><span class="drag-handle">⠿</span><strong>Жим гантелей сидя</strong><span>✎</span></button><div class="builder-body" hidden><div class="empty">Нажми на карандаш, чтобы настроить подходы.</div></div></article>
        <article class="builder-exercise"><button class="builder-head" data-action="toggle-builder"><span class="drag-handle">⠿</span><strong>Разгибание рук на блоке</strong><span>✎</span></button><div class="builder-body" hidden><div class="empty">Нажми на карандаш, чтобы настроить подходы.</div></div></article>
        <div class="actions"><button class="btn btn-secondary" data-action="add-to-workout">+ Добавить упражнение</button><button class="btn btn-primary" data-action="assign-workout">✓ Назначить Dan</button></div>
      </section>
    </div>`);
}

function sessionView() {
  const setRows = state.sets.map((s,i)=>`<div class="set-grid">
    <strong>${esc(s.label)}</strong><span>${s.planWeight} кг</span><span class="plan-reps">${s.planReps}</span>
    <input type="number" inputmode="decimal" value="${s.actualWeight}" data-actual="weight" data-set="${i}" aria-label="Фактический вес, ${s.label}" placeholder="кг">
    <input class="actual-reps" type="number" inputmode="numeric" value="${s.actualReps}" data-actual="reps" data-set="${i}" aria-label="Фактические повторы, ${s.label}" placeholder="повт.">
    <button class="set-check ${s.done?"checked":""}" data-action="toggle-set" data-set="${i}" aria-label="Отметить подход ${s.done?"невыполненным":"выполненным"}">✓</button>
  </div>`).join("");
  const done = state.sets.filter(s=>s.done).length;
  return shell(`<div class="workout-sheet"><div class="workout-heading"><div><p class="eyebrow">Тренировка Dan</p><h1>Push A</h1><p class="subtle">Выполнено ${done} из ${state.sets.length} подходов первого упражнения</p></div><input class="date-input" type="date" value="2026-09-15" aria-label="Дата тренировки"></div>
    <article class="card plan-card"><div class="plan-title"><span class="status active">01</span><strong>Жим гантелей лёжа</strong><span>${done}/${state.sets.length}</span></div><div class="set-grid header"><span>Этап</span><span>План, кг</span><span class="plan-reps">Повторы</span><span>Факт, кг</span><span class="actual-reps">Повторы</span><span></span></div>${setRows}</article>
    <div class="comparison"><div><strong>Предыдущая тренировка</strong><br><small>22 × 10 · 24 × 8 · 24 × 8</small></div><strong>+4.2%</strong></div>
    <div class="section-head"><h2>Дальше</h2><span class="subtle">ещё 5 упражнений</span></div>
    <div class="exercise-list"><article class="exercise-item"><span class="status">02</span><div class="schedule-main"><strong>Жим гантелей сидя</strong><span>4 подхода · плечи</span></div><span>→</span></article><article class="exercise-item"><span class="status">03</span><div class="schedule-main"><strong>Разгибание рук</strong><span>3 подхода · трицепс</span></div><span>→</span></article></div>
    <div class="section-head"><button class="btn btn-primary btn-block" data-action="finish-workout">Завершить тренировку</button></div></div>`);
}

function progressChart(title = "Прогресс", note = "+12.4%") {
  return `<article class="card chart-card" style="margin-top:20px"><div class="chart-head"><div><p class="eyebrow">Динамика</p><h2>${title}</h2><p class="subtle">${note}</p></div><div class="chart-tabs"><button class="active">Объём</button><button>Вес</button><button>План</button></div></div><svg class="chart" viewBox="0 0 640 190" role="img" aria-label="Рост тренировочного объёма за четыре тренировки"><defs><linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e87532" stop-opacity=".55"/><stop offset="1" stop-color="#e87532" stop-opacity="0"/></linearGradient></defs><path class="grid-line" d="M10 150H630M10 100H630M10 50H630"/><path class="area" d="M20 148 C120 140 145 122 210 118 S315 100 372 90 S500 45 620 32 L620 170 L20 170Z"/><path class="line" d="M20 148 C120 140 145 122 210 118 S315 100 372 90 S500 45 620 32"/><circle cx="20" cy="148" r="7"/><circle cx="210" cy="118" r="7"/><circle cx="372" cy="90" r="7"/><circle cx="620" cy="32" r="7"/></svg></article>`;
}

function progressView() { return shell(`<section class="greeting"><p class="eyebrow">Аналитика Dan</p><h1>Прогресс</h1><p class="subtle">План Artem, фактическое выполнение и динамика нагрузки.</p></section><div class="dashboard-grid"><article class="metric"><div class="metric-top"><div><span>Выполнение плана</span><strong>94%</strong></div><small>+2%</small></div><div class="progress-track"><div class="progress-fill" style="width:94%"></div></div></article><article class="metric"><div class="metric-top"><div><span>Общий объём</span><strong>32.8т</strong></div><small>за 30 дней</small></div><div class="progress-track"><div class="progress-fill" style="width:82%"></div></div></article></div>${progressChart("Жим гантелей лёжа", "+12.4% · 4 тренировки")}${progressChart("Жим ногами", "+8.1% · 3 тренировки")}`); }

function historyView() { return shell(`<section class="greeting"><p class="eyebrow">История Dan</p><h1>Тренировки</h1><p class="subtle">Последние завершённые сессии и комментарии Artem.</p></section><div class="schedule-list"><article class="schedule-item"><div class="schedule-time">12 сен</div><div class="schedule-main"><strong>Legs A</strong><span>58 мин · 8 420 кг · «Отличный темп»</span></div><span class="status done">92%</span></article><article class="schedule-item"><div class="schedule-time">10 сен</div><div class="schedule-main"><strong>Push A</strong><span>64 мин · 6 740 кг</span></div><span class="status done">96%</span></article><article class="schedule-item"><div class="schedule-time">07 сен</div><div class="schedule-main"><strong>Pull B</strong><span>61 мин · 7 180 кг</span></div><span class="status done">90%</span></article></div>`); }

function clientsView() { return shell(`<section class="greeting"><p class="eyebrow">Подопечные</p><h1>Dan</h1><p class="subtle">Активная программа, последние результаты и обратная связь.</p></section><div class="dashboard-grid"><article class="card card-pad"><h2>Текущий цикл</h2><p class="subtle">Push / Pull / Legs · неделя 4 из 6</p><div class="comparison"><span>12 тренировок</span><strong>94%</strong></div><div class="section-head"><button class="btn btn-primary" data-view="workouts">Изменить программу</button></div></article><article class="metric"><div class="metric-top"><div><span>Последняя активность</span><strong>Legs A</strong></div><small>12 сен</small></div><div class="progress-track"><div class="progress-fill" style="width:92%"></div></div></article></div>${progressChart("Общий тренировочный объём", "+9.8% за цикл")}`); }

function placeholder(title, copy) { return shell(`<section class="greeting"><p class="eyebrow">Gen Sport</p><h1>${title}</h1><p class="subtle">${copy}</p></section><article class="card empty">Раздел уже заложен в навигацию и будет расширен следующими функциями.</article>`); }

function render() {
  const app = document.querySelector("#app");
  let html;
  if (state.role === "trainer") {
    html = state.view === "home" ? trainerHome() : state.view === "exercises" ? exercisesView() : state.view === "workouts" ? workoutsView() : state.view === "clients" ? clientsView() : trainerHome();
  } else {
    html = state.view === "home" ? clientHome() : state.view === "session" ? sessionView() : state.view === "progress" ? progressView() : state.view === "history" ? historyView() : clientHome();
  }
  app.innerHTML = html;
  renderNav();
  saveState();
}

function openModal(content) { document.querySelector("#modal-root").innerHTML = `<div class="modal-backdrop" data-action="close-modal"><section class="modal" role="dialog" aria-modal="true">${content}</section></div>`; document.querySelector(".modal button, .modal input")?.focus(); }
function closeModal() { document.querySelector("#modal-root").innerHTML = ""; }
function modalHead(title) { return `<header class="modal-head"><h2>${title}</h2><button class="btn btn-ghost btn-icon" data-action="close-modal" aria-label="Закрыть">×</button></header>`; }
function toast(message) { const el=document.createElement("div"); el.className="toast"; el.textContent=message; document.querySelector("#toast-root").append(el); setTimeout(()=>el.remove(),2600); }

function profileModal() {
  openModal(`${modalHead("Выбрать режим")}<div class="modal-body"><div class="profile-options"><button class="profile-option ${state.role==="trainer"?"active":""}" data-role="trainer"><span class="avatar">A</span><strong>Artem</strong><br><span>Тренер · планирует нагрузку</span></button><button class="profile-option ${state.role==="client"?"active":""}" data-role="client"><span class="avatar">D</span><strong>Dan</strong><br><span>Подопечный · фиксирует факт</span></button></div></div>`);
}

function newExerciseModal() {
  openModal(`${modalHead("Новое упражнение")}<div class="modal-body"><form id="exercise-form"><div class="field"><label for="ex-name">Название</label><input id="ex-name" name="name" required placeholder="Например, жим в Hammer"></div><div class="field"><label for="ex-group">Группа мышц</label><select id="ex-group" name="group"><option>Грудь</option><option>Спина</option><option>Ноги</option><option>Плечи</option><option>Руки</option></select></div><button class="btn btn-secondary btn-block" type="button" data-action="generate-description">Предложить описание</button><div id="ai-result"></div><div class="actions" style="margin-top:20px"><button class="btn btn-ghost" type="button" data-action="close-modal">Отмена</button><button class="btn btn-primary" type="submit">Сохранить упражнение</button></div></form></div>`);
}

function newWorkoutModal() {
  openModal(`${modalHead("Новая тренировка")}<div class="modal-body"><form id="workout-form"><div class="field"><label for="workout-name">Название</label><input id="workout-name" name="name" required placeholder="Например, Pull A"></div><div class="field"><label for="workout-note">Направление</label><input id="workout-note" name="note" required placeholder="Спина · бицепс"></div><div class="field"><label for="workout-duration">Длительность, мин</label><input id="workout-duration" name="duration" type="number" value="60"></div><div class="actions"><button class="btn btn-ghost" type="button" data-action="close-modal">Отмена</button><button class="btn btn-primary" type="submit">Создать</button></div></form></div>`);
}

function detailModal(id) {
  const ex = state.exercises.find(x=>x.id===Number(id)); if(!ex) return;
  openModal(`${modalHead(ex.name)}<div class="modal-body"><div class="hero-visual" style="height:280px;border-radius:22px"><img src="${muscleImage}" alt="Активные мышцы"></div><div class="section-head"><div><p class="eyebrow">Основные мышцы</p><h2>${esc(ex.muscles)}</h2></div></div><h3>Техника</h3><p class="subtle">${esc(ex.description)}</p><div class="section-head"><h3>Ключевая ошибка</h3></div><p class="subtle">Не ускоряй негативную фазу и сохраняй устойчивое положение корпуса.</p><div class="actions" style="margin-top:22px"><button class="btn btn-primary" data-action="close-modal">Готово</button></div></div>`);
}

document.addEventListener("click", (event) => {
  const view = event.target.closest("[data-view]")?.dataset.view;
  if (view) { state.view=view; render(); scrollTo({top:0,behavior:"smooth"}); return; }
  const role = event.target.closest("[data-role]")?.dataset.role;
  if (role) { state.role=role; state.view="home"; closeModal(); render(); toast(`Режим: ${role==="trainer"?"Artem · тренер":"Dan · подопечный"}`); return; }
  const target = event.target.closest("[data-action]"); if(!target) return;
  const action = target.dataset.action;
  if (action === "switch-profile") profileModal();
  if (action === "close-modal") { if (event.target === target || target.tagName === "BUTTON") closeModal(); }
  if (action === "new-exercise") newExerciseModal();
  if (action === "new-workout") newWorkoutModal();
  if (action === "exercise-detail") detailModal(target.dataset.id);
  if (action === "start-workout") { state.workoutStarted=true; state.view="session"; render(); }
  if (action === "toggle-set") { const i=Number(target.dataset.set); state.sets[i].done=!state.sets[i].done; render(); if(state.sets[i].done) toast("Подход сохранён · отдых 01:30"); }
  if (action === "finish-workout") { state.completed=true; state.workoutStarted=false; state.view="progress"; render(); toast("Тренировка завершена · 94% выполнения"); }
  if (action === "toggle-builder") { const body=target.parentElement.querySelector(".builder-body"); body.hidden=!body.hidden; }
  if (action === "assign-workout") toast("Push A назначена Dan");
  if (action === "add-to-workout") { state.view="exercises"; render(); toast("Выберите упражнение из библиотеки"); }
  if (action === "generate-description") {
    const name=document.querySelector("#ex-name").value.trim()||"Упражнение"; const group=document.querySelector("#ex-group").value;
    document.querySelector("#ai-result").innerHTML=`<div class="ai-draft"><p class="eyebrow">Черновик Gen Sport</p><h3>${esc(name)}</h3><p><strong>Основные мышцы:</strong> ${esc(group)}.<br><strong>Техника:</strong> Сохраняй нейтральное положение корпуса, контролируй амплитуду и не ускоряй негативную фазу.<br><strong>Ошибка:</strong> Не компенсируй движение инерцией.</p><div class="actions"><button class="btn btn-secondary" type="button" data-action="accept-description">✓ Принять</button><button class="btn btn-ghost" type="button" data-action="reject-description">Отклонить</button></div></div>`;
  }
  if (action === "accept-description") { target.closest(".ai-draft").dataset.accepted="true"; toast("Описание принято"); }
  if (action === "reject-description") document.querySelector("#ai-result").innerHTML="";
});

document.addEventListener("input", (event) => {
  if (event.target.id === "exercise-search") {
    const q=event.target.value.toLowerCase(); document.querySelector("#exercise-grid").innerHTML=state.exercises.filter(x=>(x.name+x.muscles).toLowerCase().includes(q)).map(exerciseCard).join("") || `<div class="card empty">Ничего не найдено.</div>`;
  }
  if (event.target.dataset.actual) { const i=Number(event.target.dataset.set); state.sets[i][event.target.dataset.actual==="weight"?"actualWeight":"actualReps"]=event.target.value; saveState(); }
  if (event.target.dataset.plan) { const i=Number(event.target.dataset.set); state.sets[i][event.target.dataset.plan==="weight"?"planWeight":"planReps"]=Number(event.target.value); saveState(); }
});

document.addEventListener("submit", (event) => {
  event.preventDefault();
  if (event.target.id === "exercise-form") { const data=new FormData(event.target); const name=data.get("name"); const group=data.get("group"); state.exercises.push({id:Date.now(),name,muscles:`${group} · стабилизаторы`,category:group,description:"Сохраняй нейтральное положение корпуса, контролируй амплитуду и негативную фазу."}); closeModal(); render(); toast("Упражнение добавлено"); }
  if (event.target.id === "workout-form") { const data=new FormData(event.target); state.templates.unshift({id:Date.now(),name:data.get("name"),note:data.get("note"),duration:Number(data.get("duration"))||60}); closeModal(); render(); toast("Шаблон тренировки создан"); }
});

render();

function registerWebMcpTools() {
  const context = document.modelContext;
  if (!context?.registerTool) return;
  const register = (tool) => {
    try { void Promise.resolve(context.registerTool(tool)).catch(() => {}); } catch {}
  };
  register({
    name: "switch_profile",
    title: "Переключить профиль Gen Sport",
    description: "Переключает видимый интерфейс между Artem (тренер) и Dan (подопечный).",
    inputSchema: { type: "object", properties: { role: { type: "string", enum: ["trainer", "client"] } }, required: ["role"], additionalProperties: false },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute(input) {
      if (!input || !["trainer", "client"].includes(input.role)) throw new Error("role должен быть trainer или client");
      state.role = input.role; state.view = "home"; render();
      return { role: state.role, profile: state.role === "trainer" ? "Artem" : "Dan" };
    }
  });
  register({
    name: "add_exercise",
    title: "Добавить упражнение",
    description: "Добавляет новое упражнение в библиотеку Artem и обновляет видимый список.",
    inputSchema: { type: "object", properties: { name: { type: "string", minLength: 2 }, muscleGroup: { type: "string", minLength: 2 } }, required: ["name", "muscleGroup"], additionalProperties: false },
    annotations: { readOnlyHint: false, untrustedContentHint: true },
    execute(input) {
      if (!input || typeof input.name !== "string" || input.name.trim().length < 2 || typeof input.muscleGroup !== "string" || input.muscleGroup.trim().length < 2) throw new Error("Укажите название и группу мышц");
      const exercise = { id: Date.now(), name: input.name.trim(), muscles: `${input.muscleGroup.trim()} · стабилизаторы`, category: input.muscleGroup.trim(), description: "Контролируй амплитуду и негативную фазу движения." };
      state.exercises.push(exercise); state.role = "trainer"; state.view = "exercises"; render();
      return { id: exercise.id, name: exercise.name, saved: true };
    }
  });
  register({
    name: "log_workout_set",
    title: "Записать подход Dan",
    description: "Сохраняет фактический вес и число повторений для подхода в текущей тренировке Dan.",
    inputSchema: { type: "object", properties: { setIndex: { type: "integer", minimum: 0, maximum: 4 }, weight: { type: "number", minimum: 0 }, reps: { type: "integer", minimum: 0 } }, required: ["setIndex", "weight", "reps"], additionalProperties: false },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute(input) {
      if (!input || !Number.isInteger(input.setIndex) || !state.sets[input.setIndex] || typeof input.weight !== "number" || !Number.isInteger(input.reps)) throw new Error("Некорректные данные подхода");
      Object.assign(state.sets[input.setIndex], { actualWeight: input.weight, actualReps: input.reps, done: true });
      state.role = "client"; state.view = "session"; state.workoutStarted = true; render();
      return { setIndex: input.setIndex, weight: input.weight, reps: input.reps, done: true };
    }
  });
}

registerWebMcpTools();
