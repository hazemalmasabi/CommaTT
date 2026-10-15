/**
 * Comma Smart School - Prototype Engine & PWA Controller
 */

// Initialize default state & localStorage persistence
const STORAGE_KEYS = {
  STUDENTS: 'comma_students_data',
  STAFF: 'comma_staff_data',
  SETTINGS: 'comma_settings'
};

const DEFAULT_STUDENTS = [
  {
    id: 's01',
    code: '#2024-001',
    name: 'أحمد الراشد',
    grade: 'الصف 10',
    section: '10-A',
    gender: 'ذكر',
    avatar: 'أر',
    color: 'blue',
    status: 'نشط',
    guardian: 'محمد الراشد',
    guardianRelation: 'أب',
    guardianPhone: '0501234567',
    hasGuardian: true,
    hasHealthIssues: false,
    fileComplete: true,
    gpa: '98.5%',
    attendance: '99%',
    nationalId: '1098765432',
    birthDate: '2009-04-12',
    bloodType: 'O+',
    issuesCount: 0,
    issueText: ''
  },
  {
    id: 's02',
    code: '#2024-002',
    name: 'سارة المطيري',
    grade: 'الصف 10',
    section: '10-A',
    gender: 'أنثى',
    avatar: 'سم',
    color: 'danger',
    status: 'نشط',
    guardian: 'سلطان المطيري',
    guardianRelation: 'أب',
    guardianPhone: '0559876543',
    hasGuardian: true,
    hasHealthIssues: true,
    fileComplete: true,
    gpa: '96.2%',
    attendance: '97%',
    nationalId: '1087654321',
    birthDate: '2009-08-25',
    bloodType: 'A+',
    issuesCount: 1,
    issueText: 'الملف الصحي غير مكتمل (فحص اللياقة المدرسية واللقاحات)'
  },
  {
    id: 's03',
    code: '#2024-003',
    name: 'عمر الدوسري',
    grade: 'الصف 9',
    section: '9-B',
    gender: 'ذكر',
    avatar: 'عد',
    color: 'danger',
    status: 'نشط',
    guardian: 'غير مسجل',
    guardianRelation: '-',
    guardianPhone: '',
    hasGuardian: false,
    hasHealthIssues: true,
    fileComplete: false,
    gpa: '88.0%',
    attendance: '89%',
    nationalId: '1109876543',
    birthDate: '2010-02-18',
    bloodType: 'B+',
    issuesCount: 4,
    issueText: 'ولي الأمر غير مرتبط + 3 متطلبات إدارية معلقة'
  },
  {
    id: 's04',
    code: 's22',
    name: 'هند الدوسري',
    grade: 'الصف 10',
    section: '10-A',
    gender: 'أنثى',
    avatar: 'هـ',
    color: 'purple',
    status: 'نشط',
    guardian: 'عبدالله الدوسري',
    guardianRelation: 'أب',
    guardianPhone: '0561122334',
    hasGuardian: true,
    hasHealthIssues: false,
    fileComplete: true,
    gpa: '99.1%',
    attendance: '100%',
    nationalId: '1099887766',
    birthDate: '2009-11-03',
    bloodType: 'AB+',
    issuesCount: 0,
    issueText: ''
  },
  {
    id: 's05',
    code: 's14',
    name: 'مريم الحربي',
    grade: 'الصف 9',
    section: '9-C',
    gender: 'أنثى',
    avatar: 'م',
    color: 'purple',
    status: 'نشط',
    guardian: 'خالد الحربي',
    guardianRelation: 'أب',
    guardianPhone: '0552233445',
    hasGuardian: true,
    hasHealthIssues: false,
    fileComplete: true,
    gpa: '94.0%',
    attendance: '95%',
    nationalId: '1112233445',
    birthDate: '2010-06-19',
    bloodType: 'O-',
    issuesCount: 0,
    issueText: ''
  },
  {
    id: 's06',
    code: 's17',
    name: 'خالد الناصر',
    grade: 'الصف 10',
    section: '10-A',
    gender: 'ذكر',
    avatar: 'خ',
    color: 'blue',
    status: 'نشط',
    guardian: 'ناصر الناصر',
    guardianRelation: 'أب',
    guardianPhone: '0509988776',
    hasGuardian: true,
    hasHealthIssues: false,
    fileComplete: true,
    gpa: '91.8%',
    attendance: '93%',
    nationalId: '1091234567',
    birthDate: '2009-01-30',
    bloodType: 'A-',
    issuesCount: 0,
    issueText: ''
  },
  {
    id: 's07',
    code: 's23',
    name: 'سلطان الراشدي',
    grade: 'الصف 10',
    section: '10-A',
    gender: 'ذكر',
    avatar: 'س',
    color: 'blue',
    status: 'نشط',
    guardian: 'راشد الراشدي',
    guardianRelation: 'أب',
    guardianPhone: '0533344556',
    hasGuardian: true,
    hasHealthIssues: false,
    fileComplete: true,
    gpa: '95.5%',
    attendance: '98%',
    nationalId: '1097766554',
    birthDate: '2009-07-14',
    bloodType: 'O+',
    issuesCount: 0,
    issueText: ''
  },
  {
    id: 's08',
    code: '#2024-008',
    name: 'ريان الغامدي',
    grade: 'الصف 11',
    section: '11-A',
    gender: 'ذكر',
    avatar: 'رغ',
    color: 'danger',
    status: 'غير نشط',
    guardian: 'غير مسجل',
    guardianRelation: '-',
    guardianPhone: '',
    hasGuardian: false,
    hasHealthIssues: false,
    fileComplete: false,
    gpa: '82.4%',
    attendance: '84%',
    nationalId: '1081122334',
    birthDate: '2008-09-10',
    bloodType: 'B+',
    issuesCount: 2,
    issueText: 'تحديث هوية الطالب وعقد السكن مطلوب'
  },
  {
    id: 's09',
    code: '#2024-009',
    name: 'ليلى العتيبي',
    grade: 'الصف 10',
    section: '10-B',
    gender: 'أنثى',
    avatar: 'لع',
    color: 'purple',
    status: 'نشط',
    guardian: 'سعد العتيبي',
    guardianRelation: 'أب',
    guardianPhone: '0544455667',
    hasGuardian: true,
    hasHealthIssues: false,
    fileComplete: true,
    gpa: '99.7%',
    attendance: '100%',
    nationalId: '1095544332',
    birthDate: '2009-03-22',
    bloodType: 'A+',
    issuesCount: 0,
    issueText: ''
  },
  {
    id: 's10',
    code: '#2024-010',
    name: 'فيصل الشمري',
    grade: 'الصف 12',
    section: '12-A',
    gender: 'ذكر',
    avatar: 'فش',
    color: 'danger',
    status: 'نشط',
    guardian: 'بندر الشمري',
    guardianRelation: 'أب',
    guardianPhone: '0556677889',
    hasGuardian: true,
    hasHealthIssues: false,
    fileComplete: true,
    gpa: '86.0%',
    attendance: '85%',
    nationalId: '1076655443',
    birthDate: '2007-12-05',
    bloodType: 'O+',
    issuesCount: 1,
    issueText: 'إنذار غياب: تجاوز نسبة 12% من الحصص الدراسية'
  },
  {
    id: 's11',
    code: '#2024-011',
    name: 'نورة القحطاني',
    grade: 'الصف 11',
    section: '11-B',
    gender: 'أنثى',
    avatar: 'نق',
    color: 'purple',
    status: 'نشط',
    guardian: 'محمد القحطاني',
    guardianRelation: 'أب',
    guardianPhone: '0507788990',
    hasGuardian: true,
    hasHealthIssues: false,
    fileComplete: true,
    gpa: '97.3%',
    attendance: '98%',
    nationalId: '1089900112',
    birthDate: '2008-05-17',
    bloodType: 'O+',
    issuesCount: 0,
    issueText: ''
  },
  {
    id: 's12',
    code: '#2024-012',
    name: 'فهد العنزي',
    grade: 'بلا فصل',
    section: 'غير محدد',
    gender: 'ذكر',
    avatar: 'فع',
    color: 'danger',
    status: 'غير نشط',
    guardian: 'عادل العنزي',
    guardianRelation: 'أب',
    guardianPhone: '0531234567',
    hasGuardian: true,
    hasHealthIssues: false,
    fileComplete: false,
    gpa: '90.0%',
    attendance: '91%',
    nationalId: '1105544332',
    birthDate: '2010-10-08',
    bloodType: 'B-',
    issuesCount: 2,
    issueText: 'لم يتم تسكينه في أي فصل حتى الآن'
  }
];

