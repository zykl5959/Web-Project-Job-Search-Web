var app = angular.module('jobSearch', ['ngRoute', 'ngResource', 'ui.bootstrap']);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
        .when('/browse', {
            templateUrl: 'partials/browseAll.html',
            controller: 'browseAllCtrl'
        })
        .when('/signup', {
            templateUrl: 'partials/register.html',
            controller: 'RegisterCtrl'
        })
        .when('/logout', {
            templateUrl: 'partials/logout.html',
            controller: 'LogoutCtrl'
        })
        .when('/star', {
            templateUrl: 'partials/browseAll.html',
            controller: 'StarCtrl'
        })
        .when('/add-job', {
            templateUrl: 'partials/job-form.html',
            controller: 'AddVideoCtrl'
        })
        .when('/job/:id', {
            templateUrl: 'partials/job-form.html',
            controller: 'EditVideoCtrl'
        })
        .when('/job/delete/:id', {
            templateUrl: 'partials/job-delete.html',
            controller: 'DeleteVideoCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
    // $locationProvider.html5Mode({enable:true,rquireBase:false})

});

app.controller('HomeCtrl',
    function($scope, $resource, $location) {

        document.getElementById("nouser").style.display = "block";
        document.getElementById("out").style.display = "none";
        document.getElementById("wish").style.display = "none";
        document.getElementById("admin").style.display = "none";
        $("input").val("");
        $scope.save = function() {
            var User = $resource('api/users/signin');
            User.save($scope.user, function(resp, headers) {
                console.log($scope.user);
                localStorage.setItem("user_id", resp._id);
                $location.path('/browse');
            }, function(errs) {
                $scope.errs = errs.data;
                for (var i in errs.data) {
                    alert(errs.data[i].msg);
                }
            });
        };
    });
app.controller('userCtrl',
    function($scope, $resource, $location) {
        if (localStorage.getItem("user_id") == "5cc208ddcf9fdde9686b8636") { //admin user id
            document.getElementById("admin").style.display = "block";
            document.getElementById("nouser").style.display = "none";
            document.getElementById("out").style.display = "block";
            document.getElementById("wish").style.display = "none";
            $(".user").css("display", "none");
            $(".icon").css("display", "inline");

        } else if (localStorage.getItem("user_id")) { //user log in
            document.getElementById("admin").style.display = "none";
            document.getElementById("nouser").style.display = "none";
            document.getElementById("out").style.display = "block";
            document.getElementById("wish").style.display = "block";
            $(".user").css("display", "block");
            $(".icon").css("display", "none");
        } else {
            document.getElementById("nouser").style.display = "block";
            document.getElementById("out").style.display = "none";
            document.getElementById("wish").style.display = "none";
            $(".user").css("display", "none");
            $(".icon").css("display", "none");
        }


    });

app.controller('browseAllCtrl',
    function($scope, $resource, $location, $route) {

        var keyword = $location.search().keyword; //form 
        var type = $location.search().genre; //form 

        //filter: input search by jobtitle
        var jobtitle = $location.search().jobtitle;
        var jlocation = $location.search().jlocation;
        //alert(jobtitle);
        var Jobs = $resource('/api/jobs', { jobtitle: jobtitle, jlocation: jlocation });

        //var Jobs = $resource('/api/jobs', {search: keyword, genre: type});//filter consuming api sending obj : use query

        Jobs.query(function(jobs) {

            $scope.jobs = jobs;

        });

        var userid = localStorage.getItem("user_id");
        var User = $resource('/api/users/:id');
        User.get({ id: userid }, function(user) {
            var jobid = user.jobid;
            $scope.jobid = jobid;
        })

        $scope.pageSize = 5;
        $scope.currentPage = 1;

        var User = $resource('api/users/add/:id/:jobid', { id: '@_id' ,jobid :'@jobid'}, {
            update: { method: 'PUT' }
        });

        $scope.addfavor=function(id){
            var userid = localStorage.getItem("user_id");
            var jobid = id;
            var strJobId = "#" + jobid + " .user";
            var alljobid=[];
            var User = $resource('/api/users/:id');
            User.get({ id: userid }, function(user){
                alljobid=user.jobid;
                console.log(alljobid);
                console.log(alljobid.indexOf(id));
                if(alljobid.indexOf(id)!=-1){//exist in the jobid array
                        $(strJobId).addClass("far");
                        $(strJobId).removeClass("fas");
                        var User = $resource('/api/users/delete/:id/:jobid', { id: '@_id' ,jobid :'@jobid'}, {
                            update: { method: 'PUT' }
                        });
                        var userid = localStorage.getItem("user_id");
                        var jobid = id;
                        User.update({_id:userid,jobid:jobid},function(){

                        },function(errs){

                        }) 
                }else{
                    $(strJobId).addClass("fas");
                    $(strJobId).removeClass("far");
                    var userid = localStorage.getItem("user_id");
                    var jobid = id;
                    var User = $resource('api/users/add/:id/:jobid', { id: '@_id' ,jobid :'@jobid'}, {
                        update: { method: 'PUT' }
                        });
                    User.update({_id:userid,jobid:jobid},function(){


                    },function(errs){
                        // alert(errs.data.data.msg);
                    })
                }
            })
        }
    });


