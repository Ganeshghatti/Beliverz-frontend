import axios from "axios";

export const productsf = async (categoryid) => {
  try {
    const response = await axios.get(
      `http://13.53.38.100:8000/api/product/products-in-category/${categoryid}/`
    );
    console.log(response);
    return response;
  } catch (error) {
    alert(error.message);
  }
};

export const productpagef = async (productid) => {
  try {
    const response = await axios.get(
      `http://13.53.38.100:8000/api/product/manage-product/${productid}/`
    );
    console.log(response);
    return response;
  } catch (error) {
    alert(error.message);
  }
};
