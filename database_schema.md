# نموذج قاعدة البيانات الشامل - تطبيق وموقع وظائف إب
# Wazaef Ibb - Complete Database Schema (PostgreSQL / MySQL / Supabase)

---

## 🏗️ 1. المخطط العام للعلاقات (Entity Relationship Diagram - Overview)

```
[users] ────────┬────────< [user_profiles] (السير الذاتية والتراخيص)
                │
                ├────────< [employers] (بيانات الشركات وأصحاب العمل)
                │               │
                │               └────────< [jobs] (الوظائف والفرص الشاغرة)
                │                             │
                │                             ├────────< [job_applications] (طلبات التقديم)
                │                             │                │
                │                             │                └─────< [interview_schedules] (المقابلات)
                │                             │
                │                             └────────< [promoted_jobs] (الوظائف المميزة والمثبتة)
                │
                ├────────< [commercial_ads] (الإعلانات التجارية والخدمات)
                │
                ├────────< [payments] (عمليات الدفع عبر محفظة جيب وغيرها)
                │
                ├────────< [vip_subscriptions] (اشتراكات العضوية الذهبية VIP)
                │
                ├────────< [conversations] ────< [chat_messages] (المحادثات المباشرة)
                │
                └────────< [notifications] (الإشعارات وتنبيهات الـ Push)
```

---

## 🗄️ 2. كود SQL لإنشاء الجداول (PostgreSQL / DDL)

