// Maroon banner at the top of each inner page.
const PageHeader = ({ icon: Icon, title, subtitle }) => (
  <section className="relative overflow-hidden bg-gradient-to-br from-maroon-900 via-maroon-800 to-maroon-950 text-white">
    {/* soft gold glows */}
    <div className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-gold-300/20 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-28 -left-10 h-64 w-64 rounded-full bg-gold-300/10 blur-3xl" />

    <div className="relative mx-auto max-w-6xl px-6 py-14 text-center md:py-20">
      {Icon && (
        <span className="mx-auto mb-5 flex h-14 w-14 animate-fade-up items-center justify-center rounded-2xl bg-gold-300 text-maroon-900 shadow-lg shadow-maroon-950/30">
          <Icon className="h-7 w-7" aria-hidden="true" />
        </span>
      )}
      <h1 className="animate-fade-up text-4xl font-bold [animation-delay:0.08s] md:text-5xl">
        {title}
      </h1>
      <div className="mx-auto mt-5 h-1 w-16 animate-fade-up rounded-full bg-gold-300 [animation-delay:0.16s]" />
      {subtitle && (
        <p className="mx-auto mt-5 max-w-2xl animate-fade-up text-lg text-maroon-100 [animation-delay:0.24s]">
          {subtitle}
        </p>
      )}
    </div>
  </section>
);

export default PageHeader;
