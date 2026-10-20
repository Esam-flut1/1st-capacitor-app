# مسارات خادم الـ API المتكامل لتطبيق وظائف إب (Node.js / Express + PostgreSQL)
# Wazaef Ibb Backend RESTful API Server Architecture

---

## 🏗️ 1. هيكل المشروع وتنظيمه (Directory Structure)

```
wazaef-ibb-api/
├── package.json
├── .env.example
├── server.js                  # نقطة الدخول الرئيسية وتجهيز Express
├── config/
│   └── db.js                  # إعداد الاتصال بقاعدة بيانات PostgreSQL (pg Pool)
├── middlewares/
│   ├── auth.js                # التحقق من الـ JWT وصلاحيات المستخدم (باحث / صاحب عمل)
│   └── errorHandler.js        # معالجة الأخطاء الموحدة
├── routes/
│   ├── auth.routes.js         # تسجيل الدخول، إنشاء الحساب، والتحقق
│   ├── jobs.routes.js         # الشواغر، البحث بالمديرية، والوظائف المثبتة
│   ├── applications.routes.js # التقديم، الفرز، والمطابقة الذكية AI
│   ├── payments.routes.js     # عمليات الدفع ومحفظة جيب (770088836)
│   ├── chat.routes.js         # المحادثات الفورية وتأكيد المقابلات
│   └── ads.routes.js          # دليل الإعلانات التجارية
└── controllers/               # المنطق البرمجي لكافة المسارات
```

---

## 📦 2. ملف التبعات والمكتبات (`package.json`)

```json
{
  "name": "wazaef-ibb-backend",
  "version": "1.0.0",
  "description": "Backend API Server for Wazaef Ibb Mobile App & Platform",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.19.2",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "pg": "^8.11.5",
    "bcrypt": "^5.1.1",
    "jsonwebtoken": "^9.0.2",
    "helmet": "^7.1.0",
    "morgan": "^1.10.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.0"
  }
}
```

---

## ⚙️ 3. إعداد الاتصال بقاعدة البيانات (`config/db.js`)

```javascript
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/wazaef_ibb_db',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('connect', () => {
  console.log('✅ تم الاتصال بقاعدة بيانات وظائف إب بنجاح (PostgreSQL Connected)');
});

pool.on('error', (err) => {
  console.error('❌ خطأ غير متوقع في قاعدة البيانات:', err);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
```

---

## 🔒 4. وسيط الأمان والمصادقة (`middlewares/auth.js`)

```javascript
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'مطلوب تسجيل الدخول للوصول إلى هذا المورد' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'wazaef_ibb_secret_key_2025');
    req.user = decoded; // يحتوي على id, phone, role
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: 'جلسة العمل غير صالحة أو منتهية، يرجى إعادة تسجيل الدخول' });
  }
};

const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: 'ليس لديك الصلاحية الكافية لتنفيذ هذا الإجراء' 
      });
    }
    next();
  };
};

module.exports = { verifyToken, requireRole };
```

---

## 🛣️ 5. المسارات البرمجية الكاملة (API Routes Implementation)

### أ. مسارات المصادقة والمستخدمين (`routes/auth.routes.js`)

