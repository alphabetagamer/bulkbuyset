// ==UserScript==
// @name         Bulk Set Buyer
// @namespace    http://tampermonkey.net/
// @version      Alpha
// @description  Automatically buy all cards for a Set
// @author       Alphabeta_g
// @website
// @match        *://steamcommunity.com/*/gamecards/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @grant        GM_addStyle
// ==/UserScript==



$(".gamecards_inventorylink").append("<button class='btn_grey_grey btn_medium' style='padding:5px 20px;float:left;margin: 5px 10px' id='Buy'>Mass BUY</button>");
var gid2=window.location.pathname.split("/");
    var gid=gid2[4]; // Store game appID
    var i=0;
    var c;
    var jk=0;
var cards=[]; //CARD LIST

$('#Buy').click(function(){


    $(".badge_detail_tasks .badge_card_set_text").each(function(){
       cards[i]=$(this).text().replace(/\s+/g, " "); // VALVE ADDS TOO MANY WHITE SPACES
        i++;
    });
    for(i=0;i<cards.length;i=i+2) // Card NAMES ARE STORED IN EVERY ALTERNATE POSITION
    {
    
        var s=cards[i].trim();
        var j=0;
        if(s[0]=='(')
           {
               while(s[j]!=')')
               {
                   j++;
               }
               s=s.substring(j+1,s.length);
           }
        else
        {

        }
        cards[i]=s.trim().replace(/ /g,"%20").replace(/&/g,"%26"); // MAKING THE NAME URL READY

       var js="https://steamcommunity.com/market/priceoverview/?country=IN&currency=24&appid=753&market_hash_name="+gid+"-"+cards[i]+"&json=true"; // ADDRESS FOR PRICE CHECK LOADS OF CARDS HAVE A "(TRADING CARD)" IN THE HASH NAME WHICH IS ABSENT IN THE BADGE PAGE SO WE CHECK FOR IT FORM THE PRICE SITE
       c = function () {
    var tmp = 0;
    $.ajax({
        'async': false,
        'type': "POST",
        'global': false,
        'dataType': 'html',
        'url': js,
        'data': { 'request': "", 'target': 'arrange_url', 'method': 'method_target' },
        'success': function (data) {
            tmp = 1;
        }
    });
    return tmp; //IF THE NAME INCLUDE (TRADING CARD) THE JSON FAILS AND WE KNWO WE NEED TO ADD (TRADING CARD ) TO MAKE IT WORK
}();
if(c==0)
{
    cards[i]=cards[i]+"%20%28Trading%20Card%29"; // CHECK AND WORKS
}


console.log(cards[i]);
    }
   var url="https://steamcommunity.com/market/multibuy?appid=753";
   var url2="";
    for(i=0;i<cards.length;i=i+2)
    {
        url2=url2+"&items[]="+gid+"-"+cards[i];
    }

    var url3=url+url2
    console.log(url3); //FINAL LINK




    });
