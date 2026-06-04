import AnimatedSection from "@/components/AnimatedSection";

export default function RefundPolicy() {
  return (
    <div className="section-padding pt-32 sm:pt-40">
      <div className="container mx-auto max-w-4xl">
        <AnimatedSection>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-8">Refund Policy</h1>
          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <p className="text-lg text-foreground/80 font-medium">Last updated: {`${String(new Date().getDate()).padStart(2, '0')}/${String(new Date().getMonth() + 1).padStart(2, '0')}/${new Date().getFullYear()}`}</p>
            
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">1. Advance Payment</h2>
              <p>For all service projects, a 50% advance payment is required to initiate the work. This secures your spot in our development queue and covers initial research and planning.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">2. No Refund After Project Initiation</h2>
              <p>Once the project has been initiated and work has commenced, the 50% advance payment becomes non-refundable. This policy is in place to compensate our team for the time, resources, and intellectual property dedicated to your project from day one.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">3. Exceptional Circumstances</h2>
              <p>In rare cases where TakeIN Studio is completely unable to deliver the agreed-upon services due to unforeseen internal circumstances, a partial or full refund may be considered at our sole discretion.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">4. Contact Us</h2>
              <p>If you have any questions about this refund policy, please contact us at: <strong>takeinstudio@gmail.com</strong></p>
            </section>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
