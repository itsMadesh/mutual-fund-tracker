app.controller("loginController", function ($scope, $http,$location,toast) {
    const userInfo = document.querySelector("meta[name='user-info']").getAttribute("value");
    $scope.userInfo = userInfo=="{}"? null:JSON.parse(userInfo);
    if($scope.userInfo!=null){
        $location.path("/")
    }
    $scope.email = '';
    $scope.pwd = '';
    $scope.login = () => {

        let x = $scope.email.trim() || '';
        let y = $scope.pwd.trim() || '';
        let regx = /^([a-zA-Z0-9.]+)@([a-zA-Z]+)\.([a-z]{2,8})(.[a-z]{2,8})?$/;

        if (x == "") {
            toast.invalid("Email must be filled out");
            return false;
        }
        if (!regx.test(x)){
            toast.invalid("Enter a valid Email ID");
            return false;
        }
        if (y == "") {
            toast.invalid("Password must be filled out");
            return false;
        }
        $http({
            method:"POST",
            url:"api/v1/user/login",
            data:{
                email:$scope.email,
                pwd:$scope.pwd,
            }
        }).then((res)=>{
            toast.success(res.data.message);
            $location.path("/");
        })
    
    };


});
