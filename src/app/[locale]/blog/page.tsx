export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold capitalize font-serif">{locale} - Blog</h1>
    </main>
  );
}
