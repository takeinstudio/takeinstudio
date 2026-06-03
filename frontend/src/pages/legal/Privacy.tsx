import AnimatedSection from "@/components/AnimatedSection";

export default function PrivacyPolicy() {
  return (
    <div className="section-padding pt-32 sm:pt-40">
      <div className="container mx-auto max-w-4xl">
        <AnimatedSection>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-8">Privacy Policy</h1>
          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <p className="text-lg text-foreground/80 font-medium">Last updated: {`${String(new Date().getDate()).padStart(2, '0')}/${String(new Date().getMonth() + 1).padStart(2, '0')}/${new Date().getFullYear()}`}</p>
            
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">1. Introduction</h2>
              <p>At TakeIN Studio, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">2. The Data We Collect</h2>
              <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Identity Data:</strong> includes first name, last name.</li>
                <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
                <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location.</li>
                <li><strong>Usage Data:</strong> includes information about how you use our website and services.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">3. How Your Data is Used</h2>
              <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To contact you regarding your project inquiry.</li>
                <li>To improve our website and customer service.</li>
                <li>To send periodic emails if you have opted in.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">4. Contact Us</h2>
              <p>If you have any questions about this privacy policy or our privacy practices, please contact us at: <strong>takeinstudio@gmail.com</strong></p>
            </section>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
