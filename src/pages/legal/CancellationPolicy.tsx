import AnimatedSection from "@/components/AnimatedSection";

export default function CancellationPolicy() {
  return (
    <div className="section-padding pt-32 sm:pt-40">
      <div className="container mx-auto max-w-4xl">
        <AnimatedSection>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-8">Cancellation Policy</h1>
          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <p className="text-lg text-foreground/80 font-medium">Last updated: {`${String(new Date().getDate()).padStart(2, '0')}/${String(new Date().getMonth() + 1).padStart(2, '0')}/${new Date().getFullYear()}`}</p>
            
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">1. Cancellation by the Client</h2>
              <p>Clients may request to cancel a project at any time. However, any advance payments made (typically 50%) are non-refundable once work has commenced. If the project is canceled mid-development, the client may be billed for any additional work completed beyond the scope covered by the initial deposit.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">2. Cancellation by TakeIN Studio</h2>
              <p>We reserve the right to cancel a project if there is a breach of contract, severe lack of communication from the client, or if the project scope changes drastically beyond our capabilities. In such cases, a fair assessment of completed work will be made.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">3. Maintenance and Retainer Contracts</h2>
              <p>For ongoing services such as Website Maintenance or SEO, a 30-day written notice is required for cancellation. Services will continue and be billed normally during this 30-day period.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">4. Contact Us</h2>
              <p>To request a cancellation or discuss your account, please contact us at: <strong>takeinstudio@gmail.com</strong></p>
            </section>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
