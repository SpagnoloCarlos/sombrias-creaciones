import Customization from "@/components/Customization";
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
    <main className="my-12 flex flex-col items-center gap-8 px-4">
      <h1 className="text-primary text-center text-4xl font-bold">
        Vamos a probarte un disfraz
      </h1>
      <Customization imageUrl={imageUrl} imageId={id} />
    </main>
  );
}
