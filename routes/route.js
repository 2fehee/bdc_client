const multer = require('multer');
const path = require('path');
const Web3 = require('web3');
const ethTx = require("ethereumjs-tx")
var request = require('request');



let bcmUrl = "http://localhost";  //개발
//let bcmUrl = "http://13.209.56.140"; //운영
let bcmPort = ":5000";

const authToken = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJwNHIzcHo3Y25MX25IVFZqbWYyUDJYZGRQZHNxUG4tRExwTXExcEVEanlFIn0.eyJleHAiOjE1OTQ5NjIwNzcsImlhdCI6MTU5MjM3MDA3NywianRpIjoiOTg3NTA1NzktODY2NC00MWQ2LWFkZWItZTcxYzVhNWI4MjcxIiwiaXNzIjoiaHR0cHM6Ly9jaGFpbnpkZXYtaWFtLnNrY2MuY29tL2F1dGgvcmVhbG1zL2NoYWlueiIsImF1ZCI6WyJrZXktbWFuYWdlbWVudC1zZXJ2aWNlIiwidG9rZW4tc2VydmljZSIsImFjY291bnQiXSwic3ViIjoiYWNkZDlmNmItMmYyMC00YmY1LTk5N2QtYmUwZTBlZTI0OTdmIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoia3JzLXRlc3QiLCJzZXNzaW9uX3N0YXRlIjoiNmE0NWE2NmEtYzQ5Mi00Mjc3LTk2NzItYTFmMjYzZjVjZjY4IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJPUEVSQVRPUiIsIm9mZmxpbmVfYWNjZXNzIiwiUFJPVklERVIiLCJ1bWFfYXV0aG9yaXphdGlvbiIsIkFETUlOIiwiVVNFUiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgYnRzLXNjb3BlIGtycy1zY29wZSBwcm9maWxlIiwiY2xpZW50SG9zdCI6IjIxMS40NS42MC4xIiwiY2xpZW50SWQiOiJrcnMtdGVzdCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiYXV0aC1pZCI6InNlcnZpY2UtYWNjb3VudC1rcnMtdGVzdCIsInByb3ZpZGVyLWNvZGUiOiJrcnMtdGVzdCIsInByZWZlcnJlZF91c2VybmFtZSI6InNlcnZpY2UtYWNjb3VudC1rcnMtdGVzdCIsImNsaWVudEFkZHJlc3MiOiIyMTEuNDUuNjAuMSIsImF1dGhvcml0aWVzIjpbIlJPTEVfT1BFUkFUT1IiLCJST0xFX29mZmxpbmVfYWNjZXNzIiwiUk9MRV9QUk9WSURFUiIsIlJPTEVfVVNFUiIsIlJPTEVfdW1hX2F1dGhvcml6YXRpb24iLCJST0xFX0FETUlOIiwiUk9MRV9PUEVSQVRPUiIsIlJPTEVfb2ZmbGluZV9hY2Nlc3MiLCJST0xFX1BST1ZJREVSIiwiUk9MRV9VU0VSIiwiUk9MRV91bWFfYXV0aG9yaXphdGlvbiIsIlJPTEVfQURNSU4iXX0.hcggzp6NQZ8nulcj-xk0XkbeSjwmDODFWI--K2D3X5dpyowcxfAHbTmtrEql75exB90drFCrqR8F8OxYdMKFYkPe2-RiffHO1pGGcpXUuGCcMopxgKvSFi1-aUJFgaHxPcAR4kMC2msePvV4HmxrhA4rvH-GZyVDFXQWIu5tNH809wNJDrL7J-O0AcsYqdqEX0eO5r-kNi-atljPSPI2QqNRR52iaETx3Y39QSuHwsY4DH_NO943sPlg1QMVepGQUS1dLl8KL5AjsCUC4oy3VB_CUpN0lpD5-TrvWjthoM95gAwHBVpup_AqTPGTGDKRPhICH8h70n9tgqNRj_ASuQ';

var fs = require('fs');

// function to encode file data to base64 encoded string
// function base64_encode(file) {
// 	// read binary data
// 	var bitmap = fs.readFileSync(file);
// 	// convert binary data to base64 encoded string
// 	return new Buffer(bitmap).toString('base64');
// }