```javascript
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// 1. تسجيل مستخدم جديد (باحث أو صاحب عمل)
router.post('/register', async (req, res) => {
  const { phone_number, full_name, password, role, district } = req.body;

  if (!phone_number || !full_name || !password || !district) {
    return res.status(400).json({ success: false, message: 'يرجى استكمال جميع البيانات المطلوبة' });
  }

  try {
    // فحص تكرار رقم الهاتف
    const userExists = await db.query('SELECT id FROM users WHERE phone_number = $1', [phone_number]);
    if (userExists.rows.length > 0) {
      return res.status(409).json({ success: false, message: 'رقم الهاتف مسجل بالفعل في منصة وظائف إب' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await db.query(
      `INSERT INTO users (phone_number, full_name, password_hash, role, district) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING id, phone_number, full_name, role, district, is_vip, created_at`,
      [phone_number, full_name, passwordHash, role || 'job_seeker', district]
    );

    const user = newUser.rows[0];

    // إنشاء ملف جانبي أولي بحسب الدور
    if (user.role === 'job_seeker') {
      await db.query('INSERT INTO user_profiles (user_id) VALUES ($1)', [user.id]);
    } else if (user.role === 'employer') {
      await db.query(
        'INSERT INTO employers (user_id, company_name, industry, address_details) VALUES ($1, $2, $3, $4)',
        [user.id, full_name, 'عام', `محافظة إب - ${district}`]
      );
    }

    const token = jwt.sign(
      { id: user.id, phone: user.phone_number, role: user.role },
      process.env.JWT_SECRET || 'wazaef_ibb_secret_key_2025',
      { expiresIn: '30d' }
    );

    res.status(201).json({
      success: true,
      message: 'تم إنشاء الحساب بنجاح! مرحباً بك في وظائف إب',
      token,
      user
    });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ success: false, message: 'حدث خطأ في الخادم أثناء إنشاء الحساب' });
  }
});

// 2. تسجيل الدخول
router.post('/login', async (req, res) => {
  const { phone_number, password } = req.body;

  try {
    const result = await db.query(
      `SELECT id, phone_number, full_name, password_hash, role, district, is_vip, status 
       FROM users WHERE phone_number = $1`, 
      [phone_number]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, message: 'بيانات الدخول غير صحيحة، يرجى التأكد من رقم الهاتف' });
    }

    const user = result.rows[0];

    if (user.status === 'suspended') {
      return res.status(403).json({ success: false, message: 'هذا الحساب موقوف، يرجى التواصل مع إدارة منصة وظائف إب' });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ success: false, message: 'كلمة المرور غير صحيحة' });
    }

    delete user.password_hash;

    const token = jwt.sign(
      { id: user.id, phone: user.phone_number, role: user.role },
      process.env.JWT_SECRET || 'wazaef_ibb_secret_key_2025',
      { expiresIn: '30d' }
    );

    res.json({
      success: true,
      message: 'تم تسجيل الدخول بنجاح',
      token,
      user
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ success: false, message: 'حدث خطأ أثناء تسجيل الدخول' });
  }
});

module.exports = router;
```

---

### ب. مسارات الشواغر وسوق العمل (`routes/jobs.routes.js`)

```javascript
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { verifyToken, requireRole } = require('../middlewares/auth');

// 1. استعراض الوظائف المتاحة مع الفلاتر وترتيب الوظائف المثبتة أولاً
router.get('/', async (req, res) => {
  try {
    const { sector, district, search, employment_type, page = 1, limit = 15 } = req.query;
    const offset = (page - 1) * limit;

    let queryText = `
      SELECT 
        j.id, j.title, j.sector, j.district, j.work_location_text, 
        j.employment_type, j.salary_amount, j.salary_currency, 
        j.is_salary_negotiable, j.has_accommodation, j.is_urgent, 
        j.is_promoted, j.created_at,
        e.company_name, e.is_verified, e.industry
      FROM jobs j
      JOIN employers e ON j.employer_id = e.id
      WHERE j.status = 'open'
    `;
    const params = [];

    if (sector && sector !== 'الكل') {
      params.push(sector);
      queryText += ` AND j.sector = $${params.length}`;
    }

    if (district) {
      params.push(district);
      queryText += ` AND j.district = $${params.length}`;
    }

    if (employment_type) {
      params.push(employment_type);
      queryText += ` AND j.employment_type = $${params.length}`;
    }

    if (search) {
      params.push(`%${search}%`);
      queryText += ` AND (j.title ILIKE $${params.length} OR j.job_description ILIKE $${params.length} OR e.company_name ILIKE $${params.length})`;
    }

    // إعطاء الأولوية للوظائف المميزة والمثبتة (Promoted Jobs)
    queryText += ` ORDER BY j.is_promoted DESC, j.created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const result = await db.query(queryText, params);

    res.json({
      success: true,
      count: result.rows.length,
      page: parseInt(page),
      jobs: result.rows
    });
  } catch (error) {
    console.error('Fetch Jobs Error:', error);
    res.status(500).json({ success: false, message: 'تعذر جلب قائمة الوظائف' });
  }
});

