import PlatformShowCase from "@/components/games/PlatformShowCase";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  return (
    <div>
      <PlatformShowCase id={id} />
    </div>
  );
};

export default page;
