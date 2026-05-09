const REPORTS_KEY = 'litz_reports';

const read = () => {
  try {
    const raw = localStorage.getItem(REPORTS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const write = (data) => {
  localStorage.setItem(REPORTS_KEY, JSON.stringify(data));
};

export const storageService = {
  async saveReport(report) {
    const all = read();
    const id = report.id || `rpt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const now = new Date().toISOString();
    const saved = {
      ...report,
      id,
      createdAt: report.createdAt || now,
      updatedAt: now,
    };
    all[id] = saved;
    write(all);
    return saved;
  },

  async getReport(id) {
    const all = read();
    return all[id] || null;
  },

  async listReports() {
    const all = read();
    return Object.values(all).sort((a, b) =>
      new Date(b.updatedAt) - new Date(a.updatedAt)
    );
  },

  async deleteReport(id) {
    const all = read();
    delete all[id];
    write(all);
  },

  async duplicateReport(id) {
    const all = read();
    const original = all[id];
    if (!original) return null;
    const copy = {
      ...original,
      id: null,
      status: 'draft',
      createdAt: null,
      updatedAt: null,
      property: { ...original.property, customerName: `${original.property.customerName} (Copy)` },
    };
    return this.saveReport(copy);
  },

  async uploadPhoto(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve({
        id: `ph_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        dataUrl: reader.result,
        takenAt: new Date().toISOString(),
      });
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },
};

/*
PHASE 2 — Firebase migration notes:
- Replace read()/write() with Firestore queries
- saveReport → setDoc(doc(db, 'reports', id), saved)
- getReport → getDoc + .data()
- listReports → getDocs(query(collection(db, 'reports'), orderBy('updatedAt', 'desc')))
- uploadPhoto → uploadBytes to Firebase Storage, return { id, dataUrl: downloadUrl, takenAt }
- Keep the same function signatures so no component code changes
*/
