export const setItem = ({
  key,
  value,
}: {
  key: string;
  value: Array<string>;
}) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log("Error To Get Items From LocalStorage");
  }
};

export const getItem = (key: string) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    return null;
  }
};

export const loadImage = async (url) => {
  return new Promise<HTMLImageElement>((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      resolve(img);
    };
  });
};
