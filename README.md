# deploy-mysql
---

This useful little package takes the pain out of updating keeping your database up to date,
whether in the development environent or production.

[![NPM](https://nodei.co/npm/deploy-mysql.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/deploy-mysql/)

## Installation

    $ npm install deploy-mysql -g


## Usage

    $ deploy-mysql user:pass@host:port/database -d <path/to/database/scripts>

    $ deploy-mysql user:pass@host:port/database -s <path/to/database/schema/scripts> -r <path/to/database/routine/scripts>

    $ DEPLOY_MYSQL=user:pass@host:port/database
    $ deploy-mysql DEPLOY_MYSQL -d <path/to/database/scripts>  //where DEPLOY_MYSQL is an environment variable 


For more information, type this:

    $ deploy-mysql --help


## Schema scripts

 - Script files can contain multiple statements
 - If a script file fails to run correct the script and restart your application ( you may have left your database in an unstable state)
 - Once a script has successfully run it will not run again, even if the file is changed.

## Routines

 - Name your routine script files the same as the routines themselves (this is not a requirement, just advice really)
 - To change a routine simply modify the file. Next time you run this script it will know the routine has changed, drop and recreate it.
 - Currently stored procedures and functions will both work.
 - Do not use the ```DELIMETER``` syntax in your routines, it is not only unnecessary but will cause the scripts to fail.

Example syntax for function script

```mysql
CREATE FUNCTION SqrRt (x1 decimal, y1 decimal)
RETURNS decimal
DETERMINISTIC
BEGIN
  DECLARE dist decimal;
  SET dist = SQRT(x1 - y1);
  RETURN dist;
END
```

## Create database

 If the database name in the database options does not exist, deploy-mysql will attempt to create it. If it fails for any reason, lack of permissions or incorrect connection details, it will halt and no futher scripts will run.

## deploy-mysql management tables

deploy-mysql creates 3 tables the first time you run it in an app. These table will live on the database named in the database option. They are used to track the versions of the schema scripts, functions and stored procedures. It is best to avoid modifying or manually adding any data in these tables.

These tables are:
 - DBDeploy_lock
 - DBDeploy_script_history
 - DBDeploy_routine_history

## Locking

When running, deploy-mysql locks itself to prevent other instances of deploy-mysql from running at the same time. This lock will be released when the script is no longer running.

## License

The MIT License (MIT)

Copyright (c) 2017 Gabriel McAdams

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
