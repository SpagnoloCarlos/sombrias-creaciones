import UploadWidget from "@/components/UploadWidget";
import { eater } from "@/lib/fonts";

export default function Home() {
  return (
    <main className="relative flex h-full min-h-dvh flex-col items-center justify-center gap-8 px-4 py-12">
      <h1
        className={`${eater.className} text-center text-4xl font-bold text-primary`}
      >
        Sombr
        <span className="neon-text inline-block text-foreground">IA</span>s
        Creaciones
      </h1>
      <p className="max-w-2xl text-pretty text-center text-lg">
        Descubre una variedad de disfraces generados con inteligencia
        artificial. Solo necesitas subir una foto de cuerpo completo para
        comenzar, y podrás ver cómo te ves con diferentes atuendos y en diversos
        escenarios.
      </p>
      <UploadWidget />
    </main>
  );
}
