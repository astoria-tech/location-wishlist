PROJECT_NAME=$(shell basename $(PWD))

dev: clean build migrations.run run
reset: data.clean postgres.start migrations.run

build:
	docker-compose build

clean:
	docker-compose stop -t0
	docker-compose rm -f

run: postgres.start
	docker-compose up

data.clean: clean
	docker volume rm $(PROJECT_NAME)_postgres

postgres.start:
	@printf '> Starting Postgres...'
	@docker-compose up -d postgres > /dev/null 2>&1
	@docker-compose exec postgres sh -c 'while ! nc -z postgres 5432; do sleep 0.1; done'
	@echo ' done'

postgres.shell:
	docker-compose exec postgres psql -U wishlist

migrations.create-blank: postgres.start
	docker-compose run backend \
	  npx sequelize migration:generate --name new-migration

migrations.run: postgres.start
	docker-compose run backend \
	  npx sequelize db:migrate


