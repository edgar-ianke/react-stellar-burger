export default function makeDictionary(arr) {
  const dictionary = {};

  arr.forEach((obj) => {
    dictionary[obj._id] = obj;
  });
  return dictionary;
}