const DEFAULT_STAFF = [
  { id: 'st01', nameAr: 'أ. سلمى الصباح', nameEn: 'Ms. Salma Al-Sabah', role: 'Principal', type: 'admin', status: 'نشط', avatar: 'أ', color: 'blue' },
  { id: 'st02', nameAr: 'أ. سالم العجمي', nameEn: 'Mr. Salem Al-Ajmi', role: 'Vice_principal', type: 'admin', status: 'نشط', avatar: 'أ', color: 'blue' },
  { id: 'st03', nameAr: 'أ. دانا الراشدي', nameEn: 'Ms. Dana Al-Rashidi', role: 'مرشد أكاديمي', type: 'admin', status: 'نشط', avatar: 'أ', color: 'pink' },
  { id: 'st04', nameAr: 'د. هبة منصور', nameEn: 'Dr. Heba Mansour', role: 'Psychologist', type: 'admin', status: 'نشط', avatar: 'د', color: 'purple' },
  { id: 'st05', nameAr: 'خالد المطيري', nameEn: 'Mr. Khaled Al-Mutairi', role: 'أمين المقصف', type: 'admin', status: 'نشط', avatar: 'خ', color: 'blue' },
  { id: 'st06', nameAr: 'أ. طارق الزهراني', nameEn: 'Mr. Tarek Al-Zahrani', role: 'رئيس قسم العلوم', type: 'teacher', status: 'نشط', avatar: 'ط', color: 'blue' },
  { id: 'st07', nameAr: 'أ. منيرة السبيعي', nameEn: 'Ms. Munira Al-Subaie', role: 'معلمة لغة عربية', type: 'teacher', status: 'نشط', avatar: 'م', color: 'pink' },
  { id: 'st08', nameAr: 'أ. فهد الشريف', nameEn: 'Mr. Fahad Al-Sharif', role: 'معلم رياضيات', type: 'teacher', status: 'نشط', avatar: 'ف', color: 'blue' },
  { id: 'st09', nameAr: 'أ. ريم الخالدي', nameEn: 'Ms. Reem Al-Khalidi', role: 'مسؤولة القبول والتسجيل', type: 'admin', status: 'نشط', avatar: 'ر', color: 'pink' },
  { id: 'st10', nameAr: 'أ. ماجد العنزي', nameEn: 'Mr. Majed Al-Enezi', role: 'معلم لغة إنجليزية', type: 'teacher', status: 'نشط', avatar: 'م', color: 'blue' },
  { id: 'st11', nameAr: 'أ. بدرية الشهري', nameEn: 'Ms. Badria Al-Shehri', role: 'معلمة حاسب وذكاء اصطناعي', type: 'teacher', status: 'نشط', avatar: 'ب', color: 'pink' },
  { id: 'st12', nameAr: 'أ. فيصل الدوسري', nameEn: 'Mr. Faisal Al-Dossari', role: 'معلم فيزياء وكيمياء', type: 'teacher', status: 'نشط', avatar: 'ف', color: 'blue' }
];

