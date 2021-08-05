docker:
  docker build . -t attendance-web-app
	docker run -p 3000:3000 attendance-web-app
