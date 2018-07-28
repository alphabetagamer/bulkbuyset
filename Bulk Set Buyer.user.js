// ==UserScript==
// @name         Bulk Set Buyer
// @namespace    http://tampermonkey.net/
// @version      Alpha
// @description  Automatically buy all cards for a Set
// @author       Alphabeta_g
// @website
// @match        *://steamcommunity.com/*/gamecards/*
// @require      https://code.jquery.com/jquery-3.1.1.min.js
// @grant        GM_addStyle
// ==/UserScript==


$(".gamecards_inventorylink").append("<button class='btn_grey_grey btn_medium' style='padding:5px 20px;float:left;margin: 5px 10px' id='Buy'>Mass BUY</button>");
$('#Buy').click(function(){
var cards=[];
    var i=0;
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

        console.log(cards[i]);
    }
   var gid2=window.location.pathname.split("/");
   var url="https://steamcommunity.com/market/multibuy?appid=753";
   var gid=gid2[4];
   var url2="";
    for(i=0;i<cards.length;i=i+2)
    {
        url2=url2+"&items[]="+gid+"-"+cards[i];
    }
    var url3=url+url2
    window.open(url3);


    })