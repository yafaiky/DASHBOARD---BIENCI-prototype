Stack prototype:

* **React + Vite**
* **Tailwind CSS**
* **ApexCharts.js / react-apexcharts**
* React Router
* Lucide React untuk icon
* TanStack Table untuk tabel besar
* Mock data yang strukturnya mengikuti Excel aktual
* Responsive, tetapi target utama desktop 1440px

---

# 1. Struktur fitur utama

Saya rekomendasikan navigation seperti ini:

```text
BIENSI HR INTELLIGENCE
│
├── Dashboard
│
├── Workforce
│   ├── Headcount
│   ├── Demographics
│   ├── Organization
│   └── Employment
│
├── Labour Cost
│   ├── Cost Overview
│   ├── Cost by Division
│   ├── Cost by Department
│   └── Productivity
│
├── Turnover
│   ├── Overview
│   ├── Voluntary
│   ├── Non-Voluntary
│   ├── Contract Expiry
│   └── Store Turnover
│
├── Attendance
│
├── Store Performance
│
├── Industrial Relation
│   ├── SP / Discipline
│   ├── Fraud
│   └── IR Cases
│
├── Compliance
│
├── Employee Data
│   ├── Recent
│   ├── All Employees
│   └── Employee Detail
│
├── Data Management
│   ├── Import
│   ├── Import History
│   └── Trash
│
└── Administration
    ├── Master Data
    ├── User Management
    ├── Activity Log
    └── Settings
```

---

# 2. Dashboard — fitur paling penting

Route:

```text
/dashboard
```

### Header

```text
BIENSI HR Executive Dashboard

September 2026
[ Date Range ] [ Organization ] [ Division ] [ Department ]
[ Region ] [ Store Type ] [ Employment Type ]
```

### KPI Cards

8 card:

1. Total Headcount
2. HQ Headcount
3. Store Headcount
4. Total Labour Cost
5. Labour Cost / FTE
6. Turnover Rate
7. Voluntary Turnover
8. Attendance Rate

Setiap card:

```text
┌─────────────────────────────┐
│ TOTAL HEADCOUNT             │
│                             │
│ 12,480                      │
│ ↑ 3.2% vs previous period   │
│                             │
│ HQ 1,240  •  Store 11,240  │
└─────────────────────────────┘
```

---

# 3. Dashboard Charts

### Chart 1 — Workforce Trend

ApexCharts:

```text
Line Chart
```

Data:

```text
Jan
Feb
Mar
Apr
May
Jun
Jul
Aug
Sep
```

Series:

```text
Total HC
HQ
Store
```

---

### Chart 2 — Headcount vs Sales

Gunakan:

```text
ApexCharts Mixed Chart
```

Series:

```text
Headcount
Sales
```

Tujuannya menjawab:

> Apakah pertumbuhan headcount sejalan dengan sales?

---

### Chart 3 — Labour Cost vs Revenue

Combo chart:

```text
Revenue
Labour Cost
Labour Cost Ratio
```

---

### Chart 4 — Employee Composition

Donut:

```text
Permanent
Contract
Part-time
Internship
Freelance
```

---

### Chart 5 — Headcount by Division

Horizontal bar:

```text
Commercial Business
Supply Chain
Business Support
Marketing
...
```

---

### Chart 6 — Turnover Trend

Line/area:

```text
Total
Voluntary
Non-Voluntary
Contract
```

---

### Chart 7 — Turnover by Region

Bar:

```text
Barat
Tengah
Timur
```

---

### Chart 8 — Contract Expiry

Column:

```text
0–7 Days
8–14 Days
15–21 Days
22–30 Days
```

---

# 4. Dashboard Alert Center

Ini fitur yang menurut saya sangat penting.

```text
HR ALERTS
────────────────────────────────────

🔴 9 contracts expire within 30 days

🟠 Labour cost Commercial exceeds budget

🟠 Turnover Sales Offline increased

🔵 4 stores below manpower requirement

🔴 3 open IR cases

[View All Alerts]
```

