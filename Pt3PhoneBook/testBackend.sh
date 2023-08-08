#! /usr/bin/bash
echo -n "1 for get All, 2 for get with id, 3 for create, 4 for delete "
read action
if [[ $action == 1 ]]; then
  curl http://localhost:3001/api/persons | json_pp -json_opt pretty,canonical  
elif [[ $action == 2 ]]; then
  echo -n "gib id "
  read id
  curl http://localhost:3001/api/persons/${id} | json_pp -json_opt pretty,canonical  
elif [[ $action == 3 ]]; then
  curl -H "Content-Type: application/json" -X POST -d '{"name":"xyz","number":"xyz"}' http://localhost:3001/api/persons | json_pp -json_opt pretty,canonical  
elif [[ $action == 4 ]]; then
  echo -n "gib id "
  read id
  curl -H "Content-Type: application/json" -X DELETE http://localhost:3001/api/persons/6482b803a270efb823a3cfb0 | json_pp -json_opt pretty,canonical  
fi
