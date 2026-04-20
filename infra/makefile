docker-run:
	cd .. & docker run -d \
		--name firstlane-user \
		-p 90:80 \
		firstlane-user
docker-stop:
	cd .. & docker stop firstlane-user && docker rm firstlane-user
docker-build:
	cd .. && docker build \
		-t firstlane-user \
		--build-arg VITE_API_BASE_URL="https://api.firstlanemultinvestment.com/v1" \
		--build-arg VITE_BASE_URL="https://app.firstlanemultinvestment.com" \
		--build-arg VITE_COOKIE_SECRET="firstlane" \
		--build-arg VITE_PUBLIC_ENCRYPTION_KEY=23aqq7ytt7hy899tthth454dwdsdsddgffgefefe10 \
		-f infra/Dockerfile .

docker-restart: docker-stop docker-build docker-run