// 2. تفاصيل شاغر معين وزيادة عداد المشاهدات
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // زيادة عدد المشاهدات
    await db.query('UPDATE jobs SET views_count = views_count + 1 WHERE id = $1', [id]);

    const result = await db.query(`
      SELECT 
        j.*,
        e.company_name, e.industry, e.is_verified, e.address_details, e.contact_phone
      FROM jobs j
      JOIN employers e ON j.employer_id = e.id
      WHERE j.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'الشاغر الوظيفي غير موجود أو تم إغلاقه' });
    }

    res.json({
      success: true,
      job: result.rows[0]
    });
  } catch (error) {
    console.error('Job Detail Error:', error);
    res.status(500).json({ success: false, message: 'تعذر جلب تفاصيل الشاغر' });
  }
});

// 3. نشر شاغر وظيفي جديد (لأصحاب العمل فقط)
router.post('/create', verifyToken, requireRole('employer', 'admin'), async (req, res) => {
  try {
    const {
      title, sector, district, work_location_text, employment_type,
      salary_amount, is_salary_negotiable, has_accommodation,
      experience_required_years, job_description, requirements, benefits, is_urgent
    } = req.body;

    // الحصول على معرف المنشأة الخاص بصاحب العمل
    const employerRes = await db.query('SELECT id FROM employers WHERE user_id = $1', [req.user.id]);
    if (employerRes.rows.length === 0) {
      return res.status(400).json({ success: false, message: 'لم يتم العثور على ملف شركة مرتبط بهذا الحساب' });
    }
    const employer_id = employerRes.rows[0].id;

    const newJob = await db.query(`
      INSERT INTO jobs (
        employer_id, title, sector, district, work_location_text, employment_type,
        salary_amount, is_salary_negotiable, has_accommodation, experience_required_years,
        job_description, requirements, benefits, is_urgent
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *
    `, [
      employer_id, title, sector, district, work_location_text, employment_type || 'full_time',
      salary_amount, is_salary_negotiable || false, has_accommodation || false,
      experience_required_years || 0, job_description, requirements, benefits || '', is_urgent || false
    ]);

    res.status(201).json({
      success: true,
      message: 'تم نشر الشاغر الوظيفي بنجاح!',
      job: newJob.rows[0]
    });
  } catch (error) {
    console.error('Create Job Error:', error);
    res.status(500).json({ success: false, message: 'فشل نشر الشاغر الوظيفي' });
  }
});

module.exports = router;
```

---

### ج. مسارات طلبات التقديم والمطابقة الذكية AI (`routes/applications.routes.js`)

```javascript
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { verifyToken, requireRole } = require('../middlewares/auth');

// 1. تقديم باحث عن عمل على وظيفة مع حساب التوافق التلقائي
router.post('/apply/:job_id', verifyToken, requireRole('job_seeker'), async (req, res) => {
  try {
    const { job_id } = req.params;
    const { cover_letter } = req.body;
    const applicant_id = req.user.id;

    // فحص هل تقدم مسبقاً
    const existing = await db.query(
      'SELECT id FROM job_applications WHERE job_id = $1 AND applicant_id = $2',
      [job_id, applicant_id]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({ success: false, message: 'لقد قمت بالتقديم على هذا الشاغر مسبقاً' });
    }

    // جلب ملف المستخدم لحساب نسبة المطابقة التقديرية
    const profileRes = await db.query('SELECT * FROM user_profiles WHERE user_id = $1', [applicant_id]);
    const profile = profileRes.rows[0] || {};

    // محاكاة تقييم الذكاء الاصطناعي (AI Matching Score) بناءً على التراخيص والخبرة
    let aiScore = 75.00;
    let aiNotes = 'توافق جيد مع المتطلبات الأساسية';
    if (profile.is_license_verified) {
      aiScore = 96.00;
      aiNotes = 'مطابقة ممتازة: ترخيص مزاولة مهنة طبي موثق + خبرة سريرية متوافقة';
    } else if (profile.years_of_experience >= 3) {
      aiScore = 88.00;
      aiNotes = 'خبرة عملية متطابقة مع متطلبات المنشأة في إب';
    }

    const application = await db.query(`
      INSERT INTO job_applications (job_id, applicant_id, ai_match_score, ai_matching_notes, cover_letter)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [job_id, applicant_id, aiScore, aiNotes, cover_letter || '']);

    // تحديث عداد المتقدمين للوظيفة
    await db.query('UPDATE jobs SET applications_count = applications_count + 1 WHERE id = $1', [job_id]);

    res.status(201).json({
      success: true,
      message: 'تم إرسال طلب التقديم بنجاح إلى صاحب العمل!',
      application: application.rows[0]
    });
  } catch (error) {
    console.error('Apply Job Error:', error);
    res.status(500).json({ success: false, message: 'تعذر إرسال طلب التقديم' });
  }
});

