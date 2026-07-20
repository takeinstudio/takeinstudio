import React, { useState, useRef } from "react";
import { FileText, Download, Loader2, Plus, Trash2 } from "lucide-react";
// @ts-ignore
import html2pdf from "html2pdf.js";

export default function DocumentsBuilder() {
  const [loading, setLoading] = useState(false);

  const [basicInfo, setBasicInfo] = useState({
    projectName: "",
    ownerName: "",
    developerName: "",
    subtitle: "",
    domainCost: "",
    domainPaid: false,
    hostingCost: "",
    hostingPaid: false,
    manualTotal: ""
  });

  const [sections, setSections] = useState([
    {
      id: "website",
      title: "Live Website Pages",
      price: "",
      bullets: "Home: Premium animated hero, featured projects, philosophy.\nAbout: Owner details, mission, vision, and legacy timeline.\nProjects: Categorized view of Ongoing, Upcoming, and Completed works.\nInterior Design: High-end gallery for living spaces, bedrooms, and offices.\nConstruction: Dedicated showcase for residential and commercial infrastructure.\nContact: Location, phone numbers, and direct inquiry connections."
    },
    {
      id: "cms",
      title: "Secure Admin Dashboard",
      price: "",
      bullets: "Project Management (CMS): Add/Delete Main, Interior, and Construction projects. Instantly syncs with live website.\nClient Management: Register new clients, track their project names, contact details, and total budget.\nFinancial Records: Record payments with Payment Methods (Cash, Bank Transfer, UPI) and Transaction IDs.\nAutomated Invoicing: Generate and download professional PDF payment receipts directly from the dashboard."
    },
    {
      id: "auth",
      title: "Advanced Security & Authentication",
      price: "",
      bullets: "Encrypted Admin Authentication: Secure sessions with JWT, password hashing, and brute-force protection.\nAnti-Hacking & XSS Protection: Built-in Cross-Site Scripting (XSS) and injection attack prevention.\nAdvanced Database Security: AES-256 cloud database encryption, secure API tunneling, and cryptographically verified integrity checks for financial records."
    }
  ]);

  const computedTotal = React.useMemo(() => {
    let sum = 0;
    sections.forEach(s => {
      const num = parseInt(s.price.replace(/,/g, '') || "0", 10);
      if (!isNaN(num)) sum += num;
    });
    if (!basicInfo.domainPaid && basicInfo.domainCost) {
      const num = parseInt(basicInfo.domainCost.replace(/,/g, '') || "0", 10);
      if (!isNaN(num)) sum += num;
    }
    if (!basicInfo.hostingPaid && basicInfo.hostingCost) {
      const num = parseInt(basicInfo.hostingCost.replace(/,/g, '') || "0", 10);
      if (!isNaN(num)) sum += num;
    }
    return sum.toLocaleString('en-IN');
  }, [sections, basicInfo]);

  const displayTotal = basicInfo.manualTotal || computedTotal;
  const templateRef = useRef<HTMLDivElement>(null);

  const handleGeneratePDF = () => {
    if (!templateRef.current) return;
    setLoading(true);
    setTimeout(async () => {
      const element = templateRef.current;
      const opt = {
        margin: [0, 0, 0, 0],
        filename: `${basicInfo.projectName ? basicInfo.projectName.replace(new RegExp('\\s+', 'g'), '_') : 'Project'}_Handover.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true, scrollY: 0 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      try {
        await html2pdf().from(element).set(opt).save();
      } catch (err) {
        console.error("PDF generation failed", err);
        alert("Failed to generate PDF.");
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  const handleBasicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setBasicInfo({ ...basicInfo, [e.target.name]: value });
  };

  const handleSectionChange = (id: string, field: string, value: string) => {
    setSections(sections.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const addSection = () => {
    setSections([...sections, {
      id: Date.now().toString(),
      title: "New Custom Feature",
      price: "",
      bullets: "Feature detail 1...\nFeature detail 2..."
    }]);
  };

  const removeSection = (id: string) => {
    setSections(sections.filter(s => s.id !== id));
  };

  const renderBullets = (bullets: string) =>
    bullets.split('\n').filter(b => b.trim()).map((bullet, idx) => {
      const parts = bullet.split(':');
      return (
        <div key={idx} className="flex items-start gap-2.5">
          <div className="mt-[5px] w-1.5 h-1.5 rounded-full bg-[#ff5722] flex-shrink-0"></div>
          <span>
            {parts.length > 1
              ? <><strong className="text-gray-900 font-bold">{parts[0]}:</strong>{parts.slice(1).join(':')}</>
              : bullet}
          </span>
        </div>
      );
    });

  const renderBulletsWithPrice = (bullets: string, priceMap: (idx: number) => string) =>
    bullets.split('\n').filter(b => b.trim()).map((bullet, idx) => {
      const parts = bullet.split(':');
      return (
        <div key={idx} className="flex justify-between gap-4">
          <p className="text-gray-600">
            {parts.length > 1
              ? <><strong className="text-gray-800 font-semibold">{parts[0]}:</strong>{parts.slice(1).join(':')}</>
              : bullet}
          </p>
          <span className="font-bold text-gray-900 whitespace-nowrap">{priceMap(idx)}</span>
        </div>
      );
    });

  return (
    <div className="space-y-6 pb-20">
      <div className="bg-card border border-border/50 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6 border-b border-border/50 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <FileText className="text-primary w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg">Project Handover PDF Generator</h3>
              <p className="text-xs text-muted-foreground">Dynamic Template Builder</p>
            </div>
          </div>
          <button
            onClick={handleGeneratePDF}
            disabled={loading}
            className="glow-btn bg-primary text-white font-bold px-6 py-2 rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
            {loading ? "Generating..." : "Generate PDF"}
          </button>
        </div>

        {/* Client Details */}
        <div className="mb-8 space-y-4">
          <h4 className="font-bold text-sm text-foreground/80 border-b pb-2">Client Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Project Name</label>
              <input type="text" name="projectName" value={basicInfo.projectName} onChange={handleBasicChange} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Owner Name</label>
              <input type="text" name="ownerName" value={basicInfo.ownerName} onChange={handleBasicChange} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Developer Name</label>
              <input type="text" name="developerName" value={basicInfo.developerName} onChange={handleBasicChange} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Project Type / Subtitle</label>
              <input type="text" name="subtitle" value={basicInfo.subtitle} onChange={handleBasicChange} placeholder="Premium Web Development" className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none" />
            </div>
          </div>
        </div>

        {/* Dynamic Sections */}
        <div className="mb-8 space-y-4">
          <div className="flex justify-between items-end border-b pb-2">
            <h4 className="font-bold text-sm text-foreground/80">Features &amp; Scope Pricing</h4>
            <button onClick={addSection} className="text-xs bg-muted text-foreground hover:bg-muted/80 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all">
              <Plus size={14} /> Add Custom Section
            </button>
          </div>
          <div className="space-y-4">
            {sections.map(section => (
              <div key={section.id} className="p-4 border border-border/50 bg-muted/20 rounded-xl relative">
                <button onClick={() => removeSection(section.id)} className="absolute top-4 right-4 text-destructive hover:text-destructive/80"><Trash2 size={16} /></button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3 pr-8">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Section Title</label>
                    <input type="text" value={section.title} onChange={e => handleSectionChange(section.id, 'title', e.target.value)} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Price (e.g. 4,999 or Custom)</label>
                    <input type="text" value={section.price} onChange={e => handleSectionChange(section.id, 'price', e.target.value)} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Bullet Points (One per line. Format: BoldTitle: Description)</label>
                  <textarea rows={4} value={section.bullets} onChange={e => handleSectionChange(section.id, 'bullets', e.target.value)} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none resize-none"></textarea>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="space-y-4">
          <h4 className="font-bold text-sm text-foreground/80 border-b pb-2">Totals &amp; Domain Setup</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-semibold text-muted-foreground">Domain Name Cost</label>
                <label className="flex items-center gap-1.5 text-xs text-green-600 font-bold cursor-pointer">
                  <input type="checkbox" name="domainPaid" checked={basicInfo.domainPaid} onChange={handleBasicChange} className="accent-green-600 w-3.5 h-3.5 rounded" />
                  Paid?
                </label>
              </div>
              <input type="text" name="domainCost" value={basicInfo.domainCost} onChange={handleBasicChange} disabled={basicInfo.domainPaid} placeholder={basicInfo.domainPaid ? "Paid" : "e.g. 800"} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none disabled:opacity-50" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-semibold text-muted-foreground">Hosting Setup Cost</label>
                <label className="flex items-center gap-1.5 text-xs text-green-600 font-bold cursor-pointer">
                  <input type="checkbox" name="hostingPaid" checked={basicInfo.hostingPaid} onChange={handleBasicChange} className="accent-green-600 w-3.5 h-3.5 rounded" />
                  Paid?
                </label>
              </div>
              <input type="text" name="hostingCost" value={basicInfo.hostingCost} onChange={handleBasicChange} disabled={basicInfo.hostingPaid} placeholder={basicInfo.hostingPaid ? "Paid" : "e.g. 2,000"} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none disabled:opacity-50" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-brand-orange mb-1">Total Payable (Auto-Calculated)</label>
              <input type="text" name="manualTotal" value={basicInfo.manualTotal} onChange={handleBasicChange} placeholder={`\u20b9 ${computedTotal}`} className="w-full bg-orange-50 border border-orange-200 text-brand-orange font-bold rounded-lg px-3 py-2 text-lg focus:border-primary outline-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Template for PDF Generation */}
      <div className="overflow-hidden h-0 w-0 absolute top-[-9999px] left-[-9999px]">
        <div ref={templateRef} className="w-[800px] font-sans antialiased bg-[#fff8f2] text-gray-800 relative" style={{ fontFamily: "'Inter', sans-serif" }}>

          <style dangerouslySetInnerHTML={{__html: `
            .heading { font-family: 'Playfair Display', serif; }
            .brand-orange { color: #ff5722; }
            .section-title { font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 700; color: #1a1a1a; display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }
            .section-title::before { content: ""; display: block; width: 40px; height: 3px; background-color: #ff5722; }
            .pdf-page { width: 800px; height: 1131px; overflow: hidden; position: relative; box-sizing: border-box; }
          `}} />

          {/* ── PAGE 1 ── */}
          <div className="pdf-page">
            <div style={{ padding: '32px 40px', height: '100%', boxSizing: 'border-box', background: 'white', borderRadius: '16px', border: '1px solid #ffedd5' }}>

              {/* Header */}
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                  <img src={`${window.location.origin}/logo/logo_text.png`} alt="TakeIN Studio Logo" style={{ height: '80px', objectFit: 'contain' }} />
                </div>
                <h1 className="heading" style={{ fontSize: '30px', fontWeight: 800, marginBottom: '6px', color: '#111' }}>Project Proposal &amp; Handover</h1>
                <p style={{ fontSize: '10px', color: '#555', fontWeight: 700, marginBottom: '20px' }}>
                  {basicInfo.subtitle || "Premium Web Development & CMS Platform"}
                </p>
                <div style={{ border: '1px solid #fed7aa', borderRadius: '16px', padding: '16px 20px', maxWidth: '500px', margin: '0 auto', background: 'white' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #f3f4f6' }}>
                    <span style={{ fontSize: '13px', color: '#555' }}><strong style={{ color: '#111' }}>Project:</strong> {basicInfo.projectName || "—"}</span>
                    <span style={{ fontSize: '13px', color: '#555' }}><strong style={{ color: '#111' }}>Owner:</strong> {basicInfo.ownerName || "—"}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={`${window.location.origin}/logo/logo_no_text.png`} alt="" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #ffedd5' }} />
                    <div>
                      <p style={{ fontSize: '9px', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '2px' }}>Developed By</p>
                      <p style={{ fontSize: '13px', fontWeight: 700, color: '#111' }}>
                        {basicInfo.developerName || "Ankit Tripathy"} <span style={{ color: '#ff5722' }}>(TakeIN Studio)</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scope of Work */}
              <div>
                <h2 className="section-title">Scope of Work &amp; Features</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  {/* Col 1 */}
                  <div style={{ background: '#fffbf8', padding: '20px', borderRadius: '16px', border: '1px solid #ffedd5' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#ffedd5', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#ff5722', flexShrink: 0 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
                      </span>
                      Live Website Pages
                    </h3>
                    <div style={{ fontSize: '11px', color: '#555', lineHeight: '1.7' }}>
                      {renderBullets(sections[0]?.bullets || '')}
                    </div>
                  </div>
                  {/* Col 2 */}
                  <div style={{ background: '#fffbf8', padding: '20px', borderRadius: '16px', border: '1px solid #ffedd5' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#ffedd5', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#ff5722', flexShrink: 0 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      </span>
                      Secure Admin Dashboard
                    </h3>
                    <div style={{ fontSize: '11px', color: '#555', lineHeight: '1.7' }}>
                      {renderBullets(sections[1]?.bullets || '')}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ── PAGE 2 ── */}
          <div className="pdf-page">
            <div style={{ padding: '32px 40px', height: '100%', boxSizing: 'border-box', background: 'white', borderRadius: '16px', border: '1px solid #ffedd5' }}>
              <h2 className="section-title">Investment Breakdown</h2>

              <div style={{ border: '1px solid #ffedd5', borderRadius: '20px', overflow: 'hidden' }}>
                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div>
                      <h4 style={{ fontWeight: 700, fontSize: '20px', color: '#111', marginBottom: '4px' }}>One-Time Development Cost</h4>
                      <p style={{ fontSize: '12px', color: '#888' }}>Comprehensive Web Platform &amp; Content Management System</p>
                    </div>
                    <div style={{ fontSize: '32px', fontWeight: 800, color: '#111', whiteSpace: 'nowrap' }}>
                      &#8377; {displayTotal || "13,499"}
                    </div>
                  </div>

                  <div style={{ background: '#fffbf8', borderRadius: '16px', padding: '24px', border: '1px solid #ffedd5' }}>
                    <h5 style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: '#111', marginBottom: '16px' }}>Detailed Price Breakdown</h5>

                    <div style={{ fontSize: '12px', color: '#555' }}>
                      {/* Live Website Pages */}
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <strong style={{ color: '#111' }}>Live Website Pages</strong>
                          <span style={{ fontWeight: 700, color: '#111', whiteSpace: 'nowrap' }}>&#8377; {sections[0]?.price || "4,999"}</span>
                        </div>
                        <div style={{ paddingLeft: '16px', lineHeight: '1.7' }}>
                          {sections[0]?.bullets.split('\n').filter(b => b.trim()).map((bullet, idx) => {
                            const parts = bullet.split(':');
                            return <p key={idx}>{parts.length > 1 ? <><strong>{parts[0]}:</strong>{parts.slice(1).join(':')}</> : bullet}</p>;
                          })}
                        </div>
                      </div>

                      {/* Secure Admin Dashboard */}
                      <div style={{ marginBottom: '16px', paddingTop: '16px', borderTop: '1px solid #f3f4f6' }}>
                        <h6 style={{ fontWeight: 700, color: '#111', marginBottom: '8px' }}>Secure Admin Dashboard</h6>
                        <div style={{ paddingLeft: '16px', lineHeight: '1.8' }}>
                          {renderBulletsWithPrice(sections[1]?.bullets || '', idx => `\u20b9 ${idx === 0 ? "1,500" : "1,000"}`)}
                        </div>
                      </div>

                      {/* Advanced Security */}
                      <div style={{ paddingTop: '16px', borderTop: '1px solid #f3f4f6' }}>
                        <h6 style={{ fontWeight: 700, color: '#111', marginBottom: '8px' }}>Advanced Security &amp; Authentication</h6>
                        <div style={{ paddingLeft: '16px', lineHeight: '1.8' }}>
                          {renderBulletsWithPrice(sections[2]?.bullets || '', idx => `\u20b9 ${idx === 2 ? "1,000" : "1,500"}`)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── PAGE 3 ── */}
          <div className="pdf-page">
            <div style={{ padding: '32px 40px', height: '100%', boxSizing: 'border-box', background: 'white', borderRadius: '16px', border: '1px solid #ffedd5', display: 'flex', flexDirection: 'column' }}>

              {/* Domain & Hosting */}
              <div>
                <h2 className="section-title">Domain &amp; Hosting</h2>
                <div style={{ border: '1px solid #ffedd5', borderRadius: '16px', overflow: 'hidden', marginBottom: '16px' }}>
                  <div style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid #f3f4f6', gap: '16px' }}>
                      <div>
                        <h4 style={{ fontWeight: 700, fontSize: '16px', color: '#111', marginBottom: '2px' }}>Domain Name Setup</h4>
                        <p style={{ fontSize: '11px', color: '#888' }}>Yearly Renewal (e.g., .com, .in)</p>
                      </div>
                      <div style={{ textAlign: 'center', background: '#fffbf8', border: '1px solid #ffedd5', padding: '10px 20px', borderRadius: '10px', minWidth: '160px' }}>
                        {basicInfo.domainPaid ? (
                          <span style={{ fontSize: '13px', fontWeight: 700, color: '#10b981', textTransform: 'uppercase', display: 'block' }}>PAID</span>
                        ) : basicInfo.domainCost ? (
                          <>
                            <span style={{ fontSize: '13px', fontWeight: 700, color: '#111', display: 'block', marginBottom: '2px' }}>&#8377; {basicInfo.domainCost}</span>
                            <span style={{ fontSize: '9px', color: '#888' }}>Subject to renewal</span>
                          </>
                        ) : (
                          <>
                            <span style={{ fontSize: '10px', fontWeight: 700, color: '#111', display: 'block', marginBottom: '2px' }}>TO BE CHECKED</span>
                            <span style={{ fontSize: '9px', color: '#888' }}>Exact rates depend on preferred domain</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', gap: '16px' }}>
                      <div>
                        <h4 style={{ fontWeight: 700, fontSize: '16px', color: '#111', marginBottom: '2px' }}>Server Hosting Setup</h4>
                        <p style={{ fontSize: '11px', color: '#888' }}>Yearly Renewal (Speed, Security &amp; Maintenance)</p>
                      </div>
                      <div style={{ textAlign: 'center', background: '#fffbf8', border: '1px solid #ffedd5', padding: '10px 20px', borderRadius: '10px', minWidth: '160px' }}>
                        {basicInfo.hostingPaid ? (
                          <span style={{ fontSize: '13px', fontWeight: 700, color: '#10b981', textTransform: 'uppercase', display: 'block' }}>PAID</span>
                        ) : basicInfo.hostingCost ? (
                          <>
                            <span style={{ fontSize: '13px', fontWeight: 700, color: '#111', display: 'block', marginBottom: '2px' }}>&#8377; {basicInfo.hostingCost}</span>
                            <span style={{ fontSize: '9px', color: '#888' }}>Subject to renewal</span>
                          </>
                        ) : (
                          <>
                            <span style={{ fontSize: '10px', fontWeight: 700, color: '#111', display: 'block', marginBottom: '2px' }}>TO BE CHECKED</span>
                            <span style={{ fontSize: '9px', color: '#888' }}>Exact rates depend on preferred hosting</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total Banner */}
              <div style={{ background: '#ff5722', padding: '20px 32px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '12px', marginBottom: '20px' }}>
                <h4 className="heading" style={{ fontSize: '22px', fontWeight: 700 }}>Total Immediate Payable</h4>
                <div style={{ fontSize: '28px', fontWeight: 800, textAlign: 'right' }}>
                  &#8377; {displayTotal || "13,499"}
                </div>
              </div>

              {/* Services Grid */}
              <div style={{ marginBottom: '16px' }}>
                <h2 className="heading" style={{ fontSize: '20px', fontWeight: 700, color: '#111', marginBottom: '6px', textAlign: 'center' }}>More Digital Solutions Built for Growth</h2>
                <p style={{ fontSize: '10px', color: '#888', textAlign: 'center', marginBottom: '14px' }}>From mobile apps to AI automation and branding, TakeIN Studio helps you scale with confidence.</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                  {[
                    { name: 'Website Dev', sub: 'E-COM & BIZ' },
                    { name: 'App Dev', sub: 'IOS & ANDROID' },
                    { name: 'Custom Software', sub: 'CRM & SYSTEMS' },
                    { name: 'AI Automation', sub: 'BOTS & FLOWS' },
                    { name: 'SEO & Marketing', sub: 'TRAFFIC & LEADS' },
                    { name: 'Graphic Design', sub: 'BRAND IDENTITY' },
                  ].map((item, i) => (
                    <div key={i} style={{ textAlign: 'center', border: '1px solid #ffedd5', borderRadius: '10px', padding: '14px 10px', background: '#fffbf8' }}>
                      <p style={{ fontWeight: 700, color: '#111', fontSize: '12px', marginBottom: '3px' }}>{item.name}</p>
                      <p style={{ fontSize: '8px', textTransform: 'uppercase', color: '#888' }}>{item.sub}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div style={{ marginTop: 'auto', borderTop: '1px solid #f3f4f6', paddingTop: '16px', textAlign: 'center' }}>
                <img src={`${window.location.origin}/logo/logo_text.png`} alt="Logo" style={{ height: '30px', objectFit: 'contain', marginBottom: '8px' }} />
                <p style={{ fontSize: '9px', color: '#aaa', marginBottom: '4px' }}>Designed and Developed with precision by</p>
                <p style={{ fontSize: '16px', fontWeight: 800, color: '#111' }}>{basicInfo.developerName || "Ankit Tripathy"}</p>
                <p style={{ fontSize: '8px', fontWeight: 700, color: '#ff5722', textTransform: 'uppercase', marginBottom: '10px' }}>TakeIN Studio</p>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', fontSize: '10px', fontWeight: 600, color: '#555', marginBottom: '10px' }}>
                  <span>www.takeinstudio.com</span>
                  <span style={{ color: '#ddd' }}>|</span>
                  <span>support@takeinstudio.com</span>
                  <span style={{ color: '#ddd' }}>|</span>
                  <span>+91 89082 33590</span>
                </div>
                <div style={{ display: 'inline-block', background: '#fffbf8', padding: '6px 20px', borderRadius: '999px', border: '1px solid #ffedd5', fontSize: '8px', fontWeight: 600, color: '#333' }}>
                  Premium Digital Agency &#8226; Building Digital Experiences That Drive Growth
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
