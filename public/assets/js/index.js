const app = angular.module('mutual-fund', ["ngRoute"]);
let toastBox = document.getElementById('toastBox');
let success='<i class="fa-regular fa-circle-check"></i>';
let error='<i class="fa-solid fa-circle-xmark"></i>';
let invalid='<i class="fa-solid fa-circle-exclamation"></i>'
app.service("toast",function(){
    this.insert=()=>{
        const toast=document.createElement('div');
        toast.classList.add('toast');
        toastBox.appendChild(toast);
        setTimeout(()=>{
            toast.remove();
        },6000);
        return toast

    }
    this.success =(msg)=>{
        const toast=this.insert()
        toast.innerHTML=success+msg;

    }
    this.error =(msg)=>{
        const toast=this.insert();
        toast.innerHTML=error+msg;

        toast.classList.add('error')     
    }
    this.invalid=(msg)=>{
        const toast=this.insert();
        toast.innerHTML=invalid+msg;

        toast.classList.add('invalid')     

    }
});
app.config(function ($routeProvider,$locationProvider) {

    $routeProvider.when('/', {
        templateUrl: '../../funds_list.html',
        controller: 'funds-list'
    }).when('/login', {
        templateUrl: '../../login.html',
        controller: 'loginController'
    }).when('/signup', {
        templateUrl: '../../signup.html',
        controller: 'signupController'

    }).when("/favourites",{
        templateUrl: '../../favourites.html',
        controller: 'favouritesController'

    }).when('/details/:id', {
        templateUrl: '../../details.html',
        controller: 'detailsController'

    }).when("/about",{
        templateUrl:"../../about.html"
    });

    // .otherwise({
    //     redirectTo: "/"
    // });
})