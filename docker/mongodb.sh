# docker run --name pim-mongo -v ~/nixiaohui/data/db:/data/db -p 37017:27017 -d mongo
docker run --restart=always --name pim-mongo -p 37017:27017 -d mongo