Jadi dashboard bukan cuma visualisasi, tetapi **exception monitoring**.

---

# 5. Workforce

Route:

```text
/workforce
```

Submenu:

```text
Headcount
Demographics
Organization
Employment
```

---

## 5.1 Headcount

KPI:

* Total HC
* HQ
* Store
* Active
* Inactive
* Permanent
* Contract
* Part-time

Chart:

* HC Trend
* HC by Division
* HC by Department
* HC by Region
* HC by Store Type

Table:

```text
Department | HC | Budget | Gap | Utilization
```

---

# 6. Demographics

Route:

```text
/workforce/demographics
```

Charts:

### Age

```text
<25
25–29
30–34
35–39
40–44
45–49
50+
```

### Gender

Donut.

### Tenure

```text
<1 year
1–2
2–5
5–10
>10
```

### Education

Bar chart.

### Age × Position

Heatmap.

Ini berguna untuk succession planning.

---

# 7. Organization

Route:

```text
/workforce/organization
```

Fitur:

### Organization Structure

```text
Corporate / HQ
       │
       ├── Commercial
       ├── Marketing
       ├── Supply Chain
       ├── Business Support
       └── ...
```

### Headcount by:

* Division
* Department
* Position
* Job Level
* Location

---

# 8. Employment

Route:

```text
/workforce/employment
```

Chart:

```text
Employment Type
```

Contoh:

```text
Permanent
Contract
Freelance
Perbantuan
```

Tambahkan:

### Contract Expiry

```text
Employee
Position
Store
Contract End
Days Remaining
Status
Action
```

Status badge:

```text
Critical
≤ 7 days

Warning
8–30 days

Normal
> 30 days
```

---

# 9. Labour Cost

Route:

```text
/labour-cost
```

### KPI

* Total Labour Cost
* Average Cost / Employee
* Cost / FTE
* Labour Cost Ratio
* Budget
* Budget Variance

### Charts

* Labour Cost Trend
* Cost by Division
* Cost by Department
* Cost by Region
* Cost by Store

---

# 10. Labour Cost vs Sales

Route:

```text
/labour-cost/productivity
```

Ini halaman analitik penting.

KPI:

```text
Revenue
Headcount
Labour Cost
Revenue / FTE
Labour Cost Ratio
```

### Store Matrix

```text
Store
──────────────────────────────
Headcount
Sales
Labour Cost
Revenue / FTE
Labour Cost %
Target
Achievement
```

Tambahkan scatter plot:

```text
X = Headcount
Y = Sales
Bubble = Labour Cost
Color = Region
```

---

# 11. Turnover

Route:

```text
/turnover
```

KPI:

* Total Turnover
* Voluntary
* Non-Voluntary
* Contract Expiry
* Efficiency

Charts:

* Turnover Trend
* Turnover by Division
* Turnover by Department
* Turnover by Position
* Turnover by Region
* Turnover by Store Type

---

# 12. Voluntary Turnover

Route:

```text
/turnover/voluntary
```

Fokus:

```text
MENGUNDURKAN DIRI
```

Chart:

```text
Voluntary Turnover by Position
```

Contoh:

```text
Area Store Manager
Visual Merchandiser
Store Leader
Sales Advisor
Cashier
```

Tabel:

```text
Employee
Position
Department
Store
Join Date
Exit Date
Tenure
```

---

# 13. Non-Voluntary Turnover

Route:

```text
/turnover/non-voluntary
```

Kategori:

* PHK
* Efisiensi

Analisis:

```text
Region
Department
Position
Store
Tenure
```

Tambahkan trend.

---

# 14. Contract Expiry

Route:

```text
/turnover/contract-expiry
```

Ini harus menjadi halaman operational.

### KPI

```text
Expiring ≤7 days
Expiring ≤14 days
Expiring ≤30 days
Already Expired
```

### Table