// 2. استعراض طلبات وظيفة معينة وفرز المتقدمين لصاحب العمل
router.get('/job/:job_id', verifyToken, requireRole('employer', 'admin'), async (req, res) => {
  try {
    const { job_id } = req.params;

    const result = await db.query(`
      SELECT 
        app.id as application_id, app.ai_match_score, app.ai_matching_notes,
        app.status, app.applied_at, app.cover_letter,
        u.full_name, u.phone_number, u.district, u.avatar_url, u.is_vip,
        prof.headline, prof.years_of_experience, prof.education_level, 
        prof.specialization, prof.medical_license_number, prof.is_license_verified, prof.cv_file_url
      FROM job_applications app
      JOIN users u ON app.applicant_id = u.id
      LEFT JOIN user_profiles prof ON u.id = prof.user_id
      WHERE app.job_id = $1
      ORDER BY u.is_vip DESC, app.ai_match_score DESC, app.applied_at DESC
    `, [job_id]);

    res.json({
      success: true,
      count: result.rows.length,
      applicants: result.rows
    });
  } catch (error) {
    console.error('Fetch Applicants Error:', error);
    res.status(500).json({ success: false, message: 'تعذر جلب قائمة المتقدمين' });
  }
});

// 3. تحديث حالة الطلب وجدولة المقابلة
router.patch('/:id/status', verifyToken, requireRole('employer', 'admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { status, scheduled_time, location_or_link, notes } = req.body;

    const updated = await db.query(
      'UPDATE job_applications SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [status, id]
    );

    // إذا تمت الترقية لمقابلة عمل
    if (status === 'shortlisted' && scheduled_time) {
      await db.query(`
        INSERT INTO interview_schedules (application_id, scheduled_time, location_or_link, interviewer_notes)
        VALUES ($1, $2, $3, $4)
      `, [id, scheduled_time, location_or_link || 'مقر المنشأة في إب', notes || '']);
    }

    res.json({
      success: true,
      message: 'تم تحديث حالة المرشح بنجاح',
      application: updated.rows[0]
    });
  } catch (error) {
    console.error('Update Status Error:', error);
    res.status(500).json({ success: false, message: 'فشل تحديث حالة الطلب' });
  }
});

module.exports = router;
```

---

### د. مسارات الدفع وتفعيل الإعلانات عبر محفظة جيب (`routes/payments.routes.js`)

```javascript
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { verifyToken, requireRole } = require('../middlewares/auth');

const PLATFORM_JAIB_ACCOUNT = '770088836'; // حساب المنصة في محفظة جيب - عهد المالية

// 1. تسجيل عملية دفع وإرسال رقم الإشعار للتحقق
router.post('/submit', verifyToken, async (req, res) => {
  try {
    const { payment_gateway, transfer_reference_number, amount, package_duration_days, purpose, related_item_id } = req.body;

    if (!transfer_reference_number || !amount || !purpose) {
      return res.status(400).json({ success: false, message: 'يرجى تزويدنا برقم الإشعار والمبلغ والغرض' });
    }

    const payment = await db.query(`
      INSERT INTO payments (
        user_id, target_account_number, payment_gateway, transfer_reference_number,
        amount, package_duration_days, purpose, related_item_id, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'pending_verification')
      RETURNING *
    `, [
      req.user.id,
      PLATFORM_JAIB_ACCOUNT,
      payment_gateway || 'jaib_wallet',
      transfer_reference_number,
      amount,
      package_duration_days || 30,
      purpose,
      related_item_id || null
    ]);

    res.status(201).json({
      success: true,
      message: `تم استلام إشعار التحويل لحساب محفظة جيب (${PLATFORM_JAIB_ACCOUNT}) بنجاح! سيتم التفعيل الفوري بعد المطابقة.`,
      payment: payment.rows[0]
    });
  } catch (error) {
    console.error('Payment Submit Error:', error);
    res.status(500).json({ success: false, message: 'تعذر تسجيل عملية الدفع' });
  }
});

