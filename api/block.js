exports.signCreateCertificate = function(req, res){
	console.log("from: " + req.body.from);

	const from = req.body.from;
	const privateKey = req.body.privateKey;

	const bID = req.body.bID;
	const cID = req.body.cID;
	const grade = req.body.grade;
	const evaluationDate = req.body.evaluationDate;
	const evaluationAgency = req.body.evaluationAgency;
	const certificateHash = req.body.certificateHash;

	const preparationUrl = bcmUrl + bcmPort + '/api/v1/certificate/preparation/newInfo?from=' + from + '&bID=' + bID + '&cID=' + cID + '&grade=' + grade + '&evaluationDate=' + evaluationDate + '&evaluationAgency=' + evaluationAgency + '&certificateHash=' + certificateHash;
	const sendSignedUrl = bcmUrl + bcmPort + '/api/v1/certificate/sendSignedTx';

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
