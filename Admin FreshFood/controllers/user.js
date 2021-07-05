var user = JSON.parse(localStorage.getItem("user"));
var app = angular.module('AppUser', ['angularUtils.directives.dirPagination', 'ui.bootstrap']);
app.controller("UserCtrl", function ($scope, $http) {
    $scope.list;
    $scope.pageSize = '100';
    $scope.page = '1';
    $scope.user;
    $scope.submit = "Thêm mới";
    $scope.LoadUser = function () {
      
        $http({
            method: 'POST',
            headers: { "Authorization": 'Bearer ' + user.token },
            data: { page: $scope.page, pageSize: $scope.pageSize, hoten: $scope.hoten, taikhoan: $scope.taikhoan },
            url: current_url + '/api/User/search',
        }).then(function (response) {
            $scope.list = response.data.data;
        });
    };

    
    $scope.Register = function () {
        if ($scope.submit == "Thêm mới") {
            user = {};
            user.hoten = $scope.hoten;
            user.taikhoan = $scope.taikhoan;
            user.matkhau = $scope.matkhau;
            $http({
                method: 'POST',
                headers: { "Authorization": 'Bearer ' + user.token },
                data: user,
                url: current_url + '/api/User/create-user',
            }).then(function (response) {
                $scope.LoadUser();
                alert('Đăng ký thành công');
            });
        } else {
            $scope.user.hoten = $scope.hoten;
            $scope.user.taikhoan = $scope.taikhoan;
            $scope.user.matkhau = $scope.matkhau;
            $http({
                method: 'POST',
                  headers: { "Authorization": 'Bearer ' + user.token },
                data: $scope.user,
                url: current_url + '/api/User/update-user',
            }).then(function (response) {
                $scope.LoadUser();
                alert('Cập nhật người dùng thành công');
            });
        }

    };
    $scope.Sua = function (id) {
        $scope.submit = "Lưu lại";
        $http({
            method: 'GET',
            headers: { "Authorization": 'Bearer ' + user.token },
            url: current_url + '/api/User/get-by-id/' + id,
        }).then(function (response) {
            $scope.user = response.data;
            $scope.hoten = $scope.user.hoten;
            $scope.taikhoan = $scope.user.taikhoan;
            $scope.matkhau = $scope.user.matkhau;
        });
    };
    
     $scope.Xoa = function (id) {
        $http({
            method: 'DELETE',
              headers: { "Authorization": 'Bearer ' + user.token },
            url: current_url + '/api/User/delete-user/' + id,
        }).then(function (response) { 
            alert('Xóa thành công');
            $scope.LoadUser();
        });
    };
});