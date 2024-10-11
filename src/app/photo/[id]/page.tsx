import Customization from "@/components/Customization";
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
  console.log(imageUrl);
  return (
    <main className="flex h-full min-h-dvh flex-col items-center gap-8 px-4 py-12">
      <h1
        className={`${eater.className} text-primary text-center text-4xl font-bold`}
      >
        Vamos a probarte un disfraz
      </h1>
      <Customization imageUrl={imageUrl} imageId={id} />
    </main>
  );
}
