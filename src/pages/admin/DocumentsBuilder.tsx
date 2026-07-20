import { useState, useRef } from "react";
import { FileText, Download, CheckCircle2, Loader2 } from "lucide-react";
// @ts-ignore
import html2pdf from "html2pdf.js";

export default function DocumentsBuilder() {
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    projectName: "Astha Associate",
    ownerName: "Pratap Kumar Swain",
    developerName: "Ankit Tripathy",
    websiteCost: "4,999",
    cmsCost: "1,500",
    clientManagementCost: "1,000",
    financialCost: "1,000",
    invoicingCost: "1,000",
    authCost: "1,500",
    antiHackCost: "1,500",
    dbSecurityCost: "1,000",
    domainCost: "To be checked",
    hostingCost: "To be checked",
    totalCost: "13,499"
  });

  const templateRef = useRef<HTMLDivElement>(null);

  const handleGeneratePDF = async () => {
    if (!templateRef.current) return;
    setLoading(true);

    const element = templateRef.current;
    
    // Configure html2pdf options for exact A4 rendering
    const opt = {
      margin: [0, 0, 0, 0], // Margin in mm (we manage margins in CSS)
      filename: `${formData.projectName.replace(/\s+/g, '_')}_Handover.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
      await html2pdf().from(element).set(opt).save();
    } catch (err) {
      console.error("PDF generation failed", err);
      alert("Failed to generate PDF. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border/50 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6 border-b border-border/50 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <FileText className="text-primary w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg">Project Handover PDF Generator</h3>
              <p className="text-xs text-muted-foreground">Generate perfectly branded project proposals</p>
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

        {/* Input Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="space-y-4 col-span-1 md:col-span-2 lg:col-span-3">
            <h4 className="font-bold text-sm text-foreground/80 border-b pb-2">Client Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Project Name</label>
                <input type="text" name="projectName" value={formData.projectName} onChange={handleChange} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Owner Name</label>
                <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Developer Name</label>
                <input type="text" name="developerName" value={formData.developerName} onChange={handleChange} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-4 col-span-1 lg:col-span-2">
            <h4 className="font-bold text-sm text-foreground/80 border-b pb-2">Pricing Breakdown (₹)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Website Pages</label>
                <input type="text" name="websiteCost" value={formData.websiteCost} onChange={handleChange} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">CMS Admin</label>
                <input type="text" name="cmsCost" value={formData.cmsCost} onChange={handleChange} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Client Management</label>
                <input type="text" name="clientManagementCost" value={formData.clientManagementCost} onChange={handleChange} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Financial Records</label>
                <input type="text" name="financialCost" value={formData.financialCost} onChange={handleChange} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Automated Invoicing</label>
                <input type="text" name="invoicingCost" value={formData.invoicingCost} onChange={handleChange} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Auth Security</label>
                <input type="text" name="authCost" value={formData.authCost} onChange={handleChange} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Anti-Hacking</label>
                <input type="text" name="antiHackCost" value={formData.antiHackCost} onChange={handleChange} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">DB Security</label>
                <input type="text" name="dbSecurityCost" value={formData.dbSecurityCost} onChange={handleChange} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-4 col-span-1">
            <h4 className="font-bold text-sm text-foreground/80 border-b pb-2">Totals & Extras</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Domain Name Cost</label>
                <input type="text" name="domainCost" value={formData.domainCost} onChange={handleChange} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Hosting Setup Cost</label>
                <input type="text" name="hostingCost" value={formData.hostingCost} onChange={handleChange} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-orange mb-1">Total Payable</label>
                <input type="text" name="totalCost" value={formData.totalCost} onChange={handleChange} className="w-full bg-orange-50 border border-orange-200 text-brand-orange font-bold rounded-lg px-3 py-2 text-lg focus:border-primary outline-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Template for PDF Generation */}
      {/* We use scale to hide it visually but keep it in the DOM for html2pdf to read properly */}
      <div className="overflow-hidden h-0 w-0 absolute top-[-9999px] left-[-9999px]">
        <div ref={templateRef} className="w-[800px] font-sans antialiased bg-[#fdfaf7] text-gray-800 p-8 relative" style={{ fontFamily: "'Inter', sans-serif" }}>
          
          <style dangerouslySetInnerHTML={{__html: `
            .heading { font-family: 'Playfair Display', serif; }
            .brand-orange { color: #ff5722; }
            .bg-brand-orange { background-color: #ff5722; }
          `}} />

          {/* Subtle Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none z-0 overflow-hidden">
            <h1 className="text-[10rem] font-bold tracking-tighter text-[#ff5722] transform -rotate-12 whitespace-nowrap">TakeIN Studio</h1>
          </div>

          <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border border-orange-100 relative z-10">
            
            {/* Header */}
            <div className="bg-gradient-to-b from-orange-50 to-white px-10 pt-16 pb-12 text-center relative overflow-hidden border-b border-orange-100">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-orange"></div>
                
                {/* TakeIN Studio Logo */}
                <div className="flex justify-center mb-8">
                    <img src="/logo/logo_text.png" alt="TakeIN Studio Logo" className="h-28 object-contain drop-shadow-xl" />
                </div>

                <h1 className="heading text-4xl md:text-5xl font-bold mb-3 text-gray-900 tracking-tight">Project Proposal & Handover</h1>
                <p className="text-sm tracking-[0.2em] uppercase brand-orange font-bold mb-10">Premium Web Development & CMS Platform</p>
                
                <div className="inline-block border border-orange-200 rounded-xl p-5 bg-white shadow-sm text-left w-full max-w-lg mx-auto">
                    <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-100">
                        <p className="text-sm text-gray-500"><span className="font-bold text-gray-800">Project:</span> {formData.projectName}</p>
                        <p className="text-sm text-gray-500"><span className="font-bold text-gray-800">Owner:</span> {formData.ownerName}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Using logo_no_text as fallback avatar if ankit.png isn't available */}
                        <img src="/logo/logo_no_text.png" alt="Developer" className="w-10 h-10 rounded-full object-cover border border-orange-200 shadow-sm bg-white p-1" />
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-0.5">Developed By</p>
                            <p className="text-sm font-bold text-gray-900">{formData.developerName} <span className="brand-orange ml-1">(TakeIN Studio)</span></p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-8 md:p-12 space-y-12">
                
                {/* Scope of Work */}
                <section>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-1 bg-brand-orange"></div>
                        <h2 className="heading text-2xl text-gray-900 font-bold">Scope of Work & Features</h2>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Public Pages */}
                        <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
                                <span className="p-2 bg-orange-100 rounded-lg brand-orange">
                                    <CheckCircle2 size={18} />
                                </span>
                                Live Website Pages
                            </h3>
                            <ul className="space-y-3 text-xs text-gray-600">
                                <li className="flex items-start gap-2"><div className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-orange flex-shrink-0"></div><span><strong className="text-gray-900">Home:</strong> Premium animated hero, featured projects, philosophy.</span></li>
                                <li className="flex items-start gap-2"><div className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-orange flex-shrink-0"></div><span><strong className="text-gray-900">About:</strong> Owner details, mission, vision, and legacy timeline.</span></li>
                                <li className="flex items-start gap-2"><div className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-orange flex-shrink-0"></div><span><strong className="text-gray-900">Projects:</strong> Categorized view of Ongoing, Upcoming, and Completed works.</span></li>
                                <li className="flex items-start gap-2"><div className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-orange flex-shrink-0"></div><span><strong className="text-gray-900">Interior Design:</strong> High-end gallery for living spaces, bedrooms, and offices.</span></li>
                                <li className="flex items-start gap-2"><div className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-orange flex-shrink-0"></div><span><strong className="text-gray-900">Construction:</strong> Dedicated showcase for residential and commercial infrastructure.</span></li>
                                <li className="flex items-start gap-2"><div className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-orange flex-shrink-0"></div><span><strong className="text-gray-900">Contact:</strong> Location, phone numbers, and direct inquiry connections.</span></li>
                            </ul>
                        </div>

                        {/* Admin CMS */}
                        <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
                                <span className="p-2 bg-orange-100 rounded-lg brand-orange">
                                    <CheckCircle2 size={18} />
                                </span>
                                Secure Admin Dashboard
                            </h3>
                            <ul className="space-y-3 text-xs text-gray-600">
                                <li className="flex items-start gap-2"><div className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-orange flex-shrink-0"></div><span><strong className="text-gray-900">Project Management (CMS):</strong> Add/Delete Main, Interior, and Construction projects. Instantly syncs with the live website.</span></li>
                                <li className="flex items-start gap-2"><div className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-orange flex-shrink-0"></div><span><strong className="text-gray-900">Client Management:</strong> Register new clients, track their project names, contact details, and total budget.</span></li>
                                <li className="flex items-start gap-2"><div className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-orange flex-shrink-0"></div><span><strong className="text-gray-900">Financial Records:</strong> Record payments with Payment Methods (Cash, Bank Transfer, UPI) and Transaction IDs.</span></li>
                                <li className="flex items-start gap-2"><div className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-orange flex-shrink-0"></div><span><strong className="text-gray-900">Automated Invoicing:</strong> Generate and download professional PDF payment receipts directly from the dashboard.</span></li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Pricing Breakdown */}
                <section>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-1 bg-brand-orange"></div>
                        <h2 className="heading text-2xl text-gray-900 font-bold">Investment Breakdown</h2>
                    </div>

                    <div className="bg-white border-2 border-orange-100 rounded-2xl overflow-hidden">
                        <div className="p-8">
                            <div className="pb-6 border-b border-gray-100">
                                <div className="flex justify-between items-end mb-6 gap-4">
                                    <div>
                                        <h4 className="font-bold text-xl text-gray-900 mb-1">One-Time Development Cost</h4>
                                        <p className="text-xs text-gray-500">Comprehensive Web Platform & Content Management System</p>
                                    </div>
                                    <div className="text-3xl font-bold whitespace-nowrap brand-orange tracking-tight">₹ {formData.totalCost}</div>
                                </div>
                                
                                <div className="bg-orange-50/50 rounded-xl p-5 border border-orange-100">
                                    <h5 className="text-[10px] uppercase tracking-widest brand-orange font-bold mb-4">Detailed Price Breakdown</h5>
                                    
                                    <div className="space-y-4 text-xs text-gray-700">
                                        {/* Website Section */}
                                        <div>
                                            <div className="flex justify-between items-start gap-4 mb-2">
                                                <h6 className="text-gray-900 font-bold flex items-center gap-2">Live Website Pages</h6>
                                                <span className="whitespace-nowrap font-bold text-gray-900 text-sm">₹ {formData.websiteCost}</span>
                                            </div>
                                            <div className="space-y-1 pl-4 border-l-2 border-orange-100 text-gray-600 text-[11px]">
                                                <p><strong className="text-gray-800 font-semibold">Home:</strong> Premium animated hero, featured projects, philosophy.</p>
                                                <p><strong className="text-gray-800 font-semibold">About:</strong> Owner details, mission, vision, and legacy timeline.</p>
                                                <p><strong className="text-gray-800 font-semibold">Projects:</strong> Categorized view of Ongoing, Upcoming, and Completed works.</p>
                                                <p><strong className="text-gray-800 font-semibold">Interior Design:</strong> High-end gallery for living spaces, bedrooms, and offices.</p>
                                                <p><strong className="text-gray-800 font-semibold">Construction:</strong> Dedicated showcase for residential and commercial infrastructure.</p>
                                                <p><strong className="text-gray-800 font-semibold">Contact:</strong> Location, phone numbers, and direct inquiry connections.</p>
                                            </div>
                                        </div>

                                        {/* Admin CMS Section */}
                                        <div className="pt-2">
                                            <h6 className="text-gray-900 font-bold mb-2 flex items-center gap-2">Secure Admin Dashboard</h6>
                                            <div className="space-y-2 pl-4 border-l-2 border-orange-100 text-[11px]">
                                                <div className="flex justify-between items-start gap-4">
                                                    <span className="leading-relaxed"><strong className="text-gray-900 font-semibold">Project Management (CMS):</strong> Add/Delete Main, Interior, and Construction projects. Instantly syncs with live website.</span> 
                                                    <span className="whitespace-nowrap font-semibold text-gray-900">₹ {formData.cmsCost}</span>
                                                </div>
                                                <div className="flex justify-between items-start gap-4">
                                                    <span className="leading-relaxed"><strong className="text-gray-900 font-semibold">Client Management:</strong> Register new clients, track their project names, contact details, and total budget.</span> 
                                                    <span className="whitespace-nowrap font-semibold text-gray-900">₹ {formData.clientManagementCost}</span>
                                                </div>
                                                <div className="flex justify-between items-start gap-4">
                                                    <span className="leading-relaxed"><strong className="text-gray-900 font-semibold">Financial Records:</strong> Record payments with Payment Methods (Cash, Bank Transfer, UPI) and Transaction IDs.</span> 
                                                    <span className="whitespace-nowrap font-semibold text-gray-900">₹ {formData.financialCost}</span>
                                                </div>
                                                <div className="flex justify-between items-start gap-4">
                                                    <span className="leading-relaxed"><strong className="text-gray-900 font-semibold">Automated Invoicing:</strong> Generate and download professional PDF payment receipts directly from the dashboard.</span> 
                                                    <span className="whitespace-nowrap font-semibold text-gray-900">₹ {formData.invoicingCost}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Advanced Security */}
                                        <div className="pt-2">
                                            <h6 className="text-gray-900 font-bold mb-2 flex items-center gap-2">Advanced Security & Authentication</h6>
                                            <div className="space-y-2 pl-4 border-l-2 border-orange-100 text-[11px]">
                                                <div className="flex justify-between items-start gap-4">
                                                    <span className="leading-relaxed"><strong className="text-gray-900 font-semibold">Encrypted Admin Authentication:</strong> Secure sessions with JWT, password hashing, and brute-force protection.</span> 
                                                    <span className="whitespace-nowrap font-semibold text-gray-900">₹ {formData.authCost}</span>
                                                </div>
                                                <div className="flex justify-between items-start gap-4">
                                                    <span className="leading-relaxed"><strong className="text-gray-900 font-semibold">Anti-Hacking & XSS Protection:</strong> Built-in Cross-Site Scripting (XSS) and injection attack prevention.</span> 
                                                    <span className="whitespace-nowrap font-semibold text-gray-900">₹ {formData.antiHackCost}</span>
                                                </div>
                                                <div className="flex justify-between items-start gap-4">
                                                    <span className="leading-relaxed"><strong className="text-gray-900 font-semibold">Advanced Database Security:</strong> AES-256 cloud database encryption, secure API tunneling, and cryptographically verified integrity checks for financial records.</span> 
                                                    <span className="whitespace-nowrap font-semibold text-gray-900">₹ {formData.dbSecurityCost}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Domain & Hosting Costs */}
                <section>
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
                                        <span className="brand-orange uppercase tracking-wider text-[10px] font-bold">{formData.domainCost}</span> <br/>
                                        <span className="text-[10px] font-medium text-gray-500">Exact rates depend on preferred domain</span>
                                    </div>
                                </div>

                                {/* Hosting */}
                                <div className="flex justify-between items-center pt-1 gap-4">
                                    <div>
                                        <h4 className="font-bold text-base text-gray-900">Server Hosting Setup</h4>
                                        <p className="text-[11px] text-gray-500 mt-0.5">Yearly Renewal (Speed, Security & Maintenance)</p>
                                    </div>
                                    <div className="text-xs font-semibold text-gray-800 text-right bg-orange-50 border border-orange-100 px-3 py-2 rounded-lg">
                                        <span className="brand-orange uppercase tracking-wider text-[10px] font-bold">{formData.hostingCost}</span> <br/>
                                        <span className="text-[10px] font-medium text-gray-500">Exact rates depend on preferred hosting</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-brand-orange p-6 text-white flex justify-between items-center gap-4 relative overflow-hidden mt-6 rounded-2xl">
                            <h4 className="heading font-bold text-xl relative z-10">Total Immediate Payable</h4>
                            <div className="text-2xl font-bold text-right tracking-tight relative z-10">₹ {formData.totalCost} <span className="inline-block text-xs font-normal text-white/90 ml-1">+ Domain/Hosting</span></div>
                        </div>
                </section>

                {/* Footer signature */}
                <div className="mt-8 pt-8 border-t border-gray-200 text-center relative pb-6">
                    <img src="/logo/logo_text.png" alt="Logo" className="h-10 object-contain mx-auto mb-4" />
                    <p className="text-gray-500 text-[11px] mb-2">Designed and Developed with precision by</p>
                    <p className="font-bold text-gray-900 text-lg tracking-tight">{formData.developerName}</p>
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
