function showMsg(iconname, data) {
  $.notify({
    icon: iconname,
    message: data
  }, {
    type: 'info',
    timer: 2000
  });
}

function showWelcomeMsg() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open('GET', '/admin/welcome', false);
  xmlHttp.send(null);
  console.log(xmlHttp.responseText);
  if (xmlHttp.responseText == 'welcome') {
    showMsg('pe-7s-smile', '로그인에 성공하였습니다!');
  }
}
