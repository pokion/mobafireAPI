const http = require('http')
const request = require('request');

module.exports = {
	/*getAllChampions this function returns all champions in mobafire*/
	getAllChampions: function(){
		/*connect to mobafire*/
		request('https://www.mobafire.com/', (err,res,body)=>{
			console.error('err',err);
			if(!err){
				let arrayChampions;
				let splitDivChampions = body.split('<div class="footer-links">')[1].split('</div>')[0].split('\n');/*split only div with all champions*/
				splitDivChampions.forEach((elem)=>{
					let patternPath = new RegExp("(?<=\")(.*?)(?=\<)","g");
					let path = elem.match(patternPath);
					for(const item of path) console.log(item)
				})
			}else{
				throw err
			}
		});
	}
}