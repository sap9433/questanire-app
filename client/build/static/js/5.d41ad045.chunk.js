webpackJsonp([5],{5977:function(e,n,i){var t=i(5978);"string"===typeof t&&(t=[[e.i,t,""]]);var a={hmr:!1};a.transform=void 0;i(735)(t,a);t.locals&&(e.exports=t.locals)},5978:function(e,n,i){n=e.exports=i(734)(!0),n.push([e.i,".login_wrapper .login_form{position:relative;z-index:100;top:75px}.login_wrapper .login_form .selector__control{width:300px;margin:10px 0}.login_wrapper .login_form .text_field{margin-bottom:10px;display:block}.login_wrapper .login_form .password_field,.login_wrapper .login_form .text_field input{width:300px}.login_wrapper .enter_but{margin-top:20px}.login_wrapper .validationTrue{visibility:hidden;opacity:0}.login_wrapper .validationFalse,.login_wrapper .validationTrue{display:inline-block;position:relative;top:12px;margin-left:10px;font-size:1em;color:red}.login_wrapper .validationFalse{visibility:visible;opacity:1;-webkit-transition:opacity .6s,visibility .6s;-o-transition:opacity .6s,visibility .6s;transition:opacity .6s,visibility .6s}.login_wrapper .valid__icon{display:inline-block}.login_wrapper .valid__text{display:inline}.login_wrapper .toggleText{display:inline-block;position:relative;top:11px;margin-top:20px;margin-left:10px}.login_wrapper .toggleText span{color:#ddc700}.login_wrapper .success{position:relative;top:11px;margin-left:10px;display:inline-block;font-size:1em;color:green;visibility:visible;opacity:1;-webkit-transition:opacity .6s,visibility .6s;-o-transition:opacity .6s,visibility .6s;transition:opacity .6s,visibility .6s}.bottomImg{position:absolute;left:0;top:55vh;z-index:-999;width:100vw;z-index:1}","",{version:3,sources:["/Users/diesel/Documents/certent/client/src/containers/CEnter/CEnter.css"],names:[],mappings:"AAAA,2BACE,kBAAmB,AACnB,YAAa,AACb,QAAU,CAAE,AACZ,8CACE,YAAa,AACb,aAAe,CAAE,AACnB,uCACE,mBAAoB,AACpB,aAAe,CAAE,AAGnB,wFACE,WAAa,CAAE,AAEnB,0BACE,eAAiB,CAAE,AAErB,+BAOE,kBAAmB,AACnB,SAAW,CAAE,AAEf,+DATE,qBAAsB,AACtB,kBAAmB,AACnB,SAAU,AACV,iBAAkB,AAClB,cAAe,AACf,SAAW,CAemC,AAXhD,gCAOE,mBAAoB,AACpB,UAAW,AACX,8CAAoD,AACpD,yCAA+C,AAC/C,qCAA4C,CAAE,AAEhD,4BACE,oBAAsB,CAAE,AAE1B,4BACE,cAAgB,CAAE,AAEpB,2BACE,qBAAsB,AACtB,kBAAmB,AACnB,SAAU,AACV,gBAAiB,AACjB,gBAAkB,CAAE,AACpB,gCACE,aAAe,CAAE,AAErB,wBACE,kBAAmB,AACnB,SAAU,AACV,iBAAkB,AAClB,qBAAsB,AACtB,cAAe,AACf,YAAa,AACb,mBAAoB,AACpB,UAAW,AACX,8CAAoD,AACpD,yCAA+C,AAC/C,qCAA4C,CAAE,AAEhD,WACE,kBAAmB,AACnB,OAAU,AACV,SAAU,AACV,aAAc,AACd,YAAa,AACb,SAAW,CAAE",file:"CEnter.css",sourcesContent:[".login_wrapper .login_form {\n  position: relative;\n  z-index: 100;\n  top: 75px; }\n  .login_wrapper .login_form .selector__control {\n    width: 300px;\n    margin: 10px 0; }\n  .login_wrapper .login_form .text_field {\n    margin-bottom: 10px;\n    display: block; }\n    .login_wrapper .login_form .text_field input {\n      width: 300px; }\n  .login_wrapper .login_form .password_field {\n    width: 300px; }\n\n.login_wrapper .enter_but {\n  margin-top: 20px; }\n\n.login_wrapper .validationTrue {\n  display: inline-block;\n  position: relative;\n  top: 12px;\n  margin-left: 10px;\n  font-size: 1em;\n  color: red;\n  visibility: hidden;\n  opacity: 0; }\n\n.login_wrapper .validationFalse {\n  display: inline-block;\n  position: relative;\n  top: 12px;\n  margin-left: 10px;\n  font-size: 1em;\n  color: red;\n  visibility: visible;\n  opacity: 1;\n  -webkit-transition: opacity 600ms, visibility 600ms;\n  -o-transition: opacity 600ms, visibility 600ms;\n  transition: opacity 600ms, visibility 600ms; }\n\n.login_wrapper .valid__icon {\n  display: inline-block; }\n\n.login_wrapper .valid__text {\n  display: inline; }\n\n.login_wrapper .toggleText {\n  display: inline-block;\n  position: relative;\n  top: 11px;\n  margin-top: 20px;\n  margin-left: 10px; }\n  .login_wrapper .toggleText span {\n    color: #ddc700; }\n\n.login_wrapper .success {\n  position: relative;\n  top: 11px;\n  margin-left: 10px;\n  display: inline-block;\n  font-size: 1em;\n  color: green;\n  visibility: visible;\n  opacity: 1;\n  -webkit-transition: opacity 600ms, visibility 600ms;\n  -o-transition: opacity 600ms, visibility 600ms;\n  transition: opacity 600ms, visibility 600ms; }\n\n.bottomImg {\n  position: absolute;\n  left: 0px;\n  top: 55vh;\n  z-index: -999;\n  width: 100vw;\n  z-index: 1; }\n"],sourceRoot:""}])},741:function(e,n,i){"use strict";function t(e,n,i){return n in e?Object.defineProperty(e,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[n]=i,e}function a(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function o(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!==typeof n&&"function"!==typeof n?e:n}function r(e,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}Object.defineProperty(n,"__esModule",{value:!0});var l=i(1),A=i.n(l),s=i(2),p=i.n(s),c=i(159),m=i(161),g=i(81),d=i(751),f=i(747),u=i.n(f),C=i(5977),v=(i.n(C),i(282)),b=function(){function e(e,n){for(var i=0;i<n.length;i++){var t=n[i];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(n,i,t){return i&&e(n.prototype,i),t&&e(n,t),n}}(),_=["Please type your name!","Please type valid email!"],y=function(e){function n(e){a(this,n);var i=o(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,e));return i.handleChangeInfo=function(e){return function(n){var a;i.setState((a={},t(a,e,n.target.value),t(a,"valid",0),a))}},i.handleSignin=function(e){e.preventDefault();var n=i.state,t=n.fname,a=n.lname,o=n.email,r=i.props.clientSoftLogin;return t.length<3||a.length<3?void i.setState({valid:1}):void 0!==Object(d.a)(o)||o.length<5?void i.setState({valid:2}):void r({name:t+" "+a,email:o})},i.state={valid:0,fname:"",lname:"",email:""},i}return r(n,e),b(n,[{key:"componentWillReceiveProps",value:function(e){var n=this.props,i=n.match.params.testid,t=n.history.push,a=n.user;e.user&&e.user!==a&&t("/onboard/"+i)}},{key:"render",value:function(){var e=this.state.valid,n=0===e?"validationTrue":"validationFalse";return A.a.createElement("div",{className:"signinWrapper"},A.a.createElement(v.d,{container:!0,direction:"column",justify:"center",alignItems:"center",className:"login_wrapper"},A.a.createElement(v.d,{item:!0,sm:6},A.a.createElement("div",{className:"login_form"},A.a.createElement("h1",null,A.a.createElement("strong",null,"Candidate Login")),A.a.createElement("h4",null,"Enter the form below to begin"),A.a.createElement(v.m,{id:"fname",label:"First Name",className:"text_field",value:this.state.fname,onChange:this.handleChangeInfo("fname"),margin:"normal"}),A.a.createElement(v.m,{id:"lname",label:"Last Name",className:"text_field",value:this.state.lname,onChange:this.handleChangeInfo("lname"),margin:"normal"}),A.a.createElement(v.m,{id:"email",label:"Email",className:"text_field",value:this.state.email,onChange:this.handleChangeInfo("email"),margin:"normal"}),A.a.createElement(v.b,{className:"enter_but",variant:"contained",color:"primary",onClick:this.handleSignin},"Enter"),A.a.createElement("div",{className:n},A.a.createElement("i",{className:"fa fa-exclamation-triangle valid__icon"}),A.a.createElement("p",{className:"valid__text"},"\xa0",0!==e&&_[e-1]))))),A.a.createElement("img",{className:"bottomImg",src:u.a,alt:"nugget"}))}}]),n}(l.Component);y.propTypes={clientSoftLogin:p.a.func,pushState:p.a.func,routeParams:p.a.object};var B=function(e){return{user:e.auth.user}},h=function(e){return Object(g.b)({clientSoftLogin:m.a},e)};n.default=Object(c.b)(B,h)(y)},747:function(e,n,i){e.exports=i.p+"static/media/bottom.2e49e72f.png"},751:function(e,n,i){"use strict";function t(e){if(!a(e)&&!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e))return"Invalid email address"}n.a=t;var a=function(e){return void 0===e||null===e||""===e}}});
//# sourceMappingURL=5.d41ad045.chunk.js.map