// App State
let studentsList = [];
let staffList = [];
let currentFilter = 'all';
let currentStaffFilter = 'all';
let studentSearchQuery = '';
let staffSearchQuery = '';
let deferredInstallPrompt = null;

// Initialize Data
function initAppData() {
  const cachedStudents = localStorage.getItem(STORAGE_KEYS.STUDENTS);
  studentsList = cachedStudents ? JSON.parse(cachedStudents) : [...DEFAULT_STUDENTS];

  const cachedStaff = localStorage.getItem(STORAGE_KEYS.STAFF);
  staffList = cachedStaff ? JSON.parse(cachedStaff) : [...DEFAULT_STAFF];

  // Update dynamic clock in status bar
  updateStatusBarClock();
  setInterval(updateStatusBarClock, 10000);

  // Render initial views
  renderDashboardMetrics();
  renderStudentsList();
  renderStaffList();
  setupNavigationHandlers();
  setupSearchAndFilters();
  setupModalHandlers();
  setupPWA();
}

function saveStudentsData() {
  localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(studentsList));
  renderDashboardMetrics();
  renderStudentsList();
}

function saveStaffData() {
  localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(staffList));
  renderStaffList();
}

// Clock for iPhone status bar
function updateStatusBarClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  const timeStr = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  const clockEl = document.getElementById('status-time-display');
  if (clockEl) clockEl.textContent = timeStr;
}

