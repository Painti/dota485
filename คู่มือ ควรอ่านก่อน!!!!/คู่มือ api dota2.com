GET /items skill hero
http://www.dota2.com/jsfeed/heropediadata?feeds=itemdata,abilitydata,herodata&l=english&callback=HeropediaDFReceive -> ภาษาอังกฤษ
http://www.dota2.com/jsfeed/heropediadata?feeds=itemdata,abilitydata,herodata&l=thai&callback=HeropediaDFReceive -> ภาษาไทย

GET /heroes
http://www.dota2.com/jsfeed/heropickerdata
http://www.dota2.com/jsfeed/heropickerdata?l=thai -> ภาษาไทย

GET /items
http://www.dota2.com/jsfeed/heropediadata?feeds=itemdata&l=english&callback=HeropediaDFReceive

GET /skill
http://www.dota2.com/jsfeed/heropediadata?feeds=abilitydata&l=english&callback=HeropediaDFReceive

GET /ILeaderboard
http://www.dota2.com/webapi/ILeaderboard/GetDivisionLeaderboard/v0001?division=europe
  division => [china, se_asia, americas, europe]

GET /จำนวนผู้เล่นทั้งหมด
http://www.dota2.com/jsfeed/uniqueusers?callback=populateUniqueUsers
