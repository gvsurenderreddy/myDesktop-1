#! /bin/bash
str=`uname --m`
#echo $str
if [ $str = "x86_64" ];
then 
	./nw-64/nw
else
	./nw-32/nw 
fi
