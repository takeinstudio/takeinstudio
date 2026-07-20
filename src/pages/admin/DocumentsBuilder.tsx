import React, { useState, useRef } from "react";
import { FileText, Download, CheckCircle2, Loader2, Plus, Trash2 } from "lucide-react";
// @ts-ignore
import html2pdf from "html2pdf.js";

export default function DocumentsBuilder() {
  const [loading, setLoading] = useState(false);

  // Basic Info
  const [basicInfo, setBasicInfo] = useState({
    projectName: "",
    ownerName: "",
    developerName: "",
    domainCost: "",
    domainPaid: false,
    hostingCost: "",
    hostingPaid: false,
    manualTotal: ""
  });

  // Dynamic Sections
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

    // Give React a small tick to ensure DOM is fully updated
    setTimeout(async () => {
      const element = templateRef.current;
      
      const opt = {
        margin: [0, 0, 0, 0], 
        filename: `${basicInfo.projectName ? basicInfo.projectName.replace(/\\s+/g, '_') : 'Project'}_Handover.pdf`,
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          </div>
        </div>

        {/* Dynamic Sections */}
        <div className="mb-8 space-y-4">
          <div className="flex justify-between items-end border-b pb-2">
            <h4 className="font-bold text-sm text-foreground/80">Features & Scope Pricing</h4>
            <button onClick={addSection} className="text-xs bg-muted text-foreground hover:bg-muted/80 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all">
              <Plus size={14}/> Add Custom Section
            </button>
          </div>
          
          <div className="space-y-4">
            {sections.map(section => (
              <div key={section.id} className="p-4 border border-border/50 bg-muted/20 rounded-xl relative">
                <button onClick={() => removeSection(section.id)} className="absolute top-4 right-4 text-destructive hover:text-destructive/80"><Trash2 size={16}/></button>
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
          <h4 className="font-bold text-sm text-foreground/80 border-b pb-2">Totals & Domain Setup</h4>
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
              <input type="text" name="manualTotal" value={basicInfo.manualTotal} onChange={handleBasicChange} placeholder={`₹ ${computedTotal}`} className="w-full bg-orange-50 border border-orange-200 text-brand-orange font-bold rounded-lg px-3 py-2 text-lg focus:border-primary outline-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Template for PDF Generation */}
      <div className="overflow-hidden h-0 w-0 absolute top-[-9999px] left-[-9999px]">
        <div ref={templateRef} className="w-[800px] font-sans antialiased bg-[#fff8f2] text-gray-800 py-10 px-8 relative print-container" style={{ fontFamily: "'Inter', sans-serif" }}>
          
          <style dangerouslySetInnerHTML={{__html: `
            .heading { font-family: 'Playfair Display', serif; }
            .brand-orange { color: #ff5722; }
            .bg-brand-orange { background-color: #ff5722; }
            .section-title { font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 700; color: #1a1a1a; display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }
            .section-title::before { content: ""; display: block; width: 40px; height: 3px; background-color: #ff5722; }
          `}} />

          {/* PAGE 1 */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden border border-orange-100 shadow-sm relative z-10 px-10 pt-6 pb-6">
            
            {/* Header */}
            <div className="text-center relative overflow-hidden mb-10 pt-2">
                <div className="flex justify-center mb-5">
                    <img src={`${window.location.origin}/logo/logo_text.png`} alt="TakeIN Studio Logo" className="h-24 object-contain drop-shadow-sm" />
                </div>

                <h1 className="heading text-[32px] font-extrabold mb-2 text-gray-900 tracking-tight">Project Proposal & Handover</h1>
                <p className="text-[10px] tracking-[0.25em] uppercase text-gray-700 font-bold mb-6">Premium Web Development & CMS Platform</p>
                
                <div className="border border-orange-200 rounded-[20px] p-5 text-left w-full max-w-[550px] mx-auto bg-white relative">
                    <div className="flex justify-between items-center mb-5 pb-5 border-b border-gray-100">
                        <div className="text-sm text-gray-600"><span className="font-bold text-gray-900 mr-2">Project:</span> {basicInfo.projectName || "Astha Associate"}</div>
                        <div className="text-sm text-gray-600"><span className="font-bold text-gray-900 mr-2">Owner:</span> {basicInfo.ownerName || "Pratap Kumar Swain"}</div>
                    </div>
                    <div className="flex items-center gap-4">
                        <img src={`${window.location.origin}/logo/logo_no_text.png`} alt="Developer" className="w-12 h-12 rounded-full object-cover border border-orange-100 bg-gray-50 p-1.5 shadow-sm" />
                        <div>
                            <p className="text-[10px] text-gray-400 uppercase tracking-[0.15em] font-bold mb-0.5">Developed By</p>
                            <p className="text-sm font-bold text-gray-900">{basicInfo.developerName || "Ankit Tripathy"} <span className="brand-orange ml-1">(TakeIN Studio)</span></p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scope of Work */}
            <div>
                <h2 className="section-title">Scope of Work & Features</h2>
                
                <div className="grid grid-cols-2 gap-6">
                    {/* Live Website Pages */}
                    <div className="bg-[#fffbf8] p-6 rounded-[20px] border border-[#ffedd5] h-full">
                        <h3 className="text-[17px] font-bold text-gray-900 mb-5 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-[#ffedd5] flex items-center justify-center text-[#ff5722]">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
                            </span>
                            Live Website Pages
                        </h3>
                        <div className="space-y-4 text-[12px] text-gray-600 leading-relaxed">
                            {sections[0]?.bullets.split('\n').filter(b => b.trim()).map((bullet, idx) => {
                                const parts = bullet.split(':');
                                return (
                                  <div key={idx} className="flex items-start gap-2.5">
                                    <div className="mt-[5px] w-1.5 h-1.5 rounded-full bg-[#ff5722] flex-shrink-0"></div>
                                    <span>
                                      {parts.length > 1 ? (
                                        <><strong className="text-gray-900 font-bold">{parts[0]}:</strong>{parts.slice(1).join(':')}</>
                                      ) : bullet}
                                    </span>
                                  </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Secure Admin Dashboard */}
                    <div className="bg-[#fffbf8] p-6 rounded-[20px] border border-[#ffedd5] h-full">
                        <h3 className="text-[17px] font-bold text-gray-900 mb-5 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-[#ffedd5] flex items-center justify-center text-[#ff5722]">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                            </span>
                            Secure Admin Dashboard
                        </h3>
                        <div className="space-y-4 text-[12px] text-gray-600 leading-relaxed">
                            {sections[1]?.bullets.split('\n').filter(b => b.trim()).map((bullet, idx) => {
                                const parts = bullet.split(':');
                                return (
                                  <div key={idx} className="flex items-start gap-2.5">
                                    <div className="mt-[5px] w-1.5 h-1.5 rounded-full bg-[#ff5722] flex-shrink-0"></div>
                                    <span>
                                      {parts.length > 1 ? (
                                        <><strong className="text-gray-900 font-bold">{parts[0]}:</strong>{parts.slice(1).join(':')}</>
                                      ) : bullet}
                                    </span>
                                  </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
          </div>

          <div className="html2pdf__page-break"></div>

          {/* PAGE 2 */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden border border-orange-100 shadow-sm relative z-10 p-12">
              <h2 className="section-title">Investment Breakdown</h2>

              <div className="border border-[#ffedd5] rounded-3xl overflow-hidden mt-6 relative">
                  <div className="p-8">
                      {/* Top Highlight Cost */}
                      <div className="flex justify-between items-center mb-8">
                          <div>
                              <h4 className="font-bold text-[22px] text-gray-900 mb-1">One-Time Development Cost</h4>
                              <p className="text-[13px] text-gray-500">Comprehensive Web Platform & Content Management System</p>
                          </div>
                          <div className="text-4xl font-extrabold whitespace-nowrap text-[#1a1a1a]">
                              ₹ {displayTotal || "13,499"}
                          </div>
                      </div>
                      
                      <div className="bg-[#fffbf8] rounded-2xl p-8 pb-10 border border-[#ffedd5]">
                          <h5 className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-900 mb-6">Detailed Price Breakdown</h5>
                          
                          <div className="space-y-6 text-[13px] text-gray-700">
                              {/* Live Website Pages */}
                              <div>
                                  <div className="flex justify-between items-start gap-4 mb-3">
                                      <h6 className="text-gray-900 font-bold flex items-center gap-2">
                                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                                          Live Website Pages
                                      </h6>
                                      <span className="whitespace-nowrap font-bold text-gray-900">₹ {sections[0]?.price || "4,999"}</span>
                                  </div>
                                  <div className="space-y-2 pl-[22px] text-gray-600 text-[12px] leading-relaxed">
                                      {sections[0]?.bullets.split('\n').filter(b => b.trim()).map((bullet, idx) => {
                                        const parts = bullet.split(':');
                                        return (
                                          <p key={idx}>
                                            {parts.length > 1 ? (
                                              <><strong className="text-gray-800 font-semibold">{parts[0]}:</strong>{parts.slice(1).join(':')}</>
                                            ) : bullet}
                                          </p>
                                        );
                                      })}
                                  </div>
                              </div>
                              
                              {/* Secure Admin Dashboard */}
                              <div className="pt-6 mt-4">
                                  <h6 className="text-gray-900 font-bold flex items-center gap-2 mb-4">
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                                      Secure Admin Dashboard
                                  </h6>
                                  <div className="space-y-4 pl-[22px] text-[12px] leading-relaxed">
                                      {sections[1]?.bullets.split('\n').filter(b => b.trim()).map((bullet, idx) => {
                                        const parts = bullet.split(':');
                                        return (
                                          <div key={idx} className="flex justify-between gap-4">
                                              <p className="text-gray-600">
                                                {parts.length > 1 ? (
                                                  <><strong className="text-gray-800 font-semibold">{parts[0]}:</strong>{parts.slice(1).join(':')}</>
                                                ) : bullet}
                                              </p>
                                              <span className="font-bold text-gray-900 whitespace-nowrap">₹ {idx === 0 ? "1,500" : "1,000"}</span>
                                          </div>
                                        );
                                      })}
                                  </div>
                              </div>

                              {/* Advanced Security */}
                              <div className="pt-6 mt-4">
                                  <h6 className="text-gray-900 font-bold flex items-center gap-2 mb-4">
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"/><path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"/></svg>
                                      Advanced Security & Authentication
                                  </h6>
                                  <div className="space-y-4 pl-[22px] text-[12px] leading-relaxed">
                                      {sections[2]?.bullets.split('\n').filter(b => b.trim()).map((bullet, idx) => {
                                        const parts = bullet.split(':');
                                        return (
                                          <div key={idx} className="flex justify-between gap-4">
                                              <p className="text-gray-600">
                                                {parts.length > 1 ? (
                                                  <><strong className="text-gray-800 font-semibold">{parts[0]}:</strong>{parts.slice(1).join(':')}</>
                                                ) : bullet}
                                              </p>
                                              <span className="font-bold text-gray-900 whitespace-nowrap">₹ {idx === 2 ? "1,000" : "1,500"}</span>
                                          </div>
                                        );
                                      })}
                                  </div>
                              </div>

                          </div>
                      </div>
                  </div>
              </div>
          </div>

          <div className="html2pdf__page-break"></div>

          {/* PAGE 3 */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden border border-orange-100 shadow-sm relative z-10 flex flex-col">
              <div className="p-10 pb-6">
                  <h2 className="section-title mb-4">Domain & Hosting</h2>
                  <div className="border border-[#ffedd5] rounded-2xl overflow-hidden mt-4 mb-6">
                      <div className="p-6 space-y-4">
                          {/* Domain */}
                          <div className="flex justify-between items-center pb-6 border-b border-gray-100 gap-4">
                              <div>
                                  <h4 className="font-bold text-[17px] text-gray-900 mb-1">Domain Name Setup</h4>
                                  <p className="text-[12px] text-gray-500">Yearly Renewal (e.g., .com, .in)</p>
                              </div>
                              <div className="text-center bg-[#fffbf8] border border-[#ffedd5] px-4 py-3 rounded-xl min-w-[200px]">
                                  {basicInfo.domainPaid ? (
                                      <span className="text-[14px] font-bold text-[#10b981] uppercase tracking-wider block">PAID</span>
                                  ) : basicInfo.domainCost ? (
                                      <>
                                          <span className="text-[14px] font-bold text-gray-900 uppercase tracking-wider block mb-1">₹ {basicInfo.domainCost}</span>
                                          <span className="text-[10px] text-gray-500">Subject to renewal</span>
                                      </>
                                  ) : (
                                      <>
                                          <span className="text-[10px] font-bold text-gray-900 uppercase tracking-wider block mb-1">TO BE CHECKED</span>
                                          <span className="text-[10px] text-gray-500">Exact rates depend on preferred domain</span>
                                      </>
                                  )}
                              </div>
                          </div>

                          {/* Hosting */}
                          <div className="flex justify-between items-center gap-4">
                              <div>
                                  <h4 className="font-bold text-[17px] text-gray-900 mb-1">Server Hosting Setup</h4>
                                  <p className="text-[12px] text-gray-500">Yearly Renewal (Speed, Security & Maintenance)</p>
                              </div>
                              <div className="text-center bg-[#fffbf8] border border-[#ffedd5] px-4 py-3 rounded-xl min-w-[200px]">
                                  {basicInfo.hostingPaid ? (
                                      <span className="text-[14px] font-bold text-[#10b981] uppercase tracking-wider block">PAID</span>
                                  ) : basicInfo.hostingCost ? (
                                      <>
                                          <span className="text-[14px] font-bold text-gray-900 uppercase tracking-wider block mb-1">₹ {basicInfo.hostingCost}</span>
                                          <span className="text-[10px] text-gray-500">Subject to renewal</span>
                                      </>
                                  ) : (
                                      <>
                                          <span className="text-[10px] font-bold text-gray-900 uppercase tracking-wider block mb-1">TO BE CHECKED</span>
                                          <span className="text-[10px] text-gray-500">Exact rates depend on preferred hosting</span>
                                      </>
                                  )}
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Total Banner */}
              <div className="bg-[#ff5722] py-6 px-10 text-white flex justify-between items-center relative overflow-hidden">
                  <h4 className="heading font-bold text-[24px] relative z-10">Total Immediate Payable</h4>
                  <div className="text-[32px] font-extrabold text-right tracking-tight relative z-10">
                      ₹ {displayTotal || "13,499"} <span className="text-[14px] font-normal text-white/90 ml-1">+ Domain/Hosting</span>
                  </div>
              </div>

              <div className="p-10 pb-4">
                  <div className="text-center mb-6">
                      <h2 className="heading text-[22px] font-bold text-gray-900 mb-2">More Digital Solutions Built for Growth</h2>
                      <p className="text-[11px] text-gray-500 max-w-lg mx-auto leading-relaxed">From mobile apps to AI automation and branding, TakeIN Studio helps businesses launch faster, operate smarter, and scale with confidence.</p>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                      <div className="text-center border border-[#ffedd5] rounded-xl p-5 bg-[#fffbf8]">
                          <p className="font-bold text-gray-900 text-[13px] mb-1">Website Dev</p>
                          <p className="text-[9px] uppercase tracking-wider text-gray-500">E-COM & BIZ</p>
                      </div>
                      <div className="text-center border border-[#ffedd5] rounded-xl p-5 bg-[#fffbf8]">
                          <p className="font-bold text-gray-900 text-[13px] mb-1">App Dev</p>
                          <p className="text-[9px] uppercase tracking-wider text-gray-500">IOS & ANDROID</p>
                      </div>
                      <div className="text-center border border-[#ffedd5] rounded-xl p-5 bg-[#fffbf8]">
                          <p className="font-bold text-gray-900 text-[13px] mb-1">Custom Software</p>
                          <p className="text-[9px] uppercase tracking-wider text-gray-500">CRM & SYSTEMS</p>
                      </div>
                      <div className="text-center border border-[#ffedd5] rounded-xl p-5 bg-[#fffbf8]">
                          <p className="font-bold text-gray-900 text-[13px] mb-1">AI Automation</p>
                          <p className="text-[9px] uppercase tracking-wider text-gray-500">BOTS & FLOWS</p>
                      </div>
                      <div className="text-center border border-[#ffedd5] rounded-xl p-5 bg-[#fffbf8]">
                          <p className="font-bold text-gray-900 text-[13px] mb-1">SEO & Marketing</p>
                          <p className="text-[9px] uppercase tracking-wider text-gray-500">TRAFFIC & LEADS</p>
                      </div>
                      <div className="text-center border border-[#ffedd5] rounded-xl p-5 bg-[#fffbf8]">
                          <p className="font-bold text-gray-900 text-[13px] mb-1">Graphic Design</p>
                          <p className="text-[9px] uppercase tracking-wider text-gray-500">BRAND IDENTITY</p>
                      </div>
                  </div>
              </div>

              {/* Footer */}
              <div className="mt-auto border-t border-gray-100 pt-6 pb-8 text-center relative w-full">
                  <img src={`${window.location.origin}/logo/logo_text.png`} alt="Logo" className="h-[35px] object-contain mx-auto mb-3 drop-shadow-sm" />
                  <p className="text-gray-500 text-[10px] mb-2">Designed and Developed with precision by</p>
                  <p className="font-extrabold text-gray-900 text-[18px] tracking-tight">{basicInfo.developerName || "Ankit Tripathy"}</p>
                  <p className="brand-orange font-bold tracking-[0.4em] text-[9px] uppercase mt-1">TakeIN Studio</p>

                  <div className="flex justify-center items-center gap-6 mt-4 text-[11px] font-semibold text-gray-600 mb-6">
                      <span>www.takeinstudio.com</span>
                      <span className="text-gray-200">|</span>
                      <span>support@takeinstudio.com</span>
                      <span className="text-gray-200">|</span>
                      <span>+91 89082 33590</span>
                  </div>

                  <div className="bg-[#fffbf8] inline-block py-2 px-5 rounded-full border border-[#ffedd5] text-[9px] font-semibold text-gray-800">
                      Premium Digital Agency &bull; Building Digital Experiences That Drive Growth
                  </div>
              </div>
          </div>

        </div>
      </div>

    </div>
  );
}
