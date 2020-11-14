
const Web3 = require('web3');
const ethTx = require("ethereumjs-tx")
var request = require('request');



let bcmUrl = "http://localhost";
let bcmPort = ":5000";

const authToken = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJwNHIzcHo3Y25MX25IVFZqbWYyUDJYZGRQZHNxUG4tRExwTXExcEVEanlFIn0.eyJleHAiOjE1OTQ5NjIwNzcsImlhdCI6MTU5MjM3MDA3NywianRpIjoiOTg3NTA1NzktODY2NC00MWQ2LWFkZWItZTcxYzVhNWI4MjcxIiwiaXNzIjoiaHR0cHM6Ly9jaGFpbnpkZXYtaWFtLnNrY2MuY29tL2F1dGgvcmVhbG1zL2NoYWlueiIsImF1ZCI6WyJrZXktbWFuYWdlbWVudC1zZXJ2aWNlIiwidG9rZW4tc2VydmljZSIsImFjY291bnQiXSwic3ViIjoiYWNkZDlmNmItMmYyMC00YmY1LTk5N2QtYmUwZTBlZTI0OTdmIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoia3JzLXRlc3QiLCJzZXNzaW9uX3N0YXRlIjoiNmE0NWE2NmEtYzQ5Mi00Mjc3LTk2NzItYTFmMjYzZjVjZjY4IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJPUEVSQVRPUiIsIm9mZmxpbmVfYWNjZXNzIiwiUFJPVklERVIiLCJ1bWFfYXV0aG9yaXphdGlvbiIsIkFETUlOIiwiVVNFUiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgYnRzLXNjb3BlIGtycy1zY29wZSBwcm9maWxlIiwiY2xpZW50SG9zdCI6IjIxMS40NS42MC4xIiwiY2xpZW50SWQiOiJrcnMtdGVzdCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiYXV0aC1pZCI6InNlcnZpY2UtYWNjb3VudC1rcnMtdGVzdCIsInByb3ZpZGVyLWNvZGUiOiJrcnMtdGVzdCIsInByZWZlcnJlZF91c2VybmFtZSI6InNlcnZpY2UtYWNjb3VudC1rcnMtdGVzdCIsImNsaWVudEFkZHJlc3MiOiIyMTEuNDUuNjAuMSIsImF1dGhvcml0aWVzIjpbIlJPTEVfT1BFUkFUT1IiLCJST0xFX29mZmxpbmVfYWNjZXNzIiwiUk9MRV9QUk9WSURFUiIsIlJPTEVfVVNFUiIsIlJPTEVfdW1hX2F1dGhvcml6YXRpb24iLCJST0xFX0FETUlOIiwiUk9MRV9PUEVSQVRPUiIsIlJPTEVfb2ZmbGluZV9hY2Nlc3MiLCJST0xFX1BST1ZJREVSIiwiUk9MRV9VU0VSIiwiUk9MRV91bWFfYXV0aG9yaXphdGlvbiIsIlJPTEVfQURNSU4iXX0.hcggzp6NQZ8nulcj-xk0XkbeSjwmDODFWI--K2D3X5dpyowcxfAHbTmtrEql75exB90drFCrqR8F8OxYdMKFYkPe2-RiffHO1pGGcpXUuGCcMopxgKvSFi1-aUJFgaHxPcAR4kMC2msePvV4HmxrhA4rvH-GZyVDFXQWIu5tNH809wNJDrL7J-O0AcsYqdqEX0eO5r-kNi-atljPSPI2QqNRR52iaETx3Y39QSuHwsY4DH_NO943sPlg1QMVepGQUS1dLl8KL5AjsCUC4oy3VB_CUpN0lpD5-TrvWjthoM95gAwHBVpup_AqTPGTGDKRPhICH8h70n9tgqNRj_ASuQ';

exports.signCreateCertificate = function(req, res){

	/*
	const from = req.body.from;
	const privateKey = req.body.privateKey;

	const bID = req.body.bID;
	const cID = req.body.cID;
	const grade = req.body.grade;
	const evaluationDate = req.body.evaluationDate;
	const evaluationAgency = req.body.evaluationAgency;
	const certificateHash = req.body.certificateHash;

	const preparationUrl = bcmUrl + bcmPort + '/api/v1/certificate/preparation/newCertiTxObject?from=' + from + '&bID=' + bID + '&cID=' + cID + '&grade=' + grade + '&evaluationDate=' + evaluationDate + '&evaluationAgency=' + evaluationAgency + '&certificateHash=' + certificateHash;
	const sendSignedUrl = bcmUrl + bcmPort + '/api/v1/certificate/SignedTx';

	var OPTIONS = {
			headers:{"Content-Type":"application/json",Accept:"application/json"},
			url: preparationUrl,
	};

	request.get(OPTIONS, function (err, response, result) {

			var infoObject = result;
			console.log("infoObject: " + infoObject);

			const web3 = new Web3();
			web3.transactionConfirmationBlocks = 1;

			const privKey = Buffer.from(privateKey, 'hex');
			console.log("privKey :" + privKey);
			var tx = new ethTx(JSON.parse(infoObject).result);
			tx.sign(privKey);                                         //privateKey로 sign

			var serializedTx = tx.serialize(undefined);                        //sign 결과 값을 직렬화 함
			var signedData = '0x' + serializedTx.toString('hex');       //hex 값으로 변경
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

	 */
};

