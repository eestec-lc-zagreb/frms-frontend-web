#!/bin/bash

docker run -d -p 9190:80 --name frms-frontend-web eestec-lc-zagreb/frms-frontend-web /usr/sbin/apache2ctl -D FOREGROUND
