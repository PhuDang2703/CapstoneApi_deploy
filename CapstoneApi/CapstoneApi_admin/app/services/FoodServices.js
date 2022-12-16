const URL = "https://5a6451dcf2bae00012ca1a6a.mockapi.io/api";

class FoodServices {
  callApi(uri, method, data) {
    return axios({
      url: `${URL}/${uri}`,
      method,
      data,
    });
  }

  getListFoodApi() {
    return axios({
      url: "https://5a6451dcf2bae00012ca1a6a.mockapi.io/api/Food",
      method: "GET",
    });
  }

  deleteFoodApi(id) {
    return axios({
      url: `https://5a6451dcf2bae00012ca1a6a.mockapi.io/api/Food/${id}`,
      method: "DELETE",
    });
  }

  addFoodApi(food) {
    return axios({
      url: "https://5a6451dcf2bae00012ca1a6a.mockapi.io/api/Food",
      method: "POST",
      data: food,
    });
  }

  getFoodById(id) {
    return axios({
      url: `https://5a6451dcf2bae00012ca1a6a.mockapi.io/api/Food/${id}`,
      method: "GET",
    });
  }

  updateFoodApi(food) {
    return axios({
      url: `https://5a6451dcf2bae00012ca1a6a.mockapi.io/api/Food/${food.id}`,
      method: "PUT",
      data: food,
    });
  }
}

export default FoodServices;
