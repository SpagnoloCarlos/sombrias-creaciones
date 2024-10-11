"use client";

import { getCldImageUrl } from "next-cloudinary";
import { useState } from "react";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { costumeSchema } from "@/lib/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { costumes, costumesToCld } from "@/lib/constant";
import {
  ArrowLeft,
  Facebook,
  Ghost,
  Linkedin,
  MessageCircle,
  Share2,
  Twitter,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Popover, PopoverTrigger } from "./ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";

const Customization = ({
  imageUrl,
  imageId,
}: {
  imageUrl: string;
  imageId: string;
}) => {
  const [url, setUrl] = useState<string>(imageUrl);
  const [loading, setLoading] = useState<boolean>(false);
  const [showShare, setShowShare] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof costumeSchema>>({
    resolver: zodResolver(costumeSchema),
    defaultValues: {
      costume: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof costumeSchema>) => {
    setLoading(true);
    const img = document?.querySelector("#new-image") as HTMLImageElement;
    const costume = values.costume;
    const promp = `a ${costumesToCld[costume]} costume`;

    const url = await getCldImageUrl({
      src: imageId,
      replace: {
        from: "clothes",
        to: promp,
        preserveGeometry: true,
      },
    });

    setUrl(url);
    if (img) {
      img.onload = () => {
        setLoading(false);
        setShowShare(true);
      };
    }
  };

  const shareImage = (platform: string) => {
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

  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="border-border flex flex-col justify-between gap-4 rounded-lg border-2 border-dashed p-8">
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="costume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selecciona un disfraz de la lista</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={loading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona tu disfraz" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {costumes.map((costume) => (
                        <SelectItem key={costume} value={costume}>
                          {costume}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              Crea tu disfraz
            </Button>
          </form>
        </Form>
        <Button
          className="w-full gap-2"
          onClick={() => router.push("/")}
          disabled={loading}
        >
          <ArrowLeft />
          Subir otra foto
        </Button>
      </div>

      <div className="bg-muted relative rounded-lg p-4">
        <img
          id="new-image"
          className="h-full max-h-[500px] min-h-[400px] max-w-7xl rounded-md object-contain"
          src={url}
          alt={"Imagen generada"}
        />
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-50">
            <div className="animate-bounce">
              <Ghost className="h-16 w-16 text-orange-500" />
            </div>
          </div>
        )}
        {showShare && (
          <Popover>
            <PopoverTrigger asChild>
              <Button className="absolute right-5 top-5 bg-gray-800 bg-opacity-70 hover:bg-opacity-100">
                <Share2 className="mr-2 h-4 w-4" />
                Compartir
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 border-orange-300 bg-gray-800">
              <div className="grid">
                <Button
                  variant="ghost"
                  onClick={() => shareImage("Twitter")}
                  className="w-full justify-start"
                >
                  <Twitter className="mr-2 h-4 w-4" />
                  Twitter
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => shareImage("Facebook")}
                  className="w-full justify-start"
                >
                  <Facebook className="mr-2 h-4 w-4" />
                  Facebook
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => shareImage("LinkedIn")}
                  className="w-full justify-start"
                >
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => shareImage("WhatsApp")}
                  className="w-full justify-start"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};

export default Customization;
