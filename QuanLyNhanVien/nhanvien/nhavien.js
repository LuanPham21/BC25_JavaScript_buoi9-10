function NhanVien(
  _taiKhoan,
  _hoTen,
  _email,
  _matKhau,
  _ngayLam,
  _luongCoBan,
  _chucVu,
  _gioLam
) {
  this.taiKhoan = _taiKhoan;
  this.hoTen = _hoTen;
  this.email = _email;
  this.matKhau = _matKhau;
  this.ngayLam = _ngayLam;
  this.luongCoBan = _luongCoBan;
  this.chucVu = _chucVu;
  this.gioLam = _gioLam;
  this.tongLuong = 0;
  this.loaiNV = "";
  this.tinhLuong = function () {
    if (this.chucVu == "Sếp") {
      this.tongLuong = parseFloat(this.luongCoBan) * 3;
    } else if (this.chucVu == "Trưởng phòng") {
      this.tongLuong = parseFloat(this.luongCoBan) * 2;
    } else if (this.chucVu == "Nhân viên") {
      this.tongLuong = parseFloat(this.luongCoBan) * 1;
    }
    return this.tongLuong;
  };
  this.loaiNhanVien = function () {
    if (this.gioLam >= 192) {
      this.loaiNV = "Nhân viên xuất sắc";
    } else if (this.gioLam >= 176) {
      this.loaiNV = "Nhân viên giỏi";
    } else if (this.gioLam >= 160) {
      this.loaiNV = "Nhân viên khá";
    } else {
      this.loaiNV = "Nhân viên trung bình";
    }
    return this.loaiNV;
  };
}
