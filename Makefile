build-dev:
	docker build -t personal-site-auth-api-dev -f Dockerfile.dev .

build-prod: 
	docker build -t personal-site-auth-api-prod -f Dockerfile .
