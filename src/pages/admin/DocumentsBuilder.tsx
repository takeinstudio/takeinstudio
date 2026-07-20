import { useState, useRef } from "react";
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
    hostingCost: "",
    totalCost: ""
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
    setBasicInfo({ ...basicInfo, [e.target.name]: e.target.value });
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Domain Name Cost</label>
              <input type="text" name="domainCost" value={basicInfo.domainCost} onChange={handleBasicChange} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Hosting Setup Cost</label>
              <input type="text" name="hostingCost" value={basicInfo.hostingCost} onChange={handleBasicChange} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-brand-orange mb-1">Total Payable</label>
              <input type="text" name="totalCost" value={basicInfo.totalCost} onChange={handleBasicChange} className="w-full bg-orange-50 border border-orange-200 text-brand-orange font-bold rounded-lg px-3 py-2 text-lg focus:border-primary outline-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Template for PDF Generation */}
      <div className="overflow-hidden h-0 w-0 absolute top-[-9999px] left-[-9999px]">
        <div ref={templateRef} className="w-[800px] font-sans antialiased bg-[#fdfaf7] text-gray-800 p-8 relative print-container" style={{ fontFamily: "'Inter', sans-serif" }}>
          
          <style dangerouslySetInnerHTML={{__html: `
            .heading { font-family: 'Playfair Display', serif; }
            .brand-orange { color: #ff5722; }
            .bg-brand-orange { background-color: #ff5722; }
            .avoid-break { page-break-inside: avoid; break-inside: avoid; }
            .page-break { page-break-before: always; break-before: page; }
          `}} />

          {/* Subtle Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none z-0 overflow-hidden">
            <h1 className="text-[10rem] font-bold tracking-tighter text-[#ff5722] transform -rotate-12 whitespace-nowrap">TakeIN Studio</h1>
          </div>

          <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border border-orange-100 relative z-10">
            
            {/* Header (Page 1) */}
            <div className="bg-gradient-to-b from-orange-50 to-white px-10 pt-16 pb-12 text-center relative overflow-hidden border-b border-orange-100 avoid-break">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-orange"></div>
                
                <div className="flex justify-center mb-8">
                    <img src={`${window.location.origin}/logo/logo_text.png`} alt="TakeIN Studio Logo" className="h-28 object-contain drop-shadow-xl" />
                </div>

                <h1 className="heading text-4xl md:text-5xl font-bold mb-3 text-gray-900 tracking-tight">Project Proposal & Handover</h1>
                <p className="text-sm tracking-[0.2em] uppercase brand-orange font-bold mb-10">Premium Web Development & CMS Platform</p>
                
                <div className="inline-block border border-orange-200 rounded-xl p-5 bg-white shadow-sm text-left w-full max-w-lg mx-auto">
                    <table className="w-full mb-3 pb-3 border-b border-gray-100 border-solid block">
                        <tbody className="w-full table">
                            <tr>
                                <td className="text-left text-sm text-gray-500 w-1/2 align-top"><span className="font-bold text-gray-800 block mb-1">Project:</span> {basicInfo.projectName}</td>
                                <td className="text-right text-sm text-gray-500 w-1/2 align-top"><span className="font-bold text-gray-800 block mb-1">Owner:</span> {basicInfo.ownerName}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="flex items-center gap-3 mt-3">
                        <img src={`${window.location.origin}/logo/logo_no_text.png`} alt="Developer" className="w-10 h-10 rounded-full object-cover border border-orange-200 shadow-sm bg-white p-1" />
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-0.5">Developed By</p>
                            <p className="text-sm font-bold text-gray-900">{basicInfo.developerName} <span className="brand-orange ml-1">(TakeIN Studio)</span></p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-8 md:p-12 space-y-12">
                
                {/* Scope of Work */}
                <section>
                    <div className="flex items-center gap-4 mb-6 avoid-break">
                        <div className="w-12 h-1 bg-brand-orange"></div>
                        <h2 className="heading text-2xl text-gray-900 font-bold">Scope of Work & Features</h2>
                    </div>
                    
                    <div className="flex flex-wrap -mx-3">
                        {sections.map(section => (
                            <div key={section.id} className="w-1/2 px-3 mb-6 avoid-break">
                                <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100 h-full">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
                                        <span className="p-2 bg-orange-100 rounded-lg brand-orange">
                                            <CheckCircle2 size={18} />
                                        </span>
                                        {section.title}
                                    </h3>
                                    <ul className="space-y-3 text-xs text-gray-600">
                                        {section.bullets.split('\n').filter(b => b.trim()).map((bullet, idx) => {
                                          const parts = bullet.split(':');
                                          return (
                                            <li key={idx} className="flex items-start gap-2">
                                              <div className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-orange flex-shrink-0"></div>
                                              <span>
                                                {parts.length > 1 ? (
                                                  <>
                                                    <strong className="text-gray-900">{parts[0]}:</strong>
                                                    {parts.slice(1).join(':')}
                                                  </>
                                                ) : (
                                                  bullet
                                                )}
                                              </span>
                                            </li>
                                          );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Force Page Break here for Pricing to ensure it doesn't get cut */}
                <div className="page-break"></div>

                {/* Pricing Breakdown (Page 2) */}
                <section>
                    <div className="flex items-center gap-4 mb-6 avoid-break">
                        <div className="w-12 h-1 bg-brand-orange"></div>
                        <h2 className="heading text-2xl text-gray-900 font-bold">Investment Breakdown</h2>
                    </div>

                    <div className="bg-white border-2 border-orange-100 rounded-2xl overflow-hidden avoid-break">
                        <div className="p-8">
                            <div className="pb-6 border-b border-gray-100">
                                <div className="flex justify-between items-end mb-6 gap-4">
                                    <div>
                                        <h4 className="font-bold text-xl text-gray-900 mb-1">One-Time Development Cost</h4>
                                        <p className="text-xs text-gray-500">Comprehensive Web Platform & Content Management System</p>
                                    </div>
                                    <div className="text-3xl font-bold whitespace-nowrap brand-orange tracking-tight">₹ {basicInfo.totalCost}</div>
                                </div>
                                
                                <div className="bg-orange-50/50 rounded-xl p-5 border border-orange-100">
                                    <h5 className="text-[10px] uppercase tracking-widest brand-orange font-bold mb-4">Detailed Price Breakdown</h5>
                                    
                                    <div className="space-y-4 text-xs text-gray-700">
                                        {sections.map(section => (
                                          <div key={section.id} className="avoid-break">
                                              <div className="flex justify-between items-start gap-4 mb-2">
                                                  <h6 className="text-gray-900 font-bold flex items-center gap-2">{section.title}</h6>
                                                  <span className="whitespace-nowrap font-bold text-gray-900 text-sm">₹ {section.price}</span>
                                              </div>
                                              <div className="space-y-1 pl-4 border-l-2 border-orange-100 text-gray-600 text-[11px]">
                                                  {section.bullets.split('\n').filter(b => b.trim()).map((bullet, idx) => {
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
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Domain & Hosting Costs */}
                <section className="avoid-break">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-1 bg-brand-orange"></div>
                        <h2 className="heading text-2xl text-gray-900 font-bold">Domain & Hosting</h2>
                    </div>
                    <div className="bg-white border-2 border-orange-100 rounded-2xl overflow-hidden">
                            <div className="p-6 space-y-4">
                                {/* Domain */}
                                <div className="flex justify-between items-center pb-3 border-b border-gray-100 gap-4">
                                    <div>
                                        <h4 className="font-bold text-base text-gray-900">Domain Name Setup</h4>
                                        <p className="text-[11px] text-gray-500 mt-0.5">Yearly Renewal (e.g., .com, .in)</p>
                                    </div>
                                    <div className="text-xs font-semibold text-gray-800 text-right bg-orange-50 border border-orange-100 px-3 py-2 rounded-lg">
                                        <span className="brand-orange uppercase tracking-wider text-[10px] font-bold">{basicInfo.domainCost}</span>
                                    </div>
                                </div>

                                {/* Hosting */}
                                <div className="flex justify-between items-center pt-1 gap-4">
                                    <div>
                                        <h4 className="font-bold text-base text-gray-900">Server Hosting Setup</h4>
                                        <p className="text-[11px] text-gray-500 mt-0.5">Yearly Renewal (Speed, Security & Maintenance)</p>
                                    </div>
                                    <div className="text-xs font-semibold text-gray-800 text-right bg-orange-50 border border-orange-100 px-3 py-2 rounded-lg">
                                        <span className="brand-orange uppercase tracking-wider text-[10px] font-bold">{basicInfo.hostingCost}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-brand-orange p-6 text-white flex justify-between items-center gap-4 relative overflow-hidden mt-6 rounded-2xl">
                            <h4 className="heading font-bold text-xl relative z-10">Total Immediate Payable</h4>
                            <div className="text-2xl font-bold text-right tracking-tight relative z-10">₹ {basicInfo.totalCost} <span className="inline-block text-xs font-normal text-white/90 ml-1">+ Domain/Hosting</span></div>
                        </div>
                </section>

                {/* Footer signature (Avoid break) */}
                <div className="mt-8 pt-8 border-t border-gray-200 text-center relative pb-6 avoid-break">
                    <img src={`${window.location.origin}/logo/logo_text.png`} alt="Logo" className="h-10 object-contain mx-auto mb-4" />
                    <p className="text-gray-500 text-[11px] mb-2">Designed and Developed with precision by</p>
                    <p className="font-bold text-gray-900 text-lg tracking-tight">{basicInfo.developerName}</p>
                    <p className="brand-orange font-bold tracking-[0.4em] text-[10px] uppercase mt-1">TakeIN Studio</p>

                    <div className="flex justify-center items-center gap-4 mt-4 text-[11px] font-semibold text-gray-600">
                        <span>www.takeinstudio.com</span>
                        <span className="text-gray-300">|</span>
                        <span>takeinstudio@gmail.com</span>
                        <span className="text-gray-300">|</span>
                        <span>+91 89082 33590</span>
                    </div>
                </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
