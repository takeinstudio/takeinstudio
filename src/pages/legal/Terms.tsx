import AnimatedSection from "@/components/AnimatedSection";
import { Link } from "react-router-dom";

export default function TermsOfService() {
  return (
    <div className="bg-cream min-h-screen pt-32 sm:pt-40 pb-20">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6">
        <AnimatedSection>
          <div className="mb-12">
            <h1 className="font-display text-4xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">Terms and Conditions</h1>
            <p className="text-gray-500 font-medium">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>

          <div className="prose prose-gray max-w-none space-y-10">
            
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-display">1. Agreement to Terms</h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and TakeIN Studio ("Company", "we", "us", or "our"), concerning your access to and use of the website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").
                </p>
                <p>
                  By accessing or using our services, you agree that you have read, understood, and agree to be bound by all of these Terms and Conditions. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS AND CONDITIONS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SITE AND YOU MUST DISCONTINUE USE IMMEDIATELY.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-display">2. Intellectual Property Rights</h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights.
                </p>
                <p>
                  For client projects, ownership of final deliverables transfers to the client only after full and final payment has been processed and received by TakeIN Studio. We retain the right to use completed projects in our portfolio and marketing materials unless a specific Non-Disclosure Agreement (NDA) states otherwise.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-display">3. User Representations</h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms and Conditions; (4) you will not access the Site through automated or non-human means, whether through a bot, script, or otherwise.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-display">4. Services and Scope of Work</h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  TakeIN Studio provides premium digital design, web development, app development, and digital marketing services. The specific scope, timeline, deliverables, and cost for each client project will be thoroughly outlined in a separate Statement of Work (SOW) or Service Agreement before the commencement of any work.
                </p>
                <p>
                  Any revisions, feature additions, or modifications outside the initially agreed-upon SOW will be subject to additional billing and schedule adjustments.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-display">5. Payments and Refunds</h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  Payment terms are established prior to project commencement. Typically, this involves an upfront deposit to secure project scheduling, with subsequent milestone payments as the project progresses.
                </p>
                <p>
                  Due to the customized nature of our digital services, all deposits and payments are non-refundable once work has commenced. For more specific details, please review our <Link to="/refund-policy" className="text-primary hover:underline">Refund Policy</Link>.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-display">6. Limitation of Liability</h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site or our services.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-display">7. Governing Law</h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  These Terms shall be governed by and defined following the laws of India. TakeIN Studio and yourself irrevocably consent that the courts of Bhubaneswar, Odisha shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-display">8. Contact Us</h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
                </p>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mt-4">
                  <h4 className="font-bold text-gray-900 mb-2">TakeIN Studio</h4>
                  <p className="mb-1">Bhubaneswar, Odisha, India</p>
                  <p className="mb-1">Phone: +91 89082 33590</p>
                  <p>Email: <a href="mailto:takeinstudio@gmail.com" className="text-primary hover:underline">takeinstudio@gmail.com</a></p>
                </div>
              </div>
            </section>

          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