exports.certificateInfo = function(req, res) {

    const bID = req.params.bID;
    const cID = req.params.cID;

    console.log("bID : " + req.params.bID);

    const getInfoUrl = bcmUrl + bcmPort + '/api/v1/certificate/certificateInfo?bID=' + bID + '&cID=' + cID;

    var OPTIONS = {
        headers: {'Content-Type': 'application/json', 'Authorization': authToken},
        url: getInfoUrl
    };

    request.get(OPTIONS, function (err, response, result) {
        console.log("result: " + result);
        res.json(JSON.parse(result));
    });
};

exports.checkLatestCertificate = function(req, res) {

		const bID = req.params.bID;
		const cID = req.params.cID;
		const certificateHash = req.params.certificateHash;

		console.log("bID : " + req.params.bID);

		const getInfoUrl = bcmUrl + bcmPort + '/api/v1/certificate/checkLatestCertificate?bID=' + bID + '&cID=' + cID + '&certificateHash=' + certificateHash;

		var OPTIONS = {
				headers: {'Content-Type': 'application/json', 'Authorization': authToken},
				url: getInfoUrl
		};

		request.get(OPTIONS, function (err, response, result) {
				console.log("result: " + result);
				res.json(JSON.parse(result));
		});
};

exports.newBNFTTxObject = function(req, res){

	var privateKey = "8d60624a1f2c5eb805a5e6dc8aab9577e9edafa5d5ee867af88f1a7542f86919";

	data = {
		from : "0xE0804701Fb5F86bE3fDa9977B590d7899933a278",
		bID : 11,
		ownerName : "배판매",
		manufacturerName : "SKI",
		modelName : "SKI_10",
		manufacturerDate : "2020-11-14",
	}

	const preparationUrl = bcmUrl + bcmPort + '/api/v1/certificate/preparation/newBNFTTxObject';
	const sendSignedUrl = bcmUrl + bcmPort + '/api/v1/certificate/SignedTx';

	var OPTIONS = {
		headers:{"Content-Type":"application/json",Accept:"application/json"},
		url: preparationUrl,
		qs: data
	};

	request.get(OPTIONS, function (err, response, result) {

		var infoObject = result;
		console.log("infoObject: " + infoObject);

		const web3 = new Web3();
		web3.transactionConfirmationBlocks = 1;

		const privKey = Buffer.from(privateKey, 'hex');
		console.log("privKey :" + privKey);
		var tx = new ethTx(JSON.parse(infoObject).result);
		tx.sign(privKey);                                         //privateKey로 sign

		var serializedTx = tx.serialize(undefined);                        //sign 결과 값을 직렬화 함
		var signedData = '0x' + serializedTx.toString('hex');       //hex 값으로 변경
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
};

exports.getBalanceOfBPT = function(req, res) {

	console.log("from : " + req.params.from);

	data = {
		from : req.params.from
	}
	const getInfoUrl = bcmUrl + bcmPort + '/api/v1/certificate/balanceOfBPT';

	var OPTIONS = {
		headers: {'Content-Type': 'application/json', 'Authorization': authToken},
		url: getInfoUrl,
		qs: data
	};

	request.get(OPTIONS, function (err, response, result) {
		console.log("result: " + result);
		res.json(JSON.parse(result));
	});
};

exports.transferBPT = function(req, res){

	const from = req.body.from;
	const privateKey = req.body.privateKey;

	const recipient = req.body.recipient;
	const amount = req.body.amount;

	data = {
		from : from,
		recipient : recipient,
		amount : amount
	}

	const preparationUrl = bcmUrl + bcmPort + '/api/v1/certificate/preparation/TransferBPTTxObject';
	const sendSignedUrl = bcmUrl + bcmPort + '/api/v1/certificate/SignedTx';

	var OPTIONS = {
		headers:{"Content-Type":"application/json",Accept:"application/json"},
		url: preparationUrl,
		qs: data
	};

	request.get(OPTIONS, function (err, response, result) {

		var infoObject = result;
		console.log("infoObject: " + infoObject);

		const web3 = new Web3();
		web3.transactionConfirmationBlocks = 1;

		const privKey = Buffer.from(privateKey, 'hex');
		console.log("privKey :" + privKey);
		var tx = new ethTx(JSON.parse(infoObject).result);
		tx.sign(privKey);                                         //privateKey로 sign

		var serializedTx = tx.serialize(undefined);                        //sign 결과 값을 직렬화 함
		var signedData = '0x' + serializedTx.toString('hex');       //hex 값으로 변경
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
};

exports.getBalanceOfBNFT = function(req, res) {

	console.log("from : " + req.params.from);

	data = {
		from : req.params.from
	}
	const getInfoUrl = bcmUrl + bcmPort + '/api/v1/certificate/balanceOfBNFT';

	var OPTIONS = {
		headers: {'Content-Type': 'application/json', 'Authorization': authToken},
		url: getInfoUrl,
		qs: data
	};

	request.get(OPTIONS, function (err, response, result) {
		console.log("result: " + result);
		res.json(JSON.parse(result));
	});
};