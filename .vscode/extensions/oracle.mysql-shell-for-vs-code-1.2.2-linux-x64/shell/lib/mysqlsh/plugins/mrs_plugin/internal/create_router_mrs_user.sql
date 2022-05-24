-- -----------------------------------------------------
-- Create MySQL user 'mysqlrouter_mrs'@'%'

CREATE USER 'mysqlrouter_mrs'@'%' IDENTIFIED BY 'MySQLR0cks!';
GRANT 'mrs_provider_metadata', 'mrs_provider_data_access' 
    TO 'mysqlrouter_mrs'@'%';
SET DEFAULT ROLE 'mrs_provider_metadata', 'mrs_provider_data_access' 
    TO 'mysqlrouter_mrs'@'%';
