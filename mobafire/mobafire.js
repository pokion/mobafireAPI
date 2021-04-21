const request = require('request');
const cheerio = require('cheerio');

module.exports = {
	connect: function(callback,path){
		let pathToUrl = path || '';
		request('https://www.mobafire.com'+path,(err,res,body)=>{
			if(!err){
				callback(body);
			}else if(err){
				throw err
			}
		})
	},
	/*getAllChampions this function returns all champions in mobafire*/
	getAllChampions: function(callback){
		this.connect((body)=>{
			let arrayChampions = [];/*array contain all champions and path*/
			let splitDivChampions = body.split('<div class="footer-links">')[1].split('</div>')[0].split('\n');/*split only div with all champions*/
			splitDivChampions.forEach((elem)=>{
				if(elem != ''){
					let patternPath = new RegExp("(?<=\")(.*?)(?=\<)","g");/*pattern for extract only link and champion*/
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
				callback(arrayChampions)/*return champions to rift xD*/
			}
		})
		
	},
	getBuildPath: function(path,callback){
		this.connect((body)=>{
			let $ = cheerio.load(body)
			let elemA = $('.browse-list>a')
			let arr = [];
			for(let i=0;i<elemA.length;i++){
				let href = elemA[i].attribs.href
				let Role = $(elemA[i]).find('div.browse-list__item__pic')[0].attribs.class.split(' ');
				arr.push({
					href,
					role: Role.length > 1 ? Role[1] : null
				})
			}

			callback(arr)
		},path)
	},
	getguide: function(path,callback){
		this.connect(body =>{
			let $ = cheerio.load(body);
			let runes = $('.new-runes__primary')
			callback(runes)
		},path)
	}
}