注：登录时关联我们内部接口，可以注掉，直接读数据库。
本项目是由java开发的，数据库是mysql库，
数据监测时，只能判断时间，SELECT 62 - ((SYSDATE - (SELECT MAX(T.gxsj)
        FROM BIZ_VIO_DRIVINGLICENSE T 
        WHERE T.gxsj < SYSDATE))*24),
(SELECT MAX(T.gxsj)
FROM BIZ_VIO_DRIVINGLICENSE T 
WHERE T.gxsj < SYSDATE)
FROM DUAL

接口默认10分钟调一次，错误发送邮件，连续三次发送短信。邮件和短信发送方面需要自己设置。时间设置在CronJobService.java文件中。
数据默认每天7:35运行；
这个项目是我工作一年为了方便日常工作写的，经验不够，所有有点low,希望各位大牛见谅


