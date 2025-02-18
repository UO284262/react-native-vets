export const loginRequest = (email, password) => {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      if (email === "a" && password === "a") {
        resolve({
          uid: 1,
          email: "user1@email.com",
        });
      } else if (email === "b" && password === "b") {
        resolve({
          uid: 2,
          email: "user2@email.com",
        });
      } else {
        reject("Wrong email and/or password");
      }
    }, 1000);
  });
};
export const createUserRequest = (email, password) => {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      if (email === "b" && password === "b") {
        resolve("User created!");
      } else {
        reject("Email already registered");
      }
    }, 1000);
  });
};
