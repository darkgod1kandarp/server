use ur_cirkle;
select * from likes_count where id = "BkIvHeoXbg";
delete from likes_count;
SET SQL_SAFE_UPDATES = 0;

alter table  all_connections drop column connectionid; 

alter table  all_connections drop column status; 

alter table  all_connections add column  status ENUM("success","pending","ignore"); 

alter table    all_connections  add primary key(connectorid,connecteeid);


CREATE TABLE all_connections (
connectorid VARCHAR(11),
connecteeid VARCHAR(11),
status ENUM("success","pending","ignore"),
FOREIGN KEY(connectorid) REFERENCES all_users(userid) ON DELETE CASCADE,
FOREIGN KEY(connecteeid) REFERENCES all_users(userid) ON DELETE CASCADE
);


select * from all_users;

select null as value;

alter table all_interests  add column interest varchar(50);

alter table all_interests drop column interest_type;

alter table all_interests add column userid varchar(13) ;
alter table all_interests  add foreign key(userid) references all_users(userid);

alter table  all_interests add column interests varchar(50) ; --  --, interest2 , interest3 , interest4 , interest5 );


-- dJjkMBaGpr,dXHEsXaCfC
alter table all_interests drop column id;

desc all_interests;
insert into all_interests values("xpTnZTSKwu","a");-- ,"d","e","f","g");

insert into all_interests values("xpTnZTSKwu","x");
insert into all_interests values("xpTnZTSKwu","n");
insert into all_interests values("xpTnZTSKwu","f");
insert into all_interests values("xpTnZTSKwu","g");-- 

delete from all_interests where userid = "dXHEsXaCfC";

alter table user_details drop foreign key user_details_ibfk_1;

alter table user_details  add foreign key(userid) references all_users(userid);

-- select * from(select * from  all_interests  where userid ="dXHEsXaCfC") where in (select * from  all_interests  where userid ="dXHEsXaCfC"); 
-- drop table user_interests;

select * from all_interests;
select distinct(interests) from all_interests  where userid = "xpTnZTSKwu"or userid ="dXHEsXaCfC";
select interests from all_interests,user_details  where userid in ( select all_users.userid from (select substring(username,1,1) as c1 ,userid from all_users) as c2 ,all_users where c2.c1="F"  and all_users.userid =c2.userid and );

