const URL = "https://6388cedaa4bb27a7f7924897.mockapi.io/api";

class CallApi {
  callApi(uri, method, data) {
    return axios({
      url: `${URL}/${uri}`,
      method,
      data,
    });
  }

  getListPhoneApi() {
    return axios({
      url: "https://6388cedaa4bb27a7f7924897.mockapi.io/api/CapstoneApi",
      method: "GET",
    });
  }

  deletePhoneApi(id) {
    return axios({
      url: `https://6388cedaa4bb27a7f7924897.mockapi.io/api/CapstoneApi/${id}`,
      method: "DELETE",
    });
  }

  addPhoneApi(phone) {
    return axios({
      url: "https://6388cedaa4bb27a7f7924897.mockapi.io/api/CapstoneApi",
      method: "POST",
      data: phone,
    });
  }

  getPhoneById(id) {
    return axios({
      url: `https://6388cedaa4bb27a7f7924897.mockapi.io/api/CapstoneApi/${id}`,
      method: "GET",
    });
  }

  updatePhoneApi(phone) {
    return axios({
      url: `https://6388cedaa4bb27a7f7924897.mockapi.io/api/CapstoneApi/${phone.id}`,
      method: "PUT",
      data: phone,
    });
  }
}

export default CallApi;
