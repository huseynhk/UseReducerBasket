import axios from "axios";

const Api = axios.create({
  baseURL: "https://dummyjson.com/products",
});

export const GetProducts = async () => {
  try {
    const response = await Api.get("/");
    if (response.status !== 200) {
      throw new Error("Error");
    } else {
      return response.data;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const GetSingleProduct = async (productId) => {
  try {
    const response = await Api.get(`/${productId}`);
    if (response.status !== 200) {
      throw new Error("Error");
    } else {
      return response.data;
    }
  } catch (error) {
    console.log(error.message);
  }
};
