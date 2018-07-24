var loginController = function($scope, $http) {

    $scope.check = function() {

        post("/admin/loginCheck", {
            "id": $scope.id,
            "pass": $scope.password
        });

    }

}


var careerController = function($scope, $http) {

    $scope.add = function() {
        var data = {
            "year": $scope.year,
            "month": $scope.month,
            "title": $scope.title
        }
        $http.post("/career", data).then(function(res) {
            if (res.data.error) {
                console.log(res.data.error);
                showMsg('pe-7s-close', '에러가 발생하였습니다');
            } else {
                getData();
                showMsg('pe-7s-magic-wand', $scope.title + " 실적이 등록되었습니다");
            }
        });
    }

    $scope.delete = function(a) {

        $http.delete("/career/" + a).then(function(res) {
            if (res.data.error) {
                showMsg('pe-7s-trash', '존재하지 않는 실적입니다.');
            } else {
                getData();
                showMsg('pe-7s-trash', "실적이 삭제되었습니다");
            }

        });

    }

    $scope.modify = function(tableData) {
        $scope.editingData[tableData.id] = true;
    };


    $scope.update = function(tableData) {
        $scope.editingData[tableData.id] = false;
        var data = {
            "id": tableData.id,
            "year": tableData.year,
            "month": tableData.month,
            "title": tableData.title
        }
        $http.put("career", data).then(function(res) {
            showMsg('pe-7s-check', '수정이 완료되었습니다.');
        });
    };

    function getData() {
        $http.get("career").success(function(data) {
            $scope.careers = makeCareer(data);
            $scope.editingData = {};
            for (var i = 0, length = $scope.careers.length; i < length; i++) {
                $scope.editingData[$scope.careers[i].id] = false;
            }
        });
    }

    getData();
}

function makeCareer(data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].year < 10)
            data[i].year = "0" + data[i].year;
        if (i > 4)
            data[i].style = 'display:none';
        else
            data[i].style = '';
        data[i].monthName = getMonthString(data[i].month);
    }
    return data;
}

function getMonthString(month) {
    switch (month) {
        case 1:
            return 'January';
        case 2:
            return 'February';
        case 3:
            return 'March';
        case 4:
            return 'April';
        case 5:
            return 'May';
        case 6:
            return 'June';
        case 7:
            return 'July';
        case 8:
            return 'August';
        case 9:
            return 'September';
        case 10:
            return 'October';
        case 11:
            return 'November';
        case 12:
            return 'December';
    }
    return "";
}

var historyController = function($scope, $http) {

    $scope.add = function() {
        var data = {
            "year": $scope.year,
            "month": $scope.month,
            "content": $scope.content
        }
        $http.post("/history", data).then(function(res) {
            if (res.data.error) {
                console.log(res.data.error);
                showMsg('pe-7s-attention', '에러가 발생하였습니다');
            } else {
                getData();
                showMsg('pe-7s-magic-wand', '연혁이 등록되었습니다.');
            }
        });
    }

    $scope.delete = function(a) {


        $http.delete("/history/" + a).then(function(res) {
            if (res.data.error) {
                showMsg('pe-7s-attention', "존재하지 않는 연혁입니다");
            } else {
                getData();
                showMsg('pe-7s-trash', "연혁이 삭제되었습니다");
            }

        });

    }

    $scope.modify = function(tableData) {
        $scope.editingData[tableData.id] = true;
    };

    $scope.update = function(tableData) {
        $scope.editingData[tableData.id] = false;
        var data = {
            "id": tableData.id,
            "year": tableData.year,
            "month": tableData.month,
            "content": tableData.content
        }
        $http.put("history", data).then(function(res) {
            showMsg('pe-7s-check', '수정이 완료되었습니다.');
        });
    };

    function getData() {
        $http.get("history").success(function(data) {
                $scope.data = data;
                $scope.section = makeHistorySection(data);
                $scope.editingData = {};
                for (var i = 0, length = $scope.data.length; i < length; i++) {
                    $scope.editingData[$scope.data[i].id] = false;
                }
            })
            .error(function() {
                $scope.data = "error in fetching data";
            });
    }
    getData();
}

