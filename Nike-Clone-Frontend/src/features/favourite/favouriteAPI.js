export function addTofavourite(items) {
  return new Promise(async (resolve) => {
    const response = await fetch("/favourites/addTofavourite", {
      method: "POST",
      body: JSON.stringify(items),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchfavouriteByUser() {
  return new Promise(async (resolve) => {
    const response = await fetch("/favourites/fetchfavouriteByUser");
    const data = await response.json();
    resolve({ data });
  });
}

export function deleteFromFavourite(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("/favourites/deleteFromFavourite/" + id, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    const data = response.json();
    resolve({ data });
  });
}

export function updateFavourite(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("/favourites/updateFavourite/" + item.id, {
      method: "PATCH",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = response.json();
    resolve({ data });
  });
}
