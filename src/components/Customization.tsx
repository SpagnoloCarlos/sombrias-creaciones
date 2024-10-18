"use client";

import { getCldImageUrl } from "next-cloudinary";
import { Dispatch, useState } from "react";
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
import { costumes, costumesToCld, stages, stagesToCld } from "@/lib/constant";
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
import { getItem, setItem } from "@/lib/storage";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

const Customization = ({
  imageUrl,
  imageId,
  storedImages,
  setStoredImages,
}: {
  imageUrl: string;
  imageId: string;
  storedImages: Array<string>;
  setStoredImages: Dispatch<React.SetStateAction<Array<string>>>;
}) => {
  const [url, setUrl] = useState<string>(imageUrl);
  const [loading, setLoading] = useState<boolean>(false);
  const [showShare, setShowShare] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof costumeSchema>>({
    resolver: zodResolver(costumeSchema),
    defaultValues: {
      costume: "",
      stage: "",
      optionsCostume: "select",
      optionsStage: "select",
    },
  });

  const handleSubmit = async (values: z.infer<typeof costumeSchema>) => {
    setLoading(true);
    const img = document?.querySelector("#new-image") as HTMLImageElement;
    const costume = values.costume;
    const stage = values.stage;
    const optionsCostume = values.optionsCostume;
    const optionsStage = values.optionsStage;
    const selectCostumePromp = `a ${costumesToCld[costume]} costume`;

    const config = {
      src: imageId,
      replace: {
        from: optionsCostume === "select" ? "clothes" : "ropa",
        to: optionsCostume === "select" ? selectCostumePromp : costume,
        preserveGeometry: true,
      },
    };

    if (stage && stage !== "Selecciona un escenario") {
      const stagePromp = `add ${stagesToCld[stage]} to the background`;
      config["replaceBackground"] =
        optionsStage === "select" ? stagePromp : stage;
    }

    const url = await getCldImageUrl(config);
    setUrl(url);

    if (img) {
      img.onload = () => {
        setLoading(false);
        setShowShare(true);
        const newImages = [...storedImages];
        if (!newImages.includes(url)) {
          newImages.push(url);
          setStoredImages(newImages);
          setItem({ key: "spooky_images", value: newImages });
        }
      };
    }
  };

  const shareImage = (platform: string) => {
    const text = encodeURIComponent(
      `Mira mi disfraz para Halloween generado con IA en SombrIAs Creaciones:`,
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
    <div className="flex flex-col justify-center gap-8 md:flex-row">
      <div className="flex w-full max-w-md flex-col justify-between gap-4 rounded-lg border-2 border-dashed border-border p-8 md:min-w-[300px]">
        <Form {...form}>
          <form
            className="flex h-full w-full flex-col gap-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="optionsCostume"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-md">
                    Elige como ingresar tu disfraz
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(e) => {
                        form.setValue("costume", "");
                        field.onChange(e);
                      }}
                      defaultValue={field.value}
                      defaultChecked={true}
                      className="flex flex-col space-y-1 md:flex-row md:space-x-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="select" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Lista de disfraces
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="input" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Describe tu disfraz
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.getValues("optionsCostume") === "select" && (
              <FormField
                control={form.control}
                name="costume"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Elije un disfraz de la lista *</FormLabel>
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
                  </FormItem>
                )}
              />
            )}
            {form.getValues("optionsCostume") === "input" && (
              <FormField
                control={form.control}
                name="costume"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Describe el disfraz que deseas *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Un disfraz de policía"
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            <div className="my-2 h-[1px] w-full border border-dashed border-border" />
            <FormField
              control={form.control}
              name="optionsStage"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-md">
                    Elige como ingresar tu escenario
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(e) => {
                        form.setValue("stage", "");
                        field.onChange(e);
                      }}
                      defaultValue={field.value}
                      defaultChecked={true}
                      className="flex flex-col space-y-1 md:flex-row md:space-x-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="select" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Lista de escenarios
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="input" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Describe tu escenario
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.getValues("optionsStage") === "select" && (
              <FormField
                control={form.control}
                name="stage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Elige el escenario que desees (opcional)
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={loading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un escenario" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {stages.map((stage) => (
                          <SelectItem key={stage} value={stage}>
                            {stage}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            )}
            {form.getValues("optionsStage") === "input" && (
              <FormField
                control={form.control}
                name="stage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Describe el escenario que deseas (opcional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Un hospital abandonado"
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            <Button
              className="mt-auto w-full gap-2"
              type="submit"
              disabled={loading}
            >
              Hacer magia
              <Ghost />
            </Button>
          </form>
        </Form>
        <Button
          className="w-full gap-2 border border-primary bg-transparent text-primary hover:bg-primary hover:text-foreground"
          onClick={() => router.push("/")}
          disabled={loading}
        >
          <ArrowLeft />
          Subir otra foto
        </Button>
      </div>

      <div className="relative rounded-lg bg-muted p-4">
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
