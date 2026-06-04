import AnimatedSection from "./AnimatedSection";

interface Props {
  badge?: string;
  title: string;
  subtitle?: string;
  className?: string;
  light?: boolean;
}

export default function SectionHeading({ badge, title, subtitle, className = "", light }: Props) {
  const hasMargin = className.includes("mb-");
  const marginClasses = hasMargin ? "" : "mb-6 sm:mb-8";
  return (
    <AnimatedSection className={`text-center max-w-3xl mx-auto ${marginClasses} ${className}`}>
      {badge && (
        <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4 ${
          light ? "bg-primary-foreground/10 text-primary-foreground/80" : "bg-primary/10 text-primary"
        }`}>
          {badge}
        </span>
      )}
      <h2 className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight ${
        light ? "text-primary-foreground" : "text-foreground"
      }`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base sm:text-lg leading-relaxed ${
          light ? "text-primary-foreground/70" : "text-muted-foreground"
        }`}>
          {subtitle}
        </p>
      )}
    </AnimatedSection>
  );
}
