
const BizUrl = "http://localhost";
//const BizPort = ":6001";
const BizPort = ":"+location.port;

$(document).ready(function() {

    $("#createCertificate").on('click', function(event) {

        //preventDefault 는 기본으로 정의된 이벤트를 작동하지 못하게 하는 메서드이다. submit을 막음
        event.preventDefault();

        // Get form
        var form = $('#frmCreateCertificate')[0];

        // Create an FormData object
        var data = new FormData(form);


        $.ajax({
            url : BizUrl + BizPort + '/signCreateCertificate',
            type: 'POST',
            enctype: 'multipart/form-data',
            dataType: 'json',
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            success : function(result) {

                console.log("받아온 result : " + JSON.stringify(result));
                $("#createCertificate_result").val(JSON.stringify(result.result));

            },beforeSend:function(){
                //(이미지 보여주기 처리)
                $('.wrap-loading').removeClass('display-none');
            }
            ,complete:function(){
                //(이미지 감추기 처리)
                $('.wrap-loading').addClass('display-none');
            },
            error : function(xhr, status, error){
                console.log("xhr : " + xhr);
                console.log(error);
            }
        });

    });

    $("#certificateInfo").on('click', function(event) {

        var bID = $("#certificateInfo_bID").val();
        var cID = $("#certificateInfo_cID").val();

        $.ajax({
            url : BizUrl + BizPort + '/certificateInfo/bID/' + bID + '/cID/' + cID,
            crossDomain: true,
            cache: false,
            type: 'GET',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success : function(result) {
                console.log("certificateInfo 결과 값: " + JSON.stringify(result));
                $("#certificateInfo_result").val(JSON.stringify(result.result));
            },
            error : function(xhr, status, error){
                console.log("xhr : " + xhr);
                console.log(error);
            }
        });

    });

    $("#checkLatestCertificate").on('click', function(event) {

        //preventDefault 는 기본으로 정의된 이벤트를 작동하지 못하게 하는 메서드이다. submit을 막음
        event.preventDefault();

        // Get form
        var form = $('#frmCheckLatestCertificate')[0];

        // Create an FormData object
        var data = new FormData(form);

        $.ajax({
            url : BizUrl + BizPort + '/checkLatestCertificate',
            type: 'POST',
            enctype: 'multipart/form-data',
            dataType: 'json',
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            success : function(result) {

                console.log("받아온 result : " + JSON.stringify(result));
                $("#checkLatestCertificate_result").val(JSON.stringify(result.result));

            },beforeSend:function(){
                //(이미지 보여주기 처리)
                $('.wrap-loading').removeClass('display-none');
            }
            ,complete:function(){
                //(이미지 감추기 처리)
                $('.wrap-loading').addClass('display-none');
            },
            error : function(xhr, status, error){
                console.log("xhr : " + xhr);
                console.log(error);
            }
        });

    });

    $("#initBNFT").on('click', function(event) {

        input_data = {};

        input_data.from = $("#initBNFT_from").val(); //"0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73";
        input_data.privateKey = $("#initBNFT_privateKey").val(); //"8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63";

        input_data.name = $("#initBNFT_name").val(); //"ERC721Token";
        input_data.symbol = $("#initBNFT_symbol").val(); //10001;

        $.ajax({
            url : BizUrl + BizPort + '/initBNFT',
            cache: false,
            type: 'POST',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(input_data),
            success : function(result) {

                console.log("받아온 result : " + JSON.stringify(result));
                $("#initBNFT_result").val(JSON.stringify(result.result));

            },beforeSend:function(){
                //(이미지 보여주기 처리)
                $('.wrap-loading').removeClass('display-none');
            }
            ,complete:function(){
                //(이미지 감추기 처리)
                $('.wrap-loading').addClass('display-none');
            },
            error : function(xhr, status, error){
                console.log("xhr : " + xhr);
                console.log(error);
            }
        });
    });

    $("#initBPT").on('click', function(event) {

        input_data = {};

        input_data.from = $("#initBPT_from").val(); //"0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73";
        input_data.privateKey = $("#initBPT_privateKey").val(); //"8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63";

        input_data.name = $("#initBPT_name").val(); //"ERC20Token";
        input_data.symbol = $("#initBPT_symbol").val(); //"BPT";
        input_data.decimals = $("#initBPT_decimals").val(); //1;
        input_data.initialSupply = $("#initBPT_initialSupply").val(); //100000000;
        input_data.initialHolder = $("#initBPT_initialHolder").val(); //"0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73";

        $.ajax({
            url : BizUrl + BizPort + '/initBPT',
            cache: false,
            type: 'POST',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(input_data),
            success : function(result) {

                console.log("받아온 result : " + JSON.stringify(result));
                $("#initBPT_result").val(JSON.stringify(result.result));

            },beforeSend:function(){
                //(이미지 보여주기 처리)
                $('.wrap-loading').removeClass('display-none');
            }
            ,complete:function(){
                //(이미지 감추기 처리)
                $('.wrap-loading').addClass('display-none');
            },
            error : function(xhr, status, error){
                console.log("xhr : " + xhr);
                console.log(error);
            }
        });
    });

    $("#newBNFT").on('click', function(event) {

        input_data = {};

        //battery 소유자 생성 (판매자)
        input_data.from = $("#newBNFT_from").val(); //"0xE0804701Fb5F86bE3fDa9977B590d7899933a278";
        input_data.privateKey = $("#newBNFT_privateKey").val(); //"8d60624a1f2c5eb805a5e6dc8aab9577e9edafa5d5ee867af88f1a7542f86919";

        // 소유할 battery에 할당 될 bID
        input_data.bID = $("#newBNFT_bID").val(); // 10001;
        // 제조회사명
        input_data.manufacturerName = $("#newBNFT_manufacturerName").val(); //"SK Innovation";
        // 모델명
        input_data.modelName = $("#newBNFT_modelName").val(); //"EBM123";
        // 날짜
        input_data.manufacturerDate = $("#newBNFT_manufacturerDate").val(); //"2020-01-01";

        $.ajax({
            url : BizUrl + BizPort + '/newBNFT',
            cache: false,
            type: 'POST',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(input_data),
            success : function(result) {

                console.log("받아온 result : " + JSON.stringify(result));
                $("#newBNFT_result").val(JSON.stringify(result.result));

            },beforeSend:function(){
                //(이미지 보여주기 처리)
                $('.wrap-loading').removeClass('display-none');
            }
            ,complete:function(){
                //(이미지 감추기 처리)
                $('.wrap-loading').addClass('display-none');
            },
            error : function(xhr, status, error){
                console.log("xhr : " + xhr);
                console.log(error);
            }
        });
    });

    $("#getBalanceOfBPT").on('click', function(event) {

        input_data = {};

        //구매자
        input_data.from = $("#getBalanceOfBPT_from").val(); //"0x870A330a7D25bCF080b88d444ddc3C1c0980D442";

        $.ajax({
            url : BizUrl + BizPort + '/getBalanceOfBPT/from/' + input_data.from,
            cache: false,
            type: 'GET',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: input_data,
            success : function(result) {

                console.log("받아온 result : " + JSON.stringify(result));
                $("#getBalanceOfBPT_result").val(JSON.stringify(result.result));

            },beforeSend:function(){
                //(이미지 보여주기 처리)
                $('.wrap-loading').removeClass('display-none');
            }
            ,complete:function(){
                //(이미지 감추기 처리)
                $('.wrap-loading').addClass('display-none');
            },
            error : function(xhr, status, error){
                console.log("xhr : " + xhr);
                console.log(error);
            }
        });
    });

    $("#transferBPT").on('click', function(event) {

        input_data = {};

        //구매자 주소
        input_data.from = $("#transferBPT_from").val(); //"0x870A330a7D25bCF080b88d444ddc3C1c0980D442";
        input_data.privateKey = $("#transferBPT_privateKey").val(); //"1d711e8cb6ff4afdff3c1cade8daa0c8fd3589c678f4b2753e04ad261534b05d";

        // 판매자 주소
        input_data.recipient = $("#transferBPT_recipient").val(); //"0xE0804701Fb5F86bE3fDa9977B590d7899933a278";
        // 보낼 token양
        input_data.amount = $("#transferBPT_amount").val(); //10;

        $.ajax({
            url : BizUrl + BizPort + '/transferBPT',
            cache: false,
            type: 'POST',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(input_data),
            success : function(result) {

                console.log("받아온 result : " + JSON.stringify(result));
                $("#transferBPT_result").val(JSON.stringify(result.result));

            },beforeSend:function(){
                //(이미지 보여주기 처리)
                $('.wrap-loading').removeClass('display-none');
            }
            ,complete:function(){
                //(이미지 감추기 처리)
                $('.wrap-loading').addClass('display-none');
            },
            error : function(xhr, status, error){
                console.log("xhr : " + xhr);
                console.log(error);
            }
        });

    });

    $("#getOwnerOfBNFT").on('click', function(event) {

        input_data = {};

        input_data.bID = $("#getOwnerOfBNFT_bID").val(); //10001;

        $.ajax({
            url : BizUrl + BizPort + '/getOwnerOfBNFT/bID/' + input_data.bID,
            cache: false,
            type: 'GET',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: input_data,
            success : function(result) {

                console.log("받아온 result : " + JSON.stringify(result));
                $("#getOwnerOfBNFT_result").val(JSON.stringify(result.result));

            },beforeSend:function(){
                //(이미지 보여주기 처리)
                $('.wrap-loading').removeClass('display-none');
            }
            ,complete:function(){
                //(이미지 감추기 처리)
                $('.wrap-loading').addClass('display-none');
            },
            error : function(xhr, status, error){
                console.log("xhr : " + xhr);
                console.log(error);
            }
        });
    });

    $("#transferFromBNFT").on('click', function(event) {

        input_data = {};

        // 판매자 주소
        input_data.from = $("#transferFromBNFT_from").val(); //"0xE0804701Fb5F86bE3fDa9977B590d7899933a278";
        // 판매자 개인키
        input_data.privateKey = $("#transferFromBNFT_privateKey").val(); //"8d60624a1f2c5eb805a5e6dc8aab9577e9edafa5d5ee867af88f1a7542f86919";

        // 소유권을 넘기는 주소
        input_data.transferFrom = $("#transferFromBNFT_transferFrom").val(); //"0xE0804701Fb5F86bE3fDa9977B590d7899933a278";
        // 소유권을 받는 주소
        input_data.transferTo = $("#transferFromBNFT_transferTo").val(); //"0x870A330a7D25bCF080b88d444ddc3C1c0980D442";
        // 소유권이 이전 될 bID
        input_data.bID = $("#transferFromBNFT_bID").val(); //10001;

        $.ajax({
            url : BizUrl + BizPort + '/TransferFromBNFT',
            cache: false,
            type: 'POST',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(input_data),
            timeout: 600000,
            success : function(result) {

                console.log("받아온 result : " + JSON.stringify(result));
                $("#transferFromBNFT_result").val(JSON.stringify(result.result));

            },beforeSend:function(){
                //(이미지 보여주기 처리)
                $('.wrap-loading').removeClass('display-none');
            }
            ,complete:function(){
                //(이미지 감추기 처리)
                $('.wrap-loading').addClass('display-none');
            },
            error : function(xhr, status, error){
                console.log("xhr : " + xhr);
                console.log(error);
            }
        });

    });

    $("#createCertificate_clear").on('click', function(event) {

        $("#createCertificate_addressFrom").val('');
        $("#createCertificate_privateKey").val('');

        $("#createCertificate_bID").val('');
        $("#createCertificate_cID").val('');
        $("#createCertificate_grade").val('');
        $("#createCertificate_evaluationDate").val('');
        $("#createCertificate_evaluationAgency").val('');
        $("#createCertificate_certificateHash").val('');

        $("#createCertificate_result").val('');

    });


    $("#certificateInfo_clear").on('click', function(event) {

        $("#certificateInfo_bID").val('');
        $("#certificateInfo_cID").val('');

        $("#certificateInfo_result").val('');

    });

    $("#checkLatestCertificate_clear").on('click', function(event) {

        $("#checkLatestCertificate_bID").val('');
        $("#checkLatestCertificate_cID").val('');
        $("#checkLatestCertificate_grade").val('');
        $("#checkLatestCertificate_evaluationDate").val('');
        $("#checkLatestCertificate_evaluationAgency").val('');
        $("#checkLatestCertificate_certificateHash").val('');

        $("#checkLatestCertificate_result").val('');

    });

    $("#initBNFT_clear").on('click', function(event) {

        $("#initBNFT_from").val('');
        $("#initBNFT_privateKey").val('');

        $("#initBNFT_name").val('');
        $("#initBNFT_symbol").val('');

        $("#initBNFT_result").val('');

    });

    $("#initBPT_clear").on('click', function(event) {

        $("#initBPT_from").val('');
        $("#initBPT_privateKey").val('');

        $("#initBPT_name").val('');
        $("#initBPT_symbol").val('');
        $("#initBPT_decimals").val('');
        $("#initBPT_initialSupply").val('');
        $("#initBPT_initialHolder").val('');

        $("#initBPT_result").val('');

    });

    $("#newBNFT_clear").on('click', function(event) {

        $("#newBNFT_from").val('');
        $("#newBNFT_privateKey").val('');

        $("#newBNFT_bID").val('');
        $("#newBNFT_manufacturerName").val('');
        $("#newBNFT_modelName").val('');
        $("#newBNFT_manufacturerDate").val('');

        $("#newBNFT_result").val('');

    });

    $("#getBalanceOfBPT_clear").on('click', function(event) {

        $("#getBalanceOfBPT_from").val('');

        $("#getBalanceOfBPT_result").val('');

    });

    $("#transferBPT_clear").on('click', function(event) {

        $("#transferBPT_from").val('');
        $("#transferBPT_privateKey").val('');

        $("#transferBPT_recipient").val('');
        $("#transferBPT_amount").val('');

        $("#transferBPT_result").val('');

    });

    $("#getOwnerOfBNFT_clear").on('click', function(event) {

        $("#getOwnerOfBNFT_bID").val('');

        $("#getOwnerOfBNFT_result").val('');

    });

    $("#transferFromBNFT_clear").on('click', function(event) {

        $("#transferFromBNFT_from").val('');
        $("#transferFromBNFT_privateKey").val('');

        $("#transferFromBNFT_transferFrom").val('');
        $("#transferFromBNFT_transferTo").val('');
        $("#transferFromBNFT_bID").val('');

        $("#transferFromBNFT_result").val('');

    });
});
