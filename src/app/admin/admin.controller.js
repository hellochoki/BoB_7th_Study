var setPage;

var fileController = function ($scope, $http, Upload) {
    $scope.images_icc = [];
    $scope.images_sw = [];

    $scope.methods = {};

    $scope.beforeOpen = function () {
        var injectHTML = "<a \r\nhref=\"javascript:downloadImg();\"\r\nstyle=\"position:fixed;\r\n  top:75%;\r\n z-index:9999;  left:50%;\r\n background:#2196F3;\r\n  transform:translate(-50%, 50%);\r\n    border: none;\r\n    color: white;\r\n    padding: 15px 32px;\r\n    text-align: center;\r\n    text-decoration: none;\r\n    display: inline-block;\r\n    font-size: 16px;\r\n    margin: 4px 2px;\r\n    cursor: pointer;\" target=\"_self\" download>\uC0AC\uC9C4 \uB2E4\uC6B4\uB85C\uB4DC<\/a>";
        document.getElementById("test").innerHTML += injectHTML;
    }

    $scope.afterClose = function () {
        document.getElementById("test").innerHTML = "";
    }
    
    function getData() {
        $http.get('admin/files/member').success(function (data) {
            $scope.mfiles = data;
        });

        $http.get('admin/files/project').success(function (data) {
            $scope.pfiles = data;
        });

        $http.get('admin/files/other').success(function (data) {
            $scope.ofiles = data;
        });

        if (window.location.href.includes("icc_grad"))
            $http.get('gallery/icc').success(function (data) {
                $scope.iccfiles = data;

                var iarr = data;
                for (i = 0; i < iarr.length; i++) {
                    iarr[i].id = i;
                    iarr[i].url = 'images/gallery_icc/' + iarr[i].name;
                    iarr[i].thumbUrl = 'images/gallery_icc/thumb_' + iarr[i].name;
                    $scope.images_icc.push(iarr[i]);
                }

            });
        else if (window.location.href.includes("sw_grad"))
            $http.get('gallery/sw').success(function (data) {
                $scope.swfiles = data;
                var iarr = data;
                for (i = 0; i < iarr.length; i++) {
                    iarr[i].id = i;
                    iarr[i].url = 'images/gallery_sw/' + iarr[i].name;
                    iarr[i].thumbUrl = 'images/gallery_sw/thumb_' + iarr[i].name;
                    console.log(iarr);
                    $scope.images_sw.push(iarr[i]);
                }
            });

    }
    $scope.memberdelete = function (d) {
        $http.delete('admin/files/member/' + d).success(function (data) {
            showMsg('pe-7s-trash', "멤버 사진 파일 " + d + " 가 삭제 되었습니다");
            getData();
        });
    }

    $scope.projectdelete = function (d) {
        $http.delete('admin/files/project/' + d).success(function (data) {
            showMsg('pe-7s-trash', "프로젝트 사진 파일 " + d + " 가 삭제 되었습니다");
            getData();
        });
    }

    $scope.otherdelete = function (d) {
        $http.delete('admin/files/other/' + d).success(function (data) {
            showMsg('pe-7s-trash', "기타 파일 " + d + " 가 삭제 되었습니다");
            getData();
        });
    }


    //정보통신대학 사진 파일 삭제
    $scope.iccdelete = function (d) {
        $http.delete('admin/gallery/icc/' + d).success(function (data) {
            showMsg('pe-7s-trash', "정보통신대학 갤러리 파일 " + d + " 가 삭제 되었습니다");
            getData();
        });
    }
    //소프트웨어대학 사진 파일 삭제
    $scope.swdelete = function (d) {
        $http.delete('admin/gallery/sw/' + d).success(function (data) {
            showMsg('pe-7s-trash', "소프트웨어대학 갤러리 파일 " + d + " 가 삭제 되었습니다");
            getData();
        });
    }

    $scope.uploadMember = function (f) {
        Upload.upload({
            url: 'admin/files/member',
            data: {
                file: f,
                fileFormDataName: 'uploadFile'
            }
        }).then(function (resp) {
            getData();
            showMsg('pe-7s-cloud-upload', '멤버 이미지 파일 ' + resp.config.data.file.name + ' 업로드 완료되었습니다.');
            //console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            //console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };

    $scope.uploadProject = function (f) {
        Upload.upload({
            url: 'admin/files/project',
            data: {
                file: f,
                fileFormDataName: 'uploadFile'
            }
        }).then(function (resp) {
            getData();
            showMsg('pe-7s-cloud-upload', '프로젝트 이미지 파일 ' + resp.config.data.file.name + ' 업로드 완료되었습니다.');
            //console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            //console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };

    $scope.uploadOther = function (f) {
        Upload.upload({
            url: 'admin/files/other',
            data: {
                file: f,
                fileFormDataName: 'uploadFile'
            }
        }).then(function (resp) {
            getData();
            showMsg('pe-7s-cloud-upload', '기타 파일 ' + resp.config.data.file.name + ' 업로드 완료되었습니다.');
            //console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            //console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };

    $scope.uploadICC = function (f) {
        console.log(f);
        if (f && f.length) {
            for (var i = 0; i < f.length; i++) {
                // Upload.upload({..., data: {file: files[i]}, ...})...;
                Upload.upload({
                    url: 'admin/gallery/icc',
                    data: {
                        file: f[i],
                        fileFormDataName: 'uploadFile'
                    }
                }).then(function (resp) {
                    getData();
                    showMsg('pe-7s-cloud-upload', '정보통신대학 졸업사진 파일 ' + resp.config.data.file.name + ' 업로드 완료되었습니다.');
                    //console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                }, function (resp) {
                    //console.log('Error status: ' + resp.status);
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            }
        }
    };

    $scope.uploadSW = function (f) {
        console.log(f);
        if (f && f.length) {
            for (var i = 0; i < f.length; i++) {
                // Upload.upload({..., data: {file: files[i]}, ...})...;
                Upload.upload({
                    url: 'admin/gallery/sw',
                    data: {
                        file: f[i],
                        fileFormDataName: 'uploadFile'
                    }
                }).then(function (resp) {
                    getData();
                    showMsg('pe-7s-cloud-upload', '소프트웨어대학 졸업사진 파일 ' + resp.config.data.file.name + ' 업로드 완료되었습니다.');
                    //console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                }, function (resp) {
                    //console.log('Error status: ' + resp.status);
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            }
        }
    };

    getData();
}

function downloadImg() {
    var orig = document.getElementsByClassName("galleria")[0].innerHTML;
    var file = orig.split("src=")[1].split("\"")[1];
    if(navigator.userAgent.includes("NAVER")) {
        window.open(file);
        return;
    }
    var link = document.createElement("a");
    link.download = file.split("/")[2];
    link.href = file;
    link.click();
}

var adminController = function ($scope, $http, $location) {

    $http.get("/session").success(function (data) {
        $scope.session = null;
        $scope.session = data;
    });

    $scope.session = function () {
        
        $http.get("/session").success(function (data) {
        $scope.session = null;
        $scope.session = data;
        });

    }

    $scope.getChart = function() {
        $http.get("/admin/getChart").then(function(res) {
            if (res.data.error) {
                console.log(res.data);
            } else {
                $scope.chart = res.data;
                console.log($scope.chart[0].id);
                console.log($scope.chart[1].id);
                console.log($scope.chart[2].id);
                console.log($scope.chart[3].id);
                console.log($scope.chart[4].id);
                console.log($scope.chart[5].id);
                console.log($scope.chart[6].id);
                $scope.labels = [$scope.chart[0].createdAt, $scope.chart[1].createdAt, $scope.chart[2].createdAt, $scope.chart[3].createdAt, $scope.chart[4].createdAt,$scope.chart[5].createdAt , $scope.chart[6].createdAt]
                $scope.data = [
                [$scope.chart[0].p_bitcoin, $scope.chart[1].p_bitcoin, $scope.chart[2].p_bitcoin, $scope.chart[3].p_bitcoin, $scope.chart[4].p_bitcoin,$scope.chart[5].p_bitcoin , $scope.chart[6].p_bitcoin],
                [$scope.chart[0].p_eth, $scope.chart[1].p_eth, $scope.chart[2].p_eth, $scope.chart[3].p_eth, $scope.chart[4].p_eth,$scope.chart[5].p_eth , $scope.chart[6].p_eth],
                [$scope.chart[0].p_ripple, $scope.chart[1].p_ripple, $scope.chart[2].p_ripple, $scope.chart[3].p_ripple, $scope.chart[4].p_ripple,$scope.chart[5].p_ripple , $scope.chart[6].p_ripple],
                [$scope.chart[0].p_eth, $scope.chart[1].p_eth, $scope.chart[2].p_eth, $scope.chart[3].p_eth, $scope.chart[4].p_eth,$scope.chart[5].p_eth , $scope.chart[6].p_eth]

                ]

            }
        });
    } 


  // $scope.labels = ["January", "February", "March", "April", "May", "June", "july"];
   // $scope.labels = [$scope.chart[0].createdAt, $scope.chart[1].createdAt, $scope.chart[2].createdAt, $scope.chart[3].createdAt, $scope.chart[4].createdAt,$scope.chart[5].createdAt , $scope.chart[6].createdAt];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
  $scope.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        },
        {
          id: 'y-axis-2',
          type: 'linear',
          display: true,
          position: 'right'
        }
      ]
    }
  };

    $scope.setPage = function (data) {
        switch (data) {
            case 0:
                $scope.url = 'app/admin/home.html';
                $scope.title = '홈';
                break;
            case 1:
                $scope.url = 'app/admin/regi.html';
                $scope.title = '등록하기';
                break;
            case 2:
                $scope.url = 'app/admin/mypage.html';
                $scope.title = '내 계좌';
                break;
            
        }
        $scope.page = data;
        console.log(data);
    }

    setPage = function (data) {
        $scope.setPage(data);
        $scope.$apply();
    }

    $http.get("admin/status").success(function (data) {
        $scope.status = data;
    });




    $scope.setPage(0);
}
angular.module('dtb').controller('fileController', fileController);
// angular.module('dtb').controller('galleryController',galleryController);
angular.module('dtb').controller('adminController', adminController);