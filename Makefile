build:
	rm -f pim.tar
	docker build -t pim .
	docker save pim > pim.tar

dev:
	scp pim.tar smai@100.100.142.132:~/nixiaohui
	
Deploy:
	scp pim.tar qnai@100.100.62.149:~/nixiaohui
	
	push to avatest
	docker tag fas reg.qiniu.com/avatest/fas:v1.0
	docker push reg.qiniu.com/avatest/fas:v1.0