// Metrics calculation
function renderDashboardMetrics() {
  const totalStudents = studentsList.length;
  const activeStudents = studentsList.filter(s => s.status === 'نشط').length;
  const missingGuardian = studentsList.filter(s => !s.hasGuardian).length;
  const missingHealth = studentsList.filter(s => s.hasHealthIssues).length;
  const missingClass = studentsList.filter(s => s.grade === 'بلا فصل').length;
  const totalIssues = studentsList.filter(s => s.issuesCount > 0).length;

  // Header quick badges
  safeSetText('metric-students-count', totalStudents.toString());
  safeSetText('metric-teachers-count', staffList.filter(s => s.type === 'teacher').length.toString());
  safeSetText('metric-parents-count', '9');
  safeSetText('metric-classes-count', '6');
  safeSetText('metric-departments-count', '2');
  safeSetText('metric-issues-count', totalIssues.toString());

  // Alert row
  safeSetText('alert-risk-count', '7');
  safeSetText('alert-subjects-count', '2');
  safeSetText('alert-required-count', totalIssues.toString());
  safeSetText('alert-missing-links', missingGuardian.toString());

  // Students Page stats strip
  safeSetText('strip-total', totalStudents.toString());
  safeSetText('strip-active', activeStudents.toString());
  safeSetText('strip-health', missingHealth.toString());
  safeSetText('strip-guardian', missingGuardian.toString());
  safeSetText('strip-noclass', missingClass.toString());

  // Filter labels counts
  safeSetText('pill-count-all', `الكل (${totalStudents})`);
  safeSetText('pill-count-issues', `المشاكل فقط (${totalIssues})`);
  safeSetText('pill-count-noguardian', `بلا ولي أمر (${missingGuardian})`);
  safeSetText('pill-count-incomplete', `ملف غير مكتمل (${studentsList.filter(s => !s.fileComplete).length})`);
}

function safeSetText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

// Navigation between Tabs & Subpages
function setupNavigationHandlers() {
  const allNavButtons = document.querySelectorAll('.nav-tab-btn, .sidebar-nav-btn');
  allNavButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      if (targetTab) {
        switchTab(targetTab);
      }
    });
  });
}

function switchTab(tabId) {
  // Update mobile bottom nav active state
  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
  });

  // Update desktop sidebar nav active state
  document.querySelectorAll('.sidebar-nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
  });

  // Switch tab views
  document.querySelectorAll('.tab-view').forEach(view => {
    view.classList.remove('active');
  });

  const activeView = document.getElementById(`tab-view-${tabId}`);
  if (activeView) {
    activeView.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Deep links from Dashboard tool cards
window.navigateTo = function(target) {
  switchTab(target);
};

// Search & Filter system
function setupSearchAndFilters() {
  // Student Search
  const studentSearchInput = document.getElementById('student-search-input');
  if (studentSearchInput) {
    studentSearchInput.addEventListener('input', (e) => {
      studentSearchQuery = e.target.value.trim().toLowerCase();
      renderStudentsList();
    });
  }

  // Student Filter Pills
  const studentFilterPills = document.querySelectorAll('.student-filter-pill');
  studentFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      studentFilterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentFilter = pill.getAttribute('data-filter');
      renderStudentsList();
    });
  });

  // Staff Search
  const staffSearchInput = document.getElementById('staff-search-input');
  if (staffSearchInput) {
    staffSearchInput.addEventListener('input', (e) => {
      staffSearchQuery = e.target.value.trim().toLowerCase();
      renderStaffList();
    });
  }

  // Staff Filter Pills
  const staffFilterPills = document.querySelectorAll('.staff-filter-pill');
  staffFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      staffFilterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentStaffFilter = pill.getAttribute('data-filter');
      renderStaffList();
    });
  });
}

