prepare:
	yarn
	cd projects/DAL && yarn build
	cd projects/BLL && yarn build
	cd projects/API && yarn build

app-be:
	$('************  TEST VERSION ************')
	$(MAKE) prepare
	# docker-compose up -d
	sleep 1
	yarn dev

app-fe:
	cd projects/UI && yarn dev

app:
	$(MAKE) app-be
	$(MAKE) app-fe
	# $(MAKE) xterm app-frontend
	