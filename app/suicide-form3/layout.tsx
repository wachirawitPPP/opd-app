export default function DepressionLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section className="flex flex-col items-center justify-center ">
        <div className="w-full">
          {children}
        </div>
      </section>
    );
  }
  