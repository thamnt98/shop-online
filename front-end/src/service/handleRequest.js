import { apiUrl } from "../environments/environments";
import axios from "axios";
export const getUserById = () =>
  axios({
    method: "get",
    url: apiUrl + "admin/getUserById",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });
export const changePassword = data =>
  axios({
    method: "POST",
    url: apiUrl + "admin/changePassword",
    data: data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const listShop = page =>
  axios({
    method: "GET",
    url: apiUrl + "shops?page=" + page,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const detailShop = id =>
  axios({
    method: "GET",
    url: apiUrl + "shops/" + id,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const deleteShop = id =>
  axios({
    method: "DELETE",
    url: apiUrl + "shops/" + id,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const listPref = () =>
  axios({
    method: "GET",
    url: apiUrl + "pref",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const updateShop = (id, data) =>
  axios({
    method: "PUT",
    url: apiUrl + "shops/" + id,
    data: data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const addShop = data =>
  axios({
    method: "POST",
    url: apiUrl + "shops",
    data: data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });
export const login = (username, password) =>
  axios({
    method: "POST",
    url: apiUrl + "admin/login",
    data: {
      username: username,
      password: password
    }
  });
export const logout = () =>
  axios({
    method: "POST",
    url: apiUrl + "admin/logout",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });
export const getSize = (page, per_page) =>
  axios({
    method: "GET",
    url: apiUrl + "sizes?page=" + page + "&per_page=" + per_page,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const listColor = (page, per_page) =>
  axios({
    method: "GET",
    url: apiUrl + "colors?page=" + page + "&per_page=" + per_page,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const addSize = data =>
  axios({
    method: "POST",
    url: apiUrl + "sizes",
    data: data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const addColor = data =>
  axios({
    method: "POST",
    url: apiUrl + "colors",
    data: data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const updateColor = (id, data) =>
  axios({
    method: "PUT",
    url: apiUrl + "colors/" + id,
    data: data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const getSizeById = id =>
  axios({
    method: "GET",
    url: apiUrl + "sizes/" + id,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const detailColor = id =>
  axios({
    method: "GET",
    url: apiUrl + "colors/" + id,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const deleteColor = id =>
  axios({
    method: "DELETE",
    url: apiUrl + "colors/" + id,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });
export const getTaxs = () =>
  axios({
    method: "get",
    url: apiUrl + "taxs",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const updateTaxs = data =>
  axios({
    method: "post",
    url: apiUrl + "taxs/update",
    data: data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });
export const getRentals = async () =>
  axios({
    method: "get",
    url: apiUrl + "rentals",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const getRental = async idRental =>
  axios({
    method: "get",
    url: apiUrl + "rentals/" + idRental,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const getRentalByShop = shopId =>
  axios({
    method: "get",
    url: apiUrl + "rentals?shop=" + shopId,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const createRental = data =>
  axios({
    method: "post",
    url: apiUrl + "rentals",
    data: data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const updateRental = (data, id) =>
  axios({
    method: "put",
    url: apiUrl + "rentals/" + id,
    data: data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const deleteRental = id =>
  axios({
    method: "delete",
    url: apiUrl + "rentals/" + id,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const getListShop = axios({
  method: "get",
  url: apiUrl + "shop/dropdown",
  headers: {
    Authorization: "Bearer " + localStorage.getItem("user_id")
  }
});
export const getSuppliers = async () =>
  axios({
    method: "get",
    url: apiUrl + "suppliers/",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const getSupplier = id =>
  axios({
    methos: "get",
    url: apiUrl + "suppliers/" + id,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const createSupplier = data =>
  axios({
    method: "post",
    url: apiUrl + "suppliers",
    data: data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const updateSupplier = (data, id) =>
  axios({
    method: "put",
    url: apiUrl + "suppliers/" + id,
    data: data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const deleteSupplier = id =>
  axios({
    method: "delete",
    url: apiUrl + "suppliers/" + id,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const getListCustomerType = () =>
  axios({
    method: "get",
    url: apiUrl + "customerTypes",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const getListServiceByShop = idShop =>
  axios({
    method: "get",
    url: apiUrl + "services?idShop=" + idShop,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const addService = data =>
  axios({
    method: "post",
    url: apiUrl + "services",
    data: data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const getServiceById = id =>
  axios({
    method: "get",
    url: apiUrl + "services/" + id,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const deleteService = id =>
  axios({
    method: "delete",
    url: apiUrl + "services/" + id,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const editService = (id, data) =>
  axios({
    method: "patch",
    url: apiUrl + "services/" + id,
    data: data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const getServiceByPage = (idShop, page) =>
  axios({
    method: "get",
    url: apiUrl + "services?idShop=" + idShop + "&&page=" + page,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const deleteSize = id =>
  axios({
    method: "delete",
    url: apiUrl + "sizes/" + id,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const sizeEdit = (values, id) =>
  axios({
    method: "PATCH",
    url: apiUrl + "sizes/" + id,
    data: values,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const getStaffs = page =>
  axios({
    method: "get",
    url: apiUrl + "staffs?page=" + page,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const getStaff = id =>
  axios({
    method: "get",
    url: apiUrl + "staffs/" + id,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const createStaff = data =>
  axios({
    method: "post",
    url: apiUrl + "staffs",
    data: data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const updateStaff = (data, id) =>
  axios({
    method: "put",
    url: apiUrl + "staffs/" + id,
    data: data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const deleteStaff = id =>
  axios({
    method: "delete",
    url: apiUrl + "staffs/" + id,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const changePasswordStaff = data =>
  axios({
    method: "post",
    url: apiUrl + "staffs/changePassword",
    data: data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const updateZipcode = zipcode =>
  axios({
    method: "get",
    url: apiUrl + "zipcodes/" + zipcode,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const getListProducer = page =>
  axios({
    method: "get",
    url: apiUrl + "producers?page=" + page,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });
export const getProducerById = id =>
  axios({
    method: "get",
    url: apiUrl + "producers/" + id,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });
export const deleteProducer = id =>
  axios({
    method: "delete",
    url: apiUrl + "producers/" + id,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });
export const getZipCode = zipcode =>
  axios({
    method: "get",
    url: apiUrl + "zipcodes/" + zipcode,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });
export const addProducer = data =>
  axios({
    method: "post",
    url: apiUrl + "producers",
    data: data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });
export const getPrefById = id =>
  axios({
    method: "GET",
    url: apiUrl + "pref/" + id,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });
export const editProducer = (id, data) =>
  axios({
    method: "patch",
    url: apiUrl + "producers/" + id,
    data: data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });
export const getMaxCode = () =>
  axios({
    method: "GET",
    url: apiUrl + "producer/maxcode",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const getProducts = (
  pageNumber,
  perPage,
  productCode,
  productName,
  shop,
  supplier,
  maker,
  type
) =>
  axios({
    method: "get",
    url: `${apiUrl}products?page=${pageNumber}&per_page=${perPage}&product_code=${productCode}&product_name=${productName}&shop=${shop}&supplier=${supplier}&maker=${maker}&type=${type}`,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const getStockHistory = productId =>
  axios({
    method: "get",
    url: apiUrl + "history?product_id=" + productId,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const setStock = (stockNumber, productId) =>
  axios({
    method: "patch",
    url: `${apiUrl}stocks/set?product_id=${productId}&set_number=${stockNumber}`,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const createProduct = data =>
  axios({
    method: "post",
    url: apiUrl + "products",
    data: data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const getProduct = id =>
  axios({
    method: "get",
    url: apiUrl + "products/" + id,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const updateProduct = (data, id) =>
  axios({
    method: "put",
    url: apiUrl + "products/" + id,
    data: data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const addStock = data =>
  axios({
    method: "patch",
    url: apiUrl + "stocks/plus",
    data: data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const searchProductHistory = data =>
  axios({
    method: "post",
    url: apiUrl + "product/history/search",
    data: data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });

export const moveStore = data =>
  axios({
    method: "post",
    url: apiUrl + "products/move",
    data: data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_id")
    }
  });