// 2. التحقق من الحوالة وتفعيل التثبيت تلقائياً (خاص بالإدارة / Webhook)
router.post('/verify-and-activate/:payment_id', verifyToken, requireRole('admin'), async (req, res) => {
  const client = await db.pool.connect();
  try {
    const { payment_id } = req.params;

    await client.query('BEGIN');

    // تحديث حالة العملية إلى مكتملة
    const payRes = await client.query(`
      UPDATE payments 
      SET status = 'completed', verified_by = $1, verified_at = CURRENT_TIMESTAMP
      WHERE id = $2 AND status = 'pending_verification'
      RETURNING *
    `, [req.user.id, payment_id]);

    if (payRes.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ success: false, message: 'العملية غير موجودة أو تم تفعيلها مسبقاً' });
    }

    const payment = payRes.rows[0];

    // تفعيل تثبيت الشاغر الوظيفي
    if (payment.purpose === 'job_promotion' && payment.related_item_id) {
      await client.query(`
        UPDATE jobs 
        SET is_promoted = TRUE, expires_at = CURRENT_TIMESTAMP + ($1 || ' days')::INTERVAL
        WHERE id = $2
      `, [payment.package_duration_days, payment.related_item_id]);
    }

    // أو تفعيل العضوية الذهبية VIP للمستخدم
    if (payment.purpose === 'vip_seeker') {
      await client.query(`
        UPDATE users 
        SET is_vip = TRUE, vip_expires_at = CURRENT_TIMESTAMP + ($1 || ' days')::INTERVAL
        WHERE id = $2
      `, [payment.package_duration_days, payment.user_id]);
    }

    await client.query('COMMIT');

    res.json({
      success: true,
      message: 'تم التحقق من الحوالة وتفعيل الميزة المميزة بنجاح!',
      payment
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Verify Payment Error:', error);
    res.status(500).json({ success: false, message: 'فشل تفعيل الحوالة' });
  } finally {
    client.release();
  }
});

module.exports = router;
```

---

## 🚀 6. ملف الخادم الرئيسي (`server.js`)

```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const jobsRoutes = require('./routes/jobs.routes');
const applicationsRoutes = require('./routes/applications.routes');
const paymentsRoutes = require('./routes/payments.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// الأمان والوسائط الأساسية
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// المسار الترحيبي وفحص الحالة
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'Wazaef Ibb API Server',
    governorate: 'Ibb, Yemen',
    jaib_official_account: '770088836',
    timestamp: new Date().toISOString()
  });
});

// تسجيل مسارات الـ API
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/applications', applicationsRoutes);
app.use('/api/payments', paymentsRoutes);

// معالجة الروابط غير المعروفة (404)
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'المسار المطلوب غير موجود في خادم وظائف إب' });
});

// بدء تشغيل الخادم
app.listen(PORT, () => {
  console.log(`🚀 خادم وظائف إب يعمل بنجاح على المنفذ: http://localhost:${PORT}`);
  console.log(`💳 رقم حساب محفظة جيب المعتمد: 770088836`);
});
```

---

## 🧪 7. أمثلة استدعاءات برمجية سريعة (cURL Samples)

### أ. اختبار فحص حالة السيرفر:
```bash
curl -X GET http://localhost:5000/api/health
```

### ب. تسجيل باحث عن عمل جديد برقم يمني:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "phone_number": "770123456",
    "full_name": "د. أحمد عبده الرعوي",
    "password": "secure_password_123",
    "role": "job_seeker",
    "district": "الظهار"
  }'
```

### ج. جلب الوظائف المتاحة في قطاع "صحة وصيدلة":
```bash
curl -X GET "http://localhost:5000/api/jobs?sector=%D8%B5%D8%AD%D8%A9%20%D9%88%D8%B5%D9%8A%D8%AF%D9%84%D8%A9&district=%D8%A7%D9%84%D8%AF%D8%A7%D8%A6%D8%B1%D9%8A"
```

### د. إرسال إشعار حوالة محفظة جيب لتثبيت شاغر:
```bash
curl -X POST http://localhost:5000/api/payments/submit \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "payment_gateway": "jaib_wallet",
    "transfer_reference_number": "JB-9988231",
    "amount": 25000,
    "package_duration_days": 14,
    "purpose": "job_promotion",
    "related_item_id": "JOB_UUID_HERE"
  }'
```
