app.controller("signupController", function ($scope, $location,$http) {
    $scope.email = '';
    $scope.pwd = '';
    $scope.cpwd= '';
    $scope.signup = () => {

        let x = $scope.email.trim() || '';
        let y = $scope.pwd.trim() || '';
        let z = $scope.cpwd.trim() || '';
        let regx = /^([a-zA-Z0-9.]+)@([a-zA-Z]+)\.([a-z]{2,8})(.[a-z]{2,8})?$/;

        if (x == "") {
            alert("Email must be filled out");
            return false;
        }
        if (!regx.test(x)) {
            alert("Enter a valid Email ID");
            return flase
        }
        if (y == "") {
            alert("Password must be filled out");
            return false;
        }
        if (z == "") {
            alert("Confirm Password must be filled out");
            return false;
        }

        if (y != z) {
            alert("password and confirm passwword must be same")
        }
        $http({
            method:"POST",
            url:"api/v1/user/signup",
            data:{
                name:$scope.name,
                email:$scope.email,
                pwd:$scope.pwd,
            }
        }).then((resp)=>{
            $location.path("/");
            console.log(resp.data.message);
        })
    
    };


});
