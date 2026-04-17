import AnimatedSection from "@/components/AnimatedSection";

export default function CookiePolicy() {
  return (
    <div className="section-padding pt-32 sm:pt-40">
      <div className="container mx-auto max-w-4xl">
        <AnimatedSection>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-8">Cookie Policy</h1>
          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <p className="text-lg text-foreground/80 font-medium">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">1. What Are Cookies</h2>
              <p>As is common practice with almost all professional websites, this site uses cookies—small files that are downloaded to your computer—to improve your experience. This page describes what information they gather, how we use it, and why we sometimes need to store these cookies.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">2. How We Use Cookies</h2>
              <p>We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">3. Disabling Cookies</h2>
              <p>You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">4. The Cookies We Set</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Forms related cookies:</strong> When you submit data through a form such as those found on contact pages or comment forms, cookies may be set to remember your user details for future correspondence.</li>
                <li><strong>Analytics cookies:</strong> This site uses Google Analytics, which is one of the most widespread and trusted analytics solution on the web for helping us to understand how you use the site and ways that we can improve your experience.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">5. More Information</h2>
              <p>Hopefully that has clarified things for you. If you are still looking for more information, you can contact us at: <strong>takeinstudio@gmail.com</strong></p>
            </section>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
