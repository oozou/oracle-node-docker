# Oracle Docker Node

**in-progress**

This repo contains docker setup for debian, rhel based distro for oracle with node and express

Make sure to `docker login` and get permissions from docker-hub for Oracle before proceeding

## Download instantclient

Permanent links: **Basic (.zip) or Basic Light (.zip)**

* https://www.oracle.com/database/technologies/instant-client/linux-x86-64-downloads.html

Extract `Basic (.zip) or Basic Light (.zip)` to `instantclient/` folder of root dir

## Relevant Links

1. https://blogs.oracle.com/opal/docker-for-oracle-database-applications-in-nodejs-and-python-part-1
2. https://blogs.oracle.com/opal/docker-for-oracle-database-applications-in-nodejs-and-python-part-1
3. Docker hub: Oracle Database Enterprise Edition
4. Docker hub: Oracle Instant Client
4. https://oracle.github.io/node-oracledb/INSTALL.html#quickstart

## Docker Compose

```sh
# first time setup will be slow
docker-compose up

# run individual containers
docker-compose up nodeapp
docker-compose up oracledb
```

## Oracle Instant Client with docker

```sh
# Run instantclient docker image
docker run -ti --rm --net <network-name> store/oracle/database-instantclient:12.2.0.1 /bin/bash

# Connect to PDB database
bash-4.2# sqlplus sys1/Oradoc_db1@oracledb/ORCLPDB1.localdomain

# Connect to DB_SID=sdon database
bash-4.2# sqlplus sys/Oradoc_db1@oracledb/sdon.localdomain as sysdba
```

## TODO

- [ ] Refactor for formal setup
- [ ] Customise user, password and database
- [x] Use docker-compose
- [ ] Add debian based Dockerfile and docker-compose

## Rebuilding docker-compose

```sh
docker-compose up --build <nodeapp/oracledb> # if not specified all images will rebuild
```
