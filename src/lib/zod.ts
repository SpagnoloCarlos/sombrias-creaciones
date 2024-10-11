import { object, string } from "zod";

export const costumeSchema = object({
  costume: string({ required_error: "Seleccione un disfraz" }).min(
    1,
    "Seleccione un disfraz",
  ),
});
