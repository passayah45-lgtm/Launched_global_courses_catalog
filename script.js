// 1. Data Arrays
const courses = [
  {id:1, icon:'💻', title:'Course Catalog Website for LaunchED', tags:['HTML','CSS','JavaScript'], category:'Web Development', free:true, duration:'19 weeks', deadline:'May 29', slots:3, total:5},
  {id:2, icon:'🎨', title:'Responsive UI Design with CSS', tags:['CSS','Flexbox','Grid'], category:'Design', free:true, duration:'8 weeks', deadline:'Jun 15', slots:2, total:6},
  {id:3, icon:'⚡', title:'JavaScript Interactivity & DOM', tags:['JavaScript','DOM','Events'], category:'Web Development', free:false, duration:'10 weeks', deadline:'Jul 1', slots:4, total:8},
  {id:4, icon:'📊', title:'Python for Data Analysis', tags:['Python','Pandas','NumPy'], category:'Data', free:false, duration:'12 weeks', deadline:'Jul 20', slots:1, total:5},
  {id:5, icon:'⚛️', title:'React for Beginners', tags:['React','JSX','Hooks'], category:'Web Development', free:false, duration:'14 weeks', deadline:'Aug 5', slots:5, total:10},
  {id:6, icon:'🗄️', title:'SQL & Database Foundations', tags:['SQL','MySQL','CRUD'], category:'Data', free:true, duration:'6 weeks', deadline:'Jun 30', slots:3, total:7},
];

const mentors = [
  { name: 'Dr. Sarah Chen', role: 'Lead Data Scientist', company: 'Google', bio: 'Expert in Machine Learning and Python for Analytics.', img: '👤' },
  { name: 'Alex Rivera', role: 'Senior Web Developer', company: 'Meta', bio: 'Full-stack specialist focusing on React and Node.js.', img: '👨‍💻' },
  { name: 'Marcus Thorne', role: 'UI/UX Director', company: 'Airbnb', bio: 'Design thinking advocate with 10+ years experience.', img: '🎨' }
];

const schedule = [
  { day: 'Mon', time: '10:00 AM', topic: 'HTML & CSS Deep Dive', mentor: 'Alex Rivera' },
  { day: 'Wed', time: '02:00 PM', topic: 'JavaScript DOM Logic', mentor: 'Alex Rivera' },
  { day: 'Fri', time: '09:00 AM', topic: 'Data Analysis with Python', mentor: 'Dr. Sarah Chen' },
  { day: 'Sat', time: '11:00 AM', topic: 'UI/UX Workshop', mentor: 'Marcus Thorne' }
];

let enrolledCourses = new Set([1]);

// 2. Tab Switching Logic
function showTab(tabName, element) {
  const views = ['view-courses', 'view-mentors', 'view-schedule'];
  views.forEach(view => {
    const el = document.getElementById(view);
    if (el) el.classList.add('hidden');
  });

  document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));

  const targetView = document.getElementById('view-' + tabName);
  if (targetView) targetView.classList.remove('hidden');
  element.classList.add('active');
}

// 3. Render Courses Function
function renderCourses() {
  const grid = document.getElementById('courses-grid');
  if (!grid) return;

  grid.innerHTML = courses.map(course => {
    const isEnrolled = enrolledCourses.has(course.id);
    const percentFilled = Math.round((course.slots / course.total) * 100);

    return `
      <div class="course-card ${course.free ? 'free-accent' : ''}">
        <div class="course-top">
          <div class="course-icon" style="background:var(--surface2)">${course.icon}</div>
          <div class="course-title">${course.title}</div>
          <span class="${course.free ? 'badge-free' : 'badge-paid'}">${course.free ? 'FREE' : 'PAID'}</span>
        </div>
        <div class="tags">
          ${course.tags.map(t => `<span class="tag">${t}</span>`).join('')}
          <span class="tag" style="color:var(--muted)">${course.category}</span>
        </div>
        <div class="course-meta" style="display: flex; gap: 15px; font-size: 11px; color: var(--muted); margin: 10px 0;">
          <span>⏱ ${course.duration}</span> <span>📅 ${course.deadline}</span>
        </div>
        <div class="enroll-row">
          <span style="font-size: 11px; color: var(--muted)">${course.slots}/${course.total} slots</span>
          <div class="slots-bar"><div class="slots-fill" style="width: ${percentFilled}%"></div></div>
          <button class="enroll-btn ${isEnrolled ? 'enrolled' : ''}" onclick="toggleEnroll(${course.id})">
            ${isEnrolled ? '✓ Enrolled' : 'Enroll'}
          </button>
        </div>
      </div>`;
  }).join('');
}

// 4. Render Mentors Function
function renderMentors() {
  const mentorContainer = document.getElementById('view-mentors');
  if (!mentorContainer) return;

  mentorContainer.innerHTML = `
    <div style="padding: 16px; font-family: var(--font-head); font-size: 18px;">Expert Mentors</div>
    ${mentors.map(m => `
      <div class="mentor-card" style="background: var(--surface); border: 0.5px solid var(--border); border-radius: 14px; padding: 16px; margin: 0 16px 12px; display: flex; align-items: center; gap: 15px;">
        <div style="width: 50px; height: 50px; background: var(--surface2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px;">
          ${m.img}
        </div>
        <div class="mentor-info">
          <div style="font-weight: 700; font-size: 14px;">${m.name}</div>
          <div style="font-size: 12px; color: var(--accent); margin-bottom: 4px;">${m.role} @ ${m.company}</div>
          <div style="font-size: 11px; color: var(--muted); line-height: 1.4;">${m.bio}</div>
        </div>
      </div>
    `).join('')}
  `;
}

// 5. Render Schedule Function
function renderSchedule() {
  const scheduleContainer = document.getElementById('view-schedule');
  if (!scheduleContainer) return;

  scheduleContainer.innerHTML = `
    <div style="padding: 16px; font-family: var(--font-head); font-size: 18px;">Class Schedule</div>
    <div style="padding: 0 16px;">
      ${schedule.map(s => `
        <div style="background: var(--surface); border: 0.5px solid var(--border); border-radius: 12px; padding: 14px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-size: 10px; color: var(--accent); font-weight: 700; text-transform: uppercase;">${s.day}</div>
            <div style="font-size: 13px; font-weight: 500; margin: 2px 0;">${s.topic}</div>
            <div style="font-size: 11px; color: var(--muted);">with ${s.mentor}</div>
          </div>
          <div style="background: var(--surface2); padding: 4px 8px; border-radius: 6px; font-size: 11px; font-weight: 500;">
            ${s.time}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// 6. Enrollment Toggle
function toggleEnroll(id) {
  if (enrolledCourses.has(id)) enrolledCourses.delete(id);
  else enrolledCourses.add(id);
  renderCourses();
}

// Initialize all views on load
window.onload = () => {
  renderCourses();
  renderMentors();
  renderSchedule();
};