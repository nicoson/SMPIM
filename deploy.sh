# run scripts on target terminal
docker stop pim
docker rm pim
docker load -i pim.tar
docker run -d --restart=always --name=pim --log-opt max-size=20m --log-opt max-file=5 -p 3333:3333 -p 443:443 pim