```sql
-- تفعيل ملحق توليد المعرفات الفريدة UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================================
-- 1. جدول المستخدمين والحسابات (Users & Authentication)
-- ========================================================
CREATE TYPE user_role_enum AS ENUM ('job_seeker', 'employer', 'admin');
CREATE TYPE account_status_enum AS ENUM ('active', 'suspended', 'pending_verification');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phone_number VARCHAR(15) UNIQUE NOT NULL, -- رقم الهاتف اليمني مثل 77XXXXXXX
    full_name VARCHAR(150) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role_enum DEFAULT 'job_seeker',
    governorate VARCHAR(50) DEFAULT 'إب',
    district VARCHAR(50) NOT NULL, -- المديرية: المشنة، الظهار، جبلة، يريم، السدة...
    avatar_url TEXT,
    is_vip BOOLEAN DEFAULT FALSE,
    vip_expires_at TIMESTAMP WITH TIME ZONE,
    status account_status_enum DEFAULT 'active',
    fcm_token TEXT, -- رمز الإشعارات اللحظية Firebase Cloud Messaging
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ========================================================
-- 2. ملف السيرة الذاتية للباحثين (Job Seeker Profiles)
-- ========================================================
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    headline VARCHAR(200), -- المسمى الوظيفي: صيدلي قانوني، محاسب مالي...
    bio TEXT,
    years_of_experience NUMERIC(3, 1) DEFAULT 0,
    education_level VARCHAR(100), -- بكالوريوس، ماجستير، دبلوم
    specialization VARCHAR(100), -- صيدلة سريرية، شبكات وتقنية، إدارة أعمال
    cv_file_url TEXT, -- رابط ملف الـ PDF
    medical_license_number VARCHAR(100), -- ترخيص مزاولة المهنة الطبية (للوظائف الصحية)
    is_license_verified BOOLEAN DEFAULT FALSE,
    expected_salary NUMERIC(12, 2), -- الراتب المتوقع بالريال اليمني
    is_available_for_work BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ========================================================
-- 3. بيانات الشركات والمنشآت التوظيفية (Employers / Companies)
-- ========================================================
CREATE TABLE employers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    company_name VARCHAR(200) NOT NULL, -- مستشفى النور التخصصي، شركة السعيد...
    industry VARCHAR(100) NOT NULL, -- رعاية صحية وطبية، تجارة وتوزيع، تقنية معلومات
    commercial_register VARCHAR(100), -- السجل التجاري / الترخيص
    address_details TEXT NOT NULL, -- إب، الدائري الغربي، جوار فندق...
    contact_phone VARCHAR(20),
    contact_email VARCHAR(100),
    is_verified BOOLEAN DEFAULT FALSE, -- شارة التحقق الرسمية للمنشأة
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ========================================================
-- 4. إعلانات الشواغر والفرص الوظيفية (Jobs / Vacancies)
-- ========================================================
CREATE TYPE employment_type_enum AS ENUM ('full_time', 'part_time', 'shift_based', 'remote', 'contract');
CREATE TYPE job_status_enum AS ENUM ('open', 'closed', 'paused');

CREATE TABLE jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employer_id UUID NOT NULL REFERENCES employers(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL, -- مسمى الشاغر
    sector VARCHAR(100) NOT NULL, -- صحة وصيدلة، إدارة ومحاسبة، مبيعات...
    governorate VARCHAR(50) DEFAULT 'إب',
    district VARCHAR(50) NOT NULL, -- الدائري الغربي، شارع العدين، مفرق جبلة...
    work_location_text VARCHAR(255) NOT NULL,
    employment_type employment_type_enum DEFAULT 'full_time',
    salary_amount NUMERIC(12, 2), -- المبلغ بالريال اليمني
    salary_currency VARCHAR(10) DEFAULT 'YER',
    is_salary_negotiable BOOLEAN DEFAULT FALSE,
    has_accommodation BOOLEAN DEFAULT FALSE, -- هل يوفر سكن؟
    experience_required_years INT DEFAULT 0,
    job_description TEXT NOT NULL,
    requirements TEXT NOT NULL,
    benefits TEXT,
    is_urgent BOOLEAN DEFAULT FALSE, -- وسم "شاغر عاجل"
    is_promoted BOOLEAN DEFAULT FALSE, -- مثبت في أعلى القائمة
    status job_status_enum DEFAULT 'open',
    views_count INT DEFAULT 0,
    applications_count INT DEFAULT 0,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ========================================================
-- 5. طلبات التقديم ومراحل التوظيف (Job Applications)
-- ========================================================
CREATE TYPE application_status_enum AS ENUM (
    'submitted',        -- تم إرسال الطلب
    'under_review',     -- قيد المراجعة والفرز
    'shortlisted',      -- مرشح للمقابلة
    'accepted',         -- تم القبول والتوظيف
    'rejected'          -- معتذر
);

CREATE TABLE job_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    applicant_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    ai_match_score NUMERIC(5, 2) DEFAULT 0.00, -- نسبة المطابقة الذكية 96%
    ai_matching_notes TEXT, -- ملخص توافق المهارات والترخيص
    cover_letter TEXT,
    custom_cv_url TEXT,
    status application_status_enum DEFAULT 'submitted',
    rejection_reason TEXT,
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_job_application UNIQUE(job_id, applicant_id)
);

-- ========================================================
-- 6. جدولة مواعيد المقابلات (Interview Schedules)
-- ========================================================
CREATE TYPE interview_type_enum AS ENUM ('in_person', 'phone_call', 'video_interview');
CREATE TYPE interview_status_enum AS ENUM ('scheduled', 'confirmed_by_candidate', 'completed', 'cancelled');

CREATE TABLE interview_schedules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID NOT NULL REFERENCES job_applications(id) ON DELETE CASCADE,
    interview_type interview_type_enum DEFAULT 'in_person',
    scheduled_time TIMESTAMP WITH TIME ZONE NOT NULL,
    location_or_link TEXT NOT NULL, -- عنوان المقر في إب أو رابط الاجتماع
    interviewer_notes TEXT,
    status interview_status_enum DEFAULT 'scheduled',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ========================================================
-- 7. المحادثات والرسائل الفورية (Hiring Chat & Direct Messaging)
-- ========================================================
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID REFERENCES jobs(id) ON DELETE SET NULL,
    employer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    seeker_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    last_message_text TEXT,
    last_message_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    employer_unread_count INT DEFAULT 0,
    seeker_unread_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_conversation UNIQUE(job_id, employer_id, seeker_id)
);

CREATE TYPE message_type_enum AS ENUM ('text', 'interview_card', 'voice_note', 'cv_attachment');

CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    message_type message_type_enum DEFAULT 'text',
    content TEXT,
    attachment_url TEXT,
    voice_duration_seconds INT,
    interview_schedule_id UUID REFERENCES interview_schedules(id) ON DELETE SET NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ========================================================
-- 8. بوابات الدفع الإلكتروني (Payments & Financial Transactions)
-- ========================================================
CREATE TYPE payment_gateway_enum AS ENUM (
    'jaib_wallet',      -- محفظة جيب - شركة عهد المالية (الرئيسية)
    'kuraimi_jawali',   -- الكريمي جوالي
    'floosak',          -- فلوسك
    'one_cash'          -- ون كاش
);

CREATE TYPE payment_purpose_enum AS ENUM ('job_promotion', 'vip_seeker', 'commercial_ad_featured');
CREATE TYPE payment_status_enum AS ENUM ('pending_verification', 'completed', 'rejected');

CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    target_account_number VARCHAR(50) DEFAULT '770088836', -- حساب المنصة في جيب
    payment_gateway payment_gateway_enum DEFAULT 'jaib_wallet',
    transfer_reference_number VARCHAR(100) NOT NULL, -- رقم العملية / الإشعار المرسل
    amount NUMERIC(12, 2) NOT NULL, -- 15000، 25000، 40000 ريال يمني
    currency VARCHAR(10) DEFAULT 'YER',
    package_duration_days INT NOT NULL, -- 7 أيام، 14 يوماً، 30 يوماً
    purpose payment_purpose_enum NOT NULL,
    related_item_id UUID, -- معرف الوظيفة أو الإعلان المراد تثبيته
    receipt_image_url TEXT, -- لقطة شاشة الحوالة إن وجدت
    status payment_status_enum DEFAULT 'pending_verification',
    verified_by UUID REFERENCES users(id) ON DELETE SET NULL,
    verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ========================================================
-- 9. دليل الإعلانات التجارية والخدمات (Commercial Directory)
-- ========================================================
CREATE TABLE commercial_ads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL, -- محلات صيدليات، مكاتب محاسبة، صيانة شبكات...
    category VARCHAR(100) NOT NULL,
    district VARCHAR(50) NOT NULL,
    location_details VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(20) NOT NULL,
    whatsapp_number VARCHAR(20),
    description TEXT NOT NULL,
    banner_image_url TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    featured_expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ========================================================
-- 10. جدول الإشعارات (Push Notifications Log)
-- ========================================================
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    body TEXT NOT NULL,
    action_type VARCHAR(50), -- interview_invite, application_status, new_job_match, payment_approved
    target_url TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ========================================================
-- الفهارس لتحسين سرعة الاستعلام والبحث (Indexes)
-- ========================================================
CREATE INDEX idx_jobs_sector ON jobs(sector);
CREATE INDEX idx_jobs_district ON jobs(district);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_promoted ON jobs(is_promoted DESC, created_at DESC);
CREATE INDEX idx_applications_job ON job_applications(job_id);
CREATE INDEX idx_applications_applicant ON job_applications(applicant_id);
CREATE INDEX idx_chat_messages_conv ON chat_messages(conversation_id, created_at ASC);
CREATE INDEX idx_payments_user ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(status);
```

---

## 💡 3. أمثلة استعلامات سريعة (Sample Queries)

### أ. استعلام عرض الوظائف النشطة مع الأولوية للشواغر المميزة في إب:
```sql
SELECT 
    j.id, 
    j.title, 
    j.sector, 
    j.district, 
    j.salary_amount, 
    j.employment_type,
    j.is_urgent,
    j.is_promoted,
    e.company_name, 
    e.is_verified
FROM jobs j
JOIN employers e ON j.employer_id = e.id
WHERE j.status = 'open'
ORDER BY j.is_promoted DESC, j.created_at DESC
LIMIT 20;
```

### ب. استعلام التحقق من حوالة محفظة جيب وتفعيل الشاغر المثبت فورياً:
```sql
-- عند موافقة الإدارة على إشعار الدفع بحساب 770088836
BEGIN;

UPDATE payments 
SET status = 'completed', verified_at = CURRENT_TIMESTAMP
WHERE id = 'PAYMENT_UUID_HERE';

UPDATE jobs 
SET is_promoted = TRUE, expires_at = CURRENT_TIMESTAMP + INTERVAL '30 days'
WHERE id = 'JOB_UUID_HERE';

COMMIT;
```
