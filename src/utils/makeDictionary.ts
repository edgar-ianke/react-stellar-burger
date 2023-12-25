import { TIngredient } from "../services/types";

export default function makeDictionary(arr: readonly TIngredient[]) {
  const dictionary: Record<string, TIngredient> = {};

  arr.forEach((obj) => {
    dictionary[obj._id] = obj;
  });
  return dictionary;
}