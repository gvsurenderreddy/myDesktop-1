#! /bin/bash
str=`uname --m`
#echo $str
if [ $str = "x86_64" ];
then 
	./run_64-bit/nw
else
	./run_32-bit/nw 
fi
