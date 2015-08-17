DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS thread;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS categories;
CREATE TABLE user(
	user_id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT,
	contact_number TEXT,
	username VARCHAR,
	password VARCHAR,
	salt TEXT
);

PRAGMA foreign_keys = ON;

CREATE TABLE thread (
  thread_id INTEGER PRIMARY KEY AUTOINCREMENT,
  author INTEGER,
  category_id INTEGER,
  post_date TEXT,
  short_descr TEXT,
  content TEXT,
  location TEXT,
  comment_counter INTEGER,
  FOREIGN KEY(author) REFERENCES user(user_id)
);

CREATE TABLE comments (
  unique_id INTEGER PRIMARY KEY,
  comment_author INTEGER,
  thread_relation INTEGER,
  comment_number INTEGER,
  context TEXT,
  parent INTEGER ,
  child INTEGER ,
  FOREIGN KEY(comment_author) REFERENCES user(user_id),
  FOREIGN KEY(thread_relation) REFERENCES thread(thread_id),
  FOREIGN KEY(comment_number) REFERENCES thread(comment_counter)
);

CREATE TABLE categories (
  cat_id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT,
  FOREIGN KEY(cat_id) REFERENCES thread(category_id)
);




