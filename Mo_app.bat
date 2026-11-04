@echo off
rem Mo app Hieu bai qua cau noi: ghi thang file db\ va dung Claude tren may cho cac nut AI
cd /d "%~dp0"
chcp 65001 >nul
python cau_noi.py
pause
