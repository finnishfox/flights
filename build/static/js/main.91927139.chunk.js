(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{34:function(e,t,a){e.exports=a(83)},43:function(e,t,a){},45:function(e,t,a){},48:function(e,t,a){},83:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),s=a(7),l=a.n(s),c=a(5),i=a(4),o=a(32),u=a(9),m={arrivals:[],departures:[]};var h={searchQuery:""};var d=[Object(i.a)(o.a)],g=Object(i.c)({flights:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:m,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"FLIGHTS_LOADED":return{arrivals:[].concat(Object(u.a)(e.arrivals),Object(u.a)(t.payload.arrivals)),departures:[].concat(Object(u.a)(e.departures),Object(u.a)(t.payload.departures))};default:return e}},search:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SEARCH_QUERY_SET":return{searchQuery:t.payload.searchQuery};default:return e}}}),f=Object(i.e)(g,i.d.apply(void 0,d)),_=a(10),p=a(11),b=a(14),E=a(12),F=a(15),v=(a(43),function(e){function t(){var e,a;Object(_.a)(this,t);for(var r=arguments.length,n=new Array(r),s=0;s<r;s++)n[s]=arguments[s];return(a=Object(b.a)(this,(e=Object(E.a)(t)).call.apply(e,[this].concat(n)))).state={searchQuery:""},a.search=function(e){e.preventDefault(),(0,a.props.searchQuerySet)({searchQuery:a.state.searchQuery})},a.handleInput=function(e){13===e.keyCode&&a.search(e)},a}return Object(F.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this;return n.a.createElement("article",{className:"Search"},n.a.createElement("h2",{className:"Search__title"},"SEARCH FLIGHT"),n.a.createElement("form",{className:"Search__form"},n.a.createElement("label",{className:"Search__field"},n.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"-512.053 29 44 43",className:"Search__icon"},n.a.createElement("g",{transform:"translate(-512.053 29)"},n.a.createElement("rect",{width:"44",height:"43",fill:"none"}),n.a.createElement("path",{d:"M317.717,70.708H316.25l-.55-.538a11.072,11.072,0,0,0,2.933-7.525,11.92,11.92,0,1,0-11.917,11.646,11.628,11.628,0,0,0,7.7-2.867l.55.538V73.4l9.167,8.958,2.75-2.687Zm-11,0a8.065,8.065,0,1,1,8.25-8.063A8.124,8.124,0,0,1,306.717,70.708Z",transform:"translate(-289.3 -45.625)",fill:"#95989A"}))),n.a.createElement("input",{type:"text",placeholder:"Destination or flight #",className:"Search__input",onChange:function(t){return e.setState({searchQuery:t.target.value})},onKeyDown:function(t){return e.handleInput(t)}})),n.a.createElement("button",{type:"submit",className:"Search__submit-button",onClick:function(t){return e.search(t)}},"Search")))}}]),t}(n.a.Component)),y=function(e){return e.searchQuery},N={searchQuerySet:function(e){return{type:"SEARCH_QUERY_SET",payload:e}}},w=Object(c.b)(function(e){return{searchQuery:y(e)}},N)(v),L=(a(44),a(45),a(6)),C=a.n(L),D=a(13),T=(a(48),a(1)),S=a.n(T),k=a(21),x=a.n(k),O=(a(52),function(e){function t(){var e,a;Object(_.a)(this,t);for(var r=arguments.length,s=new Array(r),l=0;l<r;l++)s[l]=arguments[l];return(a=Object(b.a)(this,(e=Object(E.a)(t)).call.apply(e,[this].concat(s)))).state={currentTab:"departures",currentDate:S()(),removingRow:!1},a.labels={departures:{city:"airportToID.city_en",time:"timeDepExpectCalc"},arrivals:{city:"airportFromID.city_en",time:"timeToStand"}},a.loadFlights=function(e){(0,a.props.getFlightsList)(e.format("DD-MM-YYYY"))},a.getTime=function(e){return S()(e).format("H:mm")},a.changeCurrentTab=function(e){a.setState({currentTab:e})},a.sendNotification=function(){var e=Object(D.a)(C.a.mark(function e(t){var r,n,s,l;return C.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Notification.requestPermission();case 2:"granted"===e.sent&&(r=S()(),n=S()(t[a.labels[a.state.currentTab].time]),s=S.a.duration(n.diff(r)),l=s.subtract(S.a.duration(3,"hours")).as("minutes"),setTimeout(function(){return new Notification("Taxi reminder",{body:"3 hours before flight. Time to order a taxi!"})},60*l*1e3));case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),a.isMoreThanThreeHoursBeforeFlight=function(e){var t=S()(),r=S()(e[a.labels[a.state.currentTab].time]);return S.a.duration(r.diff(t)).as("hours")>3},a.showFlights=function(){var e=a.props,t=e.departures,r=e.arrivals,s=e.searchQuery,l=[];if(l="departures"===a.state.currentTab?(l=t).filter(function(e){return S()(e.timeDepExpectCalc).isSame(S()(a.state.currentDate),"day")}).sort(function(e,t){return S()(e.timeDepExpectCalc).isBefore(S()(t.timeDepExpectCalc))?-1:S()(e.timeDepExpectCalc).isAfter(S()(t.timeDepExpectCalc))?1:0}):(l=r).filter(function(e){return S()(e.timeToStand).isSame(S()(a.state.currentDate),"day")}).sort(function(e,t){return S()(e.timeToStand).isBefore(S()(t.timeToStand))?-1:S()(e.timeToStand).isAfter(S()(t.timeToStand))?1:0}),""!==s){var c=new RegExp(s,"ig"),i=l.filter(function(e){var t=e.codeShareData.map(function(e){return e.codeShare});return c.test(t)});0===i.length&&(i=l.filter(function(e){return c.test(e[a.labels[a.state.currentTab].city])})),l=i}return l.map(function(e){var t=new Date(e[a.labels[a.state.currentTab].time]),r=e[a.labels[a.state.currentTab].city],s="";switch(e.status){case"DP":s="Departed at ".concat(a.getTime(new Date(e.timeTakeofFact)));break;case"ON":s="On time";break;case"CK":s="Check-in";break;case"LN":s="Landed at ".concat(a.getTime(new Date(e.timeLandFact)));break;case"BD":s="Boarding";break;case"GC":s="Gate closed";break;case"FR":s="In flight";break;default:s=""}var l=e.codeShareData.map(function(e){return e.airline.en.name}),c=e.codeShareData.map(function(e){return e.codeShare});return n.a.createElement("tr",{key:e.ID,className:"Flights__table-row"},n.a.createElement("td",{className:"A"===e.term?"Flights__terminal":"Flights__terminal Flights__terminal--blue"},e.term),n.a.createElement("td",{className:"Flights__data Flights__time"},a.getTime(t)),n.a.createElement("td",{className:"Flights__data Flights__city"},r),n.a.createElement("td",{className:"Flights__data Flights__status"},s),n.a.createElement("td",{className:"Flights__data Flights__airlines"},n.a.createElement("ul",null,l.map(function(e){return n.a.createElement("li",{key:x()()},e)}))),n.a.createElement("td",{className:"Flights__data Flights__flight-number-field"},n.a.createElement("ul",null,c.map(function(e){return n.a.createElement("li",{className:"Flights__flight-number",key:x()()},e)}))),n.a.createElement("td",{className:"Flights__data Flights__gate"},e.gateNo),n.a.createElement("td",{className:"Flights__data Flights__reminder"},n.a.createElement("button",{className:a.isMoreThanThreeHoursBeforeFlight(e)?"Flights__reminder-button":"Flights__reminder-button Flights__reminder-button--hidden",onClick:function(){return a.sendNotification(e)}},"Taxi reminder")))})},a.removeRow=function(e){setTimeout(function(){return a.addRow(e)},1e3)},a.addRow=function(e){a.setState({currentDate:e,removingRow:!1})},a.changeDate=function(e){S()(e).isSame(S()(a.state.currentDate),"day")||a.setState({removingRow:!0},a.removeRow(e))},a}return Object(F.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){this.loadFlights(S()())}},{key:"render",value:function(){var e=this,t=S()().subtract(1,"days"),a=S()().add(1,"days");return n.a.createElement("article",{className:"Flights"},n.a.createElement("nav",{className:"Flights__tabs"},n.a.createElement("button",{className:"departures"===this.state.currentTab?"Flights__button Flights__button--active":"Flights__button",onClick:function(){return e.changeCurrentTab("departures")}},n.a.createElement("svg",{className:"Flights__departure-icon",viewBox:"0 0 40 28",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},n.a.createElement("g",{stroke:"none",strokeWidth:"1",fill:"none",fillRule:"evenodd"},n.a.createElement("g",{transform:"translate(-1.000000, -1.000000)",fill:"#FFFFFF",fillRule:"nonzero",className:"Flights__plane-icon"},n.a.createElement("g",null,n.a.createElement("path",{d:"M40.9190312,14.2925525 C40.731055,13.5210761 40.2396434,12.8581323 39.5561585,12.4539552 C38.8726735,12.0497781 38.0549837,11.9385881 37.2883912,12.1455827 L26.8096581,15.0218819 L13.1945082,2 L9.38678826,3.03046545 L17.5564785,17.5510243 L7.75204986,20.2442408 L3.86129243,17.1278331 L1,17.9171897 L4.59162231,24.3200818 L6.11030829,27.0112974 L9.26373268,26.1409043 L19.7414654,23.2656055 L28.3253427,20.9165445 L38.8070772,18.0372439 C40.4055057,17.5625364 41.3397513,15.9060318 40.9190312,14.2925525 Z",transform:"translate(21.009879, 14.505649) rotate(-4.012171) translate(-21.009879, -14.505649) "}))))),"Departures"),n.a.createElement("button",{className:"arrivals"===this.state.currentTab?"Flights__button Flights__button--active":"Flights__button",onClick:function(){return e.changeCurrentTab("arrivals")}},n.a.createElement("svg",{className:"Flights__departure-icon",viewBox:"0 0 40 28",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},n.a.createElement("g",{stroke:"none",strokeWidth:"1",fill:"none",fillRule:"evenodd"},n.a.createElement("g",{transform:"translate(-1.000000, -4.000000)",fill:"#FFFFFF",fillRule:"nonzero",className:"Flights__plane-icon"},n.a.createElement("g",null,n.a.createElement("path",{d:"M43.8940167,20.2848496 C43.7061583,19.5138567 43.2150547,18.8513283 42.531998,18.4474045 C41.8489414,18.0434806 41.031764,17.9323603 40.2656518,18.1392252 L29.793485,21.013722 L16.1868667,8 L12.3815328,9.02981973 L20.5461037,23.5412796 L10.7478188,26.2328084 L6.85949946,23.1183536 L4,23.9072155 L7.5893717,30.3060954 L9.10710602,32.9956246 L12.2585544,32.1257769 L22.7297214,29.2522799 L31.3082198,26.9046908 L41.7833862,24.0271945 C43.3808131,23.5527844 44.3144732,21.8973179 43.8940167,20.2848496 Z",transform:"translate(23.997341, 20.497812) rotate(27.974730) translate(-23.997341, -20.497812) "}))))),"Arrivals")),n.a.createElement("nav",{className:"Flights__dates-navigation"},n.a.createElement("div",{className:"Flights__calendar"},n.a.createElement("p",{className:"Flights__current-date"},S()(this.state.currentDate).format("DD/MM")),n.a.createElement("div",{className:"Flights__calendar-wrapper"},n.a.createElement("svg",{className:"Flights__calendar-icon",viewBox:"0 0 96 86",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},n.a.createElement("g",{stroke:"none",strokeWidth:"1",fill:"none",fillRule:"evenodd"},n.a.createElement("g",{id:"calendar",fill:"#ffffff",fillRule:"nonzero"},n.a.createElement("path",{d:"M85.5,7.4 L75.5,7.4 L75.5,11.4 C75.5,14.9 72.6,17.8 69.1,17.8 C65.6,17.8 62.7,15 62.7,11.4 L62.7,7.4 L33.2,7.4 L33.2,11.4 C33.2,14.9 30.4,17.8 26.8,17.8 C23.3,17.8 20.4,15 20.4,11.4 L20.4,7.4 L10.4,7.4 C4.9,7.4 0.4,11.9 0.4,17.4 L0.4,75.6 C0.4,81.1 4.9,85.6 10.4,85.6 L85.4,85.6 C90.9,85.6 95.4,81.1 95.4,75.6 L95.4,17.4 C95.5,11.9 91,7.4 85.5,7.4 Z M90,75.6 C90,78.1 88,80.1 85.5,80.1 L10.5,80.1 C8,80.1 6,78.1 6,75.6 L6,29.3 L90,29.3 L90,75.6 Z",id:"Shape"}),n.a.createElement("path",{d:"M26.9,14.2 C28.4,14.2 29.6,13 29.6,11.5 L29.6,3.2 C29.6,1.7 28.4,0.5 26.9,0.5 C25.4,0.5 24.2,1.7 24.2,3.2 L24.2,11.5 C24.1,13 25.4,14.2 26.9,14.2 Z",id:"Shape"}),n.a.createElement("path",{d:"M69.1,14.2 C70.6,14.2 71.8,13 71.8,11.5 L71.8,3.2 C71.8,1.7 70.6,0.5 69.1,0.5 C67.6,0.5 66.4,1.7 66.4,3.2 L66.4,11.5 C66.4,13 67.6,14.2 69.1,14.2 Z",id:"Shape"})))))),n.a.createElement("div",{className:"Flights__navigation-wrapper"},n.a.createElement("button",{className:"Flights__change-date-button",onClick:function(){return e.changeDate(t)}},n.a.createElement("span",{className:"Flights__date-text"},t.format("DD/MM")),"Yesterday"),n.a.createElement("button",{className:"Flights__change-date-button",onClick:function(){return e.changeDate(S()())}},n.a.createElement("span",{className:"Flights__date-text"},S()().format("DD/MM")),"Today"),n.a.createElement("button",{className:"Flights__change-date-button",onClick:function(){return e.changeDate(a)}},n.a.createElement("span",{className:"Flights__date-text"},a.format("DD/MM")),"Tomorrow"))),n.a.createElement("table",{className:"Flights__table"},n.a.createElement("thead",{className:"Flights__thead"},n.a.createElement("tr",null,n.a.createElement("th",{scope:"col",className:"Flights__table-header"},"Terminal"),n.a.createElement("th",{scope:"col",className:"Flights__table-header"},"Time"),n.a.createElement("th",{scope:"col",className:"Flights__table-header"},"Destination"),n.a.createElement("th",{scope:"col",className:"Flights__table-header"},"Status"),n.a.createElement("th",{scope:"col",className:"Flights__table-header"},"Airline"),n.a.createElement("th",{scope:"col",className:"Flights__table-header"},"Flight"),n.a.createElement("th",{scope:"col",className:"Flights__table-header"},"Gate"),n.a.createElement("th",{scope:"col",className:"Flights__table-header"}))),n.a.createElement("tbody",{className:this.state.removingRow?"Flights__tbody Flights__tbody--removing":"Flights__tbody"},this.showFlights())))}}]),t}(n.a.Component)),j=function(e){return e.flights.arrivals},R=function(e){return e.flights.departures},M=function(e){return e.search.searchQuery},A=a(33),Q=a.n(A),B={getFlightsList:function(e){return function(){var t=Object(D.a)(C.a.mark(function t(a){var r,n,s;return C.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Q.a.get("https://api.iev.aero/api/flights/".concat(e));case 2:r=t.sent,n=r.data.body.arrival,s=r.data.body.departure,a({type:"FLIGHTS_LOADED",payload:{arrivals:n,departures:s}});case 7:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()}},H=Object(c.b)(function(e){return{arrivals:j(e),departures:R(e),searchQuery:M(e)}},B)(O);l.a.render(n.a.createElement(function(){return n.a.createElement("div",{className:"App"},n.a.createElement(c.a,{store:f},n.a.createElement("main",{className:"App__content"},n.a.createElement(w,null),n.a.createElement(H,null))))},null),document.getElementById("root"))}},[[34,1,2]]]);
//# sourceMappingURL=main.91927139.chunk.js.map