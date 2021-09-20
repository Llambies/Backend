-- crear Medida
create table Medida (
id int identity (1,1) not null ,
hora varchar(50) not null,
valor int not null,
lat varchar(20) not null,
lon varchar(20) not null,
primary key (id)
);