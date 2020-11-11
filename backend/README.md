<p align="center">
<img width="200" src="ntnui/media/logo/ntnui.svg" />
</p>

## Description

Internal backendsystem for members and volunteers in NTNUI.

## Installation


### Create .env file
For the system to run correctly it requires a set of environment variables:

```
# Django
NTNUI_SECRET_KEY= [INSERT_KEY]

# Mailgun
MAILGUN_PASSWORD=[INSERT_MAILGUNPASSWORD]
MAILGUN_API_KEY=[INSERT_API_TOKEN]

# Postgres
POSTGRES_DB=[DATABSE_NAME]
POSTGRES_USER=[DATABASE_USERNAME]
POSTGRES_PASSWORD=[DATABASE_PASSWORD]
POSTGRES_HOST=db
POSTGRES_PORT=5432
```
All the postgres variables are applied to both the database and the django application, so you are free to choose 
the parameters as you wish. 

All commands require GNU make!
The system can be installed in one of the following ways

### Option one, build the project and load test data
The command bellow will remove any old containers and install a clean version of the application, I will also load automatically load test data. 

```
make dev-clean-install
```

The test data also comes with a test user, with the following information

```
Email/Username: sprint@ntnui.no
Password: SprintIsTheBest
```

### Option two, build and start the project
The command bellow will update the current build, and start the project without loading test data.
```
make start
```

## Start the project
The easies way to get the project up and running is using the command
```
make start
```

To shutdown the program use
```
Ctrl + C
```

# Issues
If you are running windows you might get an error telling you that django_ntnui cant find a file, in that case:
1. Enter the config directory
2. For each file with the .sh extension, run dos2unix filname.sh

