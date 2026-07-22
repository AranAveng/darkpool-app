type PageProps = {
  params: {
    id: string;
  };
};

export default function MarketPage({ params }: PageProps) {
  return (
    <main className="min-h-screen bg-[#0B1120] text-white">
      <div className="mx-auto max-w-5xl px-6 py-12">

        <h1 className="text-4xl font-bold mb-4">
          Market #{params.id}
        </h1>

        <div className="rounded-2xl border border-white/10 bg-[#121826] p-8">

          <div className="aspect-video rounded-xl bg-gray-800 mb-6" />

          <h2 className="text-2xl font-bold mb-3">
            Loading market...
          </h2>

          <p className="text-gray-400 mb-8">
            This page will display the selected market and allow private trading on DarkPool.
          </p>

          <div className="grid grid-cols-2 gap-4">

            <button className="rounded-xl bg-green-500 py-4 font-bold text-black hover:bg-green-400">
              Buy YES
            </button>

            <button className="rounded-xl bg-red-500 py-4 font-bold text-white hover:bg-red-400">
              Buy NO
            </button>

          </div>

        </div>

      </div>
    </main>
  );
}