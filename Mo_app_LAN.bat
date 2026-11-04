@echo off
rem Mo app Hieu bai cho ca may khac trong mang LAN (may khac nhap mat khau hien tren cua so nay)
cd /d "%~dp0"
chcp 65001 >nul
python cau_noi.py --lan
pause