```text
Employee ID
Employee
Position
Department
Store
Contract End
Days Remaining
Manager
Action
```

Action:

```text
View
Renew
Extend
End Contract
```

Untuk prototype, tombolnya cukup UI saja.

---

# 15. Store Turnover

Route:

```text
/turnover/store
```

Filter:

```text
Region
Store Type
Store
Period
```

Chart:

* Turnover by Region
* Turnover by Store Type
* Turnover by Store
* Turnover by Position

---

# 16. Attendance

Route:

```text
/attendance
```

KPI:

```text
Attendance %
Sick %
Leave %
Permission %
Alpha %
```

Chart:

```text
Attendance Trend 2024–2026
```

Comparison:

```text
2024
2025
2026
```

Filter:

```text
Year
Month
Division
Department
Region
Store
```

---

# 17. Store Performance

Route:

```text
/store-performance
```

Ini halaman yang menggabungkan **HR + Sales**.

### KPI

* Total Sales
* Target Sales
* Achievement %
* Headcount
* Labour Cost
* Revenue/FTE

### Store table

```text
┌────────────┬────┬──────────┬───────────┬──────────────┐
│ Store      │ HC │ Sales    │ Labour    │ Revenue/FTE  │
├────────────┼────┼──────────┼───────────┼──────────────┤
│ Store A    │ 15 │ Rp 2.1B  │ Rp 150M   │ Rp 140M      │
│ Store B    │ 12 │ Rp 1.8B  │ Rp 120M   │ Rp 150M      │
└────────────┴────┴──────────┴───────────┴──────────────┘
```

---

# 18. Industrial Relation

Route:

```text
/industrial-relation
```

Dashboard:

```text
SP
Fraud
IR Cases
```

---

## 18.1 SP / Discipline

Route:

```text
/industrial-relation/sp
```

KPI:

* Total SP
* SP-1
* SP-2
* SP-3
* PHK

Charts:

* SP Trend
* SP by Region
* SP by Store Type
* SP by Department

---

# 19. Fraud

Route:

```text
/industrial-relation/fraud
```

KPI:

```text
Fraud Cases
Affected Employees
Affected Stores
Financial Impact
```

Chart:

* Fraud Trend
* Fraud by Cause
* Fraud by Store
* Fraud by Region

Table:

```text
Employee
Store
Position
Cause
Audit Date
Financial Impact
Status
```

---

# 20. IR Cases

Route:

```text
/industrial-relation/cases
```

KPI:

* Total Cases
* Open
* Closed
* Mediation
* Bipartite

Table:

```text
Case
Employee
Position
Category
Store
Start Date
End Date
Status
```

---

# 21. Compliance

Route:

```text
/compliance
```

Dashboard:

```text
Compliant
Expiring
Expired
Missing
```

Area:

* BPJS
* WLKP
* PP
* Licensing
* Electrical
* Generator

Gunakan status badge:

```text
✓ Compliant
⚠ Expiring
✕ Expired
— Missing
```

---

# 22. Employee Data

Route:

```text
/employees
```

Tab:

```text
Recent
All Employees
```

### Table

```text
Employee ID
Name
Division
Department
Position
Location
Employment Type
Status
Join Date
Contract End
Actions
```

Fitur:

* Search
* Filter
* Sort
* Pagination
* Column visibility
* Export
* Bulk selection

Pagination:

```text
50 / 100 / 250
```

---

# 23. Employee Detail

Route:

```text
/employees/:id
```

Layout:

```text
Employee Profile

[Avatar]

Employee Name
Employee ID
Position
Department
Status
```

Tabs:

```text
Overview
Employment
Attendance
Turnover
Discipline
History
```

---

# 24. Recent Employees

Route:

```text
/employees/recent
```

Menampilkan:

* New Joiner
* Promotion
* Transfer
* Status Change
* Resignation
* Contract Renewal

Timeline UI:

