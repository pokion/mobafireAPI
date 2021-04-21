const express = require('express');
const app = express();
/*mobafire.js is only for download page content*/
const moba  = require('./mobafire/mobafire.js')

moba.getAllChampions((champions)=>{
	console.log(champions,'form app.js')
})

const port = process.env.PORT || 3030;

app.listen(port, ()=> console.log(`server started on port ${port}`));