@echo off
cd %cd%
cd ..\
md output
fis3 server start --root %cd%\output --port 1234 --type node&fis3 server clean&cd %cd%\resource&fis3 release -wL&cmd