//var app = angular.module('myapp', []); 

//=========================================================================================// 
app.controller('CarCtrl', ['$scope', 'CrudService',
    function ($scope, CrudService) {

        //base Url 
        var baseUrl = '/api/Car/';
        //initial values
        $scope.btnText = "Save";
        $scope.btnRentText = "Rent This Car";
        //$scope.car_id = 0;

//=========================================================================================//
        //save button for add new car to stock or to save details after update
        //debugger
        $scope.SaveUpdate = function () {      
                var car = {
                    model: $scope.model,
                    color: $scope.color,
                    doors_num: $scope.doors_num,
                    year: $scope.year,
                    car_id: $scope.car_id
                }

                if ($scope.btnText == "Save") {
                    var apiRoute = baseUrl + 'SaveCar/';
                    var saveCar = CrudService.post(apiRoute, car);
                    saveCar.then(function (response) {
                        if (response.data != "") {
                            alert("Data Save Successfully");
                            $scope.GetCars();
                            $scope.Clear(); //clean textboxes

                        } else {
                            alert("Some error");
                        }
                    }, function (error) {
                        console.log("Error: " + error);
                    });
                }
                else {
                    var apiRoute = baseUrl + 'UpdateCar/';
                    var UpdateCar = CrudService.put(apiRoute, car);
                    UpdateCar.then(function (response) {
                        if (response.data != "") {
                            alert("Data Update Successfully");
                            $scope.GetCars();
                            $scope.Clear();

                        } else {
                            alert("Some error");
                        }
                    }, function (error) {
                        console.log("Error: " + error);
                    });
                }
            }    
//=========================================================================================// 
        $scope.GetCars = function () {
            var apiRoute = baseUrl + 'GetCars/';
            var car = CrudService.getAll(apiRoute);
            car.then(function (response) {
               // debugger
                $scope.cars = response.data;
            },
            function (error) {
                console.log("Error: " + error);
            });
        }
        $scope.GetCars();
//=========================================================================================// 
        $scope.GetCarByID = function (dataModel) {
            //debugger
            var apiRoute = baseUrl + 'GetCarByID';
            var car = CrudService.getbyID(apiRoute, dataModel.car_id);
            car.then(function (response) {
                $scope.car_id = response.data.car_id;
                $scope.model = response.data.model;
                $scope.color = response.data.color;
                $scope.doors_num = response.data.doors_num;
                $scope.year = response.data.year;
                $scope.btnText = "Update";
            },
            function (error) {
                console.log("Error: " + error);
            });
        }
//=========================================================================================//     
        $scope.DeleteCar = function (dataModel) {
            debugger
                 
            var apiRoute = baseUrl + 'DeleteCar/'+ dataModel.car_id;// + dataModel.car_id;
            var del = CrudService.delete(apiRoute);
            del.then(function (response) {
                if (response.data != "") {
                    alert("Data Delete Successfully");
                    $scope.GetCars(); //return list of cars from db
                    $scope.Clear();
                } else {
                    alert("Some error");
                }

            }, function (error) {
                console.log("Error: " + error);
            });
        }
//=========================================================================================//   
            $scope.RentCar = function () {
              //debugger
                var rentuser = {
                    customer_id: $scope.customer_id,
                    customer_name: $scope.customer_name,
                    phone_num: $scope.phone_num,
                    pick_up_date: $scope.pick_up_date,
                    drop_off_date: $scope.drop_off_date,
                    car_id: $scope.car_id
                }
               
                var apiRo = baseUrl + 'AvailableDate/'; // rent car from car controller
                var rentDatee = CrudService.post(apiRo, rentuser);
                rentDatee.then(function (response) {
                    if (response.data == 2) {
                        alert("You can only enter future dates, please try again")
                    }
                    else if (response.data == 3) {
                        alert("You enterd invalid dates, please try again")
                    }
                    else if (response.data == 1) //this car dates are available
                    {                      
                        var apiRoute = baseUrl + 'RentCar/'; // rent car from car controller
                        var rentCarr = CrudService.post(apiRoute, rentuser);
                        rentCarr.then(function (response) {
                            if (response.data != "") {
                                alert("Car Order Save Successfully");
                                $scope.GetCars();
                                $scope.ClearModal(); //clean textboxes
                                $scope.Clear();

                            } else {
                                alert("Some error");
                            }
                        }, function (error) {
                            console.log("Error: " + error);
                        });                      

                    } else
                    {                        
                        alert("This car is not available in the dates you choosed");                       
                    }
                    $scope.ClearModal(); //clean textboxes
                    $scope.Clear();

                }, function (error) {
                    console.log("Error: " + error);
                });
               
                    //    $scope.btnRentText = "This car is already rented until ";
                    //    $scope.btnRentText.disabled = true;
                    //}
                //}                                            
            }
//=========================================================================================//       
            $scope.RentGetCarByID = function (dataModel) {
                //debugger
                var apiRoute = baseUrl + 'GetCarByID';
                var car = CrudService.getbyID(apiRoute, dataModel.car_id);
                car.then(function (response) {
                    $scope.car_id = response.data.car_id;
                    $scope.model = response.data.model;
                    $scope.color = response.data.color;
                    $scope.doors_num = response.data.doors_num;
                    $scope.year = response.data.year;
                    //dataModel.btnRentText = "dfgfg";
                    // $scope.btnRentText = "This car is already rented until ";                   
                },
       
                function (error) {
                    console.log("Error: " + error);
                });
              
                //dataModel.$scope.btnRentText = "gggg";
                //dataModel.disabled = true;               
            }
        //=========================================================================================//
            $scope.UserGetUByID = function (customer_id) {
                //debugger
                var apiRou = baseUrl + 'GetUserByID';
                var user = CrudService.getUbyID(apiRou, customer_id);
                user.then(function (response) {
                    $scope.customer_id = response.data.customer_id;
                    $scope.customer_name = response.data.customer_name;
                },

                function (error) {
                    console.log("Error: " + error);
                });
            }
        //=========================================================================================//
            $scope.SignUp = function () {

                var usr = {
                    customer_id: $scope.customer_id,
                    customer_name: $scope.customer_name,
                    password: $scope.password
                }

                var apiRoute = baseUrl + 'SaveUser/';
                var saveusr = CrudService.post(apiRoute, usr);
                saveusr.then(function (response) {
                    if (response.data != "") {
                        alert("User Registered Successfully\n\n Hello, "+ $scope.customer_name);                     
                       // $scope.ClearUser(); //clean textboxes

                    } //else {
                    //    alert("Some error");
                    //}
                }, function (error) {
                    console.log("Error: " + error);
                });
            }
        //=========================================================================================//                  
            $scope.SignIn = function () {
                //debugger
                var usr = {
                    customer_id: $scope.customer_id,
                    customer_name: $scope.customer_name,
                    password: $scope.password
                }

                var apiRoute = baseUrl + 'LoginUser';
                var loginusr = CrudService.post(apiRoute, usr);
                loginusr.then(function (response) {
                    if (response.data != "")
                    { //response.data returns 1, user exist in system
                        alert("User Login Successfully\n\n Hello, " + $scope.customer_name);                        
                        //$scope.ClearUser(); //clean textboxes
                    } else {
                        alert("New user, you need to register first");
                        $scope.ClearUser(); //clean textboxes
                    }
                }, function (error) {
                    console.log("Error: " + error);
                });
            }
//=========================================================================================//            
        //    $scope.DisableRentByDate = function (dataModel) {              
        //        dataModel.btnRentText.disabled = true;

        //}   
            //$scope.disabled = function (dataModel,date, mode) {
            //    return (mode == 'day' && (date.getDay() == dataModel.pick_up_date && date.getDay() == dataModel.drop_off_date));
            //};      
        //=========================================================================================// 
            $scope.FileLog = function () {
                var apiRoute = baseUrl + 'FileLogg';
                var log = CrudService.post(apiRoute);
                log.then(function (response) {
                    if (response.data != "") { 
                        alert("Log File Path: C:\Intel\filewebapi.txt");
                    } else {
                        alert("Some error");                        
                    }
                }, function (error) {
                    console.log("Error: " + error);
                });

            }
//=========================================================================================// 
        //clean textboxes
        $scope.Clear = function () {
            $scope.car_id = 0;
            $scope.model = "";
            $scope.color = "";
            $scope.doors_num = 0;
            $scope.year = 0;
            $scope.btnText = "Save";
        }  
//=========================================================================================// 
        //clean textboxes
        $scope.ClearModal = function () {
        $scope.car_id = "";
        $scope.customer_id = "";
        $scope.customer_name = "";
        $scope.phone_num = "";
        $scope.pick_up_date = "";
        $scope.drop_off_date = "";
        }
        //=========================================================================================//
        //clean textboxes
        $scope.ClearUser = function () {
            $scope.customer_id = "";
            $scope.customer_name = "";
            $scope.password = "";           
        }
    }]);
//=========================================================================================// 