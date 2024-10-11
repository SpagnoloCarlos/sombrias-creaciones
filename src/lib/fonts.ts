import { Eater, Poppins } from "next/font/google";

export const eater = Eater({
  weight: "400",
  subsets: ["latin"],
});

export const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
