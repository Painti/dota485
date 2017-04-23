
GET /heroes
http://www.dota2.com/jsfeed/heropickerdata
http://www.dota2.com/jsfeed/heropickerdata?l=thai -> ภาษาไทย



GET /ILeaderboard
http://www.dota2.com/webapi/ILeaderboard/GetDivisionLeaderboard/v0001?division=europe
  division => [china, se_asia, americas, europe]
