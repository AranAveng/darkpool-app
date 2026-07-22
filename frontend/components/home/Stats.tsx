export default function Stats() {
  const stats = [
    {
      title: "Markets",
      value: "1,240+",
    },
    {
      title: "Traders",
      value: "18.5K",
    },
    {
      title: "Volume",
      value: "$12.8M",
    },
    {
      title: "Private Trades",
      value: "98%",
    },
  ];

  return (
    <section className="mx-auto mt-8 max-w-7xl px-6 pb-20">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
          >
            <p className="text-sm text-gray-400">{item.title}</p>

            <h2 className="mt-2 text-3xl font-bold text-white">
              {item.value}
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
}