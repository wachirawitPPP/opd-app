export default function NicotineLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section className="flex flex-col items-center  ">
         {/* <h1 className="font-kanit">แบบวัดความเครียด กรมสุขภาพจิต</h1> */}
         <div className="w-full pb-16">
          {children}
        </div>
      </section>
    );
  }
  