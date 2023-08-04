@echo off
color a
cls


:start
	cls
	node Index.js
	timeout /t 60
goto start