// Render Students List
function renderStudentsList() {
  const container = document.getElementById('students-list-container');
  if (!container) return;

  // Filter students
  let filtered = studentsList.filter(student => {
    // Search query match
    if (studentSearchQuery) {
      const matchName = student.name.toLowerCase().includes(studentSearchQuery);
      const matchCode = student.code.toLowerCase().includes(studentSearchQuery);
      const matchClass = (student.grade + ' ' + student.section).toLowerCase().includes(studentSearchQuery);
      if (!matchName && !matchCode && !matchClass) return false;
    }

    // Filter pill match
    if (currentFilter === 'issues') return student.issuesCount > 0;
    if (currentFilter === 'noguardian') return !student.hasGuardian;
    if (currentFilter === 'incomplete') return !student.fileComplete || student.hasHealthIssues;
    if (currentFilter === 'active') return student.status === 'نشط';
    if (currentFilter === 'inactive') return student.status !== 'نشط';
    return true; // 'all'
  });

  // Update total count indicator
  safeSetText('students-list-count', `${filtered.length} طالب من أصل ${studentsList.length}`);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 10px; color: #94a3b8;">
        <div style="font-size: 40px; margin-bottom: 8px;">🔍</div>
        <div style="font-weight: 700; font-size: 15px; color: #475569;">لا توجد نتائج مطابقة</div>
        <div style="font-size: 12px; margin-top: 4px;">جرب تغيير كلمة البحث أو الفلتر المختار</div>
      </div>
    `;
    return;
  }

  let html = '';
  filtered.forEach(student => {
    const isProblematic = student.issuesCount > 0;

    html += `
      <div class="student-card ${isProblematic ? 'has-issues' : ''}" data-student-id="${student.id}">
        <div class="student-card-header">
          <div class="student-profile-group">
            <div class="student-avatar ${student.color}">
              ${student.avatar}
            </div>
            <div class="student-meta-title">
              <div class="student-name">${student.name}</div>
              <div class="student-sub-id">${student.code} • ${student.grade} - ${student.section}</div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            ${isProblematic ? `<span class="student-badge-alert">${student.issuesCount} نقص</span>` : ''}
            <button class="student-options-btn" onclick="openStudentQuickActions('${student.id}')" title="خيارات">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
            </button>
          </div>
        </div>

        <div class="student-badges-row">
          ${student.hasHealthIssues ? 
            `<span class="badge-pill-warning">صحي ناقص ⚠️</span>` : 
            `<span class="badge-pill-success">صحي مكتمل ✓</span>`}
          
          ${student.hasGuardian ? 
            `<span class="badge-pill-success">ولي أمر ✓</span>` : 
            `<span class="badge-pill-danger">بلا ولي أمر ⚠️</span>`}
            
          ${student.fileComplete ? 
            `<span class="badge-pill-success">ملف مكتمل ✓</span>` : 
            `<span class="badge-pill-warning">ملف غير مكتمل</span>`}

          <span class="badge-pill-success">${student.status} ✓</span>
        </div>

        ${isProblematic ? `
          <div class="student-issue-banner" onclick="openStudentDetails('${student.id}')">
            <span>⚠️ ${student.issueText || 'يوجد نواقص تتطلب المراجعة'}</span>
            <span style="font-weight: 800; font-size: 11px;">عرض النواقص &gt;</span>
          </div>
        ` : ''}

        <button class="open-profile-btn" onclick="openStudentDetails('${student.id}')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          فتح الملف
        </button>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Render Staff List
function renderStaffList() {
  const container = document.getElementById('staff-list-container');
  if (!container) return;

  const totalStaff = staffList.length;
  const teachersCount = staffList.filter(s => s.type === 'teacher').length;
  const adminsCount = staffList.filter(s => s.type === 'admin').length;

  safeSetText('staff-strip-parents', '0');
  safeSetText('staff-strip-admins', adminsCount.toString());
  safeSetText('staff-strip-teachers', teachersCount.toString());

  safeSetText('pill-staff-all', `الكل (${totalStaff})`);
  safeSetText('pill-staff-teachers', `المعلمون (${teachersCount})`);
  safeSetText('pill-staff-admins', `الإداريون (${adminsCount})`);

  let filtered = staffList.filter(member => {
    if (staffSearchQuery) {
      const matchAr = member.nameAr.toLowerCase().includes(staffSearchQuery);
      const matchEn = member.nameEn.toLowerCase().includes(staffSearchQuery);
      const matchRole = member.role.toLowerCase().includes(staffSearchQuery);
      if (!matchAr && !matchEn && !matchRole) return false;
    }

    if (currentStaffFilter === 'teachers') return member.type === 'teacher';
    if (currentStaffFilter === 'admins') return member.type === 'admin';
    if (currentStaffFilter === 'parents') return member.type === 'parent';
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 10px; color: #94a3b8;">
        <div style="font-size: 40px; margin-bottom: 8px;">👥</div>
        <div style="font-weight: 700; font-size: 15px; color: #475569;">لا يوجد موظفون مطابقون</div>
      </div>
    `;
    return;
  }

  let html = '';
  filtered.forEach(member => {
    html += `
      <div class="user-card-item" onclick="openStaffDetails('${member.id}')">
        <div class="user-info-side">
          <div class="user-avatar-circle ${member.color}">
            ${member.avatar}
          </div>
          <div class="user-names-col">
            <div class="user-arabic-name">${member.nameAr}</div>
            <div class="user-english-name">${member.nameEn}</div>
            <div class="user-role-tag ${member.color === 'pink' ? 'pink' : ''}">${member.role}</div>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="badge-pill-success">${member.status} ✓</span>
          <span style="color: #cbd5e1; font-weight: 800; font-size: 18px;">›</span>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Student Details Drawer
window.openStudentDetails = function(studentId) {
  const student = studentsList.find(s => s.id === studentId);
  if (!student) return;

  const content = document.getElementById('student-modal-body');
  if (!content) return;

  content.innerHTML = `
    <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 18px;">
      <div class="student-avatar ${student.color}" style="width: 58px; height: 58px; font-size: 20px;">
        ${student.avatar}
      </div>
      <div>
        <h3 style="font-size: 18px; font-weight: 800; color: #0f172a;">${student.name}</h3>
        <p style="font-size: 13px; color: #64748b; margin-top: 2px;">${student.code} • ${student.grade} - ${student.section}</p>
        <span class="badge-pill-success" style="margin-top: 6px;">${student.status}</span>
      </div>
    </div>

    <!-- Quick Metrics in Sheet -->
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 18px; text-align: center;">
      <div style="background: #f8fafc; padding: 10px; border-radius: 12px; border: 1px solid #e2e8f0;">
        <div style="font-size: 11px; color: #64748b; font-weight: 600;">المعدل التراكمي</div>
        <div style="font-size: 16px; font-weight: 800; color: #2563eb; margin-top: 2px;">${student.gpa}</div>
      </div>
      <div style="background: #f8fafc; padding: 10px; border-radius: 12px; border: 1px solid #e2e8f0;">
        <div style="font-size: 11px; color: #64748b; font-weight: 600;">نسبة الحضور</div>
        <div style="font-size: 16px; font-weight: 800; color: #059669; margin-top: 2px;">${student.attendance}</div>
      </div>
      <div style="background: #f8fafc; padding: 10px; border-radius: 12px; border: 1px solid #e2e8f0;">
        <div style="font-size: 11px; color: #64748b; font-weight: 600;">فصيلة الدم</div>
        <div style="font-size: 16px; font-weight: 800; color: #dc2626; margin-top: 2px;">${student.bloodType}</div>
      </div>
    </div>

    <!-- Details Sections -->
    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 14px; margin-bottom: 12px;">
      <div style="font-weight: 800; font-size: 13.5px; color: #1e40af; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
        <span>👤</span> بيانات ولي الأمر والاتصال
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 13px; padding: 6px 0; border-bottom: 1px solid #f1f5f9;">
        <span style="color: #64748b;">اسم ولي الأمر:</span>
        <span style="font-weight: 700; color: #0f172a;">${student.guardian} (${student.guardianRelation})</span>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 13px; padding: 6px 0;">
        <span style="color: #64748b;">رقم الهاتف:</span>
        <span style="font-weight: 700; color: #2563eb; direction: ltr;">${student.guardianPhone || 'غير مسجل'}</span>
      </div>
    </div>

    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 14px; margin-bottom: 14px;">
      <div style="font-weight: 800; font-size: 13.5px; color: #1e40af; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
        <span>🩺</span> الحالة الصحية والملاحظات
      </div>
      <div style="font-size: 13px; color: ${student.hasHealthIssues ? '#b91c1c' : '#059669'}; line-height: 1.5;">
        ${student.hasHealthIssues ? `⚠️ ${student.issueText}` : '✓ الملف الصحي سليم ومحدث بالكامل ولا توجد ملاحظات حرجة.'}
      </div>
    </div>

    <div style="display: flex; gap: 8px;">
      <button class="action-btn-primary" onclick="toggleStudentHealth('${student.id}')" style="background: #0284c7;">
        ${student.hasHealthIssues ? 'اعتماد الملف الصحي ✓' : 'تسجيل ملاحظة صحية ⚠️'}
      </button>
      <button class="action-btn-secondary" onclick="closeModal('student-details-modal')">إغلاق</button>
    </div>
  `;

  openModal('student-details-modal');
};

window.toggleStudentHealth = function(studentId) {
  const student = studentsList.find(s => s.id === studentId);
  if (!student) return;

  student.hasHealthIssues = !student.hasHealthIssues;
  if (!student.hasHealthIssues) {
    student.issuesCount = Math.max(0, student.issuesCount - 1);
    student.issueText = '';
    showToast('تم اعتماد الملف الصحي للطالب بنجاح ✓');
  } else {
    student.issuesCount += 1;
    student.issueText = 'الملف الصحي يحتاج متابعة وتحديث';
    showToast('تم تسجيل ملاحظة صحية على ملف الطالب ⚠️');
  }

  saveStudentsData();
  closeModal('student-details-modal');
};

// Staff Details Drawer
window.openStaffDetails = function(staffId) {
  const member = staffList.find(s => s.id === staffId);
  if (!member) return;

  const content = document.getElementById('staff-modal-body');
  if (!content) return;

  content.innerHTML = `
    <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 18px;">
      <div class="user-avatar-circle ${member.color}" style="width: 58px; height: 58px; font-size: 22px;">
        ${member.avatar}
      </div>
      <div>
        <h3 style="font-size: 18px; font-weight: 800; color: #0f172a;">${member.nameAr}</h3>
        <p style="font-size: 13px; color: #64748b; direction: ltr; text-align: right;">${member.nameEn}</p>
        <div style="margin-top: 4px;">
          <span class="user-role-tag">${member.role}</span>
          <span class="badge-pill-success" style="margin-right: 4px;">${member.status}</span>
        </div>
      </div>
    </div>

    <div style="background: #f8fafc; border-radius: 14px; padding: 14px; margin-bottom: 14px; font-size: 13px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <span style="color: #64748b;">نوع الحساب:</span>
        <span style="font-weight: 700;">${member.type === 'teacher' ? 'معلم أساسي' : 'طاقم إداري'}</span>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <span style="color: #64748b;">البريد المدرسي:</span>
        <span style="font-weight: 700; color: #2563eb; direction: ltr;">${member.nameEn.toLowerCase().replace(/[^a-z]/g, '')}@comma.edu</span>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span style="color: #64748b;">حالة الصلاحيات:</span>
        <span style="font-weight: 700; color: #059669;">صلاحيات كاملة مفعلة</span>
      </div>
    </div>

    <button class="modal-submit-btn" onclick="closeModal('staff-details-modal')">إغلاق الملف</button>
  `;

  openModal('staff-details-modal');
};

// Modal helpers
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('open');
}

window.closeModal = function(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('open');
};

function setupModalHandlers() {
  // Add Student Form submission
  const addStudentForm = document.getElementById('add-student-form');
  if (addStudentForm) {
    addStudentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('new-student-name').value.trim();
      const grade = document.getElementById('new-student-grade').value;
      const section = document.getElementById('new-student-section').value;
      const guardian = document.getElementById('new-student-guardian').value.trim();
      const phone = document.getElementById('new-student-phone').value.trim();
      const hasHealthIssue = document.getElementById('new-student-health').checked;

      if (!name) return;

      const codeNum = studentsList.length + 1;
      const newCode = `#2024-${codeNum < 10 ? '00' + codeNum : (codeNum < 100 ? '0' + codeNum : codeNum)}`;
      const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('');

      const newStudent = {
        id: 's_' + Date.now(),
        code: newCode,
        name: name,
        grade: grade,
        section: section,
        gender: 'ذكر',
        avatar: initials || 'ط',
        color: hasHealthIssue ? 'danger' : 'blue',
        status: 'نشط',
        guardian: guardian || 'غير مسجل',
        guardianRelation: 'ولي أمر',
        guardianPhone: phone || '',
        hasGuardian: Boolean(guardian),
        hasHealthIssues: hasHealthIssue,
        fileComplete: Boolean(guardian && !hasHealthIssue),
        gpa: '95.0%',
        attendance: '100%',
        nationalId: '10' + Math.floor(10000000 + Math.random() * 90000000),
        birthDate: '2009-05-15',
        bloodType: 'O+',
        issuesCount: hasHealthIssue ? 1 : (guardian ? 0 : 1),
        issueText: hasHealthIssue ? 'فحص صحي معلق' : (!guardian ? 'ولي أمر غير مرتبط' : '')
      };

      studentsList.unshift(newStudent);
      saveStudentsData();
      addStudentForm.reset();
      closeModal('add-student-modal');
      showToast(`تمت إضافة الطالب ${name} بنجاح 🎉`);
    });
  }

  // Add Staff Form submission
  const addStaffForm = document.getElementById('add-staff-form');
  if (addStaffForm) {
    addStaffForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameAr = document.getElementById('new-staff-name-ar').value.trim();
      const nameEn = document.getElementById('new-staff-name-en').value.trim();
      const role = document.getElementById('new-staff-role').value.trim();
      const type = document.getElementById('new-staff-type').value;

      if (!nameAr) return;

      const newStaff = {
        id: 'st_' + Date.now(),
        nameAr: nameAr,
        nameEn: nameEn || nameAr,
        role: role || 'معلم',
        type: type,
        status: 'نشط',
        avatar: nameAr[0] || 'م',
        color: type === 'teacher' ? 'blue' : 'pink'
      };

      staffList.unshift(newStaff);
      saveStaffData();
      addStaffForm.reset();
      closeModal('add-staff-modal');
      showToast(`تمت إضافة ${nameAr} إلى الطاقم بنجاح 🎉`);
    });
  }

  // Close modals on clicking overlay backdrop
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
      }
    });
  });
}

