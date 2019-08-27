PROJECT_NAME=$(shell basename $(PWD))

dev: clean build run

clean:
	docker-compose stop -t0
	docker-compose rm -f

clean-data: clean
	docker volume rm $(PROJECT_NAME)_postgres

build:
	docker-compose build

start-postgres:
	@printf '> Starting Postgres...'
	@docker-compose up -d postgres > /dev/null 2>&1
	@docker-compose exec postgres sh -c 'while ! nc -z postgres 5432; do sleep 0.1; done'
	@echo ' done'

prepare-db: start-postgres
	# TODO
	@docker-compose run backend sh -c ""

run:
	docker-compose up
