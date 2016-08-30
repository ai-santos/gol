INSERT INTO
  users (avatar, email, encrypted_password, created_at)
VALUES
  (NULL, 'e@e.com', 123, now()),
  (NULL, 'f@f.com', 'fff', now()),
  (NULL, 'g@g.com', 'CATS', now()),
  (NULL, 'h@h.com', 123, now());

INSERT INTO
  todos (title, completed, created_at, user_id, rank)
VALUES
  ('buy milk', TRUE, now(), 1, 1),
  ('buy cereal', TRUE, now(), 1, 2),
  ('buy butter', FALSE, now(), 1, 3),
  ('buy bread', TRUE, now(), 2, 1);
