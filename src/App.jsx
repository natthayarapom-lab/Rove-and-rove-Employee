import React, { useState, useRef } from "react";
import { Coffee, Plus, Trash2, Users, Image as ImageIcon, FileDown } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const LOGO_DATA_URI = "data:image/png;base64,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";

// ---------- Design tokens (มัสตาร์ด/น้ำตาลเข้ม/ครีม — โทนเดียวกับแบรนด์) ----------
const fmt = (n) => new Intl.NumberFormat("th-TH", { maximumFractionDigits: 0 }).format(Math.round(n || 0));
const todayStr = () => new Date().toISOString().slice(0, 10);
const THAI_MONTHS_FULL = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
const toBE = (y) => y + 543;
const formatThaiDateFull = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return `${d.getDate()} ${THAI_MONTHS_FULL[d.getMonth()]} ${toBE(d.getFullYear())}`;
};
const formatThaiRange = (fromStr, toStr) => {
  if (!fromStr || !toStr) return "";
  const f = new Date(fromStr + "T00:00:00");
  const t = new Date(toStr + "T00:00:00");
  const fY = toBE(f.getFullYear()), tY = toBE(t.getFullYear());
  if (f.getFullYear() === t.getFullYear() && f.getMonth() === t.getMonth()) {
    return `${f.getDate()}-${t.getDate()} ${THAI_MONTHS_FULL[f.getMonth()]} ${fY}`;
  }
  if (fY === tY) {
    return `${f.getDate()} ${THAI_MONTHS_FULL[f.getMonth()]} - ${t.getDate()} ${THAI_MONTHS_FULL[t.getMonth()]} ${fY}`;
  }
  return `${f.getDate()} ${THAI_MONTHS_FULL[f.getMonth()]} ${fY} - ${t.getDate()} ${THAI_MONTHS_FULL[t.getMonth()]} ${tY}`;
};

const inputStyle = { border: "1px solid #EADFC4", borderRadius: 8, padding: "8px 10px", fontSize: 14, background: "#FBF3E1", color: "#2E1F0D", outline: "none" };
const primaryBtn = { display: "flex", alignItems: "center", gap: 6, background: "#4A320F", color: "#FFFFFF", border: "none", borderRadius: 10, padding: "9px 16px", fontSize: 14, fontWeight: 700, cursor: "pointer" };
const ghostBtn = { display: "flex", alignItems: "center", gap: 6, background: "#FFFFFF", color: "#4A320F", border: "1px solid #EADFC4", borderRadius: 9, padding: "7px 12px", fontSize: 13, fontWeight: 600, cursor: "pointer" };

function Field({ label, children }) {
  return <div style={{ display: "flex", flexDirection: "column", gap: 5 }}><label style={{ fontSize: 12, color: "#8A6E45", fontWeight: 500 }}>{label}</label>{children}</div>;
}
function Td({ children, style }) { return <td style={{ padding: "10px 14px", borderBottom: "1px solid #F5E9CE", whiteSpace: "nowrap", ...style }}>{children}</td>; }
function DeleteBtn({ onClick }) {
  return (
    <button onClick={onClick} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#B99B6B", padding: 4, borderRadius: 6, display: "flex" }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#B23A2E")} onMouseLeave={(e) => (e.currentTarget.style.color = "#B99B6B")}>
      <Trash2 size={15} />
    </button>
  );
}

