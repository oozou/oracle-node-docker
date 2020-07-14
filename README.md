# Oracle Docker Node

**in-progress**

Dev container oracle with node and express

Make sure to `docker login` and get permissions from docker-hub for Oracle before proceeding

## Relevant Links

1. https://blogs.oracle.com/opal/docker-for-oracle-database-applications-in-nodejs-and-python-part-1
2. https://blogs.oracle.com/opal/docker-for-oracle-database-applications-in-nodejs-and-python-part-1
3. Docker hub: Oracle Database Enterprise Edition
4. Docker hub: Oracle Instant Client
4. https://oracle.github.io/node-oracledb/INSTALL.html#quickstart

## Visual studio dev container

1. Make sure you have "Docker" and "Remote - Containers" extension installed in vscode
2. When prompted, use `Remote-Containers: Reopen in Container` option
3. Use F5 or "Debug: Start Debugging" option in vscode

## SSH dev container

```sh
# get container-id
docker ps

docker exec -it <container-id> /bin/zsh

cd /workspace/test-project

npm install
npm start

# Create custom database with user and password
cp .env.example .env
npm run db:recreate
```

- Git credentials are shared between devcontainer and host machine
- Windows and Linux users have to `ssh-add` credentials

## Oracle Instant Client with docker

```sh
# Run instantclient docker image
docker run -ti --rm --net <network-name> store/oracle/database-instantclient:12.2.0.1 /bin/bash

# Connect to DB_SID=sdon database
bash-4.2# sqlplus sys/Oradoc_db1@oracledb/sdon.localdomain as sysdba
```

## Rebuilding dev container

Use option `Remote-Containers: Rebuild Container`

## TODO

- [ ] Refactor for formal setup
- [x] Customise user, password and database
- [x] Use docker-compose
- [x] Add debian based Dockerfile and docker-compose