// Quick student action options
window.openStudentQuickActions = function(studentId) {
  const student = studentsList.find(s => s.id === studentId);
  if (!student) return;

  const content = document.getElementById('quick-actions-body');
  if (!content) return;

  content.innerHTML = `
    <h3 style="font-size: 16px; font-weight: 800; margin-bottom: 12px; color: #0f172a;">إجراءات سريعة: ${student.name}</h3>
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <button class="open-profile-btn" onclick="openStudentDetails('${student.id}'); closeModal('quick-actions-modal');" style="justify-content: flex-start; padding: 0 14px;">
        👤 عرض الملف الشامل والبيانات
      </button>
      <button class="open-profile-btn" onclick="toggleStudentActive('${student.id}'); closeModal('quick-actions-modal');" style="justify-content: flex-start; padding: 0 14px;">
        🔄 تغيير الحالة (${student.status === 'نشط' ? 'تعيين كغير نشط' : 'تفعيل الحساب'})
      </button>
      <button class="open-profile-btn" onclick="deleteStudent('${student.id}'); closeModal('quick-actions-modal');" style="justify-content: flex-start; padding: 0 14px; color: #dc2626; border-color: #fecaca; background: #fef2f2;">
        🗑️ حذف سجل الطالب
      </button>
    </div>
  `;

  openModal('quick-actions-modal');
};

