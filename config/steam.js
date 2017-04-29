module.exports = {
  secret : 'D66F1513084C6633AC47944E35FF8203',
  convertSteam64to32 : function(id){
      return Number(id.substr(3)) - 61197960265728;
  }
};
