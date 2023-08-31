app.controller('funds-list', function ($scope,$http, $location,toast) {
    const userInfo = document.querySelector("meta[name='user-info']").getAttribute("value");
    $scope.userInfo = userInfo=="{}"? null:JSON.parse(userInfo);
    $http({
        method: 'GET',
        url: 'https://api.mfapi.in/mf'
    }).then((response) => {
        $scope.schemes = response.data;
        console.log($scope.schemes);
    });
    $scope.details = (id) => {
        $location.path(`/details/${id}`)

    }
    $scope.login = function () {
        $location.path('/login')
    };
    $scope.logout=function(){
        $http({
            method:'DELETE',
            url:"/logout"
        }).then(function(resp){
            toast.success(resp.data.message);
        })
    }
    if($scope.userInfo){
        $http({
            methdod:'GET',
            url:"/api/v1/user/favourites"
        }).then(function(resp){
            console.log(resp);
            $scope.favourites=resp.data;
            console.log(resp.data);
            
        },function(resp){
            console.log(resp);
        })
        
    }
    $scope.updateFav = function(msg){
        $http({
            method:"PUT",
            url:"api/v1/user/favourites",
            data:{
                fav:$scope.favourites
            }
        }).then(function(resp){
            toast.success(msg);
        },function(resp){
            toast.error(resp.data.message);
        })

    }

    $scope.addToFav = function(schemeCode){
        $scope.favourites[schemeCode]={
            low:false,
            high:false
        }
        $scope.updateFav("Mutual Fund added to favourites");
    }
    $scope.removeFromFav = function(schemeCode){
        delete $scope.favourites[schemeCode];
        $scope.updateFav("Mutual Fund removed from favourites")
    }


});
