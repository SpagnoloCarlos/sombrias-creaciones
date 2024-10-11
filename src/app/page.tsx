import UploadWidget from "@/components/UploadWidget";

export default function Home() {
  return (
    <main className="relative flex h-full min-h-dvh flex-col items-center justify-center gap-8 px-4 py-12">
      <h1 className="text-primary text-center text-4xl font-bold">HallowIA</h1>
      <p className="max-w-2xl text-pretty text-center text-lg">
        Descubre una variedad de disfraces personalizados con la inteligencia
        artificial de Cloudinary. Solo necesitas subir una foto de cuerpo
        completo para comenzar, y podrás ver cómo te ves con diferentes
        atuendos.
      </p>
      <UploadWidget />
    </main>
  );
}
