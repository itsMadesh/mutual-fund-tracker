app.controller('favouritesController', function ($scope,$http, $location,toast) {
    const userInfo = document.querySelector("meta[name='user-info']").getAttribute("value");
    $scope.userInfo = userInfo=="{}"? null:JSON.parse(userInfo);
    console.log(userInfo);
    console.log($scope.userInfo);
    $http({
        method: 'GET',
        url: 'api/v1/user/favourites'
    }).then((response) => {
        $scope.favourites = response.data;
        console.log($scope.favourites);
    })

    $http({
        method: 'GET',
        url: 'https://api.mfapi.in/mf'
    }).then((response) => {
        $scope.schemes = response.data;
        console.log($scope.schemes);
    })
    $scope.showFav = function(){
        return function(item){
          if($scope.favourites[item.schemeCode]){
            return item;
          } 
    }}
  


    $scope.details = (id) => {
        $location.path(`/details/${id}`)

    }
    $scope.logout=function(){
        $http({
            method:'DELETE',
            url:"/logout"
        }).then(function(resp){
            alert(resp.data.message);
        })
    }

    $scope.removeFromFav = function(schemeCode){
        delete $scope.favourites[schemeCode];
        $http({
            method:"PUT",
            url:"api/v1/user/favourites",
            data:{
                fav:$scope.favourites
            }
        }).then(function(resp){
            console.log(resp);
            toast.success("Mutual Fund removed from favourites");
        },function(resp){
            console.log(resp);
            toast.error(resp.data.message);
        })
    }


});
