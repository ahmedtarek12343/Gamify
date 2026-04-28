import GameShowcase from "@/components/games/GameShowcase";

const GamePage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  return <GameShowcase id={id} />;
};

export default GamePage;
