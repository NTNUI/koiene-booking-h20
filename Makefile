#---- COMMANDS ----#

s: ##@Docker (start) Start the webserver on http://localhost:8000
	docker-compose up

start: ##@Docker (start) Start the webserver on http://localhost:8000
	docker-compose up --build

start-d: ##@Docker (start) Start the webserver on http://localhost:8000, in the background
	docker-compose up -d

down:
	docker-compose down

shell-backend: ##@Django Open django container
	docker exec -it ntnui_backend /bin/bash

shell-db: ##@Postgres Open postgres container
	docker exec -it ntnui_db /bin/bash

load-data:
	docker-compose run backend python manage.py loaddata ./ntnui/fixture/description.json
	docker-compose run backend python manage.py loaddata ./ntnui/fixture/location.json
	docker-compose run backend python manage.py loaddata ./ntnui/fixture/koier.json
	docker-compose run backend python manage.py loaddata ./ntnui/fixture/fixture.json
	
dump-data:  ##@TestEnv Create a JSON Dump of $APP (use APP="appname" from console)
	docker-compose run backend python manage.py dumpdata --format=json> ./ntnui/fixture/fixture.json

createsuperuser: ##@Docker Create a superuser (details found in settings/common.py)
	docker-compose run backend python manage.py createsuperuser

makemigrations: ##@Docker Set up migration files
	docker-compose run backend python manage.py makemigrations ${app-label} --name ${name}
	@echo "Migrations completed successfully"

# Run the makemigrations command on every app in the /apps folder
force-makemigrations: ##@Docker Forcibly perform makemigrations on the separate apps
	$(foreach app,$(filter-out __pycache__ common, $(APPDIR)),docker-compose run backend python manage.py makemigrations ($(app) &))
	@echo "Migrations completed successfully"


dev-clean-install: ##@TestEnv Delete the old database and re-apply testdata
	docker-compose down -v
	docker-compose build
	make makemigrations-koie
	make fake-migrate
	make migrate
	make load-data
	make start

makemigrations-koie: ##$Docker Set up migrations files for koie_booking app
	docker-compose run backend python manage.py makemigrations koie_booking
	@echo "Migrations have been made for koie_booking"
	docker-compose run backend python manage.py makemigrations koie_report
	@echo "Migrations have been made for koie_report"
fake-migrate: ##@Docker Fake migrations for existing table instances
	docker-compose run backend python manage.py migrate --fake accounts
	docker-compose run backend python manage.py migrate --fake groups
	docker-compose run backend python manage.py migrate --fake payments
	@echo "Fake migrations have been successfully migrated"
migrate: ##@Docker Perform migrations to database
	docker-compose run backend python manage.py migrate koie_booking
	@echo "Migrate completed successfully"
	docker-compose run backend python manage.py migrate koie_report
	@echo "Migrate completed successfully for koiene_report"

clean: ##@TestEnv Delete the project files in docker, and all not in use containers
	docker-compose down -v
	docker system prune

pytest: ##@Test (test) Run all docker-tests with pytest, and output a report in the terminal
	make setup-tests
	docker-compose -f docker-compose.test.yml run -e POSTGRES_HOST=test_db -e POSTGRES_PORT=5433 backend pytest --cov=. $(ARGS)

setup-tests:
	docker-compose -f docker-compose.test.yml run -e POSTGRES_HOST=test_db -e POSTGRES_PORT=5433 backend python manage.py migrate

pytest-clean: ##@Test (test) Run all docker-tests with pytest without coverage report
	docker-compose -f docker-compose.test.yml run backend pytest $(ARGS)

coverage: ##@Test (test) Run all tests and output a HTML report in coverage_report/
	make pytest ARGS="--cov-report=html"

black: ##@Format backend code with Black
	docker-compose run backend black ntnui/ --config pyproject.toml $(ARGS)

isort: ##@Sort imports across the entire backend to comply with PEP8
	docker-compose run backend isort $(ARGS)

format: ##@Format the backend code with black and isort
	make black
	make isort

flake8: ##@Lints backend with Flake8.
	docker-compose run backend flake8

pylint: ##@Lints backend with pylint.
	docker-compose run backend pylint ntnui/

check: ##@Runs formatting checks
	make black ARGS="--check"
	make isort ARGS="--check-only"
	make flake8
	docker-compose run backend python manage.py makemigrations --check

