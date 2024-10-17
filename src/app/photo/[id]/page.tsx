import PhotoEditor from "@/components/PhotoEditor";
import { eater } from "@/lib/fonts";
import { getCldImageUrl } from "next-cloudinary";

const getImageUrl = async (id: string) => {
  const url = getCldImageUrl({
    src: id,
  });
  return url;
};

export default async function Photo({ params }: { params: { id: string } }) {
  const { id } = params;
  const imageUrl = await getImageUrl(id);
  return (
    <main className="flex h-full min-h-dvh flex-col items-center gap-8 px-4 py-12">
      <h1
        className={`${eater.className} text-center text-4xl font-bold text-primary`}
      >
        ¡Vamos a transformarte!
      </h1>
      <PhotoEditor imageUrl={imageUrl} id={id} />
    </main>
  );
}
