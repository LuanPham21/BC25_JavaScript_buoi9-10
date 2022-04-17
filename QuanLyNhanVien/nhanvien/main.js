//khoi tao doi tuong dsnv
var dsnv = new DanhSachNhanVien();
var validation = new Validation();
var update = true;
getLocalStorage();
const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});
function getEle(id) {
  return document.getElementById(id);
}

function layThongTinNV() {
  //DOM lan luot toi cac the input lay value
  var _taiKhoan = getEle("tknv").value;
  var _hoTen = getEle("name").value;
  var _email = getEle("email").value;
  var _matKhau = getEle("password").value;
  var _ngayLam = getEle("datepicker").value;
  var _luongCoBan = getEle("luongCB").value;
  var _chucVu = getEle("chucvu").value;
  var _gioLam = getEle("gioLam").value;
  //Tao co check valid(flag)
  var isValid = true;

  if (!update) {
    // tai khoan
    isValid &=
      validation.KiemTraRong(
        _taiKhoan,
        "tbTKNV",
        "(*)Vui long nhap Tai khoan"
      ) &&
      validation.KiemTraDoDaiKiTu(
        _taiKhoan,
        "tbTKNV",
        "(*)Vui long nhap 4 toi 6 ki tu",
        4,
        6
      ) &&
      validation.KiemTraSo(_taiKhoan, "tbTKNV", "(*)Vui long nhap so") &&
      validation.KiemTraTrungTaiKhoan(
        _taiKhoan,
        "tbTKNV",
        "(*)Tai Khoan da ton tai",
        dsnv.arr
      );
  } else {
    // tai khoan
    isValid &=
      validation.KiemTraRong(
        _taiKhoan,
        "tbTKNV",
        "(*)Vui long nhap Tai khoan"
      ) &&
      validation.KiemTraDoDaiKiTu(
        _taiKhoan,
        "tbTKNV",
        "(*)Vui long nhap 4 toi 6 ki tu",
        4,
        6
      ) &&
      validation.KiemTraSo(_taiKhoan, "tbTKNV", "(*)Vui long nhap so");
  }

  // ho ten
  isValid &=
    validation.KiemTraChuaKiTu(_hoTen, "tbTen", "(*)Vui long nhap ki tu") &&
    validation.KiemTraRong(_hoTen, "tbTen", "(*)Vui long nhap Ho ten");

  // email
  isValid &=
    validation.KiemTraRong(_email, "tbEmail", "(*)Vui long nhap Email") &&
    validation.KiemTraEmail(
      _email,
      "tbEmail",
      "(*)Vui long nhap dung dinh dang email"
    );

  // mat khau
  isValid &=
    validation.KiemTraRong(
      _matKhau,
      "tbMatKhau",
      "(*)Vui long nhap Mat khau"
    ) &&
    validation.KiemTraDoDaiKiTu(
      _matKhau,
      "tbMatKhau",
      "(*)Vui long nhap 6 toi 10 ki tu",
      6,
      10
    );
  validation.KiemTraPassword(
    _matKhau,
    "tbMatKhau",
    "(*)Vui lòng nhập đúng định dạng  (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)"
  );

  // ngay lam
  isValid &= validation.KiemTraRong(
    _ngayLam,
    "tbNgay",
    "(*)Vui long nhap Ngay lam"
  );

  // luong co ban
  isValid &=
    validation.KiemTraRong(
      _luongCoBan,
      "tbLuongCB",
      "(*)Vui long nhap Luong co ban"
    ) &&
    validation.KiemTraSoLuong(
      _luongCoBan,
      "tbLuongCB",
      "(*)Vui long nhap tu 1.000.000 den 20.000.000",
      1000000,
      20000000
    );

  // chuc vu
  isValid &= validation.KiemTraRong(
    _chucVu,
    "tbChucVu",
    "(*)Vui long nhap Chuc vu"
  );

  // gio lam
  isValid &=
    validation.KiemTraRong(_gioLam, "tbGiolam", "(*)Vui long nhap Gio lam") &&
    validation.KiemTraSoLuong(
      _gioLam,
      "tbGiolam",
      "(*)Vui long nhap tu 80 den 200 gio",
      80,
      200
    );

  if (isValid) {
    var nhanVien = new NhanVien(
      _taiKhoan,
      _hoTen,
      _email,
      _matKhau,
      _ngayLam,
      _luongCoBan,
      _chucVu,
      _gioLam
    );
    nhanVien.tinhLuong();
    nhanVien.loaiNhanVien();
    return nhanVien;
  }
  return nhanVien;
}

