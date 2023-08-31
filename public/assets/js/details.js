app.controller("detailsController", function ($scope, $http, $routeParams,toast) {
  const model=document.getElementsByClassName('model');
  const model_container=document.getElementsByClassName('model-container');
  $http({
    method: 'GET',
    url: `https://api.mfapi.in/mf/${$routeParams.id}`,
  }).then((response) => {
    $scope.metaDetails = response.data.meta;
    $scope.price = response.data.data;
    $scope.x = $scope.price.map((e) => e["date"]);
    $scope.y = $scope.price.map((e) => e["nav"]);
    console.log(Math.min($scope.y));
    console.log(Math.max($scope.y));
    $scope.x = $scope.x.slice(0, 25);
    $scope.y = $scope.y.slice(0, 25);
    console.log($scope.x);
    console.log($scope.y);
    new Chart("myChart", {
      type: "line",
      data: {
        labels: $scope.x,
        datasets: [{
          fill: "start",
          backgroundColor: "rgba(0,0,255,1.0)",
          borderColor: "rgba(0,0,255,0.1)",
          data: $scope.y
        }]
      }
    });
  })
  $scope.setTarget=function(){
    $http({
      method:"PUT",
      url:"api/v1/user/target",
      data:{
        schemeCode:$routeParams.id,
        target:$scope.target,
      }

    }).then((res)=>{
      toast.success(res.data.message);
      $scope.closeModel()
    },(res)=>{
      toast.error(res.data.message);
      $scope.closeModel()
    })
  }

  $scope.openModel=function(){
    model_container[0].classList.add('show');
    model[0].classList.add('open-model');
  }
  $scope.closeModel=function(){
    model_container[0].classList.remove('show');
    model[0].classList.remove('open-model');   
  }
})
