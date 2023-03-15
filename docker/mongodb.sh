# docker run --name pim-mongo -v ~/nixiaohui/data/db:/data/db -p 37017:27017 -d mongo
# docker run --restart=always --name pim-mongo -p 37017:27017 -d mongo

# 启动数据库镜像
docker run --restart=always --name pim-mongo-new -p 37017:27017 -v /home/smai/nixiaohui/mongodb_mount:/data/db -d -e MONGO_INITDB_ROOT_USERNAME=chanpinbu -e MONGO_INITDB_ROOT_PASSWORD=chanpinbudemima mongo
# 进入数据库镜像
docker exec -it pim-mongo-new mongosh -u chanpinbu -p chanpinbudemima --authenticationDatabase admin