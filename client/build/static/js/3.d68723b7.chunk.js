webpackJsonp([3],{738:function(e,t,i){"use strict";function a(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=i(1),s=i.n(l),p=i(2),c=i.n(p),m=i(159),g=i(107),d=i(81),A=i(161),u=i(750),_=i.n(u),f=i(747),w=i.n(f),h=i(753),v=(i.n(h),i(282)),E=i(748),b=i.n(E),C=i(749),y=i.n(C),x=function(){function e(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}}(),B=["Invalid Username!","Invalid Email!","Invalid Password!"],k=function(e){function t(e){n(this,t);var i=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return i.handleRegister=function(e){e.preventDefault();var t=i.state,a=t.register_name,n=t.register_email,r=t.register_pwd;return a.length<3||-1!==a.indexOf("asds")?void i.setState({valid:1}):n.length&&/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(n)?r.length<5?void i.setState({valid:3}):(i.setState({valid:-1}),void i.props.register({email:n,password:r,name:a,accounttype:1})):void i.setState({valid:2})},i.handleChangeInfo=function(e){return function(t){var n;i.setState((n={},a(n,e,t.target.value),a(n,"valid",0),n))}},i.handleRegisterSuccess=function(){i.props.history.push("/dashboard")},i.handleClickShowPassword=function(){i.setState(function(e){return{showPassword:!e.showPassword}})},i.handleMouseDownPassword=function(e){e.preventDefault()},i.handleSignin=function(e){e.preventDefault();var t=i.state,a=t.login_email,n=t.login_pwd;i.props.doSignin({email:a,password:n})},i.state={valid:0,register_name:"",register_email:"",register_pwd:"",login_email:"",login_pwd:"",showRegister:!0,reg_show_password:!1,login_show_password:!1},i}return o(t,e),x(t,[{key:"componentDidMount",value:function(){"login"===this.props.match.params.islogin&&this.setState({showRegister:!1})}},{key:"render",value:function(){var e=this,t=this.state.valid,i=this.props,a=i.user,n=i.doLogout,r=i.status,o=void 0===r?{}:r,l=void 0;return l=t>0||-1===t&&o.error?"validationFalse":-1!==t||o.error?"validationTrue":"success",s.a.createElement("div",{className:"loginPage"},!a&&this.state.showRegister&&s.a.createElement(v.d,{className:"register_wrapper",container:!0,spacing:40,justify:"center"},s.a.createElement(v.d,{item:!0,sm:6},s.a.createElement("div",{className:"login_form"},s.a.createElement("h1",null,s.a.createElement("strong",null,"Tell us about yourself")),s.a.createElement("h4",null,"Own your personal space."),s.a.createElement(v.m,{id:"company",label:"Username",className:"text_field",value:this.state.register_name,onChange:this.handleChangeInfo("register_name"),margin:"normal"}),s.a.createElement(v.m,{id:"register_email",label:"Email",className:"text_field",value:this.state.register_email,onChange:this.handleChangeInfo("register_email"),margin:"normal"}),s.a.createElement(v.c,{className:"text_field"},s.a.createElement(v.i,{htmlFor:"adornment-password"},"Password"),s.a.createElement(v.g,{id:"adornment-password",className:"password_field",type:this.state.showPassword?"text":"password",value:this.state.register_pwd,onChange:this.handleChangeInfo("register_pwd"),endAdornment:s.a.createElement(v.h,{position:"end"},s.a.createElement(v.f,{"aria-label":"Toggle password visibility",onClick:this.handleClickShowPassword,onMouseDown:this.handleMouseDownPassword},this.state.showPassword?s.a.createElement(y.a,null):s.a.createElement(b.a,null)))})),s.a.createElement(v.b,{className:"register_but",variant:"contained",color:"primary",onClick:this.handleRegister},"Get Started"),s.a.createElement("div",{className:"toggleText"},"Already have an account?",s.a.createElement("span",{onClick:function(){return e.setState({showRegister:!1})},className:"goto_login"},"\xa0Login")),s.a.createElement("div",{className:l},s.a.createElement("i",{className:"fa fa-exclamation-triangle valid__icon"}),s.a.createElement("p",{className:"valid__text"},"\xa0",0!==t&&B[t-1],-1===t&&o.message)))),s.a.createElement(v.e,{only:"xs"},s.a.createElement(v.d,{item:!0,xs:6},s.a.createElement("img",{src:_.a,alt:"nugget"})))),!a&&!this.state.showRegister&&s.a.createElement(v.d,{sm:12,container:!0,direction:"column",justify:"center",alignItems:"center",className:"login_wrapper"},s.a.createElement(v.d,{item:!0,sm:6},s.a.createElement("div",{className:"login_form"},s.a.createElement("h1",null,s.a.createElement("strong",null,"Employer Login")),s.a.createElement(v.m,{id:"login_email",label:"Email",className:"text_field",value:this.state.login_email,onChange:this.handleChangeInfo("login_email"),margin:"normal"}),s.a.createElement(v.c,{className:"text_field"},s.a.createElement(v.i,{htmlFor:"adornment-password"},"Password"),s.a.createElement(v.g,{id:"adornment-password",className:"password_field",type:this.state.showPassword?"text":"password",value:this.state.login_pwd,onChange:this.handleChangeInfo("login_pwd"),endAdornment:s.a.createElement(v.h,{position:"end"},s.a.createElement(v.f,{"aria-label":"Toggle password visibility",onClick:this.handleClickShowPassword,onMouseDown:this.handleMouseDownPassword},this.state.showPassword?s.a.createElement(y.a,null):s.a.createElement(b.a,null)))})),s.a.createElement(v.b,{className:"register_but",variant:"contained",color:"primary",onClick:this.handleSignin},"Login"),s.a.createElement("div",{className:"toggleText"},"Don't have an account?",s.a.createElement(g.b,{to:"/"},s.a.createElement("span",null,"\xa0Register"))),s.a.createElement("div",{className:l},s.a.createElement("i",{className:"fa fa-exclamation-triangle valid__icon"}),s.a.createElement("p",{className:"valid__text"},"\xa0",0!==t&&B[t-1],-1===t&&o.message)))),s.a.createElement("img",{className:"bottomImg",src:w.a,alt:"nugget"})),a&&s.a.createElement("div",null,s.a.createElement("p",null,"You are currently logged in as ",a.name,"."),s.a.createElement("h1",null," Account Details "),s.a.createElement("div",{className:"card"},s.a.createElement("img",{className:"card-img-top",src:"https://iffhs.de/wp-content/uploads/2017/12/lionel-messi.jpg",alt:"ProfilePic",style:{width:150,height:150}}),s.a.createElement("div",{className:"card-body"},s.a.createElement("h5",{className:"card-title"},a.name),s.a.createElement("p",{className:"card-text"}," Your account type is ",s.a.createElement("strong",null,1===a.account_type?" Employer":"Test Taker")," . Thank you for registering with us"),s.a.createElement("a",{href:"/",onClick:n,className:"btn btn-primary"},"Log out")))))}}]),t}(l.Component);k.propTypes={register:c.a.func,doLogout:c.a.func,doSignin:c.a.func,status:c.a.object};var N=function(e){return{status:e.auth.status}},P=function(e){return Object(d.b)({doLogout:A.b,doSignin:A.c,register:A.i},e)};t.default=Object(g.e)(Object(m.b)(N,P)(k))},745:function(e,t){function i(e){return e&&e.__esModule?e:{default:e}}e.exports=i},746:function(e,t,i){"use strict";function a(e,t){var i=function(t){return r.default.createElement(l.default,t,e)};return i.displayName=t,i=(0,o.default)(i),i.muiName="SvgIcon",i}var n=i(745);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(i(1)),o=n(i(32)),l=n(i(24)),s=a;t.default=s},747:function(e,t,i){e.exports=i.p+"static/media/bottom.2e49e72f.png"},748:function(e,t,i){"use strict";var a=i(745);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a(i(1)),r=a(i(746)),o=(0,r.default)(n.default.createElement(n.default.Fragment,null,n.default.createElement("path",{fill:"none",d:"M0 0h24v24H0z"}),n.default.createElement("path",{d:"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"})),"Visibility");t.default=o},749:function(e,t,i){"use strict";var a=i(745);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a(i(1)),r=a(i(746)),o=(0,r.default)(n.default.createElement(n.default.Fragment,null,n.default.createElement("path",{fill:"none",d:"M0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0z"}),n.default.createElement("path",{d:"M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"})),"VisibilityOff");t.default=o},750:function(e,t,i){e.exports=i.p+"static/media/Ellipse.7d72f223.png"},753:function(e,t,i){var a=i(754);"string"===typeof a&&(a=[[e.i,a,""]]);var n={hmr:!1};n.transform=void 0;i(735)(a,n);a.locals&&(e.exports=a.locals)},754:function(e,t,i){t=e.exports=i(734)(!0),t.push([e.i,".login_wrapper .login_form,.register_wrapper .login_form{position:relative;z-index:100}.login_wrapper .login_form .selector__control,.register_wrapper .login_form .selector__control{width:300px;margin:10px 0}.login_wrapper .login_form .text_field,.register_wrapper .login_form .text_field{margin-bottom:10px;display:block}.login_wrapper .login_form .password_field,.login_wrapper .login_form .text_field input,.register_wrapper .login_form .password_field,.register_wrapper .login_form .text_field input{width:300px}.login_wrapper .register_but,.register_wrapper .register_but{margin-top:20px}.login_wrapper .validationTrue,.register_wrapper .validationTrue{margin-top:10px;margin-left:10px;font-size:1em;color:red;visibility:hidden;opacity:0}.login_wrapper .validationFalse,.register_wrapper .validationFalse{margin-top:10px;margin-left:10px;font-size:1em;color:red;visibility:visible;opacity:1;-webkit-transition:opacity .6s,visibility .6s;-o-transition:opacity .6s,visibility .6s;transition:opacity .6s,visibility .6s}.login_wrapper .valid__icon,.register_wrapper .valid__icon{display:inline-block}.login_wrapper .valid__text,.register_wrapper .valid__text{display:inline}.login_wrapper .toggleText,.register_wrapper .toggleText{display:inline-block;position:relative;top:11px;margin-top:20px;margin-left:10px}.login_wrapper .toggleText span,.register_wrapper .toggleText span{color:#ddc700}.login_wrapper .success,.register_wrapper .success{position:relative;top:11px;margin-left:10px;display:inline-block;font-size:1em;color:green;visibility:visible;opacity:1;-webkit-transition:opacity .6s,visibility .6s;-o-transition:opacity .6s,visibility .6s;transition:opacity .6s,visibility .6s}.login_wrapper .goto_login,.register_wrapper .goto_login{cursor:pointer}.login_wrapper .bottomImg{position:absolute;bottom:0;width:100vw;z-index:1}","",{version:3,sources:["/Users/diesel/Documents/certent1/client/src/containers/Login/Login.css"],names:[],mappings:"AAAA,yDACE,kBAAmB,AACnB,WAAa,CAAE,AACf,+FACE,YAAa,AACb,aAAe,CAAE,AACnB,iFACE,mBAAoB,AACpB,aAAe,CAAE,AAGnB,sLACE,WAAa,CAAE,AAEnB,6DACE,eAAiB,CAAE,AAErB,iEACE,gBAAiB,AACjB,iBAAkB,AAClB,cAAe,AACf,UAAW,AACX,kBAAmB,AACnB,SAAW,CAAE,AAEf,mEACE,gBAAiB,AACjB,iBAAkB,AAClB,cAAe,AACf,UAAW,AACX,mBAAoB,AACpB,UAAW,AACX,8CAAoD,AACpD,yCAA+C,AAC/C,qCAA4C,CAAE,AAEhD,2DACE,oBAAsB,CAAE,AAE1B,2DACE,cAAgB,CAAE,AAEpB,yDACE,qBAAsB,AACtB,kBAAmB,AACnB,SAAU,AACV,gBAAiB,AACjB,gBAAkB,CAAE,AACpB,mEACE,aAAe,CAAE,AAErB,mDACE,kBAAmB,AACnB,SAAU,AACV,iBAAkB,AAClB,qBAAsB,AACtB,cAAe,AACf,YAAa,AACb,mBAAoB,AACpB,UAAW,AACX,8CAAoD,AACpD,yCAA+C,AAC/C,qCAA4C,CAAE,AAEhD,yDACE,cAAgB,CAAE,AAEpB,0BACE,kBAAmB,AACnB,SAAY,AACZ,YAAa,AACb,SAAW,CAAE",file:"Login.css",sourcesContent:[".register_wrapper .login_form, .login_wrapper .login_form {\n  position: relative;\n  z-index: 100; }\n  .register_wrapper .login_form .selector__control, .login_wrapper .login_form .selector__control {\n    width: 300px;\n    margin: 10px 0; }\n  .register_wrapper .login_form .text_field, .login_wrapper .login_form .text_field {\n    margin-bottom: 10px;\n    display: block; }\n    .register_wrapper .login_form .text_field input, .login_wrapper .login_form .text_field input {\n      width: 300px; }\n  .register_wrapper .login_form .password_field, .login_wrapper .login_form .password_field {\n    width: 300px; }\n\n.register_wrapper .register_but, .login_wrapper .register_but {\n  margin-top: 20px; }\n\n.register_wrapper .validationTrue, .login_wrapper .validationTrue {\n  margin-top: 10px;\n  margin-left: 10px;\n  font-size: 1em;\n  color: red;\n  visibility: hidden;\n  opacity: 0; }\n\n.register_wrapper .validationFalse, .login_wrapper .validationFalse {\n  margin-top: 10px;\n  margin-left: 10px;\n  font-size: 1em;\n  color: red;\n  visibility: visible;\n  opacity: 1;\n  -webkit-transition: opacity 600ms, visibility 600ms;\n  -o-transition: opacity 600ms, visibility 600ms;\n  transition: opacity 600ms, visibility 600ms; }\n\n.register_wrapper .valid__icon, .login_wrapper .valid__icon {\n  display: inline-block; }\n\n.register_wrapper .valid__text, .login_wrapper .valid__text {\n  display: inline; }\n\n.register_wrapper .toggleText, .login_wrapper .toggleText {\n  display: inline-block;\n  position: relative;\n  top: 11px;\n  margin-top: 20px;\n  margin-left: 10px; }\n  .register_wrapper .toggleText span, .login_wrapper .toggleText span {\n    color: #ddc700; }\n\n.register_wrapper .success, .login_wrapper .success {\n  position: relative;\n  top: 11px;\n  margin-left: 10px;\n  display: inline-block;\n  font-size: 1em;\n  color: green;\n  visibility: visible;\n  opacity: 1;\n  -webkit-transition: opacity 600ms, visibility 600ms;\n  -o-transition: opacity 600ms, visibility 600ms;\n  transition: opacity 600ms, visibility 600ms; }\n\n.register_wrapper .goto_login, .login_wrapper .goto_login {\n  cursor: pointer; }\n\n.login_wrapper .bottomImg {\n  position: absolute;\n  bottom: 0px;\n  width: 100vw;\n  z-index: 1; }\n"],sourceRoot:""}])}});
//# sourceMappingURL=3.d68723b7.chunk.js.map