```text
Today

09:30
John Doe
Promoted to Store Manager

08:45
Jane Doe
Joined Sales Offline

Yesterday
...
```

---

# 25. Import Data

Route:

```text
/import
```

Workflow:

```text
Upload
   ↓
Preview
   ↓
Validation
   ↓
Mapping
   ↓
Processing
   ↓
Result
```

### Upload UI

```text
┌─────────────────────────────────────────┐
│                                         │
│     Drop Excel / CSV here               │
│                                         │
│     .xlsx .xls .csv                     │
│                                         │
│          [ Choose File ]                │
│                                         │
└─────────────────────────────────────────┘
```

---

# 26. Import Mapping

Karena Excel kamu sekarang mempunyai banyak sheet, ini penting.

UI:

```text
Excel Column              Database Field

NIK                 →     employee_no
NAMA KARYAWAN       →     name
JABATAN             →     position
DEPARTEMENT         →     department
DIVISI              →     division
TGL MASUK           →     join_date
TGL HABIS KONTRAK   →     contract_end_date
```

Dengan preview.

---

# 27. Import Validation

Status:

```text
12,450 Rows

✓ Valid       12,310
⚠ Warning         95
✕ Error           45
```

Error examples:

```text
Row 128
Employee ID duplicated

Row 219
Department not found

Row 442
Invalid contract date
```

---

# 28. Import History

Table:

```text
File
Type
Uploaded By
Date
Rows
Success
Failed
Status
```

Status:

```text
Success
Partial
Failed
Processing
```

---

# 29. Trash

Route:

```text
/trash
```

Fitur:

* Deleted employees
* Deleted master data
* Deleted records
* Restore
* Permanent Delete

---

# 30. Master Data

Route:

```text
/master-data
```

Tabs:

```text
Division
Department
Position
Job Level
Store
Store Type
Region
Employment Type
Employment Status
```

CRUD:

```text
Add
Edit
Deactivate
Delete
Search
```

---

# 31. User Management

Route:

```text
/users
```

Table:

```text
Name
Email
Role
Status
Last Login
Created
Actions
```

Roles:

```text
Super Admin
HR Manager
HR Staff
Viewer
```

---

# 32. Role & Permission

Matrix:

```text
                    View Create Edit Delete Export
Dashboard             ✓
Employees             ✓     ✓     ✓     ✓      ✓
Import                ✓     ✓
Turnover              ✓
Attendance            ✓
SP                    ✓
Fraud                 ✓
Master Data           ✓     ✓     ✓     ✓
Users                 ✓     ✓     ✓
Activity Log          ✓
```

---

# 33. Activity Log

Route:

```text
/activity-log
```

Table:

```text
Date & Time
User
Module
Action
Record
IP
```

Contoh:

```text
24 Sep 2026 08:42
Admin
Employee
Updated
EMP-00125
```

---

# 34. Settings

Route:

```text
/settings
```

Sections:

```text
Profile
Security
Application
Notification
Appearance
```

---

# 35. UI Components yang perlu dibuat

Jangan langsung membuat setiap halaman secara terpisah.

Buat component system dulu.

### Layout

```text
AppLayout
Sidebar
Topbar
Breadcrumb
PageHeader
```

### Form

```text
Input
Select
MultiSelect
DatePicker
DateRangePicker
SearchInput
FilterDropdown
```

### Data

```text
DataTable
Pagination
SortableHeader
ColumnSelector
EmptyState
LoadingState
ErrorState
```

### Feedback

```text
Toast
Alert
Badge
Modal
ConfirmDialog
```

### Dashboard

```text
KPICard
ChartCard
StatCard
InsightCard
AlertCard
```

---

# 36. ApexCharts yang digunakan

Saya tidak akan memakai terlalu banyak jenis chart.

