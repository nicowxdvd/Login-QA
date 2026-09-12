import LoginBanner from "@/components/LoginBanner";
import LoginForm from "@/components/LoginForm";

export default function Home() {
  return (
    <main className="grid min-h-screen grid-cols-1 bg-neutral-950 md:grid-cols-2">
      <LoginBanner />
      <LoginForm />
    </main>
  );
}
