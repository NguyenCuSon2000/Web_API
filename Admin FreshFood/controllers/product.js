var user = JSON.parse(localStorage.getItem("user"));
var app = angular.module('AppProduct', ['angularUtils.directives.dirPagination', 'ui.bootstrap']);
app.controller("ProductCtrl", function ($scope, $http) {
    $scope.current_url = current_url; 
    $scope.list;
    $scope.pageSize = '100';
    $scope.page = '1';
    $scope.product;
    $scope.submit = "Thêm mới";

    $scope.LoadProduct = function () {
        $http({
            method: 'POST',
            headers: { "Authorization": 'Bearer ' + user.token },
            data: { page: $scope.page, pageSize: $scope.pageSize, tensp: $scope.tensp},
            url: current_url + '/api/SanPham/search',
        }).then(function (response) {
            $scope.list = response.data.data;
        });
    };
    // $scope.LoadProduct= function () {
    //     $http({
    //         method: 'GET',
    //          headers: { "Authorization": 'Bearer ' + user.token },
    //         url: $scope.current_url + '/api/SanPham/get-all',
    //     }).then(function (response) { 
    //         $scope.list = response.data;  
    //     });
    // };

    $scope.listCate;
    $scope.LoadCate= function () {
        $http({
            method: 'GET',
            url: $scope.current_url + '/api/LoaiSanPham/get-all',
        }).then(function (response) { 
            $scope.listCate = response.data;  
        });
    };

    $scope.Save = function () {
        var file = document.getElementById('file').files[0];
        if(file){
            const formData = new FormData();
            formData.append('file', file);
            $http({
                method: 'POST',
                headers: {
                    "Authorization": 'Bearer ' + user.token,
                    'Content-Type': undefined
                },
                data: formData,
                url: current_url + '/api/SanPham/upload',
            }).then(function (res) {
                if ($scope.submit == "Thêm mới") {
                    product = {};
                    product.tenSP = $scope.tenSP;
                    product.maLoaiSP = $scope.maLoaiSP;
                    product.donVi = $scope.donVi;
                    product.moTa = $scope.moTa;
                    product.hinhAnh =  res.data.filePath;
                    product.donGia = $scope.donGia;
                    $http({
                        method: 'POST',
                         headers: { "Authorization": 'Bearer ' + user.token },
                        data: product,
                        url: current_url + '/api/SanPham/create-product',
                    }).then(function (response) {
                        $scope.LoadProduct();
                        alert('Thêm sản phẩm thành công');
                    });
                } else {
                    $scope.product.tenSP = $scope.tenSP;
                    $scope.product.maLoaiSP = $scope.maLoaiSP;
                    $scope.product.donVi = $scope.donVi;
                    $scope.product.moTa = $scope.moTa;
                    $scope.product.hinhAnh =  res.data.filePath;
                    $scope.product.donGia = $scope.donGia;
                    $http({
                        method: 'POST',
                         headers: { "Authorization": 'Bearer ' + user.token },
                        data: $scope.product,
                        url: current_url + '/api/SanPham/update-product',
                    }).then(function (response) {
                        $scope.LoadProduct();
                        alert('Cập nhật sản phẩm thành công');
                    });
                }
            });
        } 
        else{
            if ($scope.submit == "Thêm mới") {
                product = {};
                product.tenSP = $scope.tenSP;
                product.maLoaiSP = $scope.maLoaiSP;
                product.donVi = $scope.donVi;
                product.moTa = $scope.moTa;
                product.donGia = $scope.donGia;
                $http({
                    method: 'POST',
                     headers: { "Authorization": 'Bearer ' + user.token },
                    data: product,
                    url: current_url + '/api/SanPham/create-product',
                }).then(function (response) {
                    $scope.LoadProduct();
                    alert('Thêm sản phẩm thành công');
                });
            } else {
                $scope.product.tenSP = $scope.tenSP;
                $scope.product.maLoaiSP = $scope.maLoaiSP;
                $scope.product.donVi = $scope.donVi;
                $scope.product.moTa = $scope.moTa;
                $scope.product.donGia = $scope.donGia;
                $http({
                    method: 'POST',
                    headers: { "Authorization": 'Bearer ' + user.token },
                    data: $scope.product,
                    url: current_url + '/api/SanPham/update-product',
                }).then(function (response) {
                    $scope.LoadProduct();
                    alert('Cập nhật sản phẩm thành công');
                });
            }
        }

    };
    $scope.Sua = function (id) {
        $scope.submit = "Lưu lại";
        $http({
            method: 'GET',
            headers: { "Authorization": 'Bearer ' + user.token },
            url: current_url + '/api/SanPham/get-by-id/' + id,
        }).then(function (response) {
            $scope.product = response.data;
            $scope.tenSP = $scope.product.tenSP;
            $scope.maLoaiSP = $scope.product.maLoaiSP;
            $scope.donVi = $scope.product.donVi;
            $scope.moTa = $scope.product.moTa;
            $scope.hinhAnh = $scope.product.hinhAnh;
            $scope.donGia = $scope.product.donGia;
        });
    };
    
    $scope.Xoa = function (id) {
        $http({
            method: 'DELETE', 
             headers: { "Authorization": 'Bearer ' + user.token },
            url: current_url + '/api/SanPham/delete-product/' + id,
        }).then(function (response) { 
            $scope.LoadProduct();
            alert('Xóa thành công');
        });
    };


    // Sản phẩm bán chạy
    $scope.listSPBC;
    $scope.LoadSPBC = function () {
        $http({
            method: 'GET',
            headers: { "Authorization": 'Bearer ' + user.token },
            url: $scope.current_url + '/api/ThongKe/get-sanpham-banchay',
        }).then(function (response) { 
            $scope.listSPBC = response.data;  
        });
    };

   
});

app.controller("ThongKeController", function ($scope, $http) { 
    $scope.current_url = current_url; 
    $scope.slsp;
    $scope.sllsp;
    $scope.slhd;
    $scope.slnd;
    $scope.LoadSLSP = function () {
        $http({
            method: 'GET',
            headers: { "Authorization": 'Bearer ' + user.token },
            url: $scope.current_url + '/api/ThongKe/get-soluong-sanpham',
        }).then(function (response) { 
            $scope.slsp = response.data;  
        });
    };
     $scope.LoadSLLSP = function () {
        $http({
            method: 'GET',
            headers: { "Authorization": 'Bearer ' + user.token },
            url: $scope.current_url + '/api/ThongKe/get-soluong-loaisanpham',
        }).then(function (response) { 
            $scope.sllsp = response.data;  
        });
    };
     $scope.LoadSLHD = function () {
        $http({
            method: 'GET',
            headers: { "Authorization": 'Bearer ' + user.token },
            url: $scope.current_url + '/api/ThongKe/get-soluong-hoadon',
        }).then(function (response) { 
            $scope.slhd = response.data;  
        });
    };
     $scope.LoadSLND = function () {
        $http({
            method: 'GET',
            headers: { "Authorization": 'Bearer ' + user.token },
            url: $scope.current_url + '/api/ThongKe/get-soluong-nguoidung',
        }).then(function (response) { 
            $scope.slnd = response.data;  
        });
    };

 });

