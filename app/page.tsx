import PostCodeSearch from "@/components/PostCodeSearch";
import NavBar from "@/components/NavBar";

export default function Home() {
  return (
  <div>
    <nav>
      <NavBar />
    </nav>
    <main className="flex min-h-screen items-center justify-center bg-zinc-50">
      
      <PostCodeSearch />

    </main>
    </div>
  );
}