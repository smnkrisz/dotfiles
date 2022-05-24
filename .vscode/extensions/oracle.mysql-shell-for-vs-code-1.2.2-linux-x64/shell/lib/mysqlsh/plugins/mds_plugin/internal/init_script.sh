#!/bin/bash
# Copyright (c) 2021, 2022, Oracle and/or its affiliates.

# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License, version 2.0,
# as published by the Free Software Foundation.
#
# This program is also distributed with certain software (including
# but not limited to OpenSSL) that is licensed under separate terms, as
# designated in a particular file or component or in included license
# documentation.  The authors of MySQL hereby grant you an additional
# permission to link the program and your derivative works with the
# separately licensed software that they have included with MySQL.
# This program is distributed in the hope that it will be useful,  but
# WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See
# the GNU General Public License, version 2.0, for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software Foundation, Inc.,
# 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA

# Init script for MySQL Shell MDS Plugin Compute Instances

# Update all packages to latest version
# sudo yum -y update

# Get latest repo from https://dev.mysql.com/downloads/repo/yum/ and install it
# wget -nc https://dev.mysql.com/get/mysql80-community-release-el7-3.noarch.rpm
# sudo yum -y localinstall mysql80-community-release-el7-3.noarch.rpm
# rm mysql80-community-release-el7-3.noarch.rpm

# Install MySQL Shell and MySQL Router
# sudo yum -y install mysql-shell mysql-router

# ------------------------------------------------------------------------------
# TEMPORARY SOLUTION TILL CLOUD PLUGIN SHIPS WITH SHELL 
# For now, only install router from the official repo
# sudo yum -y install mysql-router

sudo systemctl enable --now cockpit.socket

# Download and install current shell package
wget -nc https://downloads.mysql.com/91367d41/mysql-shell-commercial-8.0.28-1.1.el8.x86_64.rpm
sudo yum -y install mysql-shell-commercial-8.0.28-1.1.el8.x86_64.rpm
rm mysql-shell-commercial-8.0.28-1.1.el8.x86_64.rpm

# Download and install current router package
# wget -nc https://downloads.mysql.com/91367d41/mysql-router-commercial-8.0.28-1.tr.1.el8.x86_64.rpm
# sudo yum -y install mysql-router-commercial-8.0.28-1.tr.1.el8.x86_64.rpm
# rm mysql-router-commercial-8.0.28-1.tr.1.el8.x86_64.rpm
wget -nc https://insidemysql.com/downloads/mysql/5219882.mysql-router-commercial-8.0.28-1.tr.1.el8.x86_64.rpm
sudo yum -y install 5219882.mysql-router-commercial-8.0.28-1.tr.1.el8.x86_64.rpm
rm 5219882.mysql-router-commercial-8.0.28-1.tr.1.el8.x86_64.rpm

# Install cert-bot
sudo dnf install oracle-epel-release-el8
sudo yum install snapd
sudo systemctl enable --now snapd.socket
sudo ln -s /var/lib/snapd/snap /snap
sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot

# sudo certbot certonly --webroot -w /var/run/mysqlrouter/www/ -d mrs.zinner.org
# /etc/letsencrypt/live/mrs.zinner.org/fullchain.pem
# /etc/letsencrypt/live/mrs.zinner.org/privkey.pem

# Get cloud plugin and install manually
mkdir -p /home/opc/.mysqlsh/plugins
cd /home/opc/.mysqlsh/plugins
wget -nc https://insidemysql.com/downloads/mysql/mds_plugin.zip
wget -nc https://insidemysql.com/downloads/mysql/mrs_plugin.zip
unzip mds_plugin.zip
unzip mrs_plugin.zip
rm mds_plugin.zip
rm mrs_plugin.zip
chown -R opc:opc /home/opc/.mysqlsh

sudo mkdir -p /var/run/mysqlrouter/www/
echo '<!DOCTYPE html><title>.</title>' | sudo tee /var/run/mysqlrouter/www/index.html > /dev/null
sudo chown -R mysqlrouter:mysqlrouter /var/run/mysqlrouter/www/

sudo firewall-cmd --zone=public --permanent --add-port=8080/tcp
sudo firewall-cmd --reload
