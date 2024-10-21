"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const UploadWidget = () => {
  const router = useRouter();

  const handleSuccess = (results) => {
    const publicId = results?.["info"]?.["public_id"];

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
            queue: {
              title_uploading_with_counter: "Subiendo {{num}} imagen",
              title_processing_with_counter: "Procesando {{num}} imagen",
            },
          },
        },
        styles: {
          palette: {
            window: "#292524",
            windowBorder: "#ea580c",
            tabIcon: "#ea580c",
            menuIcons: "#fff",
            textDark: "#292524",
            textLight: "#FFFFFF",
            link: "#ea580c",
            error: "#F44235",
            inProgress: "#0078FF",
            complete: "#20B832",
            sourceBg: "#413f3e",
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
