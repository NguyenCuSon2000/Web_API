var app = angular.module('AppProductDetail', []);
app.config(['$locationProvider', function ($locationProvider) { 
    $locationProvider.html5Mode(true);
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
 }]);

 app.controller("ProductDetailCtrl", function ($scope,$http, $location) { 
    $scope.sanpham;
    $scope.LoadData = function () { 
        var maSP = $location.search().maSP;
        $http({
            method: 'GET',
            url: current_url + '/api/SanPham/get-by-id/'+ maSP,
        }).then(function (response) { 
            $scope.sanpham = response.data;
         });
     };

      $scope.AddCart = function (item) { 
        item.quantity = 1;
        console.log(item.quantity);
        var data;
        if (localStorage.getItem('cart') == null) {
            data = [item];
        }else{
            data = JSON.parse(localStorage.getItem('cart')) || [];
            let ok = true;
            for (let x of data) {
                if (x.maSP == item.maSP) {
                    x.quantity += 1;
                    ok = false;
                    break;
                }
            }
            if (ok) {
                data.push(item);
            }
        }
        localStorage.setItem('cart', JSON.stringify(data));
        alert("Đã thêm giỏ hàng thành công");
     }
 });