export default function OpdTestLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section className="flex flex-col items-center  "> 
        <div className="w-full pb-7">
          {children}
        </div>
      </section>
    );
  }
  