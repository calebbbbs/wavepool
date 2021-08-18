-- FOR REFERENCE ONLY

CREATE SCHEMA IF NOT EXISTS wavepool;

CREATE  TABLE wavepool.friend_status ( 
	user_id              integer  NOT NULL ,
	"friend _id"         integer  NOT NULL ,
	CONSTRAINT pk_friend_status_user_id PRIMARY KEY ( user_id )
 );

CREATE  TABLE wavepool.tracks ( 
	track_id             integer   ,
	spotify_uri          varchar(128)  NOT NULL ,
	artist_id            varchar(100)  NOT NULL ,
	album_name           varchar(100)   ,
	album_uri            varchar   ,
	CONSTRAINT unq_tracks_track_id UNIQUE ( track_id ) 
 );

CREATE  TABLE wavepool.histories ( 
	user_id              integer  NOT NULL ,
	track_id             integer  NOT NULL ,
	createdat            date DEFAULT current_date NOT NULL ,
	suggested_by         integer   ,
	CONSTRAINT pk_histories_user_id PRIMARY KEY ( user_id )
 );

CREATE  TABLE wavepool."liked-tracks" ( 
	user_id              integer  NOT NULL ,
	track_id             integer  NOT NULL ,
	CONSTRAINT "pk_liked-tracks_user_id" PRIMARY KEY ( user_id )
 );

CREATE  TABLE wavepool."pending-friends" ( 
	user_id              integer  NOT NULL ,
	friend_id            integer  NOT NULL ,
	CONSTRAINT "pk_pending-friends_user_id" PRIMARY KEY ( user_id )
 );

CREATE UNIQUE INDEX "unq_pending-friends" ON wavepool."pending-friends" ( user_id );

CREATE  TABLE wavepool."reccomended-tracks" ( 
	user_id              integer  NOT NULL ,
	"track id"           integer  NOT NULL ,
	friend_id            integer  NOT NULL ,
	CONSTRAINT "pk_reccomended-tracks_user_id" PRIMARY KEY ( user_id )
 );

CREATE  TABLE wavepool."user-friends" ( 
	user_id              integer  NOT NULL ,
	friend_id            integer  NOT NULL ,
	CONSTRAINT "pk_user-friends" PRIMARY KEY ( user_id )
 );

CREATE UNIQUE INDEX "unq_user-friends" ON wavepool."user-friends" ( user_id );

ALTER TABLE wavepool.histories ADD CONSTRAINT fk_histories_tracks FOREIGN KEY ( track_id ) REFERENCES wavepool.tracks( track_id );

ALTER TABLE wavepool.histories ADD CONSTRAINT fk_histories_users FOREIGN KEY ( user_id ) REFERENCES wavepool.users( user_id );

ALTER TABLE wavepool.histories ADD CONSTRAINT "fk_histories-suggested-by" FOREIGN KEY ( suggested_by ) REFERENCES wavepool.users( user_id );

ALTER TABLE wavepool."liked-tracks" ADD CONSTRAINT "fk_liked-tracks-user" FOREIGN KEY ( user_id ) REFERENCES wavepool.users( user_id );

ALTER TABLE wavepool."liked-tracks" ADD CONSTRAINT "fk_liked-tracks-track" FOREIGN KEY ( track_id ) REFERENCES wavepool.tracks( track_id );

ALTER TABLE wavepool."pending-friends" ADD CONSTRAINT "fk_pending-friends-user" FOREIGN KEY ( user_id ) REFERENCES wavepool.users( user_id );

ALTER TABLE wavepool."pending-friends" ADD CONSTRAINT "fk_pending-friends-friend" FOREIGN KEY ( friend_id ) REFERENCES wavepool.users( user_id );

ALTER TABLE wavepool."reccomended-tracks" ADD CONSTRAINT "fk_reccomended-tracks-user" FOREIGN KEY ( user_id ) REFERENCES wavepool.users( user_id );

ALTER TABLE wavepool."reccomended-tracks" ADD CONSTRAINT "fk_reccomended-tracks-track" FOREIGN KEY ( "track id" ) REFERENCES wavepool.tracks( track_id );

ALTER TABLE wavepool."reccomended-tracks" ADD CONSTRAINT "fk_reccomended-tracks-friend" FOREIGN KEY ( friend_id ) REFERENCES wavepool.users( user_id );

ALTER TABLE wavepool.tracks ADD CONSTRAINT artist_id FOREIGN KEY ( artist_id ) REFERENCES wavepool.artist( artist_id );

ALTER TABLE wavepool."user-friends" ADD CONSTRAINT "fk_user-friends_friend" FOREIGN KEY ( friend_id ) REFERENCES wavepool.users( user_id );

ALTER TABLE wavepool."user-friends" ADD CONSTRAINT "fk_user-friends-user" FOREIGN KEY ( user_id ) REFERENCES wavepool.users( user_id );
