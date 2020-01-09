CREATE TABLE musique
(
    id serial,
    titre character varying(150) COLLATE pg_catalog."default",
    genre character varying(150) COLLATE pg_catalog."default",
    description character varying(150) COLLATE pg_catalog."default",
    studio character varying(150) COLLATE pg_catalog."default",
    album character varying(150) COLLATE pg_catalog."default",
    artiste character varying(150) COLLATE pg_catalog."default",
    CONSTRAINT musique_pkey PRIMARY KEY (id)
);

CREATE TABLE playlist
(
    id serial,
    nom character varying(250) COLLATE pg_catalog."default",
    description character varying(250) COLLATE pg_catalog."default",
    auteur character varying(250) COLLATE pg_catalog."default",
    CONSTRAINT playlist_pkey PRIMARY KEY (id)
);

CREATE TABLE appartient
(
    id serial,
    id_musique integer NOT NULL,
    id_playlist integer NOT NULL,
    CONSTRAINT appartient_pkey PRIMARY KEY (id),
    CONSTRAINT appartient_id_musique_id_playlist_key UNIQUE (id_musique)
        INCLUDE(id_playlist),
    CONSTRAINT appartient_id_musique_fkey FOREIGN KEY (id_musique)
        REFERENCES public.musique (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT appartient_id_playlist_fkey FOREIGN KEY (id_playlist)
        REFERENCES public.playlist (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

CREATE TABLE proprietaire
(
    id serial,
    nom character varying(150) COLLATE pg_catalog."default" NOT NULL,
    prenom character varying(150) COLLATE pg_catalog."default" NOT NULL,
    telephone character varying(150) COLLATE pg_catalog."default" NOT NULL,
    mail character varying(150) COLLATE pg_catalog."default" NOT NULL,
    adresse character varying(250) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT proprietaire_pkey PRIMARY KEY (id)
);


CREATE TABLE etablissement
(
    id serial,
    id_proprietaire integer NOT NULL,
    nom character varying(150) COLLATE pg_catalog."default" NOT NULL,
    adresse character varying(250) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT etablissement_pkey PRIMARY KEY (id),
    CONSTRAINT etablissement_id_proprietaire_fkey FOREIGN KEY (id_proprietaire)
        REFERENCES public.proprietaire (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);


CREATE TABLE jukebox
(
    id serial,
    id_etablissement integer NOT NULL,
    id_playlist integer NOT NULL,
    nom character varying(150) COLLATE pg_catalog."default" NOT NULL,
    date_creation date NOT NULL,
    etat integer NOT NULL,
    CONSTRAINT jukebox_pkey PRIMARY KEY (id),
    CONSTRAINT jukebox_id_etablissement_fkey FOREIGN KEY (id_etablissement)
        REFERENCES public.etablissement (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT jukebox_id_playlist_fkey FOREIGN KEY (id_playlist)
        REFERENCES public.playlist (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);