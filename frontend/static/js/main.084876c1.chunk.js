(this.webpackJsonpaxion_eco=this.webpackJsonpaxion_eco||[]).push([[0],{83:function(t,e,n){},90:function(t,e,n){"use strict";n.r(e);var i=n(2),o=n(0),a=n.n(o),c=n(8),r=n.n(c),l=(n(83),n(92)),s=n(141),d=n(126),u=n(11),h=function(){var t=Object(o.useState)([]),e=Object(u.a)(t,2),n=e[0],i=e[1],a=Object(o.useState)(!1),c=Object(u.a)(a,2),r=c[0],l=c[1],s=Object(o.useState)([]),d=Object(u.a)(s,2),h=d[0],j=d[1],b=Object(o.useState)(!1),x=Object(u.a)(b,2),m=x[0],y=x[1];return Object(o.useEffect)((function(){l(!0),new Promise((function(t,e){fetch("ecosystem/holders/all").then((function(e){e.json().then((function(e){i(e),t()}))})).catch((function(t){return e(t)})).finally((function(){return l(!1)}))})),y(!0),new Promise((function(t,e){fetch("ecosystem/holders/history/24").then((function(e){e.json().then((function(e){j(e),t()}))})).catch((function(t){return e(t)})).finally((function(){return y(!1)}))}))}),[]),{currentData:n,currentDataLoading:r,history:h,historyLoading:m}},j=n(120),b=n(122),x=n(123),m=n.p+"static/media/card_bg.3a3b4dd1.jpg",y={Shrimp:{min:1,max:999,seperator:" to "},Crabs:{min:1e3,max:999999,seperator:" to "},Fish:{min:1e6,max:9999999,seperator:" to "},Octopuses:{min:1e7,max:49999999,seperator:" to "},Dolphins:{min:5e7,max:99999999,seperator:" to "},"Tiger Sharks":{min:1e8,max:499999999,seperator:" to "},"Great Whites":{min:5e8,max:999999999,seperator:" to "},Whales:{min:1e9,max:"",seperator:"+"}},f=function(t){var e,n=t.type,o=t.count,a=t.loading,c=t.emoji,r=t.isImage,s=t.src,d=t.imgWidth,u=t.total,h=t.ecoAxion,f=t.holders;return Object(i.jsxs)(j.a,{className:"card",elevation:6,children:[Object(i.jsx)("img",{src:m,width:"100%",className:"cardBG",alt:"card background"}),Object(i.jsxs)("div",{style:{textAlign:"center",padding:"1%"},children:[Object(i.jsx)("div",{style:{margin:"1%"},children:r?Object(i.jsx)("img",{src:s,width:d,alt:n+"_logo"}):Object(i.jsx)(l.a,{variant:"h4",children:c})}),a?Object(i.jsx)(b.a,{size:30,style:{margin:"4% 0"}}):Object(i.jsxs)("div",{children:[Object(i.jsxs)(l.a,{variant:"h6",color:"secondary",style:{fontWeight:"400"},children:[null===o||void 0===o?void 0:o.toLocaleString()," ",n,"\xa0",f>0&&Object(i.jsxs)("span",{style:{fontWeight:"200",fontSize:"0.8rem",verticalAlign:"middle"},children:["(",(o/f).toLocaleString("en-US",{style:"percent",minimumFractionDigits:1}),")"]})]}),Object(i.jsxs)(l.a,{variant:"subtitle1",color:"secondary",style:{fontWeight:"400"},children:[null===u||void 0===u?void 0:u.toLocaleString()," AXN\xa0",h>0&&Object(i.jsxs)("span",{style:{fontWeight:"200",fontSize:"0.7rem",verticalAlign:"middle"},children:["(",(u/h).toLocaleString("en-US",{style:"percent",minimumFractionDigits:2}),")"]})]}),Object(i.jsx)(x.a,{variant:"middle",style:{margin:"2% auto",width:"75%"}}),Object(i.jsx)(l.a,{variant:"subtitle2",color:"textSecondary",style:{fontWeight:"400",fontStyle:"italic"},children:"".concat(y[n].min.toLocaleString()).concat(y[n].seperator).concat(null===(e=y[n].max)||void 0===e?void 0:e.toLocaleString()," AXN")})]})]})]})},p=n.p+"static/media/tigershark.d7e62b93.png",g=n.p+"static/media/shrimp.e7c432fb.png",v=n(47),O=n.n(v),k=n(64),w=n.n(k),A=function(){var t,e,n,o,a,c,r,u,j,b,x,m,y,v,k,A,S=h(),B=S.currentData,D=S.currentDataLoading,E=[{key:"shrimp",type:"Shrimp",count:null===B||void 0===B||null===(t=B.shrimp)||void 0===t?void 0:t.count,img:!0,src:g,width:30,totalAXN:null===B||void 0===B||null===(e=B.shrimp)||void 0===e?void 0:e.totalAxn,color:"#e6194B"},{key:"crab",type:"Crabs",count:null===B||void 0===B||null===(n=B.crab)||void 0===n?void 0:n.count,emoji:"\ud83e\udd80",totalAXN:null===B||void 0===B||null===(o=B.crab)||void 0===o?void 0:o.totalAxn,color:"#f58231"},{key:"fish",type:"Fish",count:null===B||void 0===B||null===(a=B.fish)||void 0===a?void 0:a.count,emoji:"\ud83d\udc20",totalAXN:null===B||void 0===B||null===(c=B.fish)||void 0===c?void 0:c.totalAxn,color:"#ffe119"},{key:"octopus",type:"Octopuses",count:null===B||void 0===B||null===(r=B.octopus)||void 0===r?void 0:r.count,emoji:"\ud83d\udc19",totalAXN:null===B||void 0===B||null===(u=B.octopus)||void 0===u?void 0:u.totalAxn,color:"#bfef45"},{key:"dolphin",type:"Dolphins",count:null===B||void 0===B||null===(j=B.dolphin)||void 0===j?void 0:j.count,emoji:"\ud83d\udc2c",totalAXN:null===B||void 0===B||null===(b=B.dolphin)||void 0===b?void 0:b.totalAxn,color:"#3cb44b"},{key:"tigerShark",type:"Tiger Sharks",count:null===B||void 0===B||null===(x=B.tigerShark)||void 0===x?void 0:x.count,img:!0,src:p,width:50,totalAXN:null===B||void 0===B||null===(m=B.tigerShark)||void 0===m?void 0:m.totalAxn,color:"#42d4f4"},{key:"greatWhite",type:"Great Whites",count:null===B||void 0===B||null===(y=B.greatWhite)||void 0===y?void 0:y.count,emoji:"\ud83e\udd88",totalAXN:null===B||void 0===B||null===(v=B.greatWhite)||void 0===v?void 0:v.totalAxn,color:"#4363d8"},{key:"whale",type:"Whales",count:null===B||void 0===B||null===(k=B.whale)||void 0===k?void 0:k.count,emoji:"\ud83d\udc33",totalAXN:null===B||void 0===B||null===(A=B.whale)||void 0===A?void 0:A.totalAxn,color:"#911eb4"}];return Object(i.jsxs)("div",{style:{padding:"2%"},children:[Object(i.jsxs)(l.a,{variant:"h4",align:"center",color:"primary",style:{fontWeight:"100"},children:["Axion Ecosystem",!D&&B.totals&&Object(i.jsx)("sup",{children:Object(i.jsx)(s.a,{title:"Last Updated: ".concat(O()(B.totals.last_updated).format("MMM Do, YYYY, h:mm a"),". Ecosystem is updated every minute."),classes:{tooltip:"tooltip"},placement:"right",children:Object(i.jsx)(w.a,{style:{fontSize:"0.7rem",cursor:"pointer"},color:"primary"})})})]}),!D&&B.totals&&Object(i.jsxs)(i.Fragment,{children:[Object(i.jsxs)(l.a,{variant:"subtitle1",align:"center",color:"primary",style:{fontWeight:"100"},children:[B.totals.holders.toLocaleString()," addresses hold at least 1 AXN."]}),Object(i.jsx)(s.a,{title:"Does not include contracts or dev fund",classes:{tooltip:"tooltip"},placement:"bottom",children:Object(i.jsxs)(l.a,{variant:"subtitle1",align:"center",color:"primary",style:{fontWeight:"100",maxWidth:"325px",margin:"0 auto",cursor:"pointer"},children:["Ecosystem Total: ",Math.round(B.totals.held_axn).toLocaleString()," AXN"]})})]}),Object(i.jsx)("div",{style:{margin:"2%"},children:Object(i.jsx)(d.a,{container:!0,justify:"space-evenly",spacing:3,children:E.map((function(t){var e,n,o;return Object(i.jsx)(d.a,{item:!0,lg:3,md:6,xs:10,children:Object(i.jsx)(f,{type:t.type,count:t.count,loading:D,emoji:t.emoji,isImage:null!==(e=t.img)&&void 0!==e&&e,src:t.img?t.src:null,imgWidth:t.width,total:t.totalAXN,ecoAxion:null===B||void 0===B||null===(n=B.totals)||void 0===n?void 0:n.held_axn,holders:null===B||void 0===B||null===(o=B.totals)||void 0===o?void 0:o.holders})},t.type)}))})})]})},S="AxionStats_AutoUpdate",B=function(){var t=Object(o.useState)(0),e=Object(u.a)(t,2),n=e[0],i=e[1],a=Object(o.useState)(0),c=Object(u.a)(a,2),r=c[0],l=c[1],s=Object(o.useState)(0),d=Object(u.a)(s,2),h=d[0],j=d[1],b=Object(o.useState)(0),x=Object(u.a)(b,2),m=x[0],y=x[1],f=Object(o.useState)(0),p=Object(u.a)(f,2),g=p[0],v=p[1],O=Object(o.useState)(Date.now()),k=Object(u.a)(O,2),w=k[0],A=k[1],B=Object(o.useState)(null),D=Object(u.a)(B,2),E=D[0],W=D[1],P=function(){return new Promise((function(t,e){fetch("stats/volume").then((function(e){e.json().then((function(e){var n=e.usd,i=e.eth;j(n),y(i),t()}))})).catch((function(t){return e(t)}))}))},T=function(){return new Promise((function(t,e){fetch("stats/axn-eth").then((function(e){e.json().then((function(e){i(e.axn),t()}))})).catch((function(t){return e(t)}))}))},N=function(){return new Promise((function(t,e){fetch("/stats/usdt-axn").then((function(e){e.json().then((function(e){l(e.usdt),v(25e10*e.usdt),t()}))})).catch((function(t){return e(t)}))}))};Object(o.useEffect)((function(){T(),N(),P(),E||"1"!==localStorage.getItem(S)||X()}),[]);var X=function(){var t=setInterval((function(){"1"===localStorage.getItem(S)&&Promise.all([T(),N(),P()]).then((function(t){A(Date.now())})).catch((function(t){0}))}),7500);W(t),localStorage.setItem(S,"1")},L=function(){clearInterval(E),W(null),localStorage.setItem(S,"0")};return{volumeUsd:h,volumeEth:m,axnPerEth:n,marketCap:g,usdtPerAxn:r,lastUpdated:w,autoUpdating:Boolean(E),stopAutoUpdating:L,startAutoUpdating:X,toggleAutoUpdating:function(){E?L():X()}}},D=(n(127),n(144),n.p,n(66)),E=n.n(D),W=n(18),P=n(65),T=n.n(P),N=n(142),X=n(93),L=n(128),C=n(129),F=function(t){var e=t.isOpen,n=t.close;return Object(i.jsxs)(N.a,{open:e,onClose:n,children:[Object(i.jsxs)("div",{style:{margin:"1%",padding:"2%"},children:[Object(i.jsx)(l.a,{variant:"h6",color:"primary",children:"Axion's 10% Referral Bonus"}),Object(i.jsx)("div",{style:{position:"absolute",top:"5px",right:"10px"},children:Object(i.jsx)(X.a,{onClick:n,children:Object(i.jsx)(T.a,{})})})]}),Object(i.jsxs)(L.a,{children:[Object(i.jsxs)(l.a,{variant:"subtitle1",color:"textSecondary",children:["By purchasing Axion from the daily auction using my link, you will get a ",Object(i.jsx)("strong",{children:"10% bonus"}),". Axion from the auction will be automatically staked for 14 days and you must manually claim it afterwards."]}),Object(i.jsx)("br",{}),Object(i.jsx)(l.a,{variant:"subtitle1",color:"textSecondary",children:"Example: If you receive 1,000,000 AXN from the auction, you will earn a bonus of 100,000 AXN. You will get the total of 1,100,000 AXN along with any rewards from the stake after you claim it."})]}),Object(i.jsx)(x.a,{style:{margin:"3% auto",width:"90%"}}),Object(i.jsx)("div",{style:{margin:"1% auto",width:"85%"},children:Object(i.jsx)(C.a,{fullWidth:!0,variant:"contained",color:"primary",onClick:function(){return alert("\u2733\ufe0f soon\u2122 \u2733\ufe0f But buy from uniswap for now. Not an adviser.")},autoFocus:!0,style:{textTransform:"none"},children:"Buy From Auction & Get 10% Bonus AXN"})})]})},H=n(130),I=n(131),_=n(132),M=n(140),U=n(143),G=function(){var t=Object(o.useState)(null),e=Object(u.a)(t,2),n=e[0],a=e[1],c=Object(o.useState)(!1),r=Object(u.a)(c,2),s=r[0],h=r[1],j=Object(W.a)(),b=Object(H.a)(j.breakpoints.down("sm")),x=function(){return window.open("https://axion.network","_blank")},m=function(){h(!0),a(null)};return Object(i.jsxs)("div",{children:[Object(i.jsx)(I.a,{position:"static",className:"navBar",elevation:10,children:Object(i.jsx)(_.a,{children:Object(i.jsxs)(d.a,{container:!0,justify:"space-between",alignItems:"center",children:[Object(i.jsx)(d.a,{item:!0,children:Object(i.jsx)(l.a,{variant:"h5",align:"center",color:"primary",style:{fontWeight:"100",color:"#FFF"},children:"Axion Stats"})}),Object(i.jsxs)(d.a,{item:!0,children:[!b&&Object(i.jsxs)("div",{className:"headerLinks",children:[Object(i.jsx)(l.a,{onClick:x,variant:"subtitle2",style:{color:"#FFF"},display:"inline",className:"clickableLink noselect",children:"Axion Website"}),Object(i.jsx)(C.a,{onClick:m,variant:"contained",color:"secondary",className:"referralButton",children:Object(i.jsx)(l.a,{variant:"subtitle2",children:"Buy Axion, Get 10% Bonus"})})]}),b&&Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)(X.a,{edge:"start",color:"inherit",onClick:function(t){a(t.currentTarget)},children:Object(i.jsx)(E.a,{})}),Object(i.jsxs)(M.a,{anchorEl:n,keepMounted:!0,open:Boolean(n),onClose:function(){a(null)},style:{padding:0,margin:0},children:[Object(i.jsx)(U.a,{onClick:x,children:"Axion Website"}),Object(i.jsx)(U.a,{onClick:m,children:"Buy Axion - 10% Bonus"})]})]})]})]})})}),Object(i.jsx)(F,{isOpen:s,close:function(){return h(!1)}})]})},Y=n(67),z=n.n(Y),R=n(145),Q=n(134),V=n(135),q=[{link:"https://axion.network/",title:"Homepage"},{link:"https://stake.axion.network/",title:"Staking Portal"},{link:"https://axion.network/pdf/axion-whitepaper.pdf",title:"Whitepaper"},{link:"https://axion.network/pdf/axion-audit.pdf",title:"Hacken Audit"},{link:"https://axion.network/pdf/certik-audit-report.pdf",title:"Certik Audit"}],J=[{link:"https://axionnetwork.medium.com/",title:"Blog"},{link:"https://www.relaxionwithaxion.com/",title:"News"},{link:"https://twitter.com/axion_network",title:"Twitter"},{link:"https://t.me/axionofficial",title:"Telegram"},{link:"https://discord.gg/axion",title:"Discord"},{link:"https://github.com/Rock-n-Block/axion-contracts",title:"GitHub"}],K=[{link:"https://www.youtube.com/watch?v=-ILQ1M5KS68&ab_channel=Numberofthings",title:"What is Axion?",length:"2:06"},{link:"https://www.youtube.com/watch?v=mlGwBPltsK8&ab_channel=Numberofthings",title:"Brief Axion Overview",length:"1:42"},{link:"https://www.youtube.com/watch?v=qfCftkf-svQ",title:"Axion Promotional Video",length:"0:29"},{link:"https://www.youtube.com/watch?v=hj5ZewGkAOA",title:"Axion Intro for Beginners",length:"11:00"},{link:"https://www.youtube.com/watch?v=B4lzW02pwew&ab_channel=AxionToken",title:"Whitepaper Explained",length:"50:29"}],Z=function(t){window.open(t+"?utm_source=AxionStats.info","_blank")},$=function(t){var e=t.title;return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)(x.a,{variant:"middle",style:{margin:"2%"}}),Object(i.jsx)(l.a,{variant:"subtitle1",align:"center",color:"secondary",style:{fontWeight:"400"},children:e}),Object(i.jsx)(x.a,{variant:"middle",style:{margin:"2%"}})]})},tt=function(t){var e=t.title,n=t.children;return Object(i.jsxs)(R.a,{elevation:6,style:{marginBottom:"2%"},children:[Object(i.jsx)(Q.a,{expandIcon:Object(i.jsx)(z.a,{}),children:Object(i.jsx)(l.a,{children:e})}),Object(i.jsx)(V.a,{style:{display:"block"},children:n})]})},et=function(){var t=B().usdtPerAxn;return Object(i.jsxs)(tt,{title:"How Do HEX Freeclaims Work?",children:[Object(i.jsxs)(l.a,{variant:"subtitle2",color:"textSecondary",children:["HEX Freeclaims will be available over a 350 day period, beginning at launch of mainnet. Each ETH address containing HEX on May 28th, 2020, staked or unstaked, will be able to claim ",Object(i.jsx)("strong",{children:"free Axion"})," at a value of 1:1 for your HEX balance with a ",Object(i.jsx)("strong",{children:"maximum cap of 10 million tokens"}),". At today's prices, that's up to $",Number(1e7*t).toLocaleString(),"!"]}),Object(i.jsx)("br",{}),Object(i.jsx)(l.a,{variant:"subtitle2",color:"textSecondary",children:"Day 1 claims will begin at a rate of 100% of your HEX balance, with each successive week decreasing by cumulative 2% (0.2857% penalty applied daily). If you missed the available freeclaim period (After Day 350), you would receive 0% (0 Axion) and all of your freeclaim amount would be sent to the auction pool."}),Object(i.jsx)("br",{}),Object(i.jsx)(l.a,{variant:"subtitle1",align:"center",color:"textSecondary",style:{border:"1px dashed rgba(0,0,0, 0.54)",borderRadius:"10px",padding:"1%"},children:"Penalty = (HEX + Shares amount) * (days since freeclaim starts/350)"}),Object(i.jsx)("br",{}),Object(i.jsx)(l.a,{variant:"subtitle2",color:"textSecondary",children:"Example: If your ETH address contained Hex balance of 100,000 and you choose to claim on Day #1 you will receive 100,000 Axion and no Axion will be sent to the auction pool. If you wait to claim until Day #14 you would receive 96% or 96,000 Axion and remaining 4,000 Axion would be sent to the auction pool. Day #21 = 94%, Day #28 = 92%, and so on."})]})},nt=function(){return Object(i.jsxs)(tt,{title:"What Are Big Pay Days (BPD)?",children:[Object(i.jsx)(l.a,{variant:"subtitle2",color:"textSecondary",children:'Axion has 5 different "BigPayDays". The concept of having a BigPayDay is to allocate the unclaimed freeclaim Axion tokens to the stakers at the BigPayDays. Each of these days is exactly 350 days apart. BigPayDay funding comes from 0.2857% (1/350) of the unclaimed Axion.'}),Object(i.jsx)("br",{}),Object(i.jsx)(l.a,{variant:"subtitle2",color:"textSecondary",children:"On BigPayDays which happen once every year (for 5 years), all tokens in the BigPayDay pool are added to the Payout Pool for that day. Stakers who are staked on that day are entitled to payout based on how much of the share pool they own."}),Object(i.jsx)("br",{}),Object(i.jsx)(l.a,{variant:"subtitle2",color:"textSecondary",children:"Only stakes which are staked for periods above 350 days, and are active once BPD hits, will be eligible for the BigPayDay Payout. This means if you stake 3 days before the BPD, for a total period of at LEAST 350 days, you would be eligible for the BigPayDay, and will recieve that bonus when your stake ends."}),Object(i.jsx)($,{title:"Distribution Amounts"}),Object(i.jsx)(l.a,{variant:"subtitle2",color:"textSecondary",align:"center",children:"Year 1: 10% of the BPD Tokens are distributed"}),Object(i.jsx)(l.a,{variant:"subtitle2",color:"textSecondary",align:"center",children:"Year 2: 15% of the BPD Tokens are distributed"}),Object(i.jsx)(l.a,{variant:"subtitle2",color:"textSecondary",align:"center",children:"Year 3: 20% of the BPD Tokens are distributed"}),Object(i.jsx)(l.a,{variant:"subtitle2",color:"textSecondary",align:"center",children:"Year 4: 25% of the BPD Tokens are distributed"}),Object(i.jsx)(l.a,{variant:"subtitle2",color:"textSecondary",align:"center",children:"Year 5: 30% of the BPD Tokens are distributed"})]})},it=function(){return Object(i.jsx)(tt,{title:"A Lot of Helpful Links...",children:Object(i.jsxs)(d.a,{container:!0,children:[Object(i.jsx)(d.a,{item:!0,xs:12,children:Object(i.jsx)($,{title:"Official Links"})}),q.map((function(t){return Object(i.jsx)(d.a,{item:!0,xs:6,children:Object(i.jsx)(l.a,{onClick:function(){return Z(t.link)},align:"center",variant:"subtitle2",color:"textSecondary",className:"linksSectionLink",children:t.title})})})),Object(i.jsx)(d.a,{item:!0,xs:12,children:Object(i.jsx)($,{title:"Social Links"})}),J.map((function(t){return Object(i.jsxs)(d.a,{item:!0,xs:6,children:[Object(i.jsx)(l.a,{onClick:function(){return Z(t.link)},align:"center",variant:"subtitle2",color:"textSecondary",className:"linksSectionLink",children:t.title})," "]})})),Object(i.jsx)(d.a,{item:!0,xs:12,children:Object(i.jsx)($,{title:"Videos from the Community"})}),K.map((function(t){return Object(i.jsx)(d.a,{item:!0,xs:12,children:Object(i.jsxs)(l.a,{onClick:function(){return Z(t.link)},align:"center",variant:"subtitle2",color:"textSecondary",className:"linksSectionLinkDense",children:[t.title," (",t.length,")"]})})}))]})})},ot=function(){return Object(i.jsx)(tt,{title:"Which Wallets Can I Use?",children:Object(i.jsxs)(l.a,{variant:"subtitle2",color:"textSecondary",children:["Axion's mainnet token is ERC20. Our recommended wallet would be ",Object(i.jsx)("span",{className:"textLink",onClick:function(){return Z("https://metamask.io/")},children:"Metamask"})," as it will be ",Object(i.jsx)("strong",{children:"the only supported wallet initially"}),". Other wallets will be supported after. As for mobile users, use the Metamask mobile app."]})})},at=function(){return Object(i.jsxs)(tt,{title:"What is the Maximum Supply?",children:[Object(i.jsx)(l.a,{variant:"subtitle2",color:"textSecondary",children:"Max supply of the presale token HEX2T is 250 Billion, which will be converted 1:1 on mainnet launch, and another 250 Billion will be allocated to HEX freeclaims & auctions, for a initial total supply of 500 Billion Axion."}),Object(i.jsx)("br",{}),Object(i.jsx)(l.a,{variant:"subtitle2",color:"textSecondary",children:"The additional 250B for freeclaims and auctions will enter the supply slowly. The only other coins that will come into existence after distribution phase are the coins created by the 8% inflation rate, 100% of coins created through inflation are given to stakers."})]})},ct=function(){return Object(i.jsxs)(tt,{title:"Axion Tokenomics Overview",children:[Object(i.jsx)(l.a,{variant:"subtitle2",color:"textSecondary",style:{marginBottom:"2%"},children:"If HEX2T converted Axion tokens go unclaimed, they go up for auction."}),Object(i.jsx)(l.a,{variant:"subtitle2",color:"textSecondary",style:{marginBottom:"2%"},children:"Every week that HEX2T tokens go unconverted, the HEX2T holder loses 2% of the total amount they receive from conversion."}),Object(i.jsx)(l.a,{variant:"subtitle2",color:"textSecondary",style:{marginBottom:"2%"},children:"This 2% is added into the auction."}),Object(i.jsx)(l.a,{variant:"subtitle2",color:"textSecondary",style:{marginBottom:"2%"},children:"People can bid ETH into the auction pool to purchase the Axion. Whatever % of the auction pool value they have bid, that is the % of the Axion pool they will earn."}),Object(i.jsx)(l.a,{variant:"subtitle2",color:"textSecondary",style:{marginBottom:"2%"},children:"80% of all ETH bid into the auction pool is used to buy back Axion tokens on exchanges, increasing the value."}),Object(i.jsx)(l.a,{variant:"subtitle2",color:"textSecondary",style:{marginBottom:"2%"},children:"The tokens that are bought back, are then distributed to stakers."})]})},rt=function(){return Object(i.jsxs)("div",{style:{padding:"2%",paddingBottom:0},children:[Object(i.jsx)(l.a,{variant:"h4",align:"center",color:"primary",style:{fontWeight:"100"},children:"Frequently Asked Questions"}),Object(i.jsxs)(d.a,{container:!0,spacing:2,style:{width:"90%",margin:"2% auto"},children:[Object(i.jsxs)(d.a,{item:!0,md:6,xs:12,container:!0,direction:"column",children:[Object(i.jsx)(it,{}),Object(i.jsx)(ot,{}),Object(i.jsx)(at,{})]}),Object(i.jsxs)(d.a,{item:!0,md:6,xs:12,container:!0,direction:"column",children:[Object(i.jsx)(et,{}),Object(i.jsx)(nt,{}),Object(i.jsx)(ct,{})]})]})]})},lt=function(){return Object(i.jsxs)("div",{children:[Object(i.jsx)(G,{}),Object(i.jsx)(A,{}),Object(i.jsx)(rt,{}),Object(i.jsxs)("div",{style:{margin:"1%",textAlign:"right",marginTop:0,opacity:.85},children:[Object(i.jsxs)(l.a,{variant:"subtitle2",color:"textSecondary",style:{fontWeight:200},children:["Beta: ","v0.9.7"," \u2733\ufe0f"]}),Object(i.jsx)(l.a,{variant:"subtitle2",color:"textSecondary",style:{fontWeight:200},children:"By Some Green Guy"})]})]})},st=n(68),dt=Object(st.a)({typography:{useNextVariants:!0,fontFamily:"Poppins, sans-serif"},palette:{common:{black:"#000",white:"#fff"},background:{paper:"#EAEEF7",default:"#EAEEF7"},primary:{light:"#4c598e",main:"#4c598e",dark:"#6D7BB9",contrastText:"#fff"},secondary:{fontFamily:"Roberto, sans-serif",light:"#8E9CDA",main:"#6D7BB9",dark:"#505E9B",contrastText:"#fff"},error:{light:"#ff9caa",main:"#ff7285",dark:"#b3505d",contrastText:"#fff"},success:{light:"#6dc762",main:"#09af00",dark:"#007d00",contrastText:"#fff"},text:{primary:"rgba(0,0,0, 0.87)",secondary:"rgba(0,0,0, 0.54)",disabled:"rgba(0,0,0, 0.38)",hint:"rgba(0,0,0, 0.38)"}}}),ut=n(69),ht=n(136),jt=n(137);r.a.render(Object(i.jsx)(a.a.StrictMode,{children:Object(i.jsx)(ut.a,{maxSnack:3,preventDuplicate:!0,children:Object(i.jsx)(ht.a,{theme:dt,children:Object(i.jsx)(jt.a,{children:Object(i.jsx)(lt,{})})})})}),document.getElementById("root"))}},[[90,1,2]]]);
//# sourceMappingURL=main.084876c1.chunk.js.map