| Kebutuhan         | ApexCharts      |
| ----------------- | --------------- |
| Trend             | Line            |
| Comparison        | Bar             |
| Distribution      | Donut           |
| Target vs Actual  | RadialBar / Bar |
| HC vs Sales       | Mixed           |
| Labour vs Revenue | Mixed           |
| Demographic       | Bar             |
| Tenure            | Bar             |
| Region            | Bar             |
| Store performance | Heatmap         |
| Correlation       | Scatter         |
| Attendance        | Area            |
| Turnover          | Area/Line       |

---

# 37. Design System React

Saya sarankan tetap menggunakan palette yang sebelumnya:

```text
Primary Red
#C8102E

Navy
#172B4D

Background
#F6F7F9

White
#FFFFFF

Text
#1F2937

Secondary
#6B7280

Success
#16A34A

Warning
#F59E0B

Danger
#DC2626

Info
#2563EB
```

Tetapi red hanya menjadi **accent**, jangan semua card dibuat merah.

---

# 38. Struktur folder React

Saya sarankan:

```text
src/
│
├── assets/
│
├── components/
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Badge.jsx
│   │   ├── Modal.jsx
│   │   ├── Input.jsx
│   │   ├── Select.jsx
│   │   └── DataTable.jsx
│   │
│   ├── charts/
│   │   ├── WorkforceTrend.jsx
│   │   ├── TurnoverChart.jsx
│   │   ├── LabourCostChart.jsx
│   │   └── DemographicChart.jsx
│   │
│   ├── dashboard/
│   │   ├── KPICard.jsx
│   │   ├── AlertCard.jsx
│   │   └── InsightCard.jsx
│   │
│   └── layout/
│       ├── Sidebar.jsx
│       ├── Topbar.jsx
│       └── AppLayout.jsx
│
├── pages/
│   ├── dashboard/
│   ├── workforce/
│   ├── labour-cost/
│   ├── turnover/
│   ├── attendance/
│   ├── store-performance/
│   ├── industrial-relation/
│   ├── compliance/
│   ├── employees/
│   ├── import/
│   ├── trash/
│   ├── master-data/
│   ├── users/
│   ├── activity-log/
│   └── settings/
│
├── data/
│   ├── employees.js
│   ├── sales.js
│   ├── turnover.js
│   ├── attendance.js
│   ├── labourCost.js
│   └── dashboard.js
│
├── layouts/
│
├── routes/
│   └── AppRoutes.jsx
│
├── hooks/
│
├── utils/
│
├── App.jsx
└── main.jsx
```

---

# 39. Prototype tidak perlu backend dulu

Untuk fase prototype:

```text
Excel
  ↓
Data extraction
  ↓
JSON / JS mock data
  ↓
React
  ↓
ApexCharts
```

Jadi kita bisa membuat prototype **fully interactive tanpa Laravel terlebih dahulu**.

Contohnya:

```text
src/data/employees.js
src/data/sales.js
src/data/turnover.js
```

Nanti setelah UI disetujui:

```text
React
   ↓
Laravel API
   ↓
MySQL
```

Frontend tidak perlu dibongkar total.

---

# 40. Urutan pembuatan prototype

Saya sarankan jangan membuat semua 30+ halaman sekaligus.

### Sprint 1 — Design System

```text
AppLayout
Sidebar
Topbar
Buttons
Cards
Tables
Filters
Modal
Badge
```

### Sprint 2 — Executive Dashboard

```text
Dashboard
KPI
Workforce Trend
Labour Cost
Turnover
Alerts
Store Performance
```

### Sprint 3 — Workforce

```text
Headcount
Demographics
Organization
Employment
```

### Sprint 4 — Business Analytics

```text
Labour Cost
Productivity
Turnover
Store Performance
```

### Sprint 5 — HR Operations

```text
Attendance
Contract Expiry
Employee Data
Employee Detail
```

### Sprint 6 — Risk

```text
SP
Fraud
IR
Compliance
```

### Sprint 7 — Data Management

```text
Import
Mapping
Validation
History
Trash
```

### Sprint 8 — Administration

```text
Master Data
Users
Permissions
Activity Log
Settings
```

---