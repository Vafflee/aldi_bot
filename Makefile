up:
	docker-compose up

up-d:
	docker-compose up -d

up-prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up

down:
	docker-compose down