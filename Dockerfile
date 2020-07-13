# Dockerfile using extracted Instant Client Zip file on host

FROM oraclelinux:7-slim

ADD instantclient/* /opt/oracle/instantclient/

RUN yum install -y libaio && \
  rm -rf /var/cache/yum

RUN echo /opt/oracle/instantclient > /etc/ld.so.conf.d/oic.conf && \
  ldconfig

RUN  yum -y install oracle-nodejs-release-el7 && \
  yum-config-manager --disable ol7_developer_EPEL && \
  yum -y install nodejs && \
  rm -rf /var/cache/yum

# Create and define the node_modules's cache directory.
RUN mkdir /usr/src/cache
WORKDIR /usr/src/cache

# Install the application's dependencies into the node_modules's cache directory.
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Create and define the application's working directory.
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
