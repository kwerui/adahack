import PostCodeSearch from "@/components/PostCodeSearch";

export default function Home() {
  return (
<main className="min-h-[calc(100svh-100px)] flex items-start sm:items-center justify-center bg-gradient-to-b from-green-50 to-emerald-100 px-4 py-8 sm:py-12">
        <PostCodeSearch />
    </main>
  );
}