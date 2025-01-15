// A mock function to mimic making an async request for data
export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("/products/createProduct", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProducts(filter) {
  return new Promise(async (resolve) => {
    let queryString = "";
    for (let key in filter) {
      if (filter[key].length) {
        queryString += `${key}=${filter[key]}&`;
      }
    }

    const response = await fetch("/products/fetchProducts?" + queryString);
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("/products/fetchProductById/" + id);
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("/categories/");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchColors() {
  return new Promise(async (resolve) => {
    const response = await fetch("/colors/");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchSizes() {
  return new Promise(async (resolve) => {
    const response = await fetch("/sizes/");
    const data = await response.json();
    resolve({ data });
  });
}

export function updateProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("/products/updateProductById/" + product.id, {
      method: "PATCH",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductYouMayAlsoLike() {
  return new Promise(async (resolve) => {
    const response = await fetch("/products/fetchProductYouMayAlsoLike");
    const data = await response.json();
    resolve({ data });
  });
}