window.toggleStudentActive = function(studentId) {
  const student = studentsList.find(s => s.id === studentId);
  if (!student) return;
  student.status = student.status === 'نشط' ? 'غير نشط' : 'نشط';
  saveStudentsData();
  showToast(`تم تحديث حالة الطالب إلى (${student.status})`);
};

window.deleteStudent = function(studentId) {
  if (confirm('هل أنت متأكد من حذف هذا السجل؟')) {
    studentsList = studentsList.filter(s => s.id !== studentId);
    saveStudentsData();
    showToast('تم حذف سجل الطالب بنجاح');
  }
};

// Export Students Data
window.exportStudentsData = function() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(studentsList, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `comma_students_${Date.now()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast('تم تصدير ملف بيانات الطلاب بنجاح 📥');
};

// Import template notice
window.openImportModal = function() {
  openModal('import-dialog-modal');
};

// Toast notification helper
function showToast(message) {
  let toast = document.getElementById('toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// PWA Setup & Service Worker registration
function setupPWA() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => {
          console.log('Comma PWA ServiceWorker registered with scope:', reg.scope);
        })
        .catch(err => {
          console.warn('ServiceWorker registration error:', err);
        });
    });
  }

  // Capture install prompt for Android/Chrome
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    const installBtn = document.getElementById('btn-install-pwa');
    if (installBtn) {
      installBtn.style.display = 'inline-flex';
    }
  });

  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    showToast('تم تثبيت Comma Smart School كتطبيق بنجاح! 🚀');
  });
}

window.triggerNativeInstallPrompt = function() {
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    deferredInstallPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        showToast('جاري تثبيت التطبيق...');
      }
      deferredInstallPrompt = null;
    });
  } else {
    showToast('على هواتف آيفون: اضغط زر المشاركة بالأسفل ⎋ ثم اختر «إضافة إلى الشاشة الرئيسية»');
  }
};

window.triggerInstallPWA = function() {
  if (deferredInstallPrompt) {
    window.triggerNativeInstallPrompt();
  } else {
    // Open visual PWA guide for iOS Safari and other browsers
    openModal('pwa-guide-modal');
  }
};

// Start application on DOM ready
document.addEventListener('DOMContentLoaded', initAppData);
