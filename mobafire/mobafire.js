const request = require('request');

module.exports = {
	/*getAllChampions this function returns all champions in mobafire*/
	getAllChampions: function(callback){
		/*connect to mobafire*/
		request('https://www.mobafire.com/', (err,res,body)=>{
			if(!err){
				let arrayChampions = [];/*array contain all champions and path*/
				let splitDivChampions = body.split('<div class="footer-links">')[1].split('</div>')[0].split('\n');/*split only div with all champions*/
				splitDivChampions.forEach((elem)=>{
					if(elem != ''){
						let patternPath = new RegExp("(?<=\")(.*?)(?=\<)","g");
						let path = elem.match(patternPath);
						let splitNameAndPath = path[0].split('">');
						arrayChampions.push({
							path: splitNameAndPath[0],
							name: splitNameAndPath[1]
						})
					}
				})
				if(!callback){
					console.error('you must pass callback')
				}else if(typeof callback == "function"){
					callback(arrayChampions)
				}
			}else{
				throw err
			}
		});
	}
}