// ---------- ระบบดึงสรุปข้อมูลเป็นรูปภาพ / PDF ----------
async function captureNode(node) {
  return html2canvas(node, {
    backgroundColor: "#FFFFFF", scale: 2, useCORS: true,
    ignoreElements: (el) => el.getAttribute && el.getAttribute("data-html2canvas-ignore") === "true",
  });
}
async function exportNodeAsImage(node, filename) {
  if (!node) return;
  const canvas = await captureNode(node);
  const link = document.createElement("a");
  link.download = `${filename}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}
async function exportNodeAsPDF(node, filename) {
  if (!node) return;
  const canvas = await captureNode(node);
  const imgData = canvas.toDataURL("image/png");
  const orientation = canvas.width > canvas.height ? "landscape" : "portrait";
  const pdf = new jsPDF({ orientation, unit: "px", format: [canvas.width, canvas.height] });
  pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
  pdf.save(`${filename}.pdf`);
}
function ExportButtons({ targetRef, filename }) {
  const [busy, setBusy] = useState(false);
  const run = async (fn) => {
    if (!targetRef.current || busy) return;
    setBusy(true);
    try { await fn(targetRef.current, filename); } catch (e) { console.error(e); }
    setBusy(false);
  };
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }} data-html2canvas-ignore="true">
      <button onClick={() => run(exportNodeAsImage)} disabled={busy} style={{ ...ghostBtn, opacity: busy ? 0.6 : 1 }}>
        <ImageIcon size={14} /> รูปภาพ
      </button>
      <button onClick={() => run(exportNodeAsPDF)} disabled={busy} style={{ ...ghostBtn, opacity: busy ? 0.6 : 1 }}>
        <FileDown size={14} /> PDF
      </button>
    </div>
  );
}

// ---------- ตำแหน่งพนักงานตั้งต้น (แก้ไข/เพิ่มเองได้) ----------
const defaultPositions = ["ผู้จัดการ", "แม่ครัว", "ผู้ช่วยครัว", "พนักงานบาร์", "พนักงานพาร์ทไทม์"];

const seedEmployees = [
  { id: "emp1", code: "001", name: "", position: "ผู้จัดการ", employeeType: "รายเดือน", bankAccountName: "", bankAccountNumber: "", baseSalary: 15000 },
];

export default function App() {
  const [positions, setPositions] = useState(defaultPositions);
  const [newPosition, setNewPosition] = useState("");
  const addPosition = () => {
    const trimmed = newPosition.trim();
    if (!trimmed || positions.includes(trimmed)) return;
    setPositions([...positions, trimmed]);
    setNewPosition("");
  };

  const [employees, setEmployees] = useState(seedEmployees);
  const [showRoster, setShowRoster] = useState(false);
  const [selectedEmpId, setSelectedEmpId] = useState(seedEmployees[0]?.id || "");

  const addEmployee = () => {
    const id = `emp${Date.now()}`;
    setEmployees([...employees, { id, code: "", name: "", position: positions[0] || "", employeeType: "รายเดือน", bankAccountName: "", bankAccountNumber: "", baseSalary: 0 }]);
    setSelectedEmpId(id);
  };
  const updateEmployee = (id, field, val) => {
    setEmployees(employees.map((e) => (e.id === id ? { ...e, [field]: field === "baseSalary" ? Number(val) || 0 : val } : e)));
  };
  const removeEmployee = (id) => {
    const next = employees.filter((e) => e.id !== id);
    setEmployees(next);
    if (selectedEmpId === id) setSelectedEmpId(next[0]?.id || "");
  };

  const selectedEmp = employees.find((e) => e.id === selectedEmpId) || null;

  // ฟอร์มสลิป
  const todayIso = todayStr();
  const [periodFrom, setPeriodFrom] = useState(todayIso);
  const [periodTo, setPeriodTo] = useState(todayIso);
  const [paymentDate, setPaymentDate] = useState(todayIso);
  const [salary, setSalary] = useState(0);
  const [otRate, setOtRate] = useState(100);
  const [otHours, setOtHours] = useState(0);
  const [commission, setCommission] = useState(0);
  const [otherIncome, setOtherIncome] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [extraIncomeRows, setExtraIncomeRows] = useState([]);
  const [deductionRows, setDeductionRows] = useState([{ id: "d1", label: "หักลาหยุดไม่ตามเงื่อนไข", amount: 0 }]);
  const [approverName, setApproverName] = useState("นายภูรินท์ จิตโสภา");
  const [approverPosition, setApproverPosition] = useState("ผู้จัดการร้าน");

  const applyEmployeeDefaults = (emp) => {
    if (!emp) return;
    setSalary(emp.baseSalary || 0);
  };

  const otAmount = (Number(otRate) || 0) * (Number(otHours) || 0);
  const addExtraIncome = () => setExtraIncomeRows([...extraIncomeRows, { id: `ei${Date.now()}`, label: "รายได้เพิ่มเติม", amount: 0 }]);
  const updateExtraIncome = (id, field, val) => setExtraIncomeRows(extraIncomeRows.map((r) => (r.id === id ? { ...r, [field]: field === "amount" ? Number(val) || 0 : val } : r)));
  const removeExtraIncome = (id) => setExtraIncomeRows(extraIncomeRows.filter((r) => r.id !== id));

  const addDeduction = () => setDeductionRows([...deductionRows, { id: `d${Date.now()}`, label: "รายการหักเพิ่มเติม", amount: 0 }]);
  const updateDeduction = (id, field, val) => setDeductionRows(deductionRows.map((r) => (r.id === id ? { ...r, [field]: field === "amount" ? Number(val) || 0 : val } : r)));
  const removeDeduction = (id) => setDeductionRows(deductionRows.filter((r) => r.id !== id));

  const totalIncome = (Number(salary) || 0) + otAmount + (Number(commission) || 0) + (Number(otherIncome) || 0) + (Number(bonus) || 0)
    + extraIncomeRows.reduce((s, r) => s + Number(r.amount || 0), 0);
  const totalDeduction = deductionRows.reduce((s, r) => s + Number(r.amount || 0), 0);
  const netPay = totalIncome - totalDeduction;

  const slipRef = useRef(null);
  const filenameSafe = `สลิปเงินเดือน-${selectedEmp?.name || "พนักงาน"}-${paymentDate}`.replace(/\s+/g, "_");

  return (
    <div style={{ fontFamily: "'Roboto', 'Noto Sans Thai', sans-serif", background: "#FBF3E1", minHeight: "100vh", color: "#2E1F0D" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Noto+Sans+Thai:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        button, input, select { font-family: inherit; }
      `}</style>

      <header style={{ background: "#FFFFFF", borderBottom: "1px solid #EADFC4", padding: "16px 32px", display: "flex", alignItems: "center", gap: 12 }}>
        <img src={LOGO_DATA_URI} alt="Rove & Rounds Coffee" style={{ width: 40, height: 40, borderRadius: 10, objectFit: "cover" }} />
        <div>
          <div style={{ fontWeight: 700, fontSize: 16 }}>Rove & Rounds Coffee</div>
          <div style={{ fontSize: 12.5, color: "#8A6E45" }}>ระบบสลิปเงินเดือนพนักงาน</div>
        </div>
      </header>

      <main style={{ padding: "28px 32px", maxWidth: 1100, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "'Roboto', sans-serif", fontSize: 26, fontWeight: 600, margin: "0 0 4px" }}>สลิปเงินเดือนพนักงาน</h1>
        <p style={{ margin: "0 0 20px", color: "#8A6E45", fontSize: 15 }}>เลือกพนักงาน กรอกรายละเอียดเงินเดือน ระบบคำนวณยอดสุทธิให้อัตโนมัติ แล้ว Export เป็น PDF ได้</p>

        {/* จัดการตำแหน่ง */}
        <div style={{ background: "#FFFFFF", border: "1px solid #EADFC4", borderRadius: 16, boxShadow: "0 1px 3px rgba(15,42,32,0.06)", padding: 16, marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: "#6B4F2A", margin: 0 }}>ตำแหน่งงานทั้งหมด</h3>
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
            <input type="text" value={newPosition} onChange={(e) => setNewPosition(e.target.value)} placeholder="ชื่อตำแหน่งใหม่" style={{ ...inputStyle, flex: 1, minWidth: 160 }} onKeyDown={(e) => e.key === "Enter" && addPosition()} />
            <button onClick={addPosition} style={{ ...primaryBtn, padding: "7px 14px", fontSize: 13 }}><Plus size={14} /> เพิ่มตำแหน่ง</button>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {positions.map((p) => (
              <span key={p} style={{ padding: "5px 12px", borderRadius: 20, background: "#FBF3E1", border: "1px solid #EADFC4", fontSize: 12.5 }}>{p}</span>
            ))}
          </div>
        </div>

        {/* รายชื่อพนักงาน */}
        <div style={{ background: "#FFFFFF", border: "1px solid #EADFC4", borderRadius: 16, boxShadow: "0 1px 3px rgba(15,42,32,0.06)", padding: 16, marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: showRoster ? 10 : 0 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#6B4F2A", margin: 0, display: "flex", alignItems: "center", gap: 6 }}>
              <Users size={14} /> รายชื่อพนักงาน ({employees.length} คน)
            </h3>
            <div style={{ display: "flex", gap: 8 }}>
              {showRoster && <button onClick={addEmployee} style={{ ...primaryBtn, padding: "6px 12px", fontSize: 13 }}><Plus size={14} /> เพิ่มพนักงาน</button>}
              <button onClick={() => setShowRoster(!showRoster)} style={{ ...primaryBtn, padding: "6px 12px", fontSize: 13.5, background: showRoster ? "#FBF3E1" : "#2E1F0D", color: showRoster ? "#6B4F2A" : "#FBF3E1", border: showRoster ? "1px solid #EADFC4" : "none" }}>
                {showRoster ? "ซ่อน" : "จัดการรายชื่อ"}
              </button>
            </div>
          </div>
          {showRoster && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
              {employees.map((e) => (
                <div key={e.id} style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", padding: "6px 0", borderBottom: "1px solid #F1E7D0" }}>
                  <input type="text" placeholder="รหัสพนักงาน" value={e.code} onChange={(ev) => updateEmployee(e.id, "code", ev.target.value)} style={{ ...inputStyle, width: 90 }} />
                  <input type="text" placeholder="ชื่อ-นามสกุล" value={e.name} onChange={(ev) => updateEmployee(e.id, "name", ev.target.value)} style={{ ...inputStyle, flex: 1, minWidth: 140 }} />
                  <select value={e.position} onChange={(ev) => updateEmployee(e.id, "position", ev.target.value)} style={{ ...inputStyle, minWidth: 130 }}>
                    {positions.map((p) => <option key={p} value={p}>{p}</option>)}
                    {!positions.includes(e.position) && <option value={e.position}>{e.position}</option>}
                  </select>
                  <select value={e.employeeType} onChange={(ev) => updateEmployee(e.id, "employeeType", ev.target.value)} style={{ ...inputStyle, width: 110 }}>
                    <option value="รายเดือน">รายเดือน</option>
                    <option value="รายวัน">รายวัน</option>
                    <option value="พาร์ทไทม์">พาร์ทไทม์</option>
                  </select>
                  <input type="text" placeholder="ธนาคาร/บัญชี" value={e.bankAccountName} onChange={(ev) => updateEmployee(e.id, "bankAccountName", ev.target.value)} style={{ ...inputStyle, width: 120 }} />
                  <input type="text" placeholder="เลขที่บัญชี" value={e.bankAccountNumber} onChange={(ev) => updateEmployee(e.id, "bankAccountNumber", ev.target.value)} style={{ ...inputStyle, width: 130 }} />
                  <span style={{ fontSize: 12.5, color: "#8A6E45" }}>เงินเดือนพื้นฐาน</span>
                  <input type="number" min={0} value={e.baseSalary} onChange={(ev) => updateEmployee(e.id, "baseSalary", ev.target.value)} style={{ ...inputStyle, width: 90, textAlign: "right" }} />
                  <DeleteBtn onClick={() => removeEmployee(e.id)} />
                </div>
              ))}
              {employees.length === 0 && <p style={{ color: "#B99B6B", fontSize: 13 }}>ยังไม่มีพนักงาน กด "เพิ่มพนักงาน" เพื่อเริ่มต้น</p>}
            </div>
          )}
        </div>

        {/* เลือกพนักงานสำหรับออกสลิป */}
        <div style={{ background: "#FFFFFF", border: "1px solid #EADFC4", borderRadius: 16, boxShadow: "0 1px 3px rgba(15,42,32,0.06)", padding: 18, marginBottom: 22 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "end", flexWrap: "wrap", marginBottom: 16 }}>
            <Field label="เลือกพนักงาน">
              <select
                value={selectedEmpId}
                onChange={(e) => { setSelectedEmpId(e.target.value); applyEmployeeDefaults(employees.find((x) => x.id === e.target.value)); }}
                style={{ ...inputStyle, minWidth: 200 }}
              >
                {employees.length === 0 && <option value="">— ยังไม่มีพนักงาน —</option>}
                {employees.map((e) => <option key={e.id} value={e.id}>{e.name || "(ยังไม่ตั้งชื่อ)"} — {e.position}</option>)}
              </select>
            </Field>
            <Field label="งวดวันที่ (จาก)"><input type="date" value={periodFrom} onChange={(e) => setPeriodFrom(e.target.value)} style={inputStyle} /></Field>
            <Field label="ถึง"><input type="date" value={periodTo} onChange={(e) => setPeriodTo(e.target.value)} style={inputStyle} /></Field>
            <Field label="วันที่จ่าย"><input type="date" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} style={inputStyle} /></Field>
          </div>

          {selectedEmp ? (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 18 }}>
                {/* รายได้ */}
                <div>
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: "#4A320F", margin: "0 0 10px" }}>รายได้</h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ flex: 1, fontSize: 13.5 }}>เงินเดือน</span>
                      <input type="number" min={0} value={salary} onChange={(e) => setSalary(e.target.value)} style={{ ...inputStyle, width: 110, textAlign: "right" }} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ flex: 1, fontSize: 13.5 }}>ค่าล่วงเวลา (อัตรา×ชม.)</span>
                      <input type="number" min={0} value={otRate} onChange={(e) => setOtRate(e.target.value)} title="อัตราบาท/ชม." style={{ ...inputStyle, width: 70, textAlign: "right" }} />
                      <span style={{ fontSize: 12.5, color: "#8A6E45" }}>×</span>
                      <input type="number" min={0} value={otHours} onChange={(e) => setOtHours(e.target.value)} title="จำนวนชั่วโมง" style={{ ...inputStyle, width: 60, textAlign: "right" }} />
                      <span style={{ fontSize: 13, fontWeight: 600, minWidth: 70, textAlign: "right" }}>฿{fmt(otAmount)}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ flex: 1, fontSize: 13.5 }}>ค่าคอมมิชชั่น</span>
                      <input type="number" min={0} value={commission} onChange={(e) => setCommission(e.target.value)} style={{ ...inputStyle, width: 110, textAlign: "right" }} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ flex: 1, fontSize: 13.5 }}>เงินได้อื่นๆ</span>
                      <input type="number" min={0} value={otherIncome} onChange={(e) => setOtherIncome(e.target.value)} style={{ ...inputStyle, width: 110, textAlign: "right" }} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ flex: 1, fontSize: 13.5 }}>เงินพิเศษ</span>
                      <input type="number" min={0} value={bonus} onChange={(e) => setBonus(e.target.value)} style={{ ...inputStyle, width: 110, textAlign: "right" }} />
                    </div>
                    {extraIncomeRows.map((r) => (
                      <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <input type="text" value={r.label} onChange={(e) => updateExtraIncome(r.id, "label", e.target.value)} style={{ ...inputStyle, flex: 1 }} />
                        <input type="number" min={0} value={r.amount} onChange={(e) => updateExtraIncome(r.id, "amount", e.target.value)} style={{ ...inputStyle, width: 110, textAlign: "right" }} />
                        <DeleteBtn onClick={() => removeExtraIncome(r.id)} />
                      </div>
                    ))}
                    <button onClick={addExtraIncome} style={{ ...ghostBtn, alignSelf: "flex-start", marginTop: 4 }}><Plus size={13} /> เพิ่มรายได้</button>
                  </div>
                </div>

                {/* รายการหัก */}
                <div>
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: "#B23A2E", margin: "0 0 10px" }}>รายการหัก</h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {deductionRows.map((r) => (
                      <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <input type="text" value={r.label} onChange={(e) => updateDeduction(r.id, "label", e.target.value)} style={{ ...inputStyle, flex: 1 }} />
                        <input type="number" min={0} value={r.amount} onChange={(e) => updateDeduction(r.id, "amount", e.target.value)} style={{ ...inputStyle, width: 110, textAlign: "right" }} />
                        <DeleteBtn onClick={() => removeDeduction(r.id)} />
                      </div>
                    ))}
                    <button onClick={addDeduction} style={{ ...ghostBtn, alignSelf: "flex-start", marginTop: 4 }}><Plus size={13} /> เพิ่มรายการหัก</button>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 12, alignItems: "end", flexWrap: "wrap" }}>
                <Field label="ผู้อนุมัติ"><input type="text" value={approverName} onChange={(e) => setApproverName(e.target.value)} style={{ ...inputStyle, minWidth: 160 }} /></Field>
                <Field label="ตำแหน่งผู้อนุมัติ"><input type="text" value={approverPosition} onChange={(e) => setApproverPosition(e.target.value)} style={{ ...inputStyle, minWidth: 140 }} /></Field>
              </div>
            </>
          ) : (
            <p style={{ color: "#B99B6B", fontSize: 13.5 }}>เพิ่มพนักงานในรายชื่อด้านบนก่อน จึงจะออกสลิปได้</p>
          )}
        </div>

        {selectedEmp && (
          <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0, fontFamily: "'Roboto', sans-serif" }}>ตัวอย่างสลิปเงินเดือน</h3>
              <ExportButtons targetRef={slipRef} filename={filenameSafe} />
            </div>

            {/* ตัวสลิป — เค้าโครงตามไฟล์ตัวอย่าง */}
            <div ref={slipRef} style={{ background: "#FFFFFF", border: "1px solid #EADFC4", borderRadius: 12, padding: 32, maxWidth: 820, margin: "0 auto 40px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 18 }}>
                <img src={LOGO_DATA_URI} alt="Rove & Rounds Coffee" style={{ width: 64, height: 64, borderRadius: 10, objectFit: "cover" }} />
                <div style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>ROVE AND ROUND COFFEE</div>
                  <div style={{ fontSize: 12.5, color: "#3A2712" }}>เลขที่ 1/18 ถ.ไทรบุรี ต.บ่อยาง อ.เมืองสงขลา จ.สงขลา 90000</div>
                  <div style={{ fontSize: 12.5, color: "#3A2712" }}>E-mail : roveandround1@gmail.com</div>
                </div>
              </div>
              <div style={{ textAlign: "center", fontWeight: 700, fontSize: 14, marginBottom: 16 }}>
                สลิปเงินเดือน ประจำเดือนวันที่ {formatThaiRange(periodFrom, periodTo)}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, fontSize: 13, marginBottom: 16 }}>
                <div>รหัสพนักงาน &nbsp; {selectedEmp.code}</div>
                <div>ชื่อ-นามสกุล &nbsp; {selectedEmp.name}</div>
                <div>ตำแหน่ง &nbsp; {selectedEmp.position}</div>
                <div>โอนเข้าบัญชี &nbsp; {selectedEmp.bankAccountName}</div>
                <div>ประเภทพนักงาน &nbsp; {selectedEmp.employeeType}</div>
                <div>เลขที่บัญชี &nbsp; {selectedEmp.bankAccountNumber}</div>
              </div>

              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, marginBottom: 16 }}>
                <thead>
                  <tr style={{ background: "#FBF3E1" }}>
                    <th style={{ border: "1px solid #EADFC4", padding: "8px 10px", textAlign: "left" }}>รายได้</th>
                    <th style={{ border: "1px solid #EADFC4", padding: "8px 10px", textAlign: "right", width: 100 }}>จำนวนเงิน (บาท)</th>
                    <th style={{ border: "1px solid #EADFC4", padding: "8px 10px", textAlign: "left" }}>รายการหัก</th>
                    <th style={{ border: "1px solid #EADFC4", padding: "8px 10px", textAlign: "right", width: 100 }}>จำนวนเงิน (บาท)</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: Math.max(5 + extraIncomeRows.length, deductionRows.length) }).map((_, i) => {
                    const incomeLabels = [
                      { label: "เงินเดือน", amount: salary },
                      { label: "ค่าล่วงเวลา", amount: otAmount },
                      { label: "ค่าคอมมิชชั่น", amount: commission },
                      { label: "เงินได้อื่นๆ", amount: otherIncome },
                      { label: "เงินพิเศษ", amount: bonus },
                      ...extraIncomeRows,
                    ];
                    const inc = incomeLabels[i];
                    const ded = deductionRows[i];
                    return (
                      <tr key={i}>
                        <Td style={{ borderBottom: "none" }}>{inc ? inc.label : ""}</Td>
                        <Td style={{ borderBottom: "none", textAlign: "right" }}>{inc ? (Number(inc.amount) ? fmt(inc.amount) : "-") : ""}</Td>
                        <Td style={{ borderBottom: "none" }}>{ded ? ded.label : ""}</Td>
                        <Td style={{ borderBottom: "none", textAlign: "right" }}>{ded ? (Number(ded.amount) ? fmt(ded.amount) : "-") : ""}</Td>
                      </tr>
                    );
                  })}
                  <tr style={{ background: "#FBF3E1", fontWeight: 700 }}>
                    <Td style={{ borderBottom: "none" }}>รวมเงินรายได้ทั้งหมด</Td>
                    <Td style={{ borderBottom: "none", textAlign: "right" }}>{fmt(totalIncome)}</Td>
                    <Td style={{ borderBottom: "none" }}>รวมรายการหักทั้งหมด</Td>
                    <Td style={{ borderBottom: "none", textAlign: "right" }}>{fmt(totalDeduction)}</Td>
                  </tr>
                </tbody>
              </table>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "start" }}>
                <div>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                    <thead>
                      <tr style={{ background: "#FBF3E1" }}>
                        <th style={{ border: "1px solid #EADFC4", padding: "8px 10px", textAlign: "left" }}>วัน/เดือน/ปี ที่จ่าย</th>
                        <th style={{ border: "1px solid #EADFC4", padding: "8px 10px", textAlign: "right" }}>ยอดเงินสุทธิ (บาท)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <Td style={{ borderBottom: "1px solid #EADFC4" }}>{formatThaiDateFull(paymentDate)}</Td>
                        <Td style={{ borderBottom: "1px solid #EADFC4", textAlign: "right", fontWeight: 700 }}>{fmt(netPay)}</Td>
                      </tr>
                    </tbody>
                  </table>
                  <p style={{ fontSize: 12, color: "#8A6E45", marginTop: 8 }}>ลายมือชื่อพนักงาน …………………………</p>
                </div>
                <div style={{ textAlign: "center", fontSize: 13 }}>
                  <div style={{ fontWeight: 600, marginBottom: 30 }}>ลายมือผู้อนุมัติ</div>
                  <div>ลงชื่อ………………………………………………</div>
                  <div style={{ marginTop: 4 }}>({approverName})</div>
                  <div>ตำแหน่ง {approverPosition}</div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