module.exports = function(app, api){
	let storage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, 'uploads');
		},
		filename: function (req, file, cb) {
			cb(null, setFile(file));
		}
	});

	function setFile(file) {
		let oriFile = file.originalname;
		let ext = path.extname(oriFile);
		let name = path.basename(oriFile, ext);
		let rnd = Math.floor(Math.random() * 90) + 10; // 10 ~ 99
		return Date.now() + '-' + rnd + '-' + name + ext;
	}

	let upload = multer({
		storage: storage
	});

	// upload.none(): only for text-only multipart form
	// upload.single('field-name'): only one file
	app.post(['/signCreateCertificate'], upload.any(), (req, res) => {
		console.log(req.body);
		console.log(req.files);
		console.log(req.files[0].path);
		let data = fs.readFileSync(path.join(__dirname,'/../uploads/',req.files[0].filename));

		let buf = Buffer.from(data);
		let base64str = buf.toString('base64');
		console.log('Base64 of xxx.pdf :' + base64str);

		input_data = {};

		input_data.from = req.body.createCertificate_addressFrom;
		input_data.bID = req.body.createCertificate_bID;
		input_data.cID = req.body.createCertificate_cID;
		input_data.grade = req.body.createCertificate_grade;
		input_data.evaluationDate = req.body.createCertificate_evaluationDate;
		input_data.evaluationAgency = req.body.createCertificate_evaluationAgency;
		input_data.cFile = base64str;

		const preparationUrl = bcmUrl + bcmPort + '/api/v1/certificate/preparation/newCertiTxObject';
		const sendSignedUrl = bcmUrl + bcmPort + '/api/v1/certificate/SignedTx';

		var OPTIONS = {
			headers:{"Content-Type":"application/json",Accept:"application/json"},
			url: preparationUrl,
			body: JSON.stringify(input_data)
		};

		request.post(OPTIONS, function (err, response, result) {

			let infoObject = result;
			console.log("infoObject: " + infoObject);

			const web3 = new Web3();
			web3.transactionConfirmationBlocks = 1;

			const privateKey = req.body.createCertificate_privateKey;
			const privKey = Buffer.from(privateKey, 'hex');
			console.log("privKey :" + privKey);
			let tx = new ethTx(JSON.parse(infoObject).result);
			tx.sign(privKey);                                         //privateKey로 sign

			let serializedTx = tx.serialize(undefined);                        //sign 결과 값을 직렬화 함
			let signedData = '0x' + serializedTx.toString('hex');       //hex 값으로 변경
			console.log("signedData : " + signedData);

			var OPTIONS = {
				headers: {'Content-Type': 'application/json', 'Authorization': authToken},
				url: sendSignedUrl,
				body: JSON.stringify({
					"signedData": signedData
				})
			};

			request.post(OPTIONS, function (err, response, result) {
				let txResult = result;
				console.log("txResult: " + txResult);
				res.json(JSON.parse(txResult));
			});
		});
	});

	app.post(['/checkLatestCertificate'], upload.any(), (req, res) => {
		console.log(req.body);
		console.log(req.files);
		console.log(req.files[0].path);
		let data = fs.readFileSync(path.join(__dirname,'/../uploads/',req.files[0].filename));

		let buf = Buffer.from(data);
		let base64str = buf.toString('base64');
		console.log('Base64 of xxx.pdf :' + base64str);

		input_data = {};

		input_data.bID = req.body.checkLatestCertificate_bID;
		input_data.cID = req.body.checkLatestCertificate_cID;
		input_data.grade = req.body.checkLatestCertificate_grade;
		input_data.evaluationDate = req.body.checkLatestCertificate_evaluationDate;
		input_data.evaluationAgency = req.body.checkLatestCertificate_evaluationAgency;
		input_data.cFile = base64str;

		const getInfoUrl = bcmUrl + bcmPort + '/api/v1/certificate/checkLatestCertificate';

		var OPTIONS = {
			headers: {'Content-Type': 'application/json', 'Authorization': authToken},
			url: getInfoUrl,
			body: JSON.stringify(input_data)
		};

		request.post(OPTIONS, function (err, response, result) {
			console.log("result: " + result);
			res.json(JSON.parse(result));
		});
	});
	//-----------------------------------------------------------------
	//블록체인 서비스 연결
	//app.post('/signCreateCertificate', api.block.signCreateCertificate);
	app.get('/certificateInfo/bID/:bID/cID/:cID', api.block.certificateInfo);
	//app.get('/checkLatestCertificate/bID/:bID/cID/:cID/certificateHash/:certificateHash', api.block.checkLatestCertificate);
	app.post('/newBNFT', api.block.newBNFT);
	app.get('/getBalanceOfBPT/from/:from', api.block.getBalanceOfBPT);
	app.post('/transferBPT', api.block.transferBPT);
	app.get('/getOwnerOfBNFT/bID/:bID', api.block.getOwnerOfBNFT);
	app.post('/transferFromBNFT', api.block.transferFromBNFT);
	app.post('/initBNFT', api.block.initBNFT);
	app.post('/initBPT', api.block.initBPT);



	//ui 라우팅
	app.get('/seller_chatbot', api.ui.seller_chatbot); //챗봇 - 판매자
	app.get('/buyer_chatbot', api.ui.buyer_chatbot); //챗봇 - 구매자


	app.all('*', function(req, res) {
		res.send(404);
	});

};
