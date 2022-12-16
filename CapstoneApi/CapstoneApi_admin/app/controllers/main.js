import FoodServices from "./../services/FoodServices.js";
import Food from "../models/Food.js";

const foodServices = new FoodServices();

const getEle = (id) => document.getElementById(id);

// const renderHTML = (data) => {
//   let content = "";
//   if (data && data.length > 0) {
//     data.forEach((food) => {
//       content += `
//             <tr>
//                 <td>${food.id}</td>
//                 <td>${food.tenMon}</td>
//                 <td>${food.loaiMon}</td>
//                 <td>${food.giaMon}</td>
//                 <td>${food.khuyenMai}</td>
//                 <td>${food.giaKhuyenMai}</td>
//                 <td>${food.tinhTrang}</td>
//             </tr>
//         `;
//     });
//     getEle("tbodyFood").innerHTML = content;
//   }
// };

const renderHTML = (data) => {
  if (data && data.length > 0) {
    const result = data.reduce((content, food) => {
      return (content += `
        <tr>
            <td>${food.id}</td>
            <td>${food.tenMon}</td>
            <td>
              <img src="./../../assets/img/${food.hinhMon}" width="50px" />
            </td>
            <td>${food.loaiMon === "loai1" ? "Chay" : "Mặn"}</td>
            <td>${food.giaMon}</td>
            <td>${food.khuyenMai}%</td>
            <td>${food.giaKhuyenMai}</td>
            <td>${food.tinhTrang === "1" ? "Còn" : "Hết"}</td>
            <td>
              <button class="btn btn-info" data-toggle="modal" data-target="#exampleModal" onclick="editFood(${
                food.id
              })">Edit</button>
              <button class="btn btn-danger" onclick="deleteFood(${
                food.id
              })">Delete</button>
            </td>
        </tr>
      `);
    }, "");

    getEle("tbodyFood").innerHTML = result;

    return;
  }

  getEle("tbodyFood").innerHTML = "";
};

const getListFood = () => {
  foodServices
    .callApi(`Food`, "GET", null)
    .then((result) => {
      if (result.statusText === "OK") {
        renderHTML(result.data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

getListFood();

/**
 * Delete Food
 */
function deleteFood(id) {
  foodServices
    .callApi(`Food/${id}`, "DELETE", null)
    .then(() => {
      getListFood();
    })
    .catch((error) => {
      console.log(error);
    });
}

window.deleteFood = deleteFood;

getEle("btnThem").addEventListener("click", () => {
  getEle("exampleModalLabel").innerHTML = "Thêm Món Ăn";
  getEle("btnCapNhat").style.display = "none";
  getEle("btnThemMon").style.display = "block";
});

const getInfoFood = () => {
  const foodID = getEle("foodID").value;
  const tenMon = getEle("tenMon").value;
  const loai = getEle("loai").value;
  const giaMon = getEle("giaMon").value;
  const khuyenMai = getEle("khuyenMai").value;
  const tinhTrang = getEle("tinhTrang").value;

  let hinhMon = "";
  if (getEle("hinhMon").files.length > 0) {
    hinhMon = getEle("hinhMon").files[0].name;
  }

  const moTa = getEle("moTa").value;

  const food = new Food(
    foodID,
    tenMon,
    loai,
    giaMon,
    khuyenMai,
    tinhTrang,
    hinhMon,
    moTa
  );

  food.tinhGiaKM();

  return food;
};

/**
 * Add Food
 */
getEle("btnThemMon").addEventListener("click", () => {
  const food = getInfoFood();

  foodServices
    .addFoodApi(food)
    .then(() => {
      getListFood();
      document.getElementsByClassName("close")[0].click();
    })
    .catch((error) => {
      console.log(error);
    });
});

/**
 * Edit Food
 */
const editFood = (id) => {
  getEle("exampleModalLabel").innerHTML = "Sửa Món Ăn";
  getEle("btnThemMon").style.display = "none";
  getEle("btnCapNhat").style.display = "block";

  foodServices
    .getFoodById(id)
    .then((result) => {
      const food = result.data;
      getEle("foodID").value = food.id;
      getEle("tenMon").value = food.tenMon;
      getEle("loai").value = food.loaiMon;
      getEle("giaMon").value = food.giaMon;
      getEle("khuyenMai").value = food.khuyenMai;
      getEle("tinhTrang").value = food.tinhTrang;
      getEle("moTa").value = food.moTa;
    })
    .catch((err) => {
      console.log(err);
    });
};

window.editFood = editFood;

/**
 * Update Food
 */
getEle("btnCapNhat").addEventListener("click", async () => {
  const food = getInfoFood();
  const result = await foodServices.getFoodById(food.id);

  if (!food.hinhMon) {
    food.hinhMon = result.data.hinhMon;
  }

  foodServices
    .updateFoodApi(food)
    .then(() => {
      getListFood();
      document.getElementsByClassName("close")[0].click();
    })
    .catch((error) => {
      console.log(error);
    });
});

/**
 * Filter Food
 */
getEle("selLoai").addEventListener("change", () => {
  const option = getEle("selLoai").value;
  foodServices
    .getListFoodApi()
    .then((result) => {
      const data = result.data;
      let listFilter = data;

      if (option !== "all") {
        listFilter = data.filter((food) => food.loaiMon === option);
      }

      renderHTML(listFilter);
    })
    .catch((error) => {
      console.log(error);
    });
});
