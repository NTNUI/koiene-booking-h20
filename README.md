<p align="center">
<img width="200" src="backend/ntnui/media/logo/ntnui.svg" />
</p>

### CI
![Front end CI](https://github.com/NTNUI/koiene-booking/workflows/Front%20end%20CI/badge.svg)
![Back end CI](https://github.com/NTNUI/koiene-booking/workflows/Back%20end%20CI/badge.svg)

## Description
Internal system for members and volunteers in NTNUI. 

The `backend` folder contains the Django app, while the `frontend-koie-booking` folder contains the vue app.

## Back-end File Structure
The entire back-end is located in the `backend` folder. In this folder you will find configuration files and the source code for the backend. The `ntnui` folder serves as the base folder for the django-project. 

Inside the django project are several apps, that each contain key functionality.
The `accounts`, `groups` and `payments` folders are inherited from the bachelor project group, while the job done for kundestyrt can be found in the `koie_booking`, and `koie_report` folders.

Integration tests are found in the `tests` folder of the ``ntnui` directory.

Each app follows a structured template like this:
```
┣ 📂app
┃ ┣ 📁admin (for django admin page configuration)
┃ ┣ 📁factories (for object initializing in testing)
┃ ┣ 📁migrations 
┃ ┣ 📁models (database-models)
┃ ┣ 📁serializers (serializing to and from db)
┃ ┣ 📁tests (unit tests)
┃ ┣ 📁utils (various useful stuff)
┃ ┣ 📁views (api endpoint handlers)
┃ ┣ 📜apps.py
┃ ┣ 📜urls.py (url routing)

```
### Quick tour of the file structure
The files found in the `views` folder defines the api-endpoint-handlers.
`urls.py` is the file where the routing from the url to the handlers are defined.
Inside `models` are the files that defines the database models. These are serialized to-and-from postgreSQL db entries and native python dictionaries. The logic for doing this and specifying which fields are wanted can be found in the `serializers` folder.

## Detailed File Structure
This is a detailed overview of the complete file structure of the back-end. Folders containing work by the kundestyre-group are expanded.
```
📦backend
 ┣ 📂ntnui
 ┃ ┣ 📂apps
 ┃ ┃ ┣ 📁accounts
 ┃ ┃ ┣ 📁groups
 ┃ ┃ ┣ 📂koie_booking
 ┃ ┃ ┃ ┣ 📁admin
 ┃ ┃ ┃ ┣ 📁factories
 ┃ ┃ ┃ ┣ 📁migrations
 ┃ ┃ ┃ ┣ 📁models
 ┃ ┃ ┃ ┣ 📂reminder
 ┃ ┃ ┃ ┃ ┣ 📂management
 ┃ ┃ ┃ ┃ ┃ ┗ 📁commands
 ┃ ┃ ┃ ┣ 📁serializers
 ┃ ┃ ┃ ┣ 📁templates
 ┃ ┃ ┃ ┣ 📁tests
 ┃ ┃ ┃ ┣ 📁utils
 ┃ ┃ ┃ ┣ 📁views
 ┃ ┃ ┃ ┣ 📜apps.py
 ┃ ┃ ┃ ┣ 📜constants.py
 ┃ ┃ ┃ ┣ 📜README.md
 ┃ ┃ ┃ ┣ 📜urls.py
 ┃ ┃ ┣ 📂koie_report
 ┃ ┃ ┃ ┣ 📁factories
 ┃ ┃ ┃ ┣ 📁migrations
 ┃ ┃ ┃ ┣ 📁tests
 ┃ ┃ ┃ ┣ 📜admin.py
 ┃ ┃ ┃ ┣ 📜apps.py
 ┃ ┃ ┃ ┣ 📜models.py
 ┃ ┃ ┃ ┣ 📜permissions.py
 ┃ ┃ ┃ ┣ 📜report_serializer.py
 ┃ ┃ ┃ ┣ 📜urls.py
 ┃ ┃ ┃ ┣ 📜views.py
 ┃ ┃ ┣ 📂payments
 ┃ ┣ 📁fixture
 ┃ ┣ 📁media
 ┃ ┣ 📁settings
 ┃ ┣ 📁static
 ┃ ┣ 📁tests
 ┃ ┣ 📁utils
 ┃ ┣ 📜admin.py
 ┃ ┣ 📜enums.py
 ┃ ┣ 📜urls.py
 ┣ 📜.flake8
 ┣ 📜.pylintrc
 ┣ 📜manage.py
 ┣ 📜pyproject.toml
 ┣ 📜README.md
 ┣ 📜whitelist.txt
 ┗ 📜wsgi.py
```

## Contributing
To contribute to this project, please contact NTNUI Sprint for questions, as they will do the further development of this repository. The repository is private, so you will need to be a member of the NTNUI organization, and recieve special permissions to develop on this repository. Note that [`membership-system`](https://github.com/NTNUI/membership-system) is a dependency of this project, so permission to this is also necessary.

### Pull Request Process
To contribute please create a pull request up for review, and get the som reviewers to look at it.

When writing commit-messages please follow the conventions of [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).