function makeHistorySection(data) {
    var section = new Array();
    var yrhistory = new Array();
    //ordered by year, month
    var minYear = data[0].year;
    var maxYear = data[data.length - 1].year;
    for (var i = minYear; i <= maxYear; i++) {
        yrhistory[i] = new Array();
        yrhistory[i].year = i;
    }
    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        yrhistory[data[i].year].push(obj);
    }
    for (var i = 0; i < (maxYear - minYear + 1) / 5; i++) {
        section[i] = new Array();
        for (var j = 0; j < Math.min(5, maxYear - minYear - i * 5 + 1); j++) {
            var yrh = yrhistory[i * 5 + j + minYear];
            var month = 0;
            for (var k = 0; k < yrh.length; k++) {
                var obj = yrh[k];
                if (obj.month < 10)
                    obj.month = '0' + obj.month;
                if (month != obj.month)
                    month = obj.month;
                else
                    obj.style = 'blankspan';
            }
            section[i].push(yrh);
        }
        section[i].startYear = minYear + i * 5;
        section[i].endYear = Math.min(maxYear, section[i].startYear + 4);
        section[i].sectionNum = i + 1;
    }
    return section;
}

var introController = function($scope, $http) {
    $http.get("about/intro").success(function(data) {
            $scope.data = data;
        })
    .error(function() {
            $scope.data = "error in fetching data";
    });
}

var membersController = function($scope, $http) {
    $scope.add = function() {
        var data = {
            "name": $scope.name,
            "major": $scope.major,
            "number": $scope.number,
            "current": $scope.current,
            "introduction": $scope.introduction,
            "photo": $scope.photo,
            "createdAt": new Date().toISOString().slice(0, 19).replace('T', ' '),
            "updatedAt": new Date().toISOString().slice(0, 19).replace('T', ' ')
        }
        $http.post("/members", data).then(function(res) {
            if (res.data.error) {
                console.log(res.data.error);
                showMsg('pe-7s-attention', "에러가 발생하였습니다");
            } else {
                getData();
                showMsg('pe-7s-magic-wand', $scope.number + "기 " + $scope.name + " 회원이 등록되었습니다");
            }
        });
    }


    $scope.delete = function(a) {


        $http.delete("/members/" + a).then(function(res) {
            if (res.data.error) {
                showMsg('pe-7s-attention', "존재하지 않는 회원입니다");
            } else {
                getData();
                showMsg('pe-7s-trash', "회원이 삭제되었습니다");
            }

        });

    }

    $scope.modify = function(tableData) {
        $scope.editingData[tableData.id] = true;
    };


    $scope.update = function(tableData) {
        $scope.editingData[tableData.id] = false;
        var data = {
            "id": tableData.id,
            "name": tableData.name,
            "major": tableData.major,
            "number": tableData.number,
            "current": tableData.current,
            "introduction": tableData.introduction,
            "photo": tableData.photo
        }
        $http.put("members", data).then(function(res) {
            showMsg('pe-7s-check', '수정이 완료되었습니다.');
        });
    };

    $http.get("members/current").success(function(data) {
            $scope.pageArray = makeMemberPages(data);

        })
        .error(function() {
            $scope.data = "error in fetching data";
        });

    function getData() {
        $http.get("members").success(function(data) {
                $scope.allMembers = data;
                $scope.membersByNumber = makeMemberByNumber(data);
                $scope.editingData = {};
                for (var i = 0, length = $scope.allMembers.length; i < length; i++) {
                    $scope.editingData[$scope.allMembers[i].id] = false;
                }
                

            })
            .error(function() {
                $scope.data = "error in fetching data";
            });
    }

    angular.element(document).ready(function () {
        $scope.$watch(
        function () {
            return angular.element('#team').height();
        },
        function (newValue, oldValue) {
            if (newValue != oldValue) {
                angular.element('#team').jarallax({
                    peed: 0.5,
                    imgWidth: 1366,
                    imgHeight: 768
                });
            }
        }
        );
    });

    getData();

}

function makeMemberByNumber(data) {
    var numberArray = new Array();
    var str_array = new Array();
    var max = 0 ;
    for(var i = 0 ; i < data.length; i++) {
        if(numberArray[data[i].number] == null) {
            numberArray[data[i].number] = new Array();
            numberArray[data[i].number].number = data[i].number;
            numberArray[data[i].number].style = '';
            if (data[i].number > max) max = data[i].number;
        }
        numberArray[data[i].number].push(data[i].name);
        numberArray[data[i].number].str = 
numberArray[data[i].number].join(', ');
    }
    return numberArray;
}

