CREATE DATABASE `vue-project`;

CREATE TABLE `usersfacebook` (

  `id` varchar(255) NOT NULL,

  `displayname` text CHARACTER SET utf8 NOT NULL,

  `accesstoken` varchar(255) NOT NULL

) ENGINE=InnoDB DEFAULT CHARSET=latin1;



CREATE TABLE `userslocal` (

  `username` varchar(255) NOT NULL,

  `password` varchar(255) NOT NULL,

  `displayname` text NOT NULL,

  `accesstoken` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

