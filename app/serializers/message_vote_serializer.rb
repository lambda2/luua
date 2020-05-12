class MessageVoteSerializer < Panko::Serializer
  attributes :id, :message_id, :vote, :user_id

  
end


# curl 'http://localhost:3232/api/discussions/roles-des-utilisateurs/messages_votes/mines' \
#   -H 'Connection: keep-alive' \
#   -H 'Pragma: no-cache' \
#   -H 'Cache-Control: no-cache' \
#   -H 'Accept: application/json' \
#   -H 'DNT: 1' \
#   -H 'authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI5OTZlN2JiZi1lZDdhLTQxYWQtOWExNy1lZjNmZGQzMjVkYWUiLCJlbWFpbCI6ImFkbWluQGx1dWEuaW8iLCJzdWIiOiIxIiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNTg5MzA4NDc2LCJleHAiOjE1ODkzOTQ4NzZ9.98RCLhq3m6bbAD2aw0j3pM5EDwAmGkYvoq-MK_CDCyU' \
#   -H 'Accept-Language: fr' \
#   -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36' \
#   -H 'Origin: http://localhost:3000' \
#   -H 'Referer: http://localhost:3000/manage/1/discussions/roles-des-utilisateurs'
