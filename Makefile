init:
	@echo ">>>INSTALLING LOCAL DEPENDENCIES<<<"
	npm install
	@echo "\n"
	@echo "############!INITIALIZING!############"
	@echo "!!!!!!!!!!MAKE SURE to HAVE!!!!!!!!!!!"
	@echo "#(1)nodejs, aws cli, python installed#"
	@echo "#(2)Have your aws profiles configured#"
	@echo "#(3)Authenticated into AWS ###########"
	@echo "######################################"
	npm start
start:
	node app.js