// Local storage
function setLocalStorage() {
  //chuyen dssv.arr tu JSON => string
  var dataString = JSON.stringify(dsnv.arr);
  localStorage.setItem("DSNV", dataString);
}

function getLocalStorage() {
  var dataString = localStorage.getItem("DSNV");
  if (dataString) {
    // chuyen tu String => JSON
    var dataJson = JSON.parse(dataString);
    // Nap data vao dssv.arr
    dsnv.arr = dataJson;
    //render tbody
    taoBang(dsnv.arr);
  }
}

function taoBang(arr) {
  var content = "";
  for (var i = 0; i < arr.length; i++) {
    var nv = arr[i];
    //
    content += `
         <td>${nv.taiKhoan}</td>
         <td>${nv.hoTen}</td>
         <td>${nv.email}</td>
         <td>${nv.ngayLam}</td>
         <td>${nv.chucVu}</td>
         <td>${nv.tongLuong}</td>
         <td>${nv.loaiNV}</td>
         <td>
            <button class = "btn btn-info" data-toggle="modal" data-target="#myModal" onclick="suaNV('${nv.taiKhoan}')">Edit</button>
            <button class = "btn btn-danger"  onclick="xoaNV('${nv.taiKhoan}')">Delete</button>
         </td>
        </tr>
        `;
    //var tieLuongNV = formatter.format(nv.tongLuong);
  }
  getEle("tableDanhSach").innerHTML = content;
}

/**
 * themm sv
 */

getEle("btnThemNV").addEventListener("click", function () {
  update = false;
  console.log(update);
  var nhanVien = layThongTinNV();
  console.log("create" + layThongTinNV());
  if (nhanVien) {
    dsnv.themNV(nhanVien);
  }

  taoBang(dsnv.arr);
  setLocalStorage();
});

//xoa nv
function xoaNV(taiKhoan) {
  dsnv.xoaNV(taiKhoan);
  taoBang(dsnv.arr);
  setLocalStorage();
}

//laythongtinNhanvien
function suaNV(taiKhoan) {
  var nhanVien = dsnv.layThongTin(taiKhoan);

  //Dom toi cac te input show thong tin ra ngoai
  getEle("tknv").value = nhanVien.taiKhoan;
  getEle("tknv").disabled = true;
  getEle("name").value = nhanVien.hoTen;
  getEle("email").value = nhanVien.email;
  getEle("password").value = nhanVien.matKhau;
  getEle("datepicker").value = nhanVien.ngayLam;
  getEle("luongCB").value = nhanVien.luongCoBan;
  getEle("chucvu").value = nhanVien.chucVu;
  getEle("gioLam").value = nhanVien.gioLam;
}

//Cap nhat nv
getEle("btnCapNhat").addEventListener("click", function () {
  update = true;
  console.log(update);
  var nhanVien = layThongTinNV();
  dsnv.capNhatNV(nhanVien);
  taoBang(dsnv.arr);
  setLocalStorage();
});

//Tim kiem nv
getEle("searchName").addEventListener("keyup", function () {
  var keyword = getEle("searchName").value;
  console.log(keyword);
  var mangTimKiem = dsnv.timKiemNhanVien(keyword);
  taoBang(mangTimKiem);
});
