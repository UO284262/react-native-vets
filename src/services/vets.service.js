import camelize from "camelize";
import { vets } from "./mocks/vets";

export const vetsRequest = (location) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const mock = vets[location];
      if (!mock) {
        reject("not found");
      }
      resolve(mock);
    }, 500);
  });
};

export const vetsTransform = ({ results = [] }) => {
  return camelize(results);
};
