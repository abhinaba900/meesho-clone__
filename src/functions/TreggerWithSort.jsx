export function TreggerWithSort(option, data) {
  if (option === "asc") {
    return data?.sort((a, b) => a.price - b.price);
  } else if (option === "desc") {
    return data?.sort((a, b) => b.price - a.price);
  } else if (option === "rating") {
    return data?.sort((a, b) => b.star - a.star);
  } else {
    return data;
  }
}
