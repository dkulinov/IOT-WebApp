USE iot;

CREATE TABLE devices
(
    device_id VARCHAR(20) NOT NULL,
    cloudActivated BOOLEAN DEFAULT 0,
    customer_email VARCHAR(100),
    PRIMARY KEY(device_id),
    FOREIGN KEY(customer_email) REFERENCES customers(email)
);

CREATE TABLE customers
(
    first_name VARCHAR(25),
    last_name VARCHAR(25),
    email VARCHAR(100),
    pw VARCHAR(256),
    PRIMARY KEY(email)
);

CREATE TABLE uploads
(
    link VARCHAR(256),
    device_id VARCHAR(20),
    upload_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(link),
    FOREIGN KEY(device_id) REFERENCES devices(device_id)
);