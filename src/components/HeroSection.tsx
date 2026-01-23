const HeroSection = () => {
  return (
    <div className="relative z-10 px-4 py-12 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground leading-tight">
          prompt-wrompt is a prompt library for professional
          <br className="hidden md:block" />
          <span className="text-muted-foreground"> day-to-day tasks.</span>
        </h2>
      </div>
    </div>
  );
};

export default HeroSection;
