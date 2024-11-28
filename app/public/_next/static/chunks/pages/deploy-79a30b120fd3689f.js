(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[523],{5651:function(i,s,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/deploy",function(){return e(6503)}])},6503:function(i,s,e){"use strict";e.r(s),e.d(s,{useTOC:function(){return h}});var n=e(5893),a=e(7812),l=e(7080),d=e(8925),r=e(2033),t=e(5192);function h(i){let s={code:"code",...(0,d.a)()};return[{value:"Deploy da aplica\xe7\xe3o EKS",id:"deploy-da-aplica\xe7\xe3o-eks",depth:2},{value:(0,n.jsxs)(n.Fragment,{children:["Crie o cluster com ",(0,n.jsx)(s.code,{children:"eksctl"})]}),id:"crie-o-cluster-com-eksctl",depth:3},{value:"Crie o namespace Kubernetes",id:"crie-o-namespace-kubernetes",depth:3},{value:"Fa\xe7a o deploy do servi\xe7o PostgreSQL",id:"fa\xe7a-o-deploy-do-servi\xe7o-postgresql",depth:3},{value:"Fa\xe7a o deploy do servidor da API",id:"fa\xe7a-o-deploy-do-servidor-da-api",depth:3},{value:"All set!",id:"all-set",depth:3},{value:"Configura\xe7\xe3o do CDN com Amazon CloudFront",id:"configura\xe7\xe3o-do-cdn-com-amazon-cloudfront",depth:2}]}s.default=(0,a.c)(function(i){let{toc:s=h(i)}=i,e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",span:"span",ul:"ul",...(0,d.a)(),...i.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(e.h1,{children:"Deploy na AWS"}),"\n",(0,n.jsx)(e.p,{children:"A segunda etapa do projeto consiste em realizar o deploy da API desenvolvida na AWS\n(Amazon Web Services)."}),"\n",(0,n.jsxs)(e.p,{children:["O deploy foi realizado utilizando Amazon Elastic Kubernetes Service (EKS), ",(0,n.jsx)(e.code,{children:"eksctl"})," e ",(0,n.jsx)(e.code,{children:"kubectl"}),",\nal\xe9m da cria\xe7\xe3o de distribui\xe7\xe3o com Amazon CloudFront."]}),"\n",(0,n.jsx)(e.h2,{id:s[0].id,children:s[0].value}),"\n",(0,n.jsx)(e.p,{children:"O Amazon Elastic Kubernetes Service (EKS) \xe9 um servi\xe7o gerenciado da Amazon Web Services (AWS) que facilita a execu\xe7\xe3o de clusters Kubernetes na nuvem."}),"\n",(0,n.jsx)(e.p,{children:"Foram criados cinco arquivos YAML para a cria\xe7\xe3o dos deployments e services da aplica\xe7\xe3o. S\xe3o eles:"}),"\n",(0,n.jsxs)(e.ul,{children:["\n",(0,n.jsx)(e.li,{children:"namespace.yaml"}),"\n",(0,n.jsx)(e.li,{children:"jwt-api-deployment.yaml"}),"\n",(0,n.jsx)(e.li,{children:"jwt-api-service.yaml"}),"\n",(0,n.jsx)(e.li,{children:"postgres-deployment.yaml"}),"\n",(0,n.jsx)(e.li,{children:"postgres-service.yaml"}),"\n"]}),"\n",(0,n.jsxs)(e.p,{children:["Esses arquivos foram disponibilizados ",(0,n.jsx)(e.a,{href:"https://github.com/pedrostanzani/jwt-auth-api/tree/main/deployment",children:"no GitHub"}),"."]}),"\n",(0,n.jsxs)(r.R,{children:[(0,n.jsx)(e.h3,{id:s[1].id,children:s[1].value}),(0,n.jsx)(e.pre,{icon:t.Fx,tabIndex:"0","data-language":"bash","data-word-wrap":"",children:(0,n.jsxs)(e.code,{children:[(0,n.jsxs)(e.span,{children:[(0,n.jsx)(e.span,{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"},children:"eksctl"}),(0,n.jsx)(e.span,{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"},children:" create"}),(0,n.jsx)(e.span,{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"},children:" cluster"}),(0,n.jsx)(e.span,{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"},children:" "})]}),"\n",(0,n.jsxs)(e.span,{children:[(0,n.jsx)(e.span,{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"},children:"  --name"}),(0,n.jsx)(e.span,{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"},children:" jwt-app-cluster"}),(0,n.jsx)(e.span,{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"},children:" "})]}),"\n",(0,n.jsxs)(e.span,{children:[(0,n.jsx)(e.span,{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"},children:"  --region"}),(0,n.jsx)(e.span,{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"},children:" us-east-1"}),(0,n.jsx)(e.span,{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"},children:" "})]}),"\n",(0,n.jsxs)(e.span,{children:[(0,n.jsx)(e.span,{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"},children:"  --nodegroup-name"}),(0,n.jsx)(e.span,{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"},children:" standard-workers"}),(0,n.jsx)(e.span,{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"},children:" "})]}),"\n",(0,n.jsxs)(e.span,{children:[(0,n.jsx)(e.span,{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"},children:"  --node-type"}),(0,n.jsx)(e.span,{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"},children:" t3.medium"}),(0,n.jsx)(e.span,{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"},children:" "})]}),"\n",(0,n.jsxs)(e.span,{children:[(0,n.jsx)(e.span,{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"},children:"  --nodes"}),(0,n.jsx)(e.span,{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"},children:" 2"}),(0,n.jsx)(e.span,{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"},children:" "})]}),"\n",(0,n.jsxs)(e.span,{children:[(0,n.jsx)(e.span,{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"},children:"  --nodes-min"}),(0,n.jsx)(e.span,{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"},children:" 1"}),(0,n.jsx)(e.span,{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"},children:" "})]}),"\n",(0,n.jsxs)(e.span,{children:[(0,n.jsx)(e.span,{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"},children:"  --nodes-max"}),(0,n.jsx)(e.span,{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"},children:" 3"}),(0,n.jsx)(e.span,{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"},children:" "})]}),"\n",(0,n.jsx)(e.span,{children:(0,n.jsx)(e.span,{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"},children:"  --managed"})})]})}),(0,n.jsx)(e.h3,{id:s[2].id,children:s[2].value}),(0,n.jsx)(e.pre,{icon:t.Fx,tabIndex:"0","data-language":"bash","data-word-wrap":"",children:(0,n.jsx)(e.code,{children:(0,n.jsxs)(e.span,{children:[(0,n.jsx)(e.span,{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"},children:"kubectl"}),(0,n.jsx)(e.span,{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"},children:" apply"}),(0,n.jsx)(e.span,{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"},children:" -f"}),(0,n.jsx)(e.span,{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"},children:" namespace.yaml"})]})})}),(0,n.jsx)(e.h3,{id:s[3].id,children:s[3].value}),(0,n.jsx)(e.pre,{icon:t.Fx,tabIndex:"0","data-language":"bash","data-word-wrap":"",children:(0,n.jsxs)(e.code,{children:[(0,n.jsxs)(e.span,{children:[(0,n.jsx)(e.span,{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"},children:"kubectl"}),(0,n.jsx)(e.span,{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"},children:" apply"}),(0,n.jsx)(e.span,{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"},children:" -f"}),(0,n.jsx)(e.span,{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"},children:" postgres-deployment.yaml"})]}),"\n",(0,n.jsxs)(e.span,{children:[(0,n.jsx)(e.span,{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"},children:"kubectl"}),(0,n.jsx)(e.span,{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"},children:" apply"}),(0,n.jsx)(e.span,{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"},children:" -f"}),(0,n.jsx)(e.span,{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"},children:" postgres-service.yaml"})]})]})}),(0,n.jsx)(e.h3,{id:s[4].id,children:s[4].value}),(0,n.jsx)(e.pre,{icon:t.Fx,tabIndex:"0","data-language":"bash","data-word-wrap":"",children:(0,n.jsxs)(e.code,{children:[(0,n.jsxs)(e.span,{children:[(0,n.jsx)(e.span,{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"},children:"kubectl"}),(0,n.jsx)(e.span,{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"},children:" apply"}),(0,n.jsx)(e.span,{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"},children:" -f"}),(0,n.jsx)(e.span,{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"},children:" jwt-api-deployment.yaml"})]}),"\n",(0,n.jsxs)(e.span,{children:[(0,n.jsx)(e.span,{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"},children:"kubectl"}),(0,n.jsx)(e.span,{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"},children:" apply"}),(0,n.jsx)(e.span,{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"},children:" -f"}),(0,n.jsx)(e.span,{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"},children:" jwt-api-service.yaml"})]})]})}),(0,n.jsx)(e.h3,{id:s[5].id,children:s[5].value}),(0,n.jsx)(e.p,{children:"Confira se os pods est\xe3o rodando corretamente:"}),(0,n.jsx)(e.pre,{icon:t.Fx,tabIndex:"0","data-language":"bash","data-word-wrap":"",children:(0,n.jsx)(e.code,{children:(0,n.jsxs)(e.span,{children:[(0,n.jsx)(e.span,{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"},children:"kubectl"}),(0,n.jsx)(e.span,{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"},children:" get"}),(0,n.jsx)(e.span,{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"},children:" pods"}),(0,n.jsx)(e.span,{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"},children:" -n"}),(0,n.jsx)(e.span,{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"},children:" jwt-app"})]})})})]}),"\n",(0,n.jsx)(e.h2,{id:s[6].id,children:s[6].value}),"\n",(0,n.jsx)(e.p,{children:"Como forma de disponibilizar a API com acesso HTTPs sem a necessidade de um certificado\nSSL, foi criada uma distribui\xe7\xe3o usando a Amazon CloudFront — um servi\xe7o de Content\nDelivery Network (CDN) da AWS."})]})},"/deploy",{filePath:"pages/deploy.mdx",timestamp:1732308859e3,pageMap:l.v,frontMatter:{},title:"Deploy na AWS"},"undefined"==typeof RemoteContent?h:RemoteContent.useTOC)},2033:function(i,s,e){"use strict";e.d(s,{R:function(){return d}});var n=e(5893),a=e(512),l=e(7294);function d({children:i,className:s,style:e,...d}){let r=(0,l.useId)().replaceAll(":","");return(0,n.jsx)("div",{className:(0,a.Z)("nextra-steps _ms-4 _mb-12 _border-s _border-gray-200 _ps-6","dark:_border-neutral-800",s),style:{...e,"--counter-id":r},...d,children:i})}},7080:function(i,s,e){"use strict";e.d(s,{v:function(){return n}});let n=[{data:{index:"Introdu\xe7\xe3o","getting-started":"Instala\xe7\xe3o",endpoints:"Endpoints da API",deploy:"Deploy na AWS"}},{name:"deploy",route:"/deploy",frontMatter:{sidebarTitle:"Deploy"}},{name:"endpoints",route:"/endpoints",frontMatter:{sidebarTitle:"Endpoints"}},{name:"getting-started",route:"/getting-started",frontMatter:{sidebarTitle:"Getting Started"}},{name:"index",route:"/",frontMatter:{sidebarTitle:"Index"}}]}},function(i){i.O(0,[812,888,774,179],function(){return i(i.s=5651)}),_N_E=i.O()}]);