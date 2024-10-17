"use client";

import { useEffect, useState } from "react";
import Customization from "./Customization";
import SpookyGallery from "./SpookyGallery";
import { getItem } from "@/lib/storage";

const PhotoEditor = ({ imageUrl, id }) => {
  const [storedImages, setStoredImages] = useState<Array<string>>([]);

  useEffect(() => {
    const images = getItem("spooky_images") ?? [];
    setStoredImages(images);
  }, []);

  return (
    <div>
      <Customization
        imageUrl={imageUrl}
        imageId={id}
        storedImages={storedImages}
        setStoredImages={setStoredImages}
      />
      <SpookyGallery storedImages={storedImages} />
    </div>
  );
};

export default PhotoEditor;
