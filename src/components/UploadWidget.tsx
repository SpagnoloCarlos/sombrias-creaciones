"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const UploadWidget = () => {
  const router = useRouter();

  const handleSuccess = (results: any) => {
    const publicId = results?.["info"]?.["public_id"];
    console.log(results);

    if (publicId) {
      router.push(`/photo/${publicId}`);
    }
  };

  return (
    <CldUploadWidget
      uploadPreset="upload-unsigned-images"
      onSuccess={handleSuccess}
      options={{
        sources: ["local"],
        multiple: false,
        maxFiles: 1,
        language: "es",
        text: {
          es: {
            or: "O",
            menu: {
              files: "Subir desde tu dispositivo",
            },
            local: {
              browse: "Subir imagen",
              dd_title_single: "Arrastra y suelta tu imagen aquí",
            },
          },
        },
        styles: {
          palette: {
            window: "#0a0a0a",
            windowBorder: "#7c3aed",
            tabIcon: "#7c3aed",
            menuIcons: "#fff",
            textDark: "#0a0a0a",
            textLight: "#FFFFFF",
            link: "#7c3aed",
            error: "#F44235",
            inProgress: "#0078FF",
            complete: "#20B832",
            sourceBg: "#dfdfdf",
          },
          frame: {
            background: "#0E2F5B99",
          },
        },
      }}
    >
      {({ open }) => {
        return <Button onClick={() => open()}>Subir imagen</Button>;
      }}
    </CldUploadWidget>
  );
};

export default UploadWidget;
