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

```sh
# Build docker image
docker build --tag=<tag-name> .

# Create oracle local network
docker network create --driver bridge oracle-net

# Run oracle db image
docker run --name oracledb --net oracle-net -p 1521:1521 store/oracle/database-enterprise:12.2.0.1

# Run docker image
docker run --rm --name=nodeapp --net oracle-net -p 3000:3000 <tag-name>
```

## Oracle Instant Client with docker

```sh
# Run instantclient docker image
docker run -ti --rm --net oracle-net store/oracle/database-instantclient:12.2.0.1 /bin/bash

# Connect to PDB database
bash-4.2# sqlplus sys1/Oradoc_db1@oracledb/ORCLPDB1.localdomain

# Connect to CDB database
bash-4.2# sqlplus sys/Oradoc_db1@oracledb/ORCLCDB.localdomain as sysdba
```

## TODO

- [ ] Refactor for formal setup
- [ ] Customise user, password and database
- [ ] Use docker-compose
- [ ] Add debian based Dockerfile and docker-compose