function makeMemberPages(data) {
    var pageArray = new Array();
    for (var i = 0; i < data.length / 8; i++) {
        var page = new Array();
        page.pageNum = i;
        if (i == 0)
            page.style = 'active';
        for (var j = 0; j < Math.min(8, data.length - i * 8); j++) {
            if (data[i * 8 + j].photo == undefined){
                data[i * 8 + j].photo = 'none.jpg';
            }
            page.push(data[i * 8 + j]);
        }
        if(data.length - i* 8 <= 4){
            page.style_line = 'visibility:hidden';
        }else{
            page.style_line = 'display:none';
        }
        pageArray.push(page);
    }
    return pageArray;
}

var projectController = function($scope, $http) {

    $scope.add = function() {
        var data = {
            "name": $scope.name,
            "member": $scope.member,
            "introduction": $scope.introduction
        }
        $http.post("/projects", data).then(function(res) {
            if (res.data.error) {
                console.log(res.data.error);
                showMsg('pe-7s-attention', "에러가 발생하였습니다");
            } else {
                getData();
                showMsg('pe-7s-magic-wand', $scope.name + " 프로젝트가 등록되었습니다");
            }
        });
    }

    $scope.delete = function(a) {


        $http.delete("/projects/" + a).then(function(res) {
            if (res.data.error) {
                getData();
                showMsg('pe-7s-attention', "존재하지 않는 프로젝트입니다");
            } else {
                getData();
                showMsg('pe-7s-trash', "프로젝트가 삭제되었습니다");
            }

        });

    }

    $scope.modify = function(tableData) {
        $scope.editingData[tableData.id] = true;
    };

    $scope.update = function(tableData) {
        $scope.editingData[tableData.id] = false;
        var data = {
            "id": tableData.id,
            "name": tableData.name,
            "member": tableData.member,
            "introduction": tableData.introduction,
            "img": tableData.img
        }
        $http.put("projects", data).then(function(res) {
            showMsg('pe-7s-check', '수정이 완료되었습니다.');
        });
    };

    function getData() {
        $http.get("projects").success(function(data) {
                $scope.pageArray = makeProjectPages(data);
                $scope.projects = data;
                $scope.editingData = {};
                for (var i = 0, length = $scope.projects.length; i < length; i++) {
                    $scope.editingData[$scope.projects[i].id] = false;
                }
            })
            .error(function() {
                $scope.data = "error in fetching data";
            });
    }

    getData();
}

var applyController = function($scope, $http) {
    $http.get("apply/status").success(function(data) {
        $scope.applyData = data;
        console.log(data);
    })
    .error(function() {
        $scope.data = "error in fetching data";
    });
}

function makeProjectPages(data) {
    var pageArray = new Array();
    for (var i = 0; i < data.length / 4; i++) {
        var page = new Array();
        page.pageNum = i;
        if (i == 0)
            page.style = 'active';
        for (var j = 0; j < Math.min(4, data.length - i * 4); j++) { 
            page.push(data[i * 4 + j]);
        }
        pageArray.push(page);
    }
    return pageArray;
}

function post(path, params, method) {
    method = method || "post";
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);


    for (var key in params) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", params[key]);

        form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
}

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}




//------Bootstrap Part-------

//alert
var AlertDemoCtrl = function ($scope) {
  $scope.alerts = [
    { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
    { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
  ];

  $scope.addAlert = function() {
    $scope.alerts.push({msg: 'Another alert!'});
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
}

angular.module('dtb').controller('introController', introController);
angular.module('dtb').controller('careerController', careerController);
angular.module('dtb').controller('membersController', membersController);
angular.module('dtb').controller('projectController', projectController);
angular.module('dtb').controller('historyController', historyController);
angular.module('dtb').controller('loginController', loginController);
angular.module('dtb').controller('applyController', applyController);



angular.module('ui.bootstrap').controller('AlertDemoCtrl',AlertDemoCtrl);
//angular.module('ui.bootstrap').controller('CarouselDemoCtrl',CarouselDemoCtrl);
