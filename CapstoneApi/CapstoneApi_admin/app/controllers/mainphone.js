import CallApi from "../services/CallApi.js";
import Phone from "../models/Phone.js";
import Validation from "./validation.js";

const callApiPhone = new CallApi();
const validation = new Validation();

const getEle = (id) => document.getElementById(id);

const renderHTML = (data) => {
  if (data && data.length > 0) {
    const result = data.reduce((content, phone) => {
      return (content += `
        <tr>
            <td>${phone.id}</td>
            <td>${phone.name}</td>
            <td>${phone.price}</td>
            <td>${phone.screen}</td>
            <td>${phone.backCamera}</td>
            <td>${phone.frontCamera}</td>
            <td>
              <img src="./../../assets/img/${phone.img}" width="50px" />
            </td>
            <td>${phone.desc}</td>
            <td>${phone.type}</td>
            <td>
              <button class="btn btn-info" data-toggle="modal" data-target="#exampleModal" onclick="editPhone(${phone.id
        })">Edit</button>
              <button class="btn btn-danger" onclick="deletePhone(${phone.id
        })">Delete</button>
            </td>
        </tr>
      `);
    }, "");

    getEle("tbodyPhone").innerHTML = result;

    return;
  }

  getEle("tbodyPhone").innerHTML = "";
};


const getListPhone = () => {
  callApiPhone
    .callApi(`CapstoneApi`, "GET", null)
    .then((result) => {
      if (result.statusText === "OK") {
        renderHTML(result.data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

getListPhone();

/**
 * Delete Phone
 */
function deletePhone(id) {
  callApiPhone
    .callApi(`CapstoneApi/${id}`, "DELETE", null)
    .then(() => {
      getListPhone();
    })
    .catch((error) => {
      console.log(error);
    });
}

window.deletePhone = deletePhone;


//Get info phone
getEle("btnThem").addEventListener("click", () => {
  getEle("exampleModalLabel").innerHTML = "Thêm Sản Phẩm";
  getEle("btnCapNhat").style.display = "none";
  getEle("btnThemPhone").style.display = "block";
});

const getInfoPhone = () => {
  const id = getEle("phoneID").value;
  const name = getEle("tenSP").value;
  const price = getEle("giaSP").value;
  const screen = getEle("screen").value;
  const backCamera = getEle("backCamera").value;
  const frontCamera = getEle("frontCamera").value;
  //Img khai báo let vì giá trị hình có thể được cập nhật lại
  let img = "";
  if (getEle("img").files.length > 0) {
    img = getEle("img").files[0].name;
  }
  const desc = getEle("moTa").value;
  const type = getEle("loai").value;

  // //flag: cờ
  // var isValid = true; //hợp lệ

  // //Tên sp
  // isValid &=
  //   validation.kiemTraRong(name, "invalidName", "(*) Vui lòng nhập giá sản phẩm");

  // //Giá sp
  // isValid &=
  //   validation.kiemTraRong(price, "invalidPrice", "(*) Vui lòng nhập tên sản phẩm");

  // //Select loại sp
  // isValid &= validation.kiemTraSelect(
  //   "loai",
  //   "invalidType",
  //   "(*) Vui long chọn loại sản phẩm"
  // );

  // //Select màn hình sp
  // isValid &= validation.kiemTraSelect(
  //   "screen",
  //   "invalidScreen",
  //   "(*) Vui lòng chọn loại màn hình"
  // );

  // //Select cam trước
  // isValid &= validation.kiemTraSelect(
  //   "frontCamera",
  //   "invalidFrontCamera",
  //   "(*) Vui lòng chọn loại camera trước"
  // );

  // //Select cam sau
  // isValid &= validation.kiemTraSelect(
  //   "backCamera",
  //   "invalidBackCam",
  //   "(*) Vui lòng chọn loại camera sau"
  // );

  // if (!isValid) return;

  const phone = new Phone(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );

  return phone;
};

/**
 * Add Phone
 */
getEle("btnThemPhone").addEventListener("click", () => {
  const phone = getInfoPhone();

  callApiPhone
    .addPhoneApi(phone)
    .then(() => {
      console.log(phone)
      getListPhone();
      document.getElementsByClassName("close")[0].click();
    })
    .catch((error) => {
      console.log(error);
    });
});

/**
 * Edit Food
 */
const editPhone = (id) => {
  getEle("exampleModalLabel").innerHTML = "Sửa thông tin sản phẩm";
  getEle("btnThemPhone").style.display = "none";
  getEle("btnCapNhat").style.display = "block";

  callApiPhone
    .getPhoneById(id)
    .then((result) => {
      const phone = result.data;
      getEle("phoneID").value = phone.id;
      getEle("tenSP").value = phone.name;
      getEle("giaSP").value = phone.price;
      getEle("screen").value = phone.screen;
      getEle("backCamera").value = phone.backCamera;
      getEle("frontCamera").value = phone.frontCamera;
      getEle("img").value = phone.img;
      getEle("moTa").value = phone.desc;
      getEle("loai").value = phone.type;
    })
    .catch((error) => {
      console.log(error);
    });
};

window.editPhone = editPhone;

/**
 * Update Food
 */
getEle("btnCapNhat").addEventListener("click", async () => {
  const phone = getInfoPhone();
  const result = await callApiPhone.getPhoneById(phone.id);

  if (!phone.img) {
    console.log(result)
    phone.img = result.data.img;
  }

  callApiPhone
    .updatePhoneApi(phone)
    .then(() => {
      getListPhone();
      document.getElementsByClassName("close")[0].click();
    })
    .catch((error) => {
      console.log(error);
    });
});
