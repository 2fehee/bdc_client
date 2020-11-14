

module.exports = function(app, api){
	//블록체인 서비스 연결
	app.post('/signCreateCertificate', api.block.signCreateCertificate);
	app.get('/certificateInfo/bID/:bID/cID/:cID', api.block.certificateInfo);
	app.get('/checkLatestCertificate/bID/:bID/cID/:cID/certificateHash/:certificateHash', api.block.checkLatestCertificate);
	app.get('/newBNFTTxObject', api.block.newBNFTTxObject);





	//ui 라우팅
	app.get('/seller_chatbot', api.ui.seller_chatbot); //챗봇 - 판매자
	app.get('/buyer_chatbot', api.ui.buyer_chatbot); //챗봇 - 구매자


	app.all('*', function(req, res) {
		res.send(404);
	});

};
