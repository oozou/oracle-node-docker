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

WORKDIR /myapp

ADD app.js /myapp/
ADD package.json /myapp/
ADD package-lock.json /myapp/

RUN npm install

CMD exec npm start
