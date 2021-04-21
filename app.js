const express = require('express');
const app = express();
/*mobafire.js is only for download page content*/
const moba  = require('./mobafire/mobafire.js')

/*moba.getAllChampions((champions)=>{
	console.log(champions,'form app.js')
})*/
/*moba.getBuildPath('/league-of-legends/taliyah-guide',(body)=>{
	console.log(body)
})*/
moba.getguide('/league-of-legends/build/dumb-taliyah-support-guide-586468',(body)=>{
	console.log(body)
})

const port = process.env.PORT || 3030;

app.listen(port, ()=> console.log(`server started on port ${port}`));