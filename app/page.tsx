import { Header, InputBox, MaterialSelector, SubmitButton } from "./components";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <InputBox />
      <MaterialSelector />
      <SubmitButton />
    </main>
  );
}
