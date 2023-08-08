curl http://localhost:3003/api/blogs | json_pp -json_opt pretty,canonical  

curl http://localhost:3003/api/users | json_pp -json_opt pretty,canonical  

curl -H "Content-Type: application/json" -X POST -d '{"title":"title1"}' http://localhost:3003/api/blogs | json_pp -json_opt pretty,canonical

curl -H "Content-Type: application/json" -X POST -d '{"username":"tomy1213","password":"tommy123","name":"Tonny Montana"}' http://localhost:3003/api/users | json_pp -json_opt pretty,canonical

curl -H "Content-Type: application/json" -X POST -d '{"username":"tommy","password":"tommy123"}' http://localhost:3003/api/login | json_pp -json_opt pretty,canonical

curl -H "Content-Type: application/json" -H "Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRvbW15IiwiaWQiOiI2NDg5NGQwOGVjOGQ0ZTgxMGRlZDQzZDEiLCJpYXQiOjE2ODY3MTk4MDl9.Vb0E6JNbWZTSiHXtXUnt7pT_yLMy8novvFAOqxoYKFA" -X POST -d '{"title":"title1"}' http://localhost:3003/api/blogs | json_pp -json_opt pretty,canonical
