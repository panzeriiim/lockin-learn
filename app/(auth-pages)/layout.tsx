export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background relative">
      <div className="absolute inset-0 bg-grid-primary/[0.02] -z-10" />
      <div className="w-full px-4 py-12 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}