app.controller('searchCtrl',
    function($scope, $resource, $location, $route) {

        $scope.search = function(event) {

            var iclick = $(event.target).attr('id');
            //alert(iclick);
            console.log(iclick);

            if ($(event.target).attr('class') == 'btn btn-outline-primary') {
                $("#" + iclick).removeClass('btn-outline-primary');
                $("#" + iclick).addClass('btn-primary');
            } else {
                $("#" + iclick).removeClass('btn-primary');
                $("#" + iclick).addClass('btn-outline-primary');
            }

            //check job type
            var isFulltime = $('#fulltime').attr('class');
            var isParttime = $('#parttime').attr('class');
            var isInternship = $('#internship').attr('class');

            if (isFulltime == 'btn btn-primary') {
                var fulltime = 'fulltime';
            }
            if (isParttime == 'btn btn-primary') {
                var parttime = 'parttime';
            }
            if (isInternship == 'btn btn-primary') {
                var internship = 'internship';
            }

            //var jobtitle = $location.search().jobtitle;
            //var jlocation = $location.search().jlocation;
            var jobtitle = $scope.jobtitle;
            var jlocation = $scope.jlocation;

            var flag = 'fpi';

            if (fulltime == 'fulltime') {
                var flag = 'fulltime';
            }

            if (parttime == 'parttime') {
                var flag = 'parttime';
            }

            if (internship == 'internship') {
                var flag = 'internship';
            }

            if (fulltime == 'fulltime' && parttime == 'parttime') {
                var flag = 'fp';
            }

            if (parttime == 'parttime' && internship == 'internship') {
                var flag = 'pi';

            }

            if (fulltime == 'fulltime' && internship == 'internship') {
                var flag = 'fi';
            }

            if (fulltime == 'fulltime' && parttime == 'parttime' && internship == 'internship') {
                var flag = 'fpi';
            }

            var Jobs = $resource('/api/jobs', { jobtitle: jobtitle, jlocation: jlocation, flag: flag });

            //var Jobs = $resource('/api/jobs', {search: keyword, genre: type});//filter consuming api sending obj : use query
            Jobs.query(function(jobs) {
                $scope.jobs = jobs;
            });
        }
    });



app.controller('RegisterCtrl',
    function($scope, $resource, $location) {
        $scope.save = function() {
            var User = $resource('api/users/signup');
            User.save($scope.user, function(resp, headers) {
                localStorage.setItem("user_id", resp._id);
                console.log(resp);
                console.log(resp.LastName);
                $location.path('/browse');
            }, function(errs) {
                $scope.errs = errs.data;
                console.log(errs.data);
                console.log(errs);
            });
        };
    });

