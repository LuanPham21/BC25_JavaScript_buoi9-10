function DanhSachNhanVien() {
  this.arr = [];
  this.timViTriNV = function (taiKhoan) {
    /**
     * 0. Tao bien index = -1
     * 1. Duyet mang arr
     * 2. Neu nhanVien.taiKhoan trung taiKhoan
     *  => index = i;break;
     * 3. Xoa phan tu trong mang : splice(index,1);
     */
    var index = -1;
    for (var i = 0; i < this.arr.length; i++) {
      var nhanVien = this.arr[i];
      if (nhanVien.taiKhoan === taiKhoan) {
        index = i;
        break;
      }
    }
    return index;
  };
  this.themNV = function (nhanVien) {
    this.arr.push(nhanVien);
  };
  this.xoaNV = function (taiKhoan) {
    var index = this.timViTriNV(taiKhoan);
    if (index !== -1) {
      //xoa sinh vien
      this.arr.splice(index, 1);
    }
  };
  this.layThongTin = function (taiKhoan) {
    var index = this.timViTriNV(taiKhoan);
    if (index !== -1) {
      var nhanVien = this.arr[index];
      return nhanVien;
    }
    return null;
  };
  this.capNhatNV = function (nhanVien) {
    var index = this.timViTriNV(nhanVien.taiKhoan);
    console.log(index);
    if (index !== -1) {
      //cap nhat sinh vien.
      this.arr[index] = nhanVien;
      console.log(this.arr[index]);
      console.log(nhanVien);
    }
  };
  this.timKiemNhanVien = function (keyword) {
    /**
     * 0. Tao mangTimKiem = [];
     * 1. Duyet mang arr
     *    nhanvien = arr[i];
     * 2.Neu nhanvien.loai trung voi keyword
     *    => them nhanvien vo mangtimkiem
     *    mangtimkiem.push(nhanvien)
     * 3. Tra ve mangtimkiem
     */
    var mangTimKiem = [];
    for (var i = 0; i < this.arr.length; i++) {
      var nhanVien = this.arr[i];
      if (nhanVien.loaiNV.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
        mangTimKiem.push(nhanVien);
      }
    }
    return mangTimKiem;
  };
}
