build-dev:
	docker build -t personal-site-api-gateway-dev -f Dockerfile.dev .

build-prod: 
	docker build -t personal-site-api-gateway-prod -f Dockerfile .