app.controller('StarCtrl', 
    function($scope, $resource, $location){

        $scope.pageSize=5;
        $scope.currentPage=1;


        var userid=localStorage.getItem("user_id");
        var User = $resource('/api/users/:id');
        
        User.get({ id: userid }, function(user){
            var jobid=user.jobid;
            console.log(jobid);
            var jobs=[];
            var Jobs = $resource('/api/jobs/:id');
            for (var onejobid in jobid){
                Jobs.get({id:jobid[onejobid]},function(job){
                    if(job.deleted==null||job.deleted==false)
                    jobs.push(job);
                })
            }
            $scope.jobs = jobs;

        })
        
        // var User = $resource('/api/users/delete/:id/:jobid', { id: '@_id' ,jobid :'@jobid'}, {
        //     update: { method: 'PUT' }
        // });
        $scope.addfavor=function(id){
            var userid = localStorage.getItem("user_id");
            var jobid = id;
            var strJobId = "#" + jobid + " .user";
            var alljobid=[];
            var User = $resource('/api/users/:id');
            User.get({ id: userid }, function(user){
                alljobid=user.jobid;
                console.log(alljobid);
                console.log(alljobid.indexOf(id));
                if(alljobid.indexOf(id)!=-1){//exist in the jobid array
                        $(strJobId).addClass("far");
                        $(strJobId).removeClass("fas");
                        var User = $resource('/api/users/delete/:id/:jobid', { id: '@_id' ,jobid :'@jobid'}, {
                            update: { method: 'PUT' }
                        });
                        var userid = localStorage.getItem("user_id");
                        var jobid = id;
                        User.update({_id:userid,jobid:jobid},function(){

                        },function(errs){

                        }) 
                }else{
                    $(strJobId).addClass("fas");
                    $(strJobId).removeClass("far");
                    var userid = localStorage.getItem("user_id");
                    var jobid = id;
                    var User = $resource('api/users/add/:id/:jobid', { id: '@_id' ,jobid :'@jobid'}, {
                        update: { method: 'PUT' }
                        });
                    User.update({_id:userid,jobid:jobid},function(){


                    },function(errs){
                        // alert(errs.data.data.msg);
                    })
                }
            })
        }
       
    });



//Personal Info
app.controller('PersonInfo',
    function($scope, $resource, $location) {

        var userid = localStorage.getItem("user_id");
        console.log(userid);

        if (userid) {
            var User = $resource('/api/users/:id'); //filter consuming api sending obj : use query
            //var Jobs = $resource('/api/jobs');
            User.get({ id: userid }, function(per) {
                $scope.per = per;
                console.log(per);
            })
        } else {
            $location.path('/');
        }
    });

app.controller('PersonInfoEditCtrl',
    function($scope, $resource, $location) {
        var User = $resource('/api/users/:id', { id: '@_id' }, {
            update: { method: 'PUT' }
        });
        var userid = localStorage.getItem("user_id");
        console.log(userid);
        User.get({ id: userid }, function(per) {
            $scope.per = per;
            console.log(per);
        })
        $scope.save = function() {
            User.update($scope.per, function() {
                $location.path('/');
            });
        }

    });

app.controller('LogoutCtrl',
    function($scope, $resource, $location) {

        var userid = localStorage.getItem("user_id");
        if (userid) {
            var User = $resource('/api/users/:id');
            User.get({ id: userid }, function(per) {
                $scope.per = per;
            })
            $scope.logout = function() {

                localStorage.clear();
                $location.path('/');
            }
        } else {
            $location.path('/');
        }
    });


app.controller('AddVideoCtrl',
    function($scope, $resource, $location) {
        $scope.save = function() {
            var Jobs = $resource('/api/jobs');
            Jobs.save($scope.job, function() {
                $location.path('/browse');
            });
        };
    });

app.controller('EditVideoCtrl',
    function($scope, $resource, $location, $routeParams) {
        var Jobs = $resource('/api/jobs/:id', { id: '@_id' }, {
            update: { method: 'PUT' }
        });

        Jobs.get({ id: $routeParams.id }, function(job) {
            $scope.job = job;
        });

        $scope.save = function() {
            Jobs.update($scope.job, function() {
                $location.path('/browse');
            });
        }
    });

// soft delete by changing the value deleted in mongoDB
app.controller('DeleteVideoCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams) {
        var Jobs = $resource('/api/jobs/:id');

        Jobs.get({ id: $routeParams.id }, function(job) {
            $scope.job = job;
        })

        $scope.delete = function() {
            Jobs.delete({ id: $routeParams.id }, function(job) {
                $location.path('/browse');
            });
        }
    }
]);

app.filter('startFrom', function() {
    return function(input, start) {
        if (!input || !input.length) { return; }
        return input.slice(start);
    }
});