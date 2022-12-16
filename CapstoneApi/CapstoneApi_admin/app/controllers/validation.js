function Validation() {
    this.kiemTraRong = function (value, errorId, mess) {
      if (value === "") {
        getEle(errorId).innerHTML = mess;
        getEle(errorId).style.display = "block";
        return false;
      }
  
      getEle(errorId).innerHTML = "";
      getEle(errorId).style.display = "none";
      return true;
    };
  
    this.kiemTraChuoiKitu = function (value, errorId, mess) {
      var letter =
        "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
      if (value.match(letter)) {
        getEle(errorId).innerHTML = "";
        getEle(errorId).style.display = "none";
        return true;
      }
  
      getEle(errorId).innerHTML = mess;
      getEle(errorId).style.display = "block";
      return false;
    };
  
    this.kiemTraSelect = function (idSelect, errorId, mess) {
      if (getEle(idSelect).selectedIndex !== 0) {
        getEle(errorId).innerHTML = "";
        getEle(errorId).style.display = "none";
        return true;
      }
  
      getEle(errorId).innerHTML = mess;
      getEle(errorId).style.display = "block";
      return false;
    };

  }

  export default Validation