<p align="center">
<img width="200" src="backend/ntnui/media/logo/ntnui.svg" />
</p>

### CI
![Front end CI](https://github.com/NTNUI/koiene-booking/workflows/Front%20end%20CI/badge.svg)
![Back end CI](https://github.com/NTNUI/koiene-booking/workflows/Back%20end%20CI/badge.svg)

## Description
Internal system for members and volunteers in NTNUI used for administering cabin bookings. 

The `backend` folder contains the back-end Django app, while the `frontend-koie-booking` folder contains the front-end vue app. Please see the README.md in those directories for the respective setup and installation processes.

## Back-end File Structure
The entire back-end is located in the `backend` folder. In this folder you will find configuration files and the source code for the backend. The `ntnui` folder serves as the base folder for the django-project. 

Inside the django project are several apps, that each contain key functionality.
The `accounts`, `groups` and `payments` folders are inherited from the bachelor project group, while the job done for kundestyrt can be found in the `koie_booking`, and `koie_report` folders.

Integration tests are found in the `tests` folder of the `ntnui` directory.

### Quick tour of the file structure
The files found in the `views` folder defines the api-endpoint-handlers.
`urls.py` is the file where the routing from the url to the handlers are defined.
Inside `models` are the files that defines the database models. These are serialized to-and-from postgreSQL db entries and native python dictionaries. The logic for doing this and specifying which fields are wanted can be found in the `serializers` folder.

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

## Contributing
To contribute to this project, please contact NTNUI Sprint for questions, as they will do the further development of this repository. The repository is private, so you will need to be a member of the NTNUI organization and recieve special permissions to develop on this repository. Note that [`membership-system`](https://github.com/NTNUI/membership-system) is a dependency of this project, so permission to this is also necessary.

Please make sure that any commited code is covered by unit tests and integration tests. This can be checked running the command 

```bash
make pytest
```

Code should also be passed through formatting with [black](https://black.readthedocs.io/en/stable/), a lint check by [flake8](https://flake8.pycqa.org/en/latest/) and import sorting by [isort](https://pycqa.github.io/isort/). To do this run
```bash
make format
```

### Pull Request Process
To contribute please create a pull request for review, and get the som reviewers to look at it.

When writing commit-messages please follow the conventions of [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).


## Implementing features
NTNUI Sprint keeps their backlog of features on a service called [ClickUp](https://app.clickup.com). Please head over here to see the status of features in the backlog.

Implementing a feature in the back-end usually consists of creating a new endpoint. This is done by creating a url config, a viewset, a serializer(optional), a model(optional), unit tests and integration tests of the endpoint.

An example of an implemented feature includes the possibility to list bookings for the sit-panel. To do this the following files were created: 

+ `backend/ntnui/apps/koie_booking/serializers/booking_sit.py`
+ `backend/ntnui/apps/koie_booking/tests/test_booking_sit_serializer.py`
+ `backend/ntnui/apps/koie_booking/urls.py`
+ `backend/ntnui/apps/koie_booking/views/booking_sit.py`
+ `backend/ntnui/tests/test_booking_sit.py` 


## Detailed File Structure
This is a detailed overview of the complete file structure of the back-end. Folders containing work by the kundestyre-group are expanded.
```
📦backend
 ┣ 📂ntnui
 ┃ ┣ 📂apps
 ┃ ┃ ┣ 📁accounts
 ┃ ┃ ┣ 📁groups
 ┃ ┃ ┣ 📂koie_booking
 ┃ ┃ ┃ ┣ 📂admin
 ┃ ┃ ┃ ┃ ┣ 📜booking.py
 ┃ ┃ ┃ ┃ ┣ 📜booking_payment.py
 ┃ ┃ ┃ ┃ ┣ 📜koie.py
 ┃ ┃ ┃ ┣ 📂factories
 ┃ ┃ ┃ ┃ ┣ 📜booking_factory.py
 ┃ ┃ ┃ ┃ ┣ 📜booking_payment_factory.py
 ┃ ┃ ┃ ┃ ┣ 📜description_factory.py
 ┃ ┃ ┃ ┃ ┣ 📜koie_factory.py
 ┃ ┃ ┃ ┃ ┣ 📜location_factory.py
 ┃ ┃ ┃ ┣ 📁migrations
 ┃ ┃ ┃ ┣ 📂models
 ┃ ┃ ┃ ┃ ┣ 📜booking.py
 ┃ ┃ ┃ ┃ ┣ 📜booking_payment.py
 ┃ ┃ ┃ ┃ ┣ 📜description.py
 ┃ ┃ ┃ ┃ ┣ 📜koie.py
 ┃ ┃ ┃ ┃ ┣ 📜location.py
 ┃ ┃ ┃ ┣ 📂reminder
 ┃ ┃ ┃ ┃ ┣ 📂management
 ┃ ┃ ┃ ┃ ┃ ┗ 📂commands
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜send_daily_departure_emails.py
 ┃ ┃ ┃ ┣ 📂serializers
 ┃ ┃ ┃ ┃ ┣ 📜all_koier.py
 ┃ ┃ ┃ ┃ ┣ 📜all_koier_detailed.py
 ┃ ┃ ┃ ┃ ┣ 📜booking.py
 ┃ ┃ ┃ ┃ ┣ 📜booking_sit.py
 ┃ ┃ ┃ ┃ ┣ 📜description.py
 ┃ ┃ ┃ ┃ ┣ 📜koie.py
 ┃ ┃ ┃ ┃ ┣ 📜location.py
 ┃ ┃ ┃ ┣ 📂templates
 ┃ ┃ ┃ ┃ ┣ 📜booking_confirmation.html
 ┃ ┃ ┃ ┃ ┣ 📜booking_confirmation.txt
 ┃ ┃ ┃ ┃ ┣ 📜checklist_reminder.html
 ┃ ┃ ┃ ┃ ┣ 📜checklist_reminder.txt
 ┃ ┃ ┃ ┃ ┣ 📜koie_information.html
 ┃ ┃ ┃ ┃ ┗ 📜koie_information.txt
 ┃ ┃ ┃ ┣ 📂tests
 ┃ ┃ ┃ ┃ ┣ 📜test_all_koier_detailed_serializer.py
 ┃ ┃ ┃ ┃ ┣ 📜test_all_koier_serializer.py
 ┃ ┃ ┃ ┃ ┣ 📜test_booking_model.py
 ┃ ┃ ┃ ┃ ┣ 📜test_booking_payment_model.py
 ┃ ┃ ┃ ┃ ┣ 📜test_booking_report_reminder.py
 ┃ ┃ ┃ ┃ ┣ 📜test_booking_serializer.py
 ┃ ┃ ┃ ┃ ┣ 📜test_booking_sit_serializer.py
 ┃ ┃ ┃ ┃ ┣ 📜test_date_utils.py
 ┃ ┃ ┃ ┃ ┣ 📜test_description_serializer.py
 ┃ ┃ ┃ ┃ ┣ 📜test_koie_model.py
 ┃ ┃ ┃ ┃ ┣ 📜test_koie_serializer.py
 ┃ ┃ ┃ ┃ ┣ 📜test_location_serializer.py
 ┃ ┃ ┃ ┃ ┗ 📜test_mail_utils.py
 ┃ ┃ ┃ ┣ 📁utils
 ┃ ┃ ┃ ┣ 📂views
 ┃ ┃ ┃ ┃ ┣ 📜booking.py
 ┃ ┃ ┃ ┃ ┣ 📜booking_sit.py
 ┃ ┃ ┃ ┃ ┣ 📜koie.py
 ┃ ┃ ┃ ┃ ┣ 📜koie_dashboard.py
 ┃ ┃ ┃ ┣ 📜apps.py
 ┃ ┃ ┃ ┣ 📜constants.py
 ┃ ┃ ┃ ┣ 📜README.md
 ┃ ┃ ┃ ┣ 📜urls.py
 ┃ ┃ ┣ 📂koie_report
 ┃ ┃ ┃ ┣ 📂factories
 ┃ ┃ ┃ ┃ ┗ 📜report_factory.py
 ┃ ┃ ┃ ┣ 📁migrations
 ┃ ┃ ┃ ┣ 📂tests
 ┃ ┃ ┃ ┃ ┣ 📜test_koie_report_model.py
 ┃ ┃ ┃ ┃ ┣ 📜test_koie_report_serializer.py
 ┃ ┃ ┃ ┃ ┗ 📜test_koie_report_serializer_filtered.py
 ┃ ┃ ┃ ┣ 📜admin.py
 ┃ ┃ ┃ ┣ 📜apps.py
 ┃ ┃ ┃ ┣ 📜models.py
 ┃ ┃ ┃ ┣ 📜permissions.py
 ┃ ┃ ┃ ┣ 📜report_serializer.py
 ┃ ┃ ┃ ┣ 📜urls.py
 ┃ ┃ ┃ ┣ 📜views.py
 ┃ ┃ ┣ 📁payments
 ┃ ┣ 📂fixture
 ┃ ┃ ┣ 📜booking.json
 ┃ ┃ ┣ 📜description.json
 ┃ ┃ ┣ 📜fixture.json
 ┃ ┃ ┣ 📜koier.json
 ┃ ┃ ┣ 📜koie_report.json
 ┃ ┃ ┗ 📜location.json
 ┃ ┣ 📁media
 ┃ ┣ 📁settings
 ┃ ┣ 📁static
 ┃ ┣ 📂tests
 ┃ ┃ ┣ 📜test_booking.py
 ┃ ┃ ┣ 📜test_booking_sit.py
 ┃ ┃ ┣ 📜test_constants.py
 ┃ ┃ ┣ 📜test_enums.py
 ┃ ┃ ┣ 📜test_koie.py
 ┃ ┃ ┣ 📜test_koie_availability.py
 ┃ ┃ ┣ 📜test_report.py
 ┃ ┃ ┣ 📜test_stripe_transaction_integration.py
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