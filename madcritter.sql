CREATE SCHEMA IF NOT EXISTS 'MADCRITTER' DEFAULT CHARACTER SET utf8 ;
USE 'MADCRITTER' ;

-- -----------------------------------------------------
-- Table 'MADCRITTER'.'roles'
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS 'MADCRITTER'.'roles' (
  'idRoles' SERIAL,
  'name' VARCHAR(45) NOT NULL,
  'pricehour' INT NOT NULL,
  PRIMARY KEY ('idRoles'))


-- -----------------------------------------------------
-- Table 'MADCRITTER'.'users'
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS 'MADCRITTER'.'users' (
  'user' VARCHAR(45) NOT NULL,
  'pass' VARCHAR(256) NOT NULL,
  PRIMARY KEY ('user'))


-- -----------------------------------------------------
-- Table 'mydb'.'userRoles'
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS 'MADCRITTER'.'userRoles' (
  'user' VARCHAR(45) NOT NULL,
  'roleID' SERIAL,
  'idRoleUser' INT NOT NULL,
  PRIMARY KEY ('idRoleUser'),
  INDEX 'role_idx' ('roleID' ASC) VISIBLE,
  CONSTRAINT 'user'
    FOREIGN KEY ('user')
    REFERENCES 'MADCRITTER'.'users' ('user')
    ON DELETE CASCADE 
    ON UPDATE CASCADE ,
  CONSTRAINT 'role'
    FOREIGN KEY ('roleID')
    REFERENCES 'MADCRITTER'.'roles' ('idRoles')
    ON DELETE CASCADE 
    ON UPDATE CASCADE )


-- -----------------------------------------------------
-- Table 'MADCRITTER'.'projects'
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS 'MADCRITTER'.'projects' (
  'idprojects' SERIAL,
  'name' VARCHAR(45) NOT NULL,
  'admin' VARCHAR(45) NOT NULL,
  PRIMARY KEY ('idprojects'),
  INDEX 'admin_idx' ('admin' ASC) VISIBLE,
  CONSTRAINT 'admin'
    FOREIGN KEY ('admin')
    REFERENCES 'mydb'.'users' ('user')
    ON DELETE CASCADE 
    ON UPDATE CASCADE)


-- -----------------------------------------------------
-- Table 'MADCRITTER'.'tasks'
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS 'MADCRITTER'.'tasks' (
  'idtasks' SERIAL,
  'project' INT NOT NULL,
  'user' INT NOT NULL,
  'timeEst' INTERVAL NOT NULL,
  'timeR' INTERVAL NULL,
  PRIMARY KEY ('idtasks'),
  INDEX 'proj_idx' ('project' ASC) VISIBLE,
  INDEX 'user_idx' ('user' ASC) VISIBLE,
  CONSTRAINT 'proj'
    FOREIGN KEY ('project')
    REFERENCES 'MADCRITTER'.'projects' ('idprojects')
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  CONSTRAINT 'user'
    FOREIGN KEY ('user')
    REFERENCES 'MADCRITTER'.'userRoles' ('idRoleUser')
    ON DELETE CASCADE 
    ON UPDATE CASCADE)