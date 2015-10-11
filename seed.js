var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('forum.db');

db.run("INSERT INTO user ( name , contact_number , username , password ) VALUES (?,?,?,?) , (?,?,?,?)",
   'David Patlut','917-771-2221','dpatlut@gmail.com','ga123',
   'Viki Hallow','913-741-5221','viki@gmail.com','secret',
   function(err){
      if(err){
        throw err
      }
   }
);

db.run("INSERT INTO thread (author , category_id , post_date , short_descr , content , location , comment_counter ) VALUES (?,?,?,?,?,?,?) , (?,?,?,?,?,?,?)",
   1 , 1 , "7/13/2015" , "Mac Air Lost!" , " I lost my mac in class yesterday please help me find it!" , "Room : 3A" , 1,
   2 , 2 , "7/13/2015" , "Charger Lost!" , " I lost my charger in class yesterday please help me find it!" , "Room : 3A" , 1,
   function(err){
      if(err){
        throw err
      }
   }
);

db.run("INSERT INTO comments (unique_id , comment_author , thread_relation , comment_number, context , parent , child) VALUES (?,?,?,?,?,?,?) , (?,?,?,?,?,?,?)" ,
   234512 , 1 , 1 , 1 ,"TEST 1", 1 , 0,
   323365 , 2 , 2 , 1 ,"TEST 2", 1 , 0,
   function(err){
      if(err){
        throw err
      }
   }
);

db.run("INSERT INTO categories (cat_id , category) VALUES (?,?) , (?,?) , (?,?) , (?,?) , (?,?) , (?,?) , (?,?)" ,
   1 , "Electronics (Phone,Laptop,etc.)",
   2 , "Charger",
   3 , "Clothing",
   4 , "Backpacks",
   5 , "Umbrella",
   6 , "Jewerly",
   7 , "Miscellaneous",
   function(err){
      if(err){
        throw err
      }
   }
);

