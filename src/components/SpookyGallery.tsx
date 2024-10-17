"use client";
import { eater } from "@/lib/fonts";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import {
  Facebook,
  Linkedin,
  MessageCircle,
  Share2,
  Twitter,
} from "lucide-react";

interface Image {
  src: string;
  alt: string;
}

const SpookyGallery = ({ storedImages }: { storedImages: Array<string> }) => {
  const [images, setImages] = useState<Array<Image>>([]);

  useEffect(() => {
    const images = storedImages?.map((img, index) => {
      return { src: img, alt: `Photo_${index}` };
    });
    setImages(images);
  }, [storedImages]);

  const shareImage = ({ platform, url }: { platform: string; url: string }) => {
    const text = encodeURIComponent(
      `Mira mi disfraz para Halloween creado con IA en HalloIA`,
    );
    const imageUrl = encodeURIComponent(url);
    let shareUrl = "";

    switch (platform) {
      case "Twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${imageUrl}`;
        break;
      case "Facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${imageUrl}`;
        break;
      case "LinkedIn":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${imageUrl}&title=${text}`;
        break;
      case "WhatsApp":
        shareUrl = `https://wa.me/?text=${text}%20${imageUrl}`;
        break;
    }

    window.open(shareUrl, "_blank");
  };

  if (images?.length === 0) {
    return <></>;
  }

  return (
    <section className="mt-10 w-full max-w-5xl">
      <h2
        className={`${eater.className} mb-10 text-center text-4xl font-bold text-primary`}
      >
        Tu galería de fotos
      </h2>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {images?.map(({ src, alt }, index) => (
            <div className="relative" key={`photo_${index}`}>
              <img className="rounded-md" src={src} alt={alt} />
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="absolute right-2 top-2 bg-gray-800 bg-opacity-70 hover:bg-opacity-100">
                    <Share2 className="mr-2 h-4 w-4" />
                    Compartir
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-40 border-orange-300 bg-gray-800">
                  <div className="grid">
                    <Button
                      variant="ghost"
                      onClick={() =>
                        shareImage({ platform: "Twitter", url: src })
                      }
                      className="w-full justify-start"
                    >
                      <Twitter className="mr-2 h-4 w-4" />
                      Twitter
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() =>
                        shareImage({ platform: "Facebook", url: src })
                      }
                      className="w-full justify-start"
                    >
                      <Facebook className="mr-2 h-4 w-4" />
                      Facebook
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() =>
                        shareImage({ platform: "LinkedIn", url: src })
                      }
                      className="w-full justify-start"
                    >
                      <Linkedin className="mr-2 h-4 w-4" />
                      LinkedIn
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() =>
                        shareImage({ platform: "WhatsApp", url: src })
                      }
                      className="w-full justify-start"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      WhatsApp
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpookyGallery;