select * from all_interests;
-- FpYELVTtHb,-- dXHEsXaCfC
select all_users.userid,all_users.username from (select substring(username,1,1) as c1 ,userid from all_users) as c2 ,all_users where c2.c1="F"  and all_users.userid =c2.userid;
select * from (select all_users.userid,all_users.username from (select substring(username,1,1) as c1 ,userid from all_users) as c2 ,
all_users where c2.c1="w"  and all_users.userid =c2.userid) as data1 ,all_interests where all_interests.userid = data1.userid;
select * from all_interests; 
 select * from all_users;
 select substring(username,1,1) as c1 ,userid from all_users;
 
 
 create database pgfinder;
 use pgfinder;
 create table star1(op int);
 insert into userdetails values('efef','sdsdsd','ssdsdsd','eefef');
 select * from userdetails;
  insert into userdetails values('efe','sdsdsd','ssdsdsd','009kandarp@gmail.com');
  drop table OwnerDetails;
  
 create table OwnerDetails(name1 varchar(50),foreign key(name1) references userdetails(name) on delete cascade,OwnerImage varchar(500),pglicese varchar(500),number1 bigint);
 insert into OwnerDetails value("nknfkn","jbewf2",9328982213);
 create table pgbasicdetails(name1 varchar(50), foreign key(name1) references userdetails(name) on delete cascade,address varchar(1000),plotsize varchar(1000),availability enum("boys","girls","both"),costperbed varchar(100),roomsforrent varchar(100),sharing varchar(100),pgname varchar(200),pgid varchar(10) primary key ,maximumcapacity varchar(50),lat float ,lng float);

 use pgfinder;
 create table imagesdata(pgid varchar(500), foreign key(pgid) references pgbasicdetails(pgid) on delete cascade,imgurl varchar(500),description varchar(100));
 create table ruleforpg(pgid varchar(500), foreign key(pgid) references pgbasicdetails(pgid) on delete cascade,rule varchar(1000));
 create table services(pgid varchar(500),foreign key(pgid) references pgbasicdetails(pgid) on delete cascade,service varchar(1000),condition1 varchar(100));
 select name1 from pgbasicdetails;
 select distinct(pgbasicdetails.pgid),imagesdata.imgurl,ruleforpg.rule,imagesdata.description , pgbasicdetails.name1,pgbasicdetails.address,pgbasicdetails.plotsize,pgbasicdetails.availability,pgbasicdetails.costperbed,pgbasicdetails.roomsforrent,pgbasicdetails.sharing,pgbasicdetails.pgname,pgbasicdetails.pgid,ownerdetails.OwnerImage,ownerdetails.pglicese ,ownerdetails.number1 ,ruleforpg.rule,services.service,services.condition1 from pgbasicdetails,ruleforpg,services ,ownerdetails, imagesdata,userdetails where  pgbasicdetails.pgid = imagesdata.pgid and pgbasicdetails.pgid =ruleforpg.pgid and pgbasicdetails.pgid=services.pgid;
 select * from userdetails inner join ownerdetails on userdetails.name = ownerdetails.name1 inner join pgbasicdetails on pgbasicdetails.name1 = ownerdetails.name1 inner join imagesdata on imagesdata.pgid = pgbasicdetails.pgid;
 select * from userdetails inner join ownerdetails on userdetails.name = ownerdetails.name1 inner join pgbasicdetails on pgbasicdetails.name1 = ownerdetails.name1 inner join imagesdata on imagesdata.pgid = pgbasicdetails.pgid;
 CREATE TABLE `pgbasicdetails` (
  `name1` varchar(50) DEFAULT NULL,
  `address` varchar(1000) DEFAULT NULL,
  `plotsize` varchar(1000) DEFAULT NULL,
  `availability` enum('boys','girls','both') DEFAULT NULL,
  `costperbed` varchar(100) DEFAULT NULL,
  `roomsforrent` varchar(100) DEFAULT NULL,
  `sharing` varchar(100) DEFAULT NULL,
  `pgname` varchar(200) DEFAULT NULL,
  `pgid` varchar(255) NOT NULL,
  `maximumcapacity` varchar(50) DEFAULT NULL,
  `lat` float DEFAULT NULL,
  `lng` float DEFAULT NULL,
  PRIMARY KEY (`pgid`),
  KEY `name1` (`name1`),
  CONSTRAINT `pgbasicdetails_ibfk_1` FOREIGN KEY (`name1`) REFERENCES `userdetails` (`name`) ON DELETE CASCADE
  
) ;
delete from pgbasicdetails;
set sql_safe_updates = 0;
delete from ruleforpg;
drop table imagesdata;
drop table ruleforpg;
select * from imagesdata;
drop table services;

 
 
 ;
alter table imagesdata  modify column pgid varchar(500);
alter table pgbasicdetails modify column pgid varchar(500);
 alter table pgbasicdetails add column lng float;
 alter table pgbasicdetails add column maximumcapacity varchar(1000);
 alter table pgbasicdetails add column lng float;
 select * from pgbasicdetails;
 select * from ownerdetails inner join pgbasicdetails on pgbasicdetails.name1 = ownerdetails.name1 inner join services on pgbasicdetails.pgid = services.pgid inner join ruleforpg on pgbasicdetails.pgid = ruleforpg.pgid  ;
 insert into pgbasicdetails values ('lnknknk','Jaipur, Rajasthan, India','wefewf','','dede','dede','3','ejfbejf','c470c3bb-8108-4207-ac82-deb21b619cac','edded',26.9124336,75.7872709);
select pgbasicdetails.pgid,imagesdata.imgurl from pgbasicdetails inner join imagesdata on imagesdata.pgid=pgbasicdetails.pgid ;
select pgbasicdetails.pgid  ,minservices(imgurl) from pgbasicdetails inner join imagesdata on imagesdata.pgid=pgbasicdetails.pgid group by pgbasicdetails.pgid;
insert into pgbasicdetails values ('lnknknk','Bbbbbbbbb, Chiromo Lane, Nairobi, Kenya','jbjbjb','both','58678','jbjbjbjbjb','2','eververerfer','63efdbff-4fca-4d5e-b6a2-057fda642ec3','4324',-1.2699228,36.8099681);
alter table services drop column  condition1;
create table verified(pgid varchar(50), foreign key(pgid) references pgbasicdetails(pgid)  ,  verfied boolean);
drop table verified;
delete from pgbasicdetails;
select * from verified;