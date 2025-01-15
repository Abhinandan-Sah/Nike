export function createUser(user) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch("/auths/createUser", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function loginUser(user) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("auths/loginUser", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (err) {
      reject(err);
    }
  });
}

export function checkUser() {
  return new Promise(async (resolve, reject) => {
    const response = await fetch("/auths/checkUser");
    const data = response.json();
    resolve({ data });
  });
}
export function logoutUser() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auths/logoutUser");
      if (response.ok) {
        resolve({ data: "success" });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (err) {
      reject(err);
    }
  });
}
