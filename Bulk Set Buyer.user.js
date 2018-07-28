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
    var gid=gid2[4];
    var i=0;
    var c;
var cards=[];

$('#Buy').click(function(){


    $(".badge_detail_tasks .badge_card_set_text").each(function(){
       cards[i]=$(this).text().replace(/\s+/g, " ");
        i++;
    });
    for(i=0;i<cards.length;i=i+2)
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
        cards[i]=s.trim().replace(/ /g,"%20");
       var js="https://steamcommunity.com/market/priceoverview/?country=IN&currency=24&appid=753&market_hash_name="+gid+"-"+cards[i]+"&json=true";
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
    return tmp;
}();
if(c==0)
{
    cards[i]=cards[i]+"%20%28Trading%20Card%29";
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
    console.log(url3);




    });
