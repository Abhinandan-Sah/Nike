export function addToCart(items) {
  return new Promise(async (resolve) => {
    const response = await fetch("/carts/addToCart", {
      method: "POST",
      body: JSON.stringify(items),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchCartByUser() {
  return new Promise(async (resolve) => {
    const response = await fetch("/carts/fetchCartByUser");
    const data = await response.json();
    resolve({ data });
  });
}

export function deleteFromCart(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("/carts/deleteFromCart/" + id, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    const data = response.json();
    resolve({ data });
  });
}

export function updateCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("/carts/updateCart/" + item.id, {
      method: "PATCH",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = response.json();
    resolve({ data });
  });
}
