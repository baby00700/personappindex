@echo off 

echo start app...

call pm2 start app.js --watch

echo start pm2 DashBoard...

call pm2 monit

pause
