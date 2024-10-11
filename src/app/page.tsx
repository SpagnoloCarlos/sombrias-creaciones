import UploadWidget from "@/components/UploadWidget";

export default function Home() {
  return (
    <main className="relative flex h-full min-h-svh flex-col items-center justify-center gap-8 px-4 py-12">
      <h1 className="text-primary text-center text-4xl font-bold">HallowIA</h1>
      <p className="max-w-2xl text-pretty text-center text-lg">
        Pruebate diferentes disfraces con ayuda de la inteligencia artificial de
        Cloudinary.
        <br />
        Para empezar sube una foto de cuerpo completo.
      </p>
      <UploadWidget />
    </main>
  );
}
