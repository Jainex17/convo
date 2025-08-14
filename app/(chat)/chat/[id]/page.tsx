import Chat from "@/components/Chat";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  return (
    <div className="w-full min-h-screen">
      <Chat id={id}/>
    </div>
  );
}