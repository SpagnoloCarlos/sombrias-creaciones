import { object, string } from "zod";

export const costumeSchema = object({
  costume: string({ required_error: "Selecciona un disfraz" }).min(
    1,
    "Selecciona un disfraz",
  ),
  stage: string().optional(),
  optionsCostume: string(),
  optionsStage: string(),
});
