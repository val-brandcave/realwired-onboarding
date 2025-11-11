# 🧭 Vendor Module Setup

### Source: *Vendor Set Up.docx*  
### Reference Images: `vendor-fields.png`, `vendor-credentials-monitoring.png`  
### Purpose:  
Define all configurable elements for vendor management within YouConnect’s onboarding or CX admin flow.

---

## 🧱 1️⃣ Vendor Type Configuration

**Goal:** Establish the types of vendors Realwired supports.  
Administrators can **add**, **remove**, or **rename** these values.

**Default Vendor Types:**
- Appraisal  
- Environmental  
- Broker  
- External Evaluator  
- External Reviewer  
- Internal Evaluator  
- Internal Reviewer  

> 🛠 Admins can relabel, remove, or add new vendor types as needed.

---

## 🧱 2️⃣ Credential Monitoring Setup

**Goal:** Select which credentials are monitored per vendor type.  
For example, Appraisers may require license validation, while Brokers may not.

- Admins can toggle monitoring **On / Off** for each credential per type.  
- Credentials selected here determine which vendor records appear in **credential alerts** or **monitoring dashboards**.

---

## 🧱 3️⃣ Vendor Status Configuration

**Goal:** Define and monitor vendor lifecycle statuses.  
Admins can **add new statuses** and determine if each should be **monitored for credential compliance**.

**Default Vendor Statuses:**
| Status | Editable | Credential Monitoring |
|---------|-----------|------------------------|
| New Applicant | ❌ | — |
| Pending Applicant | ❌ | — |
| Approved | ✅ | ✔️ |
| Unapproved | ✅ | ❌ |
| Pending | ✅ | ✔️ |
| Temporary Approval | ✅ | ✔️ |
| Rejected | ✅ | ❌ |
| Retired | ✅ | ❌ |
| Deceased | ✅ | ❌ |

> **Note:**  
> - Only **Approved**, **Temporary Approval**, and **Pending** statuses will appear when soliciting vendors.  
> - Additional statuses may be created but won’t display in solicitation workflows unless configured for credential monitoring.  
> - For new custom statuses, admins can toggle **Monitor Credentials: Yes / No**.

---

## 🧱 4️⃣ Vendor Specialty Configuration

**Goal:** Define the business specialties that vendors can be associated with.  
Admins can **add**, **remove**, or **relabel** specialties.

**Default Vendor Specialties:**
- Hotel  
- Convenience Store  
- Oil & Gas  
- Airport  
- Golf Course  

---

## 🧱 5️⃣ Vendor Designations Configuration

**Goal:** Manage professional credentials or designations recognized by Realwired.

**Default Designations:**
- MAI  
- MRICS  
- SRA  
- SREA  
- SRPA  
- AI-GRS  
- AI-RRS  
- Certified Residential  
- Certified General  
- Trainee  

> 🧩 Admins may relabel or expand this list based on organizational needs.

---

## 🧱 6️⃣ Vendor Region Configuration

**Goal:** Create geographic regions for vendor search and assignment.  
Admins can **rename** the “Region” field and **define any values desired** (e.g., Southeast, Midwest, West Coast).

> Regions are used to narrow vendor searches and reporting views.

---

## 🧱 7️⃣ Vendor Sub-Region Configuration

**Goal:** Create sub-regions independent of Region values.  
This field is **not relational** to Region but allows more granular filtering.

**Examples:**  
- Metro Area  
- County  
- State Zone  

Admins can **relabel this field** and populate it with any set of sub-regional identifiers.

---

## ✅ Summary

| Configuration Step | Editable | Used For |
|--------------------|-----------|-----------|
| Vendor Types | ✅ | Classification of vendor roles |
| Credentials | ✅ | Monitoring license or certification validity |
| Statuses | ✅ (partially) | Vendor lifecycle and compliance tracking |
| Specialties | ✅ | Business domain segmentation |
| Designations | ✅ | Professional credentials |
| Regions | ✅ | Geographic search filters |
| Sub-Regions | ✅ | Additional non-relational filters |
