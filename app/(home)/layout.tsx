import Header from "@/components/home/Header";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <main className="max-w-7xl mx-auto px-4">{children}</main>
    </div>
  );
};

export default layout;
