CREATE TABLE IF NOT EXISTS roles(
  idRoles SERIAL,
  name VARCHAR(45) NOT NULL,
  pricehour INT NOT NULL,
  PRIMARY KEY (idRoles));

CREATE TABLE IF NOT EXISTS users (
  user_a VARCHAR(45) NOT NULL,
  pass VARCHAR(256) NOT NULL,
  PRIMARY KEY (user_a));

CREATE TABLE IF NOT EXISTS userRoles (
  user_a VARCHAR(45) NOT NULL,
  roleID SERIAL,
  idRoleUser INT NOT NULL,
  PRIMARY KEY (roleID),
  CONSTRAINT user_a
    FOREIGN KEY (user_a)
    REFERENCES users (user_a)
    ON DELETE CASCADE 
    ON UPDATE CASCADE ,
  CONSTRAINT role
    FOREIGN KEY (idRoleUser)
    REFERENCES roles (idRoles)
    ON DELETE CASCADE 
    ON UPDATE CASCADE );

CREATE TABLE IF NOT EXISTS projects (
  idprojects SERIAL,
  name VARCHAR(45) NOT NULL,
  admin VARCHAR(45) NOT NULL,
  PRIMARY KEY (idprojects),
  CONSTRAINT admin
    FOREIGN KEY (admin)
    REFERENCES users (user_a)
    ON DELETE CASCADE 
    ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS tasks (
  idtasks SERIAL,
  project INT NOT NULL,
  user_a INT NOT NULL,
  timeEst INTERVAL NOT NULL,
  timeR INTERVAL NULL,
  PRIMARY KEY (idtasks),
  CONSTRAINT proj
    FOREIGN KEY (project)
    REFERENCES projects (idprojects)
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  CONSTRAINT user_a
    FOREIGN KEY (user_a)
    REFERENCES userRoles (idRoleUser)
    ON DELETE CASCADE 
    ON UPDATE CASCADE);
