run_dev:
	@echo "Running dev server"
	@docker compose -f docker-compose.dev.yml up

dev_db_agregate:
	@echo "Running agregate db"
	@docker compose run --rm backend alembic revision --autogenerate -m "Reconciliation and daily amount tables"
	@docker compose run --rm backend alembic upgrade head

run_docker:
	@echo "Running docker server"
	sudo service docker start

run_prod:
	@echo "Running prod server"
	@docker-compose -f docker-compose.yml up -d
	

new_cert:
	@echo "Generating new cert"
	@docker-compose run --rm certbot certbot renew
	


update_db:
	@echo "Updating prod db"
	@docker-compose -f docker-compose.yml run --rm backend alembic upgrade head

create_version:
 	@docker-compose -f docker-compose.yml run --rm backend alembic revision --autogenerate -m "migration"
