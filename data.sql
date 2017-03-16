--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.4
-- Dumped by pg_dump version 9.5.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: todos; Type: TABLE; Schema: public; Owner: asantos3026
--

CREATE TABLE todos (
    id integer NOT NULL,
    user_id integer NOT NULL,
    title character varying(255) NOT NULL,
    completed boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    rank integer NOT NULL
);


ALTER TABLE todos OWNER TO asantos3026;

--
-- Name: todos_id_seq; Type: SEQUENCE; Schema: public; Owner: asantos3026
--

CREATE SEQUENCE todos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE todos_id_seq OWNER TO asantos3026;

--
-- Name: todos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: asantos3026
--

ALTER SEQUENCE todos_id_seq OWNED BY todos.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: asantos3026
--

CREATE TABLE users (
    id integer NOT NULL,
    avatar character varying(500),
    email character varying(255) NOT NULL,
    encrypted_password character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE users OWNER TO asantos3026;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: asantos3026
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO asantos3026;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: asantos3026
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: asantos3026
--

ALTER TABLE ONLY todos ALTER COLUMN id SET DEFAULT nextval('todos_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: asantos3026
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Data for Name: todos; Type: TABLE DATA; Schema: public; Owner: asantos3026
--

COPY todos (id, user_id, title, completed, created_at, rank) FROM stdin;
\.


--
-- Name: todos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: asantos3026
--

SELECT pg_catalog.setval('todos_id_seq', 1, false);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: asantos3026
--

COPY users (id, avatar, email, encrypted_password, created_at) FROM stdin;
1	https://api.adorable.io/avatars/285/abott@adorable.png	a@a.a	1234	2017-03-16 10:39:51.934982
2	http://lorempixel.com/400/200/	b@b.b	test	2017-03-16 10:44:26.281273
3	http://lorempixel.com/400/200/	c@c.c	password	2017-03-16 10:44:26.281273
4	http://lorempixel.com/400/200/	d@d.d	password	2017-03-16 10:44:26.281273
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: asantos3026
--

SELECT pg_catalog.setval('users_id_seq', 1, false);


--
-- Name: todos_pkey; Type: CONSTRAINT; Schema: public; Owner: asantos3026
--

ALTER TABLE ONLY todos
    ADD CONSTRAINT todos_pkey PRIMARY KEY (id);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: asantos3026
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: email; Type: INDEX; Schema: public; Owner: asantos3026
--

CREATE UNIQUE INDEX email ON users USING btree (email);


--
-- Name: public; Type: ACL; Schema: -; Owner: asantos3026
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM asantos3026;
GRANT ALL ON SCHEMA public TO asantos3026;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

