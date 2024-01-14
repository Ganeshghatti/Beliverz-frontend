import axios from "axios";

export const signup = async (formData) => {
  try {
    const response = await axios.post(
      `http://13.53.38.100:8000/api/user/signup/`,
      formData
    );
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const loginRoute = async (formData) => {
  try {
    const response = await axios.post(
      `http://13.53.38.100:8000/api/user/login/`,
      formData
    );
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const accountRoute = async (email) => {
  try {
    const response = await axios.get(
      `http://13.53.38.100:8000/api/user/myaccount/${email}`
    );
    console.log(response);

    return response;
  } catch (error) {
    alert(error.message);
  }
};
export const rentedRoute = async (email) => {
  try {
    const response = await axios.get(
      `http://13.53.38.100:8000/api/order/orderhistory/${email}/`
    );
    console.log(response);
    return response;
  } catch (error) {
    alert(error.message);
  }
};

export const userEdit = async (userdata) => {
  try {
    const response = await axios
      .put(`http://13.53.38.100:8000/api/user/myaccount/`, userdata)
      .then((response) => {
        console.log(response);
      });
    return response;
  } catch (error) {
    alert(error.message);
  }
};
export const orderCheckoutRoute = async (cartdata) => {
  try {
    const response = await axios
      .post(`http://13.53.38.100:8000/api/order/placeorder/`, cartdata)
      .then((response) => {
        console.log(response);
      });
    return response;
  } catch (error) {
    alert(error.message);
  }
};
