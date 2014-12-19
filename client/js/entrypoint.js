define(['lib/sha1', 'util'],function() {

    var EntryPoint = Class.extend({
		init: function(){
			//"hashedID" ← use tools/sha1_encode.html to generate: function(){} ← action
			this.hashes = {
				"R43qJrwEOMlH5tYehXDx+kmH1ls=": function(aGame){
					aGame.player.switchArmor(aGame.sprites["firefox"]);
          console.log(aGame.player);
					aGame.showNotification("You enter the game as a fox, but not invincible…");
				}
			};
		},
		
		execute: function(game){
			var res = false;
			var ID = getUrlVars()["entrance"];
			if(ID!=undefined){
				var shaObj = new jsSHA(ID, 'TEXT');
				var hash = shaObj.getHash("SHA-1", 'B64');
				if(this.hashes[hash]==undefined){
					game.showNotification("Nice try little scoundrel… bad code, though");
				}
				else{
					this.hashes[hash](game);
					res = true;
				}
			}
			return res;
		}
    });

    return EntryPoint;
});
