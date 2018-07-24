@echo off
cls

echo.
echo jquery.digits.js =^> ./min/jquery.digits.js
call uglifyjs.cmd -c --screw-ie8 --comments --lint jquery.digits.js -o ./min/jquery.digits.js
echo DONE.!

echo.
echo jquery.hasattr.js =^> ./min/jquery.hasattr.js
call uglifyjs.cmd -c --screw-ie8 --comments --lint jquery.hasattr.js -o ./min/jquery.hasattr.js
echo DONE.!

echo.
echo jquery.prettyprint.js =^> ./min/jquery.prettyprint.js
call uglifyjs.cmd -c --screw-ie8 --comments --lint jquery.prettyprint.js -o ./min/jquery.prettyprint.js
echo DONE.!

echo.
echo serializeObject.js =^> ./min/serializeObject.js
call uglifyjs.cmd -c --screw-ie8 --comments --lint serializeObject.js -o ./min/serializeObject.js
echo DONE.!

echo.
echo jquery.serializeObject.js =^> ./min/jquery.serializeObject.js
call uglifyjs.cmd -c --screw-ie8 --comments --lint jquery.serializeObject.js -o ./min/jquery.serializeObject.js
echo DONE.!

echo.
echo jquery.parseQueryString.js =^> ./min/jquery.parseQueryString.js
call uglifyjs.cmd -c --screw-ie8 --comments --lint jquery.parseQueryString.js -o ./min/jquery.parseQueryString.js
echo DONE.!

echo IS LAST.
echo.
