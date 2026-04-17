import AnimatedSection from "@/components/AnimatedSection";

export default function TermsOfService() {
  return (
    <div className="section-padding pt-32 sm:pt-40">
      <div className="container mx-auto max-w-4xl">
        <AnimatedSection>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-8">Terms of Service</h1>
          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <p className="text-lg text-foreground/80 font-medium">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">1. Agreement to Terms</h2>
              <p>By accessing or using the services provided by TakeIN Studio, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access our services.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">2. Services</h2>
              <p>TakeIN Studio provides digital design, development, and strategy services. The specific scope, timeline, and deliverables for each project will be outlined in a separate Statement of Work (SOW) or Service Agreement.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">3. Intellectual Property</h2>
              <p>Unless otherwise agreed in writing, all source code, designs, and digital assets created by TakeIN Studio remain the property of TakeIN Studio until full payment is received. Upon final payment, ownership of the agreed deliverables is transferred to the client.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">4. Limitation of Liability</h2>
              <p>In no event shall TakeIN Studio be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">5. Governing Law</h2>
              <p>These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which TakeIN Studio operates, without regard to its conflict of law provisions.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">6. Contact</h2>
              <p>For any questions regarding these terms, please reach out to <strong>takeinstudio@gmail.com</strong></p>
            </section>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
