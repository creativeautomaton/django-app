build:
	docker-compose build

init:
	docker-compose run wanderlist python manage.py migrate --noinput
	docker-compose run wanderlist python manage.py createsuperuser
	docker-compose run wanderlist python manage.py loaddata database.json

migrate:
	docker-compose run wanderlist python manage.py makemigrations
	docker-compose run wanderlist python manage.py migrate
	docker-compose run wanderlist python manage.py djstripe_init_customers

up:
	docker-compose up

collectstatic:
	docker-compose run wanderlist python3 manage.py collectstatic --noinput

test-js:
	docker-compose run frontend npm test

test-py:
	docker-compose run wanderlist coverage run manage.py test

test: test-py test-js

cy-open:
	docker-compose run frontend npm run cy-open

cy-run:
	docker-compose run frontend npm run cy-run

clean:
	docker-compose stop
	docker-compose rm -fv
