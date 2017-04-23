module.exports = {
  hostname : 'localhost',
  port : 80,
  fb_appid : 291888114572237,
  fb_secret : '27e4bc144068fcbc7f81a393d582c65f',
  st_key : 'D66F1513084C6633AC47944E35FF8203',
  convertSteam64to32 : function(id64){
      var id = Number(id64.substr(3));
      return id - 61197960265728;
  }
};
