var app = angular.module('AppHome', ['ui.bootstrap', 'angularUtils.directives.dirPagination']);
var user = JSON.parse(localStorage.getItem("user"));
app.controller("HomeCtrl", function ($scope, $http) {
    $scope.current_url = current_url; 
    $scope.listMenu;
    $scope.listNew;
    $scope.LoadMenu= function () {
        $http({
            method: 'GET',
            url: $scope.current_url + '/api/LoaiSanPham/get-all',
        }).then(function (response) { 
            $scope.listMenu = response.data;  
        });
    };

    $scope.LoadProductNew = function () {
        $http({
            method: 'GET',
            url: $scope.current_url + '/api/SanPham/get-product-new',
        }).then(function (response) { 
            $scope.listNew = response.data;  
        });
    };
});

app.controller("ProductCtrl", function ($scope,$rootScope, $http) {

     //Sắp xếp dữ liệu
    $rootScope.sortcolumn = "tenSP";
    $rootScope.reverse = true;
    $rootScope.dr = "Tăng dần";

    $rootScope.Chon = function (d) {
        if ($rootScope.dr == "Tăng dần") {
            $rootScope.reverse = false;
            $rootScope.dr = "Giảm dần";
        }
        else {
            $rootScope.reverse = true;
            $rootScope.dr = "Tăng dần";
        }
    };

    $scope.current_url = current_url;
    $scope.listProduct;
    $scope.pageSize = '100';
    $scope.page = '1';
    $scope.LoadData = function () {
        $http({
            method: 'POST',
             headers: { "Authorization": 'Bearer ' + user.token },
            data: { page: $scope.page, pageSize: $scope.pageSize,  tenSP: $scope.tenSP},
            url: current_url + '/api/SanPham/search',
        }).then(function (response) {
            $scope.listProduct = response.data.data;
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

     var data = JSON.parse(localStorage.getItem('cart'));
     $scope.Check_out = function (order) {
		bill = {};
		bill.ho_ten = order.ho_ten;
		bill.dia_chi = order.dia_chi;
		if (order.ask == null) {
			bill.ask = "Không";
		}
		else {
			bill.ask = order.ask;
		}
		bill.orderdate = new Date().toISOString();
		bill.sum_price = $rootScope.sum_price;
		if (confirm("Xác nhận đặt hàng ?") == true) {
			var data_checkout = current_url + "/api/Order/create-hoadon";
			var data_order_detail = current_url + "/api/OrderDetail/add_order_detail/" + bill.orderdate;
			$http({
				method: 'POST',
				data: bill,
				url: data_checkout,
			}).then(function (d) {
				for (var i = 0; i < data.length; i++) {
					order_detail = {};
					order_detail.maSP = data[i].maSP;
					order_detail.so_luong = data[i].so_luong;
					$http({
						method: 'Post',
						data: order_detail,
						url: data_order_detail,
					});
				}
				alert("Đặt hàng thành công !");
			});
        }
    }
});





