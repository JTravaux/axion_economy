(this.webpackJsonpaxion_eco=this.webpackJsonpaxion_eco||[]).push([[0],{105:function(t,e,n){},112:function(t,e,n){"use strict";n.r(e);var a=n(4),i=n(0),o=n.n(i),c=n(21),l=n.n(c),s=n(141),r=n(142),d=n(90),u=Object(d.a)({typography:{useNextVariants:!0,fontFamily:"Poppins, sans-serif"},palette:{common:{black:"#000",white:"#fff"},background:{paper:"#EAEEF7",default:"#EAEEF7"},primary:{light:"#81c8dc",main:"#4c598e",dark:"#1b6276",contrastText:"#fff"},secondary:{fontFamily:"Roberto, sans-serif",light:"#e57373",main:"#415076",dark:"#d32f2f",contrastText:"#fff"},error:{light:"#ff9caa",main:"#ff7285",dark:"#b3505d",contrastText:"#fff"},success:{light:"#6dc762",main:"#09af00",dark:"#007d00",contrastText:"#fff"},text:{primary:"rgba(0,0,0, 0.87)",secondary:"rgba(0,0,0, 0.54)",disabled:"rgba(0,0,0, 0.38)",hint:"rgba(0,0,0, 0.38)"}}}),j=n(115),h=n(143),b=n(139),m=n(16),p=function(){var t=Object(i.useState)([]),e=Object(m.a)(t,2),n=e[0],a=e[1],o=Object(i.useState)(!0),c=Object(m.a)(o,2),l=c[0],s=c[1];return Object(i.useEffect)((function(){new Promise((function(t,e){fetch("ecosystem/holders/all").then((function(e){e.json().then((function(e){a(e),t()}))})).catch((function(t){return e(t)})).finally((function(){return s(!1)}))}))}),[]),{data:n,loading:l}},x=n(145),f=n(137),v=n(138),g=n.p+"static/media/card_bg.3a3b4dd1.jpg",O={Shrimp:{min:1,max:999,seperator:" to "},Crabs:{min:1e3,max:999999,seperator:" to "},Fish:{min:1e6,max:9999999,seperator:" to "},Octopuses:{min:1e7,max:49999999,seperator:" to "},Dolphins:{min:5e7,max:99999999,seperator:" to "},"Tiger Sharks":{min:1e8,max:499999999,seperator:" to "},"Great White Sharks":{min:5e8,max:999999999,seperator:" to "},Whales:{min:1e9,max:"",seperator:"+"}},y=function(t){var e,n=t.type,i=t.count,o=t.loading,c=t.emoji,l=t.isImage,s=t.src,r=t.imgWidth,d=t.total;return Object(a.jsxs)(x.a,{className:"card",elevation:6,style:{position:"relative"},children:[Object(a.jsx)("img",{src:g,width:"100%",className:"cardBG",alt:"card background"}),Object(a.jsxs)("div",{style:{textAlign:"center",padding:"1%"},children:[Object(a.jsx)("div",{style:{margin:"1%"},children:l?Object(a.jsx)("img",{src:s,width:r,alt:n+"_logo"}):Object(a.jsx)(j.a,{variant:"h4",children:c})}),o?Object(a.jsx)(f.a,{size:30,style:{margin:"4% 0"}}):Object(a.jsxs)("div",{children:[Object(a.jsxs)(j.a,{variant:"h6",color:"secondary",style:{fontWeight:"400"},children:[null===i||void 0===i?void 0:i.toLocaleString()," ",n]}),Object(a.jsxs)(j.a,{variant:"subtitle1",color:"secondary",style:{fontWeight:"400"},children:[null===d||void 0===d?void 0:d.toLocaleString()," AXN"]}),Object(a.jsx)(v.a,{variant:"middle",style:{margin:"2% auto",width:"75%"}}),Object(a.jsx)(j.a,{variant:"subtitle2",color:"textSecondary",style:{fontWeight:"400",fontStyle:"italic"},children:"".concat(O[n].min.toLocaleString()).concat(O[n].seperator).concat(null===(e=O[n].max)||void 0===e?void 0:e.toLocaleString()," AXN")})]})]})]})},A=n.p+"static/media/tigershark.d7e62b93.png",k=n.p+"static/media/shrimp.e7c432fb.png",S=n(54),w=n.n(S),N=n(86),F=n.n(N),W=function(){var t,e,n,i,o,c,l,s,r,d,u,m,x,f,v,g,O=p(),S=O.data,N=O.loading,W=[{type:"Shrimp",count:null===S||void 0===S||null===(t=S.shrimp)||void 0===t?void 0:t.count,img:!0,src:k,width:30,totalAXN:null===S||void 0===S||null===(e=S.shrimp)||void 0===e?void 0:e.totalAxn},{type:"Crabs",count:null===S||void 0===S||null===(n=S.crab)||void 0===n?void 0:n.count,emoji:"\ud83e\udd80",totalAXN:null===S||void 0===S||null===(i=S.crab)||void 0===i?void 0:i.totalAxn},{type:"Fish",count:null===S||void 0===S||null===(o=S.fish)||void 0===o?void 0:o.count,emoji:"\ud83d\udc20",totalAXN:null===S||void 0===S||null===(c=S.fish)||void 0===c?void 0:c.totalAxn},{type:"Octopuses",count:null===S||void 0===S||null===(l=S.octopus)||void 0===l?void 0:l.count,emoji:"\ud83d\udc19",totalAXN:null===S||void 0===S||null===(s=S.octopus)||void 0===s?void 0:s.totalAxn},{type:"Dolphins",count:null===S||void 0===S||null===(r=S.dolphin)||void 0===r?void 0:r.count,emoji:"\ud83d\udc2c",totalAXN:null===S||void 0===S||null===(d=S.dolphin)||void 0===d?void 0:d.totalAxn},{type:"Tiger Sharks",count:null===S||void 0===S||null===(u=S.tigerShark)||void 0===u?void 0:u.count,img:!0,src:A,width:50,totalAXN:null===S||void 0===S||null===(m=S.tigerShark)||void 0===m?void 0:m.totalAxn},{type:"Great White Sharks",count:null===S||void 0===S||null===(x=S.greatWhite)||void 0===x?void 0:x.count,emoji:"\ud83e\udd88",totalAXN:null===S||void 0===S||null===(f=S.greatWhite)||void 0===f?void 0:f.totalAxn},{type:"Whales",count:null===S||void 0===S||null===(v=S.whale)||void 0===v?void 0:v.count,emoji:"\ud83d\udc33",totalAXN:null===S||void 0===S||null===(g=S.whale)||void 0===g?void 0:g.totalAxn}];return Object(a.jsxs)("div",{style:{padding:"2%"},children:[Object(a.jsxs)(j.a,{variant:"h4",align:"center",color:"primary",style:{fontWeight:"100"},children:["Axion Ecosystem",!N&&S.totals&&Object(a.jsx)("sup",{children:Object(a.jsx)(h.a,{title:"Last Updated: ".concat(w()(S.totals.last_updated).format("MMM Do, YYYY, h:mm a"),". Ecosystem is updated hourly."),classes:{tooltip:"tooltip"},placement:"right",children:Object(a.jsx)(F.a,{style:{fontSize:"0.7rem",cursor:"pointer"},color:"secondary"})})})]}),!N&&S.totals&&Object(a.jsxs)(a.Fragment,{children:[Object(a.jsxs)(j.a,{variant:"subtitle1",align:"center",color:"primary",style:{fontWeight:"100"},children:[S.totals.holders.toLocaleString()," addresses hold at least 1 AXN."]}),Object(a.jsx)(h.a,{title:"Does not include contracts or dev fund",classes:{tooltip:"tooltip"},placement:"bottom",children:Object(a.jsxs)(j.a,{variant:"subtitle1",align:"center",color:"primary",style:{fontWeight:"100",maxWidth:"325px",margin:"0 auto",cursor:"pointer"},children:["Ecosystem Total: ",Math.round(S.totals.held_axn).toLocaleString()," AXN"]})})]}),Object(a.jsx)("div",{style:{margin:"2%"},children:Object(a.jsx)(b.a,{container:!0,justify:"space-evenly",spacing:3,children:W.map((function(t){var e;return Object(a.jsx)(b.a,{item:!0,lg:3,md:6,xs:10,children:Object(a.jsx)(y,{type:t.type,count:t.count,loading:N,emoji:t.emoji,isImage:null!==(e=t.img)&&void 0!==e&&e,src:t.img?t.src:null,imgWidth:t.width,total:t.totalAXN})},t.type)}))})}),Object(a.jsx)("br",{})]})},U=function(t){var e=t.stat,n=t.amount,i=t.loading,o=t.suffix;return Object(a.jsxs)(x.a,{className:"card",elevation:6,style:{position:"relative"},children:[Object(a.jsx)("img",{src:g,width:"100%",className:"cardBG",alt:"card background"}),Object(a.jsx)("div",{style:{textAlign:"center",padding:"1%"},children:Object(a.jsxs)("div",{children:[Object(a.jsx)(j.a,{variant:"h6",color:"secondary",style:{fontWeight:"400"},children:e}),i?Object(a.jsx)(f.a,{size:23}):Object(a.jsxs)(j.a,{variant:"subtitle1",color:"secondary",style:{fontWeight:"400"},children:[n," ",o]})]})})]})},B=function(){var t=Object(i.useState)(0),e=Object(m.a)(t,2),n=e[0],a=e[1],o=Object(i.useState)(0),c=Object(m.a)(o,2),l=c[0],s=c[1],r=Object(i.useState)(0),d=Object(m.a)(r,2),u=d[0],j=d[1],h=Object(i.useState)(0),b=Object(m.a)(h,2),p=b[0],x=b[1],f=Object(i.useState)(0),v=Object(m.a)(f,2),g=v[0],O=v[1],y=Object(i.useState)(Date.now()),A=Object(m.a)(y,2),k=A[0],S=A[1],w=Object(i.useState)(null),N=Object(m.a)(w,2),F=N[0],W=N[1],U=function(){return new Promise((function(t,e){fetch("stats/volume").then((function(e){e.json().then((function(e){var n=e.usd,a=e.eth;j(n),x(a),t()}))})).catch((function(t){return e(t)}))}))},B=function(){return new Promise((function(t,e){fetch("stats/axn-eth").then((function(e){e.json().then((function(e){a(e.axn),t()}))})).catch((function(t){return e(t)}))}))},E=function(){return new Promise((function(t,e){fetch("/stats/usdt-axn").then((function(e){e.json().then((function(e){s(e.usdt),O(25e10*e.usdt),t()}))})).catch((function(t){return e(t)}))}))};Object(i.useEffect)((function(){B(),E(),U(),F||C()}),[]);var C=function(){var t=setInterval((function(){Promise.all([B(),E(),U()]).then((function(t){S(Date.now())})).catch((function(t){0}))}),7500);W(t)},L=function(){clearInterval(F),W(null)};return{volumeUsd:u,volumeEth:p,axnPerEth:n,marketCap:g,usdtPerAxn:l,lastUpdated:k,autoUpdating:Boolean(F),stopAutoUpdating:L,startAutoUpdating:C,toggleAutoUpdating:function(){F?L():C()}}},E=n(140),C=n(144),L=function(){var t=B(),e=t.volumeUsd,n=t.marketCap,i=t.axnPerEth,o=t.usdtPerAxn,c=t.lastUpdated,l=t.autoUpdating,s=t.toggleAutoUpdating;return Object(a.jsxs)("div",{style:{padding:"2%",paddingBottom:0},children:[Object(a.jsx)(j.a,{variant:"h4",align:"center",color:"primary",style:{fontWeight:"100"},children:"Axion Market Stats"}),Object(a.jsxs)("center",{children:[Object(a.jsx)(E.a,{labelPlacement:"start",control:Object(a.jsx)(C.a,{size:"small",checked:l,onChange:s}),label:Object(a.jsx)(j.a,{variant:"subtitle2",color:"textSecondary",style:{fontWeight:"400"},children:"Automatically update stats"})}),Object(a.jsx)("br",{}),c&&Object(a.jsxs)(j.a,{variant:"subtitle2",color:"textSecondary",style:{fontWeight:"400"},children:["Last Updated: ",w()(c).format("h:mm:ss a")]})]}),Object(a.jsx)("div",{style:{margin:"2%"},children:Object(a.jsxs)(b.a,{container:!0,justify:"space-evenly",spacing:3,children:[Object(a.jsx)(b.a,{item:!0,lg:3,md:6,xs:10,children:Object(a.jsx)(U,{loading:Boolean(!o),stat:"Current Price",amount:"$".concat(o),suffix:"USDT"})},"USDTPrice"),Object(a.jsx)(b.a,{item:!0,lg:3,md:6,xs:10,children:Object(a.jsx)(U,{loading:Boolean(!i),stat:"Axion Per ETH",amount:Number(i).toLocaleString(),suffix:"AXN"})},"pricePerETH"),Object(a.jsx)(b.a,{item:!0,lg:3,md:6,xs:10,children:Object(a.jsx)(U,{loading:Boolean(!n),stat:"Market Cap",amount:"".concat(n.toLocaleString("en-US",{style:"currency",currency:"USD"})),suffix:"USD"})},"marketCap"),Object(a.jsx)(b.a,{item:!0,lg:3,md:6,xs:10,children:Object(a.jsx)(U,{loading:Boolean(!e),stat:"24h Volume",amount:Number(e).toLocaleString("en-US",{style:"currency",currency:"USD"}),suffix:"USD"})},"volume_ETH")]})})]})},P=function(){return Object(a.jsxs)("div",{className:"footer",children:[Object(a.jsxs)(j.a,{align:"center",variant:"subtitle2",style:{color:"#FFF"},children:["Beta ","v0.7.0"," - Created by",Object(a.jsx)("span",{style:{color:"#00D637"},children:" Some Green Guy"})]}),Object(a.jsxs)("div",{className:"footerLinks",children:[Object(a.jsx)(j.a,{onClick:function(){return window.open("https://axion.network","_blank")},variant:"subtitle2",style:{color:"#FFF"},display:"inline",className:"clickableLink",children:"Axion Website"}),Object(a.jsx)("span",{style:{color:"#BABABA"},children:"\xa0|\xa0"}),Object(a.jsx)(j.a,{onClick:function(){return window.open("https://axion.network/pdf/axion-whitepaper.pdf","_blank")},variant:"subtitle2",style:{color:"#FFF"},display:"inline",className:"clickableLink",children:"Whitepaper"}),Object(a.jsx)("span",{style:{color:"#BABABA"},children:"\xa0|\xa0"}),Object(a.jsx)(j.a,{onClick:function(){return window.open("https://discord.gg/axion","_blank")},variant:"subtitle2",style:{color:"#FFF"},display:"inline",className:"clickableLink",children:"Discord"}),Object(a.jsx)("span",{style:{color:"#BABABA"},children:"\xa0|\xa0"}),Object(a.jsx)(j.a,{onClick:function(){return window.open("https://app.uniswap.org/#/swap?outputCurrency=0xed1199093b1abd07a368dd1c0cdc77d8517ba2a0","_blank")},variant:"subtitle2",style:{color:"#FFF"},display:"inline",className:"clickableLink",children:"Uniswap"})]})]})},D=function(){return Object(a.jsxs)("div",{style:{marginBottom:"50px"},children:[Object(a.jsx)(L,{}),Object(a.jsx)(W,{}),Object(a.jsx)(P,{})]})},X=(n(105),n(43)),T=new X.ApolloClient({uri:"https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",cache:new X.InMemoryCache});l.a.render(Object(a.jsx)(o.a.StrictMode,{children:Object(a.jsx)(X.ApolloProvider,{client:T,children:Object(a.jsx)(s.a,{theme:u,children:Object(a.jsx)(r.a,{children:Object(a.jsx)(D,{})})})})}),document.getElementById("root"))}},[[112,1,2]]]);
//# sourceMappingURL=main.4fb0dbfc.chunk.js.map