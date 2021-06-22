(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{296:function(e,t,n){},482:function(e,t,n){"use strict";n.r(t),n.d(t,"routedHistory",(function(){return Ue}));var c=n(0),r=n(40),a=n.n(r),i=(n(292),n(293),n(294),n(295),n(296),n(502)),s=n(14),o=n(17),l=n(506),j=n(516),u=n(276),d=n(140),b=n(21),h=n.n(b),O=n(38),x=n(16),p=n(18),v=n(15),f=n(39),m=n.n(f),g=n(149);m.a.defaults.baseURL="/api/";m.a.interceptors.request.use((function(e){var t=T.commonStore.token;return e.headers.Authorization="Bearer ".concat(t),e})),m.a.interceptors.response.use(void 0,(function(e){var t=e.response,n=t.data,c=t.status,r=t.config;if(500===c&&(T.commonStore.setServerError(n),Ue.push("server-error")),404===c)Ue.push("not-found");else if(400===c){var a;if("get"===r.method&&(null===n||void 0===n||null===(a=n.errors)||void 0===a?void 0:a.hasOwnProperty("id"))&&Ue.push("not-found"),n&&n.errors){var i=[];for(var s in n.errors)n.errors[s]&&i.push(n.errors[s]);if(i.length>0)throw i.flat()}}return g.b.error("".concat(c," - ").concat(JSON.stringify(n))),Promise.reject(e)}));var y=function(e){return e.data},w=function(e){return m.a.get(e).then(y)},A=function(e,t){return m.a.post(e,t).then(y)},k=function(e,t){return m.a.put(e,t).then(y)},C=function(e){return m.a.delete(e).then(y)},S={Activities:{list:function(){return w("/activities")},details:function(e){return w("/activities/".concat(e))},create:function(e){return A("/activities",e)},update:function(e){return k("/activities/".concat(e.id),e)},delete:function(e){return C("/activities/".concat(e))},toggleAttendance:function(e){return A("/activities/".concat(e,"/toggle-attendance"),{})}},Account:{current:function(){return w("/account")},login:function(e){return A("/account/login",e)},register:function(e){return A("/account/register",e)}}},M=n(513),F=n(484),I=function(){function e(){var t=this;Object(x.a)(this,e),this.activityRegistry=new Map,this.loadedAllActivities=!1,this.editMode=!1,this.loading=!1,this.storeActivity=function(e){var n,c=T.userStore.user;c&&(e.isGoing=e.attendees.some((function(e){return e.username===c.username})),e.isHost=c.username===e.hostUsername,e.host=null===(n=e.attendees)||void 0===n?void 0:n.find((function(t){return t.username===e.hostUsername})));e.date=new Date(e.date),t.activityRegistry.set(e.id,e)},this.ensureActivitiesLoaded=Object(O.a)(h.a.mark((function e(){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.loadedAllActivities){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,t.loadActivities();case 4:case"end":return e.stop()}}),e)}))),this.loadActivities=Object(O.a)(h.a.mark((function e(){var n;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,S.Activities.list();case 3:n=e.sent,Object(v.h)((function(){n.forEach((function(e){return t.storeActivity(e)})),t.loadedAllActivities=!0})),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])}))),this.loadActivity=function(){var e=Object(O.a)(h.a.mark((function e(n){var c;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(c=t.activityRegistry.get(n))){e.next=4;break}e.next=14;break;case 4:return e.prev=4,e.next=7,S.Activities.details(n);case 7:c=e.sent,t.storeActivity(c),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(4),console.log(e.t0);case 14:return e.abrupt("return",c);case 15:case"end":return e.stop()}}),e,null,[[4,11]])})));return function(t){return e.apply(this,arguments)}}(),this.createOrEditActivity=function(){var e=Object(O.a)(h.a.mark((function e(n){var c,r;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.loading=!0,!n.id){e.next=17;break}return e.prev=2,e.next=5,S.Activities.update(n);case 5:c=e.sent,Object(v.h)((function(){t.storeActivity(c)})),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(2),console.log(e.t0);case 12:return e.prev=12,Object(v.h)((function(){t.loading=!1})),e.finish(12);case 15:e.next=31;break;case 17:return n.id=Object(M.a)(),e.prev=18,e.next=21,S.Activities.create(n);case 21:r=e.sent,Object(v.h)((function(){t.storeActivity(r)})),e.next=28;break;case 25:e.prev=25,e.t1=e.catch(18),console.log(e.t1);case 28:return e.prev=28,Object(v.h)((function(){t.loading=!1})),e.finish(28);case 31:return e.abrupt("return",n.id);case 32:case"end":return e.stop()}}),e,null,[[2,9,12,15],[18,25,28,31]])})));return function(t){return e.apply(this,arguments)}}(),this.deleteActivity=function(){var e=Object(O.a)(h.a.mark((function e(n){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading=!0,e.prev=1,e.next=4,S.Activities.delete(n);case 4:Object(v.h)((function(){t.activityRegistry.delete(n)})),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(1),console.log(e.t0);case 10:return e.prev=10,Object(v.h)((function(){t.loading=!1})),e.finish(10);case 13:case"end":return e.stop()}}),e,null,[[1,7,10,13]])})));return function(t){return e.apply(this,arguments)}}(),this.toggleAttendance=function(){var e=Object(O.a)(h.a.mark((function e(n){var c;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading=!0,e.prev=1,e.next=4,S.Activities.toggleAttendance(n);case 4:(c=e.sent)&&t.storeActivity(c),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),console.log(e.t0);case 11:return e.prev=11,Object(v.h)((function(){return t.loading=!1})),e.finish(11);case 14:case"end":return e.stop()}}),e,null,[[1,8,11,14]])})));return function(t){return e.apply(this,arguments)}}(),Object(v.d)(this)}return Object(p.a)(e,[{key:"activitiesByDate",get:function(){return Array.from(this.activityRegistry.values()).sort((function(e,t){return t.date.getTime()-e.date.getTime()}))}},{key:"activitiesGroupedByDate",get:function(){return this.activitiesByDate.reduce((function(e,t){var n=Object(F.default)(t.date,"dd MMM yyyy");return e.has(n)||e.set(n,[]),e.get(n).push(t),e}),new Map)}}]),e}(),L=function(){function e(){var t=this;Object(x.a)(this,e),this.user=null,this.getUser=Object(O.a)(h.a.mark((function e(){var n;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,S.Account.current();case 3:n=e.sent,Object(v.h)((function(){return t.user=n})),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])}))),this.login=function(){var e=Object(O.a)(h.a.mark((function e(n){var c;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,S.Account.login(n);case 3:c=e.sent,Object(v.h)((function(){T.commonStore.setToken(c.token),t.user=c})),e.next=10;break;case 7:throw e.prev=7,e.t0=e.catch(0),e.t0;case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}(),this.logout=function(){T.commonStore.setToken(null),t.user=null},this.register=function(){var e=Object(O.a)(h.a.mark((function e(n){var c;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,S.Account.register(n);case 3:c=e.sent,Object(v.h)((function(){T.commonStore.setToken(c.token),t.user=c})),e.next=10;break;case 7:throw e.prev=7,e.t0=e.catch(0),e.t0;case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}(),Object(v.d)(this)}return Object(p.a)(e,[{key:"isLoggedIn",get:function(){return!!this.user}}]),e}(),T={activityStore:new I,commonStore:new function e(){var t=this;Object(x.a)(this,e),this.error=null,this.token=window.localStorage.getItem("jwt"),this.appLoaded=!1,this.setServerError=function(e){t.error=e},this.setToken=function(e){t.token=e},this.setAppLoaded=function(){t.appLoaded=!0},Object(v.d)(this),Object(v.g)((function(){return t.token}),(function(e){e?window.localStorage.setItem("jwt",e):window.localStorage.removeItem("jwt")}))},modalStore:new function e(){var t=this;Object(x.a)(this,e),this.modal={open:!1,body:null},this.open=function(e){t.modal.open=!0,t.modal.body=e},this.close=function(){t.modal.open=!1,t.modal.body=null},Object(v.d)(this)},userStore:new L},D=Object(c.createContext)(T);function E(){return Object(c.useContext)(D)}var R=n(1),z=Object(s.a)((function(){var e=E().userStore,t=e.user,n=e.logout;return Object(R.jsx)(l.a,{inverted:!0,fixed:"top",children:Object(R.jsxs)(i.a,{children:[Object(R.jsxs)(l.a.Item,{header:!0,as:o.b,to:"/",exact:!0,children:[Object(R.jsx)("img",{src:"/assets/logo.png",alt:"logo",style:{marginRight:"10px"}}),"Reactivities"]}),Object(R.jsx)(l.a.Item,{name:"Activities",as:o.b,to:"/activities"}),Object(R.jsx)(l.a.Item,{name:"Errors",as:o.b,to:"/errors"}),Object(R.jsx)(l.a.Item,{children:Object(R.jsx)(j.a,{positive:!0,content:"Create Activity",as:o.b,to:"/createActivity"})}),Object(R.jsxs)(l.a.Item,{position:"right",children:[Object(R.jsx)(u.a,{src:(null===t||void 0===t?void 0:t.image)||"/assets/user.png",avatar:!0,spaced:"right"}),Object(R.jsx)(d.a,{text:null===t||void 0===t?void 0:t.displayName,pointing:"top left",children:Object(R.jsxs)(d.a.Menu,{children:[Object(R.jsx)(d.a.Item,{as:o.a,to:"/profile/".concat(null===t||void 0===t?void 0:t.username),text:"My Profile",icon:"user"}),Object(R.jsx)(d.a.Item,{onClick:function(){n(),Ue.push("/")},text:"logout",icon:"power"})]})})]})]})})})),q=n(521),N=n(20),B=n(520),G=n(517),H=n(503);function P(e){var t=e.inverted,n=void 0===t||t,c=e.content,r=void 0===c?"Loading...":c;return Object(R.jsx)(G.a,{active:!0,inverted:n,children:Object(R.jsx)(H.a,{content:r})})}var U=n(519),V=n(179),J=n(509),W=n(87),Y=n(510),K=n(505),Q=n(512),X=Object(s.a)((function(e){var t=e.profile;return Object(R.jsxs)(Q.a,{as:o.a,to:"/profiles/".concat(t.username),children:[Object(R.jsx)(u.a,{src:t.image||"/assets/user.png"}),Object(R.jsxs)(Q.a.Content,{children:[Object(R.jsx)(Q.a.Header,{children:t.displayName}),Object(R.jsx)(Q.a.Description,{children:"Bio goes here"})]}),Object(R.jsxs)(Q.a.Content,{extra:!0,children:[Object(R.jsx)(W.a,{name:"user"}),"20 followers"]})]})})),Z=Object(s.a)((function(e){var t=e.attendees;return Object(R.jsx)(Y.a,{horizontal:!0,children:t.map((function(e){return Object(R.jsx)(K.a,{hoverable:!0,trigger:Object(R.jsx)(Y.a.Item,{as:o.a,to:"/profiles/".concat(e.username),children:Object(R.jsx)(u.a,{size:"mini",circular:!0,src:e.image||"/assets/user.png"})},e.username),children:Object(R.jsx)(K.a.Content,{children:Object(R.jsx)(X,{profile:e})})},e.username)}))})}));var $=Object(s.a)((function(e){var t=e.activity,n=E().activityStore,r=Object(c.useState)(!1),a=Object(N.a)(r,2),i=a[0],s=a[1];return Object(R.jsx)(R.Fragment,{children:Object(R.jsxs)(U.a.Group,{children:[Object(R.jsxs)(U.a,{children:[t.isCancelled&&Object(R.jsx)(V.a,{attached:"top",color:"red",style:{textAlign:"center"},children:"Cancelled"}),Object(R.jsx)(J.a.Group,{children:Object(R.jsxs)(J.a,{children:[Object(R.jsx)(J.a.Image,{size:"tiny",style:{marginBottom:3},circular:!0,src:"/assets/user.png"}),Object(R.jsxs)(J.a.Content,{children:[Object(R.jsx)(J.a.Header,{as:o.a,to:"/activities/".concat(t.id),children:t.title}),Object(R.jsxs)(J.a.Description,{children:["Hosted by ",t.host.displayName]}),t.isHost&&Object(R.jsx)(J.a.Description,{children:Object(R.jsx)(V.a,{basic:!0,color:"orange",children:"You are hosting this activity."})}),t.isGoing&&!t.isHost&&Object(R.jsx)(J.a.Description,{children:Object(R.jsx)(V.a,{basic:!0,color:"green",children:"You are going to this activity."})})]})]})})]}),Object(R.jsx)(U.a,{children:Object(R.jsxs)("span",{children:[Object(R.jsx)(W.a,{name:"clock"})," ",Object(F.default)(t.date,"dd MMM yyyy h:mm aa"),Object(R.jsx)(W.a,{name:"marker"})," ",t.venue]})}),Object(R.jsx)(U.a,{secondary:!0,children:Object(R.jsx)(Z,{attendees:t.attendees})}),Object(R.jsxs)(U.a,{clearing:!0,children:[Object(R.jsx)("span",{children:t.description}),Object(R.jsx)(j.a,{as:o.a,to:"/activities/".concat(t.id),floated:"right",color:"teal",content:"view"}),t.isHost&&Object(R.jsx)(j.a,{onClick:function(e){return s(!0),void n.deleteActivity(t.id).then((function(){return s(!1)}))},name:t.id,loading:i,floated:"right",content:"Delete",color:"red"}),Object(R.jsx)(V.a,{basic:!0,content:t.category})]})]})})}));var _=Object(s.a)((function(){var e=E().activityStore,t=Object(c.useState)(!0),n=Object(N.a)(t,2),r=n[0],a=n[1];return Object(c.useEffect)((function(){e.ensureActivitiesLoaded().then((function(){return a(!1)}))}),[e]),r?Object(R.jsx)(P,{content:"Loading activities..."}):Object(R.jsx)(R.Fragment,{children:Array.from(e.activitiesGroupedByDate.entries()).map((function(e){var t=Object(N.a)(e,2),n=t[0],r=t[1];return Object(R.jsxs)(c.Fragment,{children:[Object(R.jsx)(B.a,{sub:!0,color:"teal",children:n}),r.map((function(e){return Object(R.jsx)($,{activity:e},e.id)}))]},n)}))})})),ee=n(274);function te(){return Object(R.jsxs)(R.Fragment,{children:[Object(R.jsxs)(l.a,{vertical:!0,size:"large",style:{width:"100%",marginTop:25},children:[Object(R.jsx)(B.a,{icon:"filter",attached:!0,color:"teal",content:"filters"}),Object(R.jsx)(l.a.Item,{content:"All Activities"}),Object(R.jsx)(l.a.Item,{content:"I'm going"}),Object(R.jsx)(l.a.Item,{content:"I'm hosting"})]}),Object(R.jsx)(B.a,{}),Object(R.jsx)(ee.a,{})]})}var ne=Object(s.a)((function(){return Object(R.jsxs)(q.a,{children:[Object(R.jsx)(q.a.Column,{width:"10",children:Object(R.jsx)(_,{})}),Object(R.jsx)(q.a.Column,{width:"6",children:Object(R.jsx)(te,{})})]})})),ce=n(24),re=n(29),ae=n(47),ie=n(45),se=n(507);function oe(e){var t=Object(re.d)(e.name),n=Object(N.a)(t,2),c=n[0],r=n[1];return Object(R.jsxs)(se.a.Field,{error:r.touched&&!!r.error,children:[Object(R.jsx)("label",{children:e.label}),Object(R.jsx)("input",Object(ie.a)(Object(ie.a)({},c),e)),r.touched&&r.error&&Object(R.jsx)(V.a,{color:"red",children:r.error})]})}function le(e){var t=Object(re.d)(e.name),n=Object(N.a)(t,2),c=n[0],r=n[1];return Object(R.jsxs)(se.a.Field,{error:r.touched&&!!r.error,children:[Object(R.jsx)("label",{children:e.label}),Object(R.jsx)("textarea",Object(ie.a)(Object(ie.a)({},c),e)),r.touched&&r.error&&Object(R.jsx)(V.a,{color:"red",children:r.error})]})}var je=n(504);function ue(e){var t=Object(re.d)(e.name),n=Object(N.a)(t,3),c=n[0],r=n[1],a=n[2];return Object(R.jsxs)(se.a.Field,{error:r.touched&&!!r.error,children:[Object(R.jsx)("label",{children:e.label}),Object(R.jsx)(je.a,{clearable:!0,options:e.options,value:c.value,onChange:function(e,t){return a.setValue(t.value)},onBlur:function(){return a.setTouched(!0)}}),r.touched&&r.error&&Object(R.jsx)(V.a,{color:"red",children:r.error})]})}var de=[{text:"Drinks",value:"drinks"},{text:"Culture",value:"culture"},{text:"Film",value:"film"},{text:"Food",value:"food"},{text:"Music",value:"music"},{text:"Travel",value:"travel"}],be=n(271),he=n.n(be);function Oe(e){var t=Object(re.d)(e.name),n=Object(N.a)(t,3),c=n[0],r=n[1],a=n[2];return Object(R.jsxs)(se.a.Field,{error:!!r.error,children:[Object(R.jsx)(he.a,Object(ie.a)(Object(ie.a)(Object(ie.a)({},c),e),{},{selected:c.value&&new Date(c.value)||null,onChange:function(e){return a.setValue(e)}})),r.error&&Object(R.jsx)(V.a,{color:"red",children:r.error})]})}var xe=Object(s.a)((function(){var e=Object(ce.i)().id,t=E().activityStore,n=Object(c.useState)({id:"",title:"",category:"",description:"",date:null,city:"",venue:""}),r=Object(N.a)(n,2),a=r[0],i=r[1],s=ae.b({title:ae.c().required("The activity title is required."),description:ae.c().required("The activity description is required."),category:ae.c().required(),date:ae.a().required("Date is required."),city:ae.c().required(),venue:ae.c().required()}),l=Object(c.useState)(!!e),u=Object(N.a)(l,2),d=u[0],b=u[1],h=Object(ce.g)();return Object(c.useEffect)((function(){e&&t.loadActivity(e).then((function(e){e&&i(e),b(!1)}))}),[e,t]),e&&!a||d?Object(R.jsx)(P,{content:"Loading activity"}):Object(R.jsxs)(U.a,{clearing:!0,children:[Object(R.jsx)(B.a,{content:"Activity Details",sub:!0,color:"teal"}),Object(R.jsx)(re.c,{initialValues:a,onSubmit:function(e){t.createOrEditActivity(e).then((function(e){h.push("/activities/".concat(e))}))},validationSchema:s,enableReinitialize:!0,children:function(e){var t=e.isValid,n=e.isSubmitting,c=e.dirty;return Object(R.jsxs)(re.b,{className:"ui form",autoComplete:"off",children:[Object(R.jsx)(oe,{placeholder:"Title",name:"title"}),Object(R.jsx)(le,{placeholder:"Description",name:"description",rows:3}),Object(R.jsx)(ue,{placeholder:"Category",name:"category",options:de}),Object(R.jsx)(Oe,{placeholderText:"Date",name:"date",showTimeSelect:!0,timeCaption:"time",dateFormat:"MMMM d, yyyy h:mm aa"}),Object(R.jsx)(B.a,{content:"Location Details",sub:!0,color:"teal"}),Object(R.jsx)(oe,{placeholder:"City",name:"city"}),Object(R.jsx)(oe,{placeholder:"Venue",name:"venue"}),Object(R.jsx)(j.a,{disabled:n||!t||!c,loading:n,floated:"right",positive:!0,type:"submit",content:"Submit"}),Object(R.jsx)(j.a,{as:o.a,to:a.id?"/activities/".concat(a.id):"/activities",floated:"right",type:"button",content:"Cancel"})]})}})]})})),pe=Object(s.a)((function(e){var t=e.onDone,n=E().userStore;function c(){return(c=Object(O.a)(h.a.mark((function e(c,r){var a;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=r.setErrors,e.prev=1,e.next=4,n.login(c);case 4:Ue.push("/activities"),t(),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),a({error:"Login failed"});case 11:case"end":return e.stop()}}),e,null,[[1,8]])})))).apply(this,arguments)}return Object(R.jsx)(re.c,{initialValues:{email:"",password:"",error:"null"},onSubmit:function(e,t){return c.apply(this,arguments)},children:function(e){var t=e.handleSubmit,n=e.isSubmitting,c=e.errors;return Object(R.jsxs)(re.b,{className:"ui form",onSubmit:t,autoComplete:"off",children:[Object(R.jsx)(B.a,{as:"h2",content:"Login to Reactivities",color:"teal",textAlign:"center"}),Object(R.jsx)(oe,{name:"email",placeholder:"Email"}),Object(R.jsx)(oe,{name:"password",placeholder:"Password",type:"password"}),Object(R.jsx)(re.a,{name:"error",render:function(){return Object(R.jsx)(V.a,{content:c.error,style:{marginBottom:10},basic:!0,color:"red"})}}),Object(R.jsx)(j.a,{loading:n,positive:!0,content:"Login",type:"submit",fluid:!0})]})}})}));function ve(e){var t=Object(re.d)(e.name),n=Object(N.a)(t,2)[1];return Object(R.jsx)(se.a.Field,{error:n.touched&&!!n.error,children:n.touched&&n.error&&Object(R.jsx)(V.a,{color:"red",children:n.error})})}var fe=Object(s.a)((function(e){var t=e.onDone,n=E().userStore;function c(){return(c=Object(O.a)(h.a.mark((function e(c,r){var a;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=r.setErrors,e.prev=1,e.next=4,n.register(c);case 4:Ue.push("/activities"),t(),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(1),console.log(e.t0),a({error:e.t0[0]});case 12:case"end":return e.stop()}}),e,null,[[1,8]])})))).apply(this,arguments)}return Object(R.jsx)(re.c,{initialValues:{displayName:"",username:"",email:"",password:"",error:null},validationSchema:ae.b({displayName:ae.c().required(),username:ae.c().required(),email:ae.c().email().required(),password:ae.c().required()}),onSubmit:function(e,t){return c.apply(this,arguments)},children:function(e){var t=e.handleSubmit,n=e.isSubmitting,c=(e.errors,e.isValid),r=e.dirty;return Object(R.jsxs)(re.b,{className:"ui form error",onSubmit:t,autoComplete:"off",children:[Object(R.jsx)(B.a,{as:"h2",content:"Create an Account",color:"teal",textAlign:"center"}),Object(R.jsx)(oe,{name:"displayName",placeholder:"Display Name"}),Object(R.jsx)(oe,{name:"username",placeholder:"Username"}),Object(R.jsx)(oe,{name:"email",placeholder:"Email"}),Object(R.jsx)(oe,{name:"password",placeholder:"Password",type:"password"}),Object(R.jsx)(ve,{name:"error"}),Object(R.jsx)(j.a,{disabled:!c||!r||n,loading:n,positive:!0,content:"Register",type:"submit",fluid:!0})]})}})})),me=Object(s.a)((function(){var e=E(),t=e.userStore,n=e.modalStore;return Object(R.jsx)(R.Fragment,{children:Object(R.jsx)(U.a,{inverted:!0,textAlign:"center",vertical:!0,className:"masthead",children:Object(R.jsxs)(i.a,{text:!0,children:[Object(R.jsxs)(B.a,{as:"h1",inverted:!0,children:[Object(R.jsx)(u.a,{size:"massive",src:"/assets/logo.png",alt:"logo",style:{marginBottom:12}}),"Reactivities"]}),t.isLoggedIn?Object(R.jsxs)(R.Fragment,{children:[Object(R.jsx)(B.a,{as:"h2",inverted:!0,content:"Welcome to Reactivities"}),Object(R.jsx)(j.a,{as:o.a,to:"/activities",size:"huge",inverted:!0,content:"Go to Activities!"})]}):Object(R.jsxs)(R.Fragment,{children:[Object(R.jsx)(B.a,{as:"h2",inverted:!0,content:"Welcome to Reactivities"}),Object(R.jsx)(j.a,{onClick:function(){return n.open(Object(R.jsx)(pe,{onDone:n.close}))},size:"huge",inverted:!0,content:"Login"}),Object(R.jsx)(j.a,{onClick:function(){return n.open(Object(R.jsx)(fe,{onDone:n.close}))},size:"huge",inverted:!0,content:"Register"})]})]})})})})),ge={filter:"brightness(30%)"},ye={position:"absolute",bottom:"5%",left:"5%",width:"100%",height:"auto",color:"white"},we=Object(s.a)((function(e){var t=e.activity,n=E().activityStore,c=n.toggleAttendance,r=n.loading;return Object(R.jsxs)(U.a.Group,{children:[Object(R.jsxs)(U.a,{basic:!0,attached:"top",style:{padding:"0"},children:[t.isCancelled&&Object(R.jsx)(V.a,{style:{position:"absolute",zIndex:1e3,left:-14,top:20},ribbon:!0,color:"red",content:"Cancelled"}),Object(R.jsx)(u.a,{src:"/assets/categoryImages/".concat(t.category,".jpg"),fluid:!0,style:ge}),Object(R.jsx)(U.a,{style:ye,basic:!0,children:Object(R.jsx)(J.a.Group,{children:Object(R.jsx)(J.a,{children:Object(R.jsxs)(J.a.Content,{children:[Object(R.jsx)(B.a,{size:"huge",content:t.title,style:{color:"white"}}),Object(R.jsx)("p",{children:Object(F.default)(t.date,"dd MMM yyyy h:mm aa")}),Object(R.jsxs)("p",{children:["Hosted by ",Object(R.jsx)("strong",{children:Object(R.jsx)(o.a,{to:"/profile/".concat(t.host.username),children:t.host.displayName})})]})]})})})})]}),Object(R.jsx)(U.a,{clearing:!0,attached:"bottom",children:t.isHost?Object(R.jsxs)(R.Fragment,{children:[Object(R.jsx)(j.a,{color:t.isCancelled?"green":"red",floated:"left",basic:!0,content:t.isCancelled?"Uncancel Activity":"Cancel Activity",onClick:function(){return c(t.id)},loading:r}),Object(R.jsx)(j.a,{as:o.a,to:"/manage/".concat(t.id),color:"orange",floated:"right",children:"Manage Event"})]}):t.isGoing?Object(R.jsx)(j.a,{onClick:function(){return c(t.id)},loading:r,children:"Cancel attendance"}):Object(R.jsx)(j.a,{color:"teal",onClick:function(){return c(t.id)},disabled:t.isCancelled,loading:r,children:"Join Activity"})})]})})),Ae=Object(s.a)((function(e){var t=e.activity;return Object(R.jsxs)(U.a.Group,{children:[Object(R.jsx)(U.a,{attached:"top",children:Object(R.jsxs)(q.a,{children:[Object(R.jsx)(q.a.Column,{width:1,children:Object(R.jsx)(W.a,{size:"large",color:"teal",name:"info"})}),Object(R.jsx)(q.a.Column,{width:15,children:Object(R.jsx)("p",{children:t.description})})]})}),Object(R.jsx)(U.a,{attached:!0,children:Object(R.jsxs)(q.a,{verticalAlign:"middle",children:[Object(R.jsx)(q.a.Column,{width:1,children:Object(R.jsx)(W.a,{name:"calendar",size:"large",color:"teal"})}),Object(R.jsx)(q.a.Column,{width:15,children:Object(R.jsx)("span",{children:Object(F.default)(t.date,"dd MMM yyyy h:mm aa")})})]})}),Object(R.jsx)(U.a,{attached:!0,children:Object(R.jsxs)(q.a,{verticalAlign:"middle",children:[Object(R.jsx)(q.a.Column,{width:1,children:Object(R.jsx)(W.a,{name:"marker",size:"large",color:"teal"})}),Object(R.jsx)(q.a.Column,{width:11,children:Object(R.jsxs)("span",{children:[t.venue,", ",t.city]})})]})})]})})),ke=n(508),Ce=Object(s.a)((function(){return Object(R.jsxs)(R.Fragment,{children:[Object(R.jsx)(U.a,{textAlign:"center",attached:"top",inverted:!0,color:"teal",style:{border:"none"},children:Object(R.jsx)(B.a,{children:"Chat about this event"})}),Object(R.jsx)(U.a,{attached:!0,children:Object(R.jsxs)(ke.a.Group,{children:[Object(R.jsxs)(ke.a,{children:[Object(R.jsx)(ke.a.Avatar,{src:"/assets/user.png"}),Object(R.jsxs)(ke.a.Content,{children:[Object(R.jsx)(ke.a.Author,{as:"a",children:"Matt"}),Object(R.jsx)(ke.a.Metadata,{children:Object(R.jsx)("div",{children:"Today at 5:42PM"})}),Object(R.jsx)(ke.a.Text,{children:"How artistic!"}),Object(R.jsx)(ke.a.Actions,{children:Object(R.jsx)(ke.a.Action,{children:"Reply"})})]})]}),Object(R.jsxs)(ke.a,{children:[Object(R.jsx)(ke.a.Avatar,{src:"/assets/user.png"}),Object(R.jsxs)(ke.a.Content,{children:[Object(R.jsx)(ke.a.Author,{as:"a",children:"Joe Henderson"}),Object(R.jsx)(ke.a.Metadata,{children:Object(R.jsx)("div",{children:"5 days ago"})}),Object(R.jsx)(ke.a.Text,{children:"Dude, this is awesome. Thanks so much"}),Object(R.jsx)(ke.a.Actions,{children:Object(R.jsx)(ke.a.Action,{children:"Reply"})})]})]}),Object(R.jsxs)(se.a,{reply:!0,children:[Object(R.jsx)(se.a.TextArea,{}),Object(R.jsx)(j.a,{content:"Add Reply",labelPosition:"left",icon:"edit",primary:!0})]})]})})]})})),Se=n(514),Me=Object(s.a)((function(e){var t=e.activity,n=t.attendees,c=t.hostUsername;return Object(R.jsxs)(R.Fragment,{children:[Object(R.jsxs)(U.a,{textAlign:"center",style:{border:"none"},attached:"top",secondary:!0,inverted:!0,color:"teal",children:[n.length," ",n.length>1?"People":"Person"," going"]}),Object(R.jsx)(U.a,{attached:!0,children:Object(R.jsx)(Y.a,{relaxed:!0,divided:!0,children:n.map((function(e){return Object(R.jsxs)(J.a,{style:{position:"relative"},children:[e.username===c?Object(R.jsx)(V.a,{style:{position:"absolute"},color:"orange",ribbon:"right",content:"Host"}):Object(R.jsx)(Se.a,{}),Object(R.jsx)(u.a,{size:"tiny",src:e.image||"/assets/user.png"}),Object(R.jsxs)(J.a.Content,{verticalAlign:"middle",children:[Object(R.jsx)(J.a.Header,{as:"h3",children:Object(R.jsx)(o.a,{to:"/profiles/".concat(e.username),children:e.displayName})}),Object(R.jsx)(J.a.Extra,{style:{color:"orange"},children:"Following"})]})]},e.username)}))})})]})}));var Fe=Object(s.a)((function(){var e=Object(ce.i)().id,t=E().activityStore,n=Object(c.useState)(!0),r=Object(N.a)(n,2),a=r[0],i=r[1];Object(c.useEffect)((function(){e?t.loadActivity(e).then((function(){return i(!1)})):i(!1)}),[e,t]);var s=t.activityRegistry.get(e);return a||!s?Object(R.jsx)(P,{content:"Loading activity"}):Object(R.jsxs)(R.Fragment,{children:[Object(R.jsxs)(q.a,{children:[Object(R.jsxs)(q.a.Column,{width:10,children:[Object(R.jsx)(we,{activity:s}),Object(R.jsx)(Ae,{activity:s}),Object(R.jsx)(Ce,{})]}),Object(R.jsx)(q.a.Column,{width:6,children:Object(R.jsx)(Me,{activity:s})})]}),Object(R.jsxs)(Q.a,{fluid:!0,children:[Object(R.jsx)(u.a,{src:"/assets/categoryImages/".concat(s.category,".jpg")}),Object(R.jsxs)(Q.a.Content,{children:[Object(R.jsx)(Q.a.Header,{children:s.title}),Object(R.jsx)(Q.a.Meta,{children:Object(R.jsx)("span",{children:Object(F.default)(s.date,"dd MMM yyyy h:mm aa")})}),Object(R.jsx)(Q.a.Description,{children:s.description})]}),Object(R.jsx)(Q.a.Content,{extra:!0,children:Object(R.jsxs)(j.a.Group,{widths:"2",children:[Object(R.jsx)(j.a,{basic:!0,as:o.a,to:"/manage/".concat(s.id),color:"blue",content:"Edit"}),Object(R.jsx)(j.a,{basic:!0,as:o.a,to:"/activities",color:"grey",content:"Cancel"})]})})]})]})})),Ie=n(515);function Le(e){var t=e.errors;return Object(R.jsx)(Ie.a,{error:!0,children:t&&Object(R.jsx)(Ie.a.List,{children:t.map((function(e,t){return Object(R.jsx)(Ie.a.Item,{children:e},t)}))})})}function Te(){var e=Object(c.useState)(),t=Object(N.a)(e,2),n=t[0],r=t[1];return Object(R.jsxs)(R.Fragment,{children:[Object(R.jsx)(B.a,{as:"h1",content:"Test Error component"}),Object(R.jsx)(U.a,{children:Object(R.jsxs)(j.a.Group,{widths:"7",children:[Object(R.jsx)(j.a,{onClick:function(){m.a.get("buggy/not-found").catch((function(e){return console.log(e.response)}))},content:"Not Found",basic:!0,primary:!0}),Object(R.jsx)(j.a,{onClick:function(){m.a.get("buggy/bad-request").catch((function(e){return console.log(e.response)}))},content:"Bad Request",basic:!0,primary:!0}),Object(R.jsx)(j.a,{onClick:function(){m.a.post("activities",{}).catch((function(e){console.log(e),r(e)}))},content:"Validation Error",basic:!0,primary:!0}),Object(R.jsx)(j.a,{onClick:function(){m.a.get("buggy/server-error").catch((function(e){return console.log(e.response)}))},content:"Server Error",basic:!0,primary:!0}),Object(R.jsx)(j.a,{onClick:function(){m.a.get("buggy/unauthorised").catch((function(e){return console.log(e.response)}))},content:"Unauthorised",basic:!0,primary:!0}),Object(R.jsx)(j.a,{onClick:function(){m.a.get("activities/notaguid").catch((function(e){return console.log(e)}))},content:"Bad Guid",basic:!0,primary:!0})]})}),n&&Object(R.jsx)(Le,{errors:n})]})}function De(){return Object(R.jsxs)(U.a,{placeholder:!0,children:[Object(R.jsxs)(B.a,{icon:!0,children:[Object(R.jsx)(W.a,{name:"search"}),"Not found"]}),Object(R.jsx)(U.a.Inline,{children:Object(R.jsx)(j.a,{as:o.a,to:"/activities",primary:!0,children:"Return to activities page"})})]})}m.a.defaults.baseURL="/api/";var Ee=Object(s.a)((function(){var e,t,n=E().commonStore;return Object(R.jsxs)(i.a,{children:[Object(R.jsx)(B.a,{as:"h1",content:"Server Error"}),Object(R.jsx)(B.a,{sub:!0,as:"h5",color:"red",content:null===(e=n.error)||void 0===e?void 0:e.message}),(null===(t=n.error)||void 0===t?void 0:t.details)&&Object(R.jsxs)(U.a,{children:[Object(R.jsx)(B.a,{as:"h4",color:"teal",content:"StackTrace"}),Object(R.jsx)("code",{style:{marginTop:"10px"},children:n.error.details})]})]})})),Re=n(511),ze=Object(s.a)((function(){var e=E().modalStore;return Object(R.jsx)(Re.a,{open:e.modal.open,onClose:e.close,size:"mini",children:Object(R.jsx)(Re.a.Content,{children:e.modal.body})})})),qe=n(275);function Ne(e){var t=e.component,n=Object(qe.a)(e,["component"]),c=E().userStore.isLoggedIn;return Object(R.jsx)(ce.b,Object(ie.a)(Object(ie.a)({},n),{},{render:function(e){return c?Object(R.jsx)(t,Object(ie.a)({},e)):Object(R.jsx)(ce.a,{to:"/"})}}))}var Be=Object(s.a)((function(){var e=Object(ce.h)(),t=E(),n=t.commonStore,r=t.userStore;return Object(c.useEffect)((function(){n.token?r.getUser().then((function(){return n.setAppLoaded()})):n.setAppLoaded()}),[n,r]),n.appLoaded?Object(R.jsxs)(R.Fragment,{children:[Object(R.jsx)(g.a,{position:"bottom-right",hideProgressBar:!0}),Object(R.jsx)(ze,{}),Object(R.jsxs)(ce.d,{children:[Object(R.jsx)(ce.b,{exact:!0,path:"/",component:me}),Object(R.jsxs)(ce.b,{children:[Object(R.jsx)(z,{}),Object(R.jsx)(i.a,{style:{marginTop:"7em"},children:Object(R.jsxs)(ce.d,{children:[Object(R.jsx)(Ne,{exact:!0,path:"/activities",component:ne}),Object(R.jsx)(Ne,{path:"/activities/:id",component:Fe}),Object(R.jsx)(Ne,{path:["/createActivity","/manage/:id"],component:xe},e.key),Object(R.jsx)(Ne,{path:"/errors",component:Te}),Object(R.jsx)(ce.b,{path:"/server-error",component:Ee}),Object(R.jsx)(ce.b,{component:De,exact:!0})]})})]})]})]}):Object(R.jsx)(P,{content:"Loading app..."})})),Ge=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,523)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,i=t.getTTFB;n(e),c(e),r(e),a(e),i(e)}))},He=n(46);function Pe(){var e=Object(ce.h)().pathname;return Object(c.useEffect)((function(){window.scrollTo(0,0)}),[e]),null}var Ue=Object(He.a)();a.a.render(Object(R.jsx)(D.Provider,{value:T,children:Object(R.jsxs)(ce.c,{history:Ue,children:[Object(R.jsx)(Pe,{}),Object(R.jsx)(Be,{})]})}),document.getElementById("root")),Ge()}},[[482,1,2]]]);
//# sourceMappingURL=main.2d772780.chunk.js.map