import PostCodeSearch from "@/components/PostCodeSearch";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-65px)] flex items-center justify-center bg-gradient-to-b from-green-50 to-emerald-100 px-4">
      <PostCodeSearch />
    </main>
  );
}