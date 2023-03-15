build:
	rm -rf ./server/public
	cp -r ./client/dev ./server/public
	rm -f pim.tar
	docker build -t pim .
	docker tag pim pim:v0.7
	docker save pim > pim.tar

deliver:
	scp pim.tar smai@100.100.142.132:~/nixiaohui
	
Deploy:
	scp pim.tar qnai@100.100.62.149:~/nixiaohui
	
	push to avatest
	docker tag fas reg.qiniu.com/avatest/fas:v1.0
	docker push reg.qiniu.com/avatest/fas:v1.0
