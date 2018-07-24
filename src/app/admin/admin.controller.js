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

    $scope.setPage = function (data) {
        switch (data) {
            case 0:
                $scope.url = 'app/admin/home.html';
                $scope.title = '홈';
                break;
            case 1:
                $scope.url = 'app/admin/members.html';
                $scope.title = '멤버';
                break;
            case 2:
                $scope.url = 'app/admin/projects.html';
                $scope.title = '프로젝트';
                break;
            case 3:
                $scope.url = 'app/admin/career.html';
                $scope.title = '실적';
                break;
            case 4:
                $scope.url = 'app/admin/history.html';
                $scope.title = '연혁';
                break;
            case 5:
                $scope.url = 'app/admin/attachment.html';
                $scope.title = '파일';
                break;
            case 6:
                $scope.url = 'app/admin/gallery.html';
                $scope.title = '갤러리';
                break;
            case 7:
                $scope.url = 'app/admin/gallery_icc.html';
                $scope.title = '정보통신대학';
                break;
            case 8:
                $scope.url = 'app/admin/gallery_sw.html';
                $scope.title = '소프트웨어대학';
                break;
                //by seojin
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
angular.module('scg').controller('fileController', fileController);
// angular.module('scg').controller('galleryController',galleryController);
angular.module('scg').controller('adminController', adminController);