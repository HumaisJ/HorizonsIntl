export default function MissionVision() {
  const items = [
    {
      title: "Our Mission",
      desc: "To bridge the gap between Japanese automotive excellence and global markets through transparent sourcing and logistical precision."
    },
    {
      title: "Our Vision",
      desc: "To become the most trusted name in international vehicle trading, powered by innovation and a customer-first mindset."
    },
    {
      title: "Our Policies",
      desc: "Strict 100-point inspections, no hidden costs, and guaranteed authentic auction grades for every vehicle in our inventory."
    }
  ];

  return (
    <section className="py-16 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div key={idx} className="p-8 bg-white dark:bg-zinc-900 border-l-4 border-red-600 shadow-sm">
              <h3 className="text-xl font-black uppercase tracking-tighter mb-4 text-zinc-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}