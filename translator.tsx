import { useState, useEffect, useRef } from "react";

const OXFORD_DATA = [{"word":"a","level":"A1"},{"word":"abandon","level":"B2"},{"word":"ability","level":"A2"},{"word":"able","level":"A2"},{"word":"about","level":"A1"},{"word":"above","level":"A1"},{"word":"abroad","level":"B2"},{"word":"absolute","level":"B2"},{"word":"absolutely","level":"B1"},{"word":"academic","level":"B1"},{"word":"accept","level":"A2"},{"word":"acceptable","level":"B2"},{"word":"access","level":"B1"},{"word":"accident","level":"A2"},{"word":"accompany","level":"B2"},{"word":"according","level":"A2"},{"word":"account","level":"B1"},{"word":"accurate","level":"B2"},{"word":"accuse","level":"B2"},{"word":"achieve","level":"A2"},{"word":"achievement","level":"B1"},{"word":"acknowledge","level":"B2"},{"word":"acquire","level":"B2"},{"word":"across","level":"A1"},{"word":"act","level":"A2"},{"word":"action","level":"A1"},{"word":"active","level":"A2"},{"word":"activity","level":"A1"},{"word":"actor","level":"A1"},{"word":"actress","level":"A1"},{"word":"actual","level":"B2"},{"word":"actually","level":"A2"},{"word":"ad","level":"B1"},{"word":"adapt","level":"B2"},{"word":"add","level":"A1"},{"word":"addition","level":"B1"},{"word":"additional","level":"B2"},{"word":"address","level":"A1"},{"word":"administration","level":"B1"},{"word":"admire","level":"B1"},{"word":"admit","level":"B1"},{"word":"adopt","level":"B2"},{"word":"adult","level":"A1"},{"word":"advance","level":"B2"},{"word":"advanced","level":"B1"},{"word":"advantage","level":"A2"},{"word":"adventure","level":"A2"},{"word":"advertise","level":"A2"},{"word":"advertisement","level":"A2"},{"word":"advertising","level":"A2"},{"word":"advise","level":"A2"},{"word":"affair","level":"B2"},{"word":"affect","level":"B1"},{"word":"afford","level":"A2"},{"word":"afraid","level":"A1"},{"word":"after","level":"A1"},{"word":"afternoon","level":"A1"},{"word":"afterward","level":"B1"},{"word":"afterwards","level":"B1"},{"word":"again","level":"A1"},{"word":"against","level":"A1"},{"word":"age","level":"A1"},{"word":"aged","level":"B1"},{"word":"agency","level":"B1"},{"word":"agenda","level":"B2"},{"word":"agent","level":"B1"},{"word":"aggressive","level":"B2"},{"word":"ago","level":"A1"},{"word":"agree","level":"A1"},{"word":"agreement","level":"A2"},{"word":"ah","level":"A1"},{"word":"ahead","level":"A2"},{"word":"aid","level":"B1"},{"word":"aim","level":"B1"},{"word":"air","level":"A1"},{"word":"aircraft","level":"B1"},{"word":"airline","level":"A2"},{"word":"airport","level":"A1"},{"word":"alarm","level":"B1"},{"word":"album","level":"A2"},{"word":"alcohol","level":"B1"},{"word":"alcoholic","level":"B2"},{"word":"alive","level":"A2"},{"word":"all","level":"A1"},{"word":"allow","level":"A2"},{"word":"almost","level":"A1"},{"word":"alone","level":"A1"},{"word":"along","level":"A1"},{"word":"already","level":"A1"},{"word":"also","level":"A1"},{"word":"although","level":"A2"},{"word":"always","level":"A1"},{"word":"amazed","level":"B1"},{"word":"amazing","level":"A2"},{"word":"ambition","level":"B2"},{"word":"an","level":"A1"},{"word":"analysis","level":"B2"},{"word":"analyze","level":"B2"},{"word":"ancient","level":"A2"},{"word":"and","level":"A1"},{"word":"anger","level":"B1"},{"word":"angle","level":"B1"},{"word":"angry","level":"A2"},{"word":"animal","level":"A1"},{"word":"ankle","level":"B1"},{"word":"anniversary","level":"B1"},{"word":"announce","level":"A2"},{"word":"announcement","level":"B1"},{"word":"annoy","level":"B1"},{"word":"annoyed","level":"B1"},{"word":"annoying","level":"B1"},{"word":"annual","level":"B1"},{"word":"another","level":"A1"},{"word":"answer","level":"A1"},{"word":"anxious","level":"B1"},{"word":"any","level":"A1"},{"word":"anybody","level":"A1"},{"word":"anymore","level":"A2"},{"word":"anyone","level":"A1"},{"word":"anything","level":"A1"},{"word":"anyway","level":"A2"},{"word":"anywhere","level":"A2"},{"word":"apart","level":"A2"},{"word":"apartment","level":"A1"},{"word":"app","level":"A1"},{"word":"apparent","level":"B2"},{"word":"apparently","level":"B2"},{"word":"appeal","level":"B2"},{"word":"appear","level":"A2"},{"word":"appearance","level":"B1"},{"word":"application","level":"A2"},{"word":"apply","level":"B1"},{"word":"appointment","level":"A2"},{"word":"appreciate","level":"B1"},{"word":"approach","level":"B1"},{"word":"appropriate","level":"B1"},{"word":"approval","level":"B2"},{"word":"approve","level":"B2"},{"word":"approximately","level":"B1"},{"word":"architect","level":"B1"},{"word":"architecture","level":"B1"},{"word":"area","level":"A1"},{"word":"argue","level":"B1"},{"word":"argument","level":"B1"},{"word":"arise","level":"B2"},{"word":"arm","level":"A2"},{"word":"army","level":"B1"},{"word":"around","level":"A1"},{"word":"arrange","level":"B1"},{"word":"arrangement","level":"B1"},{"word":"arrest","level":"B1"},{"word":"arrival","level":"B1"},{"word":"arrive","level":"A1"},{"word":"art","level":"A1"},{"word":"article","level":"A2"},{"word":"artist","level":"A2"},{"word":"as","level":"A1"},{"word":"aspect","level":"B2"},{"word":"assess","level":"B2"},{"word":"assessment","level":"B2"},{"word":"assist","level":"B1"},{"word":"assistant","level":"A2"},{"word":"association","level":"B2"},{"word":"assume","level":"B2"},{"word":"attach","level":"B1"},{"word":"attack","level":"B1"},{"word":"attempt","level":"B1"},{"word":"attend","level":"B1"},{"word":"attention","level":"A2"},{"word":"attitude","level":"B1"},{"word":"attract","level":"B1"},{"word":"attractive","level":"B1"},{"word":"audience","level":"B1"},{"word":"authority","level":"B2"},{"word":"available","level":"B1"},{"word":"average","level":"B1"},{"word":"avoid","level":"B1"},{"word":"award","level":"B1"},{"word":"aware","level":"B1"},{"word":"away","level":"A1"},{"word":"awful","level":"B1"},{"word":"baby","level":"A1"},{"word":"back","level":"A1"},{"word":"background","level":"B1"},{"word":"bag","level":"A1"},{"word":"bake","level":"A2"},{"word":"balance","level":"B1"},{"word":"ball","level":"A1"},{"word":"band","level":"A2"},{"word":"bank","level":"A1"},{"word":"base","level":"A2"},{"word":"basic","level":"A2"},{"word":"basically","level":"B1"},{"word":"bath","level":"A1"},{"word":"bathroom","level":"A1"},{"word":"battery","level":"A2"},{"word":"be","level":"A1"},{"word":"beach","level":"A1"},{"word":"bear","level":"A2"},{"word":"beat","level":"B1"},{"word":"beautiful","level":"A1"},{"word":"beauty","level":"B1"},{"word":"because","level":"A1"},{"word":"become","level":"A1"},{"word":"before","level":"A1"},{"word":"begin","level":"A1"},{"word":"beginning","level":"A2"},{"word":"behavior","level":"B1"},{"word":"behind","level":"A1"},{"word":"believe","level":"A1"},{"word":"belong","level":"A2"},{"word":"below","level":"A2"},{"word":"benefit","level":"B1"},{"word":"best","level":"A1"},{"word":"better","level":"A1"},{"word":"between","level":"A1"},{"word":"bill","level":"A2"},{"word":"bit","level":"A1"},{"word":"black","level":"A1"},{"word":"block","level":"B1"},{"word":"blood","level":"A2"},{"word":"blow","level":"B1"},{"word":"blue","level":"A1"},{"word":"board","level":"A2"},{"word":"boat","level":"A1"},{"word":"body","level":"A1"},{"word":"bone","level":"A2"},{"word":"book","level":"A1"},{"word":"border","level":"B1"},{"word":"born","level":"A1"},{"word":"borrow","level":"A2"},{"word":"both","level":"A1"},{"word":"bottle","level":"A1"},{"word":"bottom","level":"A2"},{"word":"box","level":"A1"},{"word":"boy","level":"A1"},{"word":"brain","level":"B1"},{"word":"bread","level":"A1"},{"word":"break","level":"A1"},{"word":"bridge","level":"A2"},{"word":"brief","level":"B1"},{"word":"bright","level":"A2"},{"word":"bring","level":"A1"},{"word":"broken","level":"A2"},{"word":"brother","level":"A1"},{"word":"brown","level":"A1"},{"word":"build","level":"A1"},{"word":"building","level":"A1"},{"word":"burn","level":"B1"},{"word":"bus","level":"A1"},{"word":"business","level":"A1"},{"word":"busy","level":"A1"},{"word":"but","level":"A1"},{"word":"buy","level":"A1"},{"word":"by","level":"A1"},{"word":"cake","level":"A1"},{"word":"call","level":"A1"},{"word":"calm","level":"B1"},{"word":"camera","level":"A1"},{"word":"campaign","level":"B1"},{"word":"can","level":"A1"},{"word":"candidate","level":"B1"},{"word":"capital","level":"A2"},{"word":"captain","level":"A2"},{"word":"care","level":"A1"},{"word":"career","level":"B1"},{"word":"carry","level":"A1"},{"word":"cash","level":"A2"},{"word":"catch","level":"A2"},{"word":"cause","level":"A2"},{"word":"celebrate","level":"A2"},{"word":"celebration","level":"B1"},{"word":"celebrity","level":"B1"},{"word":"center","level":"A1"},{"word":"ceremony","level":"B1"},{"word":"certainly","level":"A2"},{"word":"chain","level":"B1"},{"word":"chair","level":"A1"},{"word":"challenge","level":"B1"},{"word":"chance","level":"A2"},{"word":"character","level":"A2"},{"word":"characteristic","level":"B2"},{"word":"charge","level":"B1"},{"word":"cheap","level":"A2"},{"word":"check","level":"A2"},{"word":"chemical","level":"B1"},{"word":"chest","level":"B1"},{"word":"child","level":"A1"},{"word":"childhood","level":"B1"},{"word":"choice","level":"A2"},{"word":"choose","level":"A2"},{"word":"church","level":"A1"},{"word":"circle","level":"A1"},{"word":"citizen","level":"B1"},{"word":"city","level":"A1"},{"word":"claim","level":"B1"},{"word":"class","level":"A1"},{"word":"classic","level":"B1"},{"word":"clean","level":"A1"},{"word":"clear","level":"A2"},{"word":"clearly","level":"A2"},{"word":"climb","level":"A2"},{"word":"close","level":"A1"},{"word":"clothes","level":"A1"},{"word":"cloud","level":"A1"},{"word":"coffee","level":"A1"},{"word":"cold","level":"A1"},{"word":"collect","level":"A2"},{"word":"college","level":"A2"},{"word":"combination","level":"B2"},{"word":"come","level":"A1"},{"word":"comfortable","level":"A2"},{"word":"comment","level":"B1"},{"word":"common","level":"A2"},{"word":"communicate","level":"A2"},{"word":"communication","level":"A2"},{"word":"community","level":"A2"},{"word":"compare","level":"A2"},{"word":"competition","level":"B1"},{"word":"complete","level":"A2"},{"word":"complex","level":"B2"},{"word":"concentrate","level":"B1"},{"word":"concept","level":"B2"},{"word":"concern","level":"B1"},{"word":"conclusion","level":"B1"},{"word":"condition","level":"B1"},{"word":"confidence","level":"B1"},{"word":"confident","level":"B1"},{"word":"conflict","level":"B2"},{"word":"connect","level":"B1"},{"word":"connection","level":"B1"},{"word":"consider","level":"B1"},{"word":"consist","level":"B2"},{"word":"contact","level":"A2"},{"word":"contain","level":"B1"},{"word":"content","level":"B1"},{"word":"continue","level":"A2"},{"word":"contract","level":"B1"},{"word":"contribute","level":"B2"},{"word":"control","level":"A2"},{"word":"conversation","level":"A2"},{"word":"convince","level":"B2"},{"word":"cook","level":"A1"},{"word":"cool","level":"A2"},{"word":"copy","level":"A2"},{"word":"corner","level":"A2"},{"word":"correct","level":"A2"},{"word":"cost","level":"A2"},{"word":"could","level":"A1"},{"word":"count","level":"A2"},{"word":"country","level":"A1"},{"word":"couple","level":"A2"},{"word":"courage","level":"B1"},{"word":"course","level":"A1"},{"word":"cover","level":"A2"},{"word":"create","level":"A2"},{"word":"crime","level":"B1"},{"word":"cross","level":"A2"},{"word":"crowd","level":"A2"},{"word":"cry","level":"A2"},{"word":"culture","level":"B1"},{"word":"cup","level":"A1"},{"word":"cut","level":"A2"},{"word":"damage","level":"B1"},{"word":"dark","level":"A1"},{"word":"data","level":"A2"},{"word":"daughter","level":"A1"},{"word":"day","level":"A1"},{"word":"dead","level":"A2"},{"word":"deal","level":"A2"},{"word":"decide","level":"A1"},{"word":"decision","level":"A2"},{"word":"deep","level":"A2"},{"word":"define","level":"B1"},{"word":"demand","level":"B1"},{"word":"democratic","level":"B2"},{"word":"department","level":"B1"},{"word":"depend","level":"A2"},{"word":"describe","level":"A2"},{"word":"design","level":"A2"},{"word":"despite","level":"B1"},{"word":"detail","level":"B1"},{"word":"develop","level":"A2"},{"word":"development","level":"A2"},{"word":"die","level":"A1"},{"word":"difference","level":"A2"},{"word":"different","level":"A1"},{"word":"difficult","level":"A1"},{"word":"dinner","level":"A1"},{"word":"direct","level":"B1"},{"word":"direction","level":"A2"},{"word":"discover","level":"A2"},{"word":"discuss","level":"A2"},{"word":"discussion","level":"B1"},{"word":"distance","level":"A2"},{"word":"divide","level":"B1"},{"word":"do","level":"A1"},{"word":"door","level":"A1"},{"word":"doubt","level":"B1"},{"word":"down","level":"A1"},{"word":"draw","level":"A2"},{"word":"dream","level":"A2"},{"word":"dress","level":"A1"},{"word":"drink","level":"A1"},{"word":"drive","level":"A1"},{"word":"drop","level":"B1"},{"word":"during","level":"A2"},{"word":"duty","level":"B2"},{"word":"each","level":"A1"},{"word":"early","level":"A1"},{"word":"earn","level":"B1"},{"word":"earth","level":"A2"},{"word":"easily","level":"A2"},{"word":"east","level":"A1"},{"word":"economic","level":"B1"},{"word":"economy","level":"B1"},{"word":"education","level":"A2"},{"word":"effect","level":"A2"},{"word":"effort","level":"B1"},{"word":"either","level":"A1"},{"word":"election","level":"B1"},{"word":"else","level":"A1"},{"word":"empty","level":"A2"},{"word":"encourage","level":"B1"},{"word":"end","level":"A1"},{"word":"enemy","level":"B1"},{"word":"energy","level":"A2"},{"word":"engine","level":"B1"},{"word":"enjoy","level":"A1"},{"word":"enough","level":"A1"},{"word":"environment","level":"A2"},{"word":"especially","level":"A2"},{"word":"even","level":"A1"},{"word":"evening","level":"A1"},{"word":"event","level":"A2"},{"word":"ever","level":"A1"},{"word":"every","level":"A1"},{"word":"evidence","level":"B2"},{"word":"example","level":"A1"},{"word":"excellent","level":"A2"},{"word":"except","level":"A2"},{"word":"exciting","level":"A2"},{"word":"exist","level":"B1"},{"word":"expect","level":"A2"},{"word":"experience","level":"A2"},{"word":"explain","level":"A2"},{"word":"eye","level":"A1"},{"word":"face","level":"A1"},{"word":"fact","level":"A2"},{"word":"factor","level":"B1"},{"word":"fail","level":"A2"},{"word":"fall","level":"A1"},{"word":"family","level":"A1"},{"word":"famous","level":"A2"},{"word":"far","level":"A1"},{"word":"fast","level":"A1"},{"word":"father","level":"A1"},{"word":"favor","level":"A2"},{"word":"fear","level":"B1"},{"word":"feature","level":"B1"},{"word":"feel","level":"A1"},{"word":"feeling","level":"A1"},{"word":"few","level":"A1"},{"word":"field","level":"A2"},{"word":"fight","level":"A2"},{"word":"figure","level":"B1"},{"word":"fill","level":"A2"},{"word":"film","level":"A1"},{"word":"finally","level":"A2"},{"word":"find","level":"A1"},{"word":"fine","level":"A1"},{"word":"fire","level":"A1"},{"word":"first","level":"A1"},{"word":"fit","level":"B1"},{"word":"fix","level":"A2"},{"word":"floor","level":"A1"},{"word":"follow","level":"A1"},{"word":"food","level":"A1"},{"word":"force","level":"B1"},{"word":"foreign","level":"A2"},{"word":"forest","level":"A2"},{"word":"forget","level":"A1"},{"word":"form","level":"A2"},{"word":"free","level":"A1"},{"word":"freedom","level":"B1"},{"word":"fresh","level":"A2"},{"word":"friend","level":"A1"},{"word":"from","level":"A1"},{"word":"front","level":"A2"},{"word":"fuel","level":"B1"},{"word":"full","level":"A1"},{"word":"fun","level":"A1"},{"word":"fund","level":"B1"},{"word":"future","level":"A2"},{"word":"game","level":"A1"},{"word":"gap","level":"B2"},{"word":"garden","level":"A1"},{"word":"gas","level":"B1"},{"word":"general","level":"A2"},{"word":"generate","level":"B2"},{"word":"get","level":"A1"},{"word":"gift","level":"A2"},{"word":"girl","level":"A1"},{"word":"give","level":"A1"},{"word":"glass","level":"A2"},{"word":"go","level":"A1"},{"word":"good","level":"A1"},{"word":"government","level":"A2"},{"word":"great","level":"A1"},{"word":"green","level":"A1"},{"word":"ground","level":"A2"},{"word":"group","level":"A1"},{"word":"grow","level":"A1"},{"word":"growth","level":"B1"},{"word":"guess","level":"A2"},{"word":"gun","level":"B1"},{"word":"hair","level":"A1"},{"word":"hand","level":"A1"},{"word":"happen","level":"A1"},{"word":"happy","level":"A1"},{"word":"hard","level":"A1"},{"word":"have","level":"A1"},{"word":"head","level":"A1"},{"word":"health","level":"A1"},{"word":"heart","level":"A1"},{"word":"heavy","level":"A2"},{"word":"help","level":"A1"},{"word":"here","level":"A1"},{"word":"herself","level":"A1"},{"word":"high","level":"A1"},{"word":"himself","level":"A1"},{"word":"history","level":"A2"},{"word":"home","level":"A1"},{"word":"hope","level":"A1"},{"word":"hospital","level":"A1"},{"word":"hotel","level":"A1"},{"word":"hour","level":"A1"},{"word":"house","level":"A1"},{"word":"however","level":"A2"},{"word":"huge","level":"B1"},{"word":"human","level":"A2"},{"word":"humor","level":"B2"},{"word":"hurt","level":"A2"},{"word":"idea","level":"A1"},{"word":"identify","level":"B1"},{"word":"ill","level":"A2"},{"word":"image","level":"A2"},{"word":"imagine","level":"A2"},{"word":"important","level":"A1"},{"word":"improve","level":"A2"},{"word":"include","level":"A2"},{"word":"increase","level":"A2"},{"word":"independent","level":"B1"},{"word":"individual","level":"B1"},{"word":"industry","level":"B1"},{"word":"information","level":"A1"},{"word":"inside","level":"A2"},{"word":"instead","level":"A2"},{"word":"intend","level":"B1"},{"word":"interest","level":"A1"},{"word":"international","level":"A2"},{"word":"into","level":"A1"},{"word":"introduce","level":"A2"},{"word":"island","level":"A2"},{"word":"issue","level":"B1"},{"word":"itself","level":"A2"},{"word":"job","level":"A1"},{"word":"join","level":"A1"},{"word":"joke","level":"A2"},{"word":"judge","level":"B1"},{"word":"jump","level":"A2"},{"word":"just","level":"A1"},{"word":"keep","level":"A1"},{"word":"key","level":"A1"},{"word":"kill","level":"A2"},{"word":"kind","level":"A1"},{"word":"knowledge","level":"B1"},{"word":"lack","level":"B1"},{"word":"land","level":"A2"},{"word":"language","level":"A1"},{"word":"large","level":"A1"},{"word":"last","level":"A1"},{"word":"late","level":"A1"},{"word":"laugh","level":"A2"},{"word":"law","level":"A2"},{"word":"lead","level":"A2"},{"word":"leader","level":"B1"},{"word":"learn","level":"A1"},{"word":"leave","level":"A1"},{"word":"legal","level":"B1"},{"word":"less","level":"A2"},{"word":"let","level":"A1"},{"word":"letter","level":"A1"},{"word":"level","level":"A2"},{"word":"lie","level":"A2"},{"word":"life","level":"A1"},{"word":"light","level":"A1"},{"word":"like","level":"A1"},{"word":"likely","level":"B1"},{"word":"limit","level":"B1"},{"word":"line","level":"A1"},{"word":"listen","level":"A1"},{"word":"little","level":"A1"},{"word":"live","level":"A1"},{"word":"local","level":"A2"},{"word":"long","level":"A1"},{"word":"look","level":"A1"},{"word":"lose","level":"A2"},{"word":"love","level":"A1"},{"word":"lucky","level":"A2"},{"word":"machine","level":"A2"},{"word":"main","level":"A2"},{"word":"make","level":"A1"},{"word":"man","level":"A1"},{"word":"manage","level":"B1"},{"word":"many","level":"A1"},{"word":"market","level":"A2"},{"word":"marry","level":"A2"},{"word":"maybe","level":"A1"},{"word":"meal","level":"A2"},{"word":"mean","level":"A1"},{"word":"media","level":"B1"},{"word":"medicine","level":"A2"},{"word":"meet","level":"A1"},{"word":"member","level":"A2"},{"word":"memory","level":"A2"},{"word":"message","level":"A2"},{"word":"method","level":"B1"},{"word":"mind","level":"A2"},{"word":"minute","level":"A1"},{"word":"miss","level":"A2"},{"word":"mistake","level":"A1"},{"word":"model","level":"B1"},{"word":"moment","level":"A2"},{"word":"money","level":"A1"},{"word":"month","level":"A1"},{"word":"more","level":"A1"},{"word":"most","level":"A1"},{"word":"mother","level":"A1"},{"word":"mountain","level":"A2"},{"word":"move","level":"A1"},{"word":"much","level":"A1"},{"word":"must","level":"A1"},{"word":"name","level":"A1"},{"word":"national","level":"A2"},{"word":"natural","level":"A2"},{"word":"near","level":"A1"},{"word":"need","level":"A1"},{"word":"never","level":"A1"},{"word":"new","level":"A1"},{"word":"next","level":"A1"},{"word":"nice","level":"A1"},{"word":"night","level":"A1"},{"word":"no","level":"A1"},{"word":"none","level":"A2"},{"word":"normally","level":"A2"},{"word":"north","level":"A1"},{"word":"not","level":"A1"},{"word":"nothing","level":"A1"},{"word":"now","level":"A1"},{"word":"number","level":"A1"},{"word":"obvious","level":"B2"},{"word":"offer","level":"A2"},{"word":"office","level":"A1"},{"word":"often","level":"A1"},{"word":"old","level":"A1"},{"word":"once","level":"A1"},{"word":"only","level":"A1"},{"word":"open","level":"A1"},{"word":"opportunity","level":"B1"},{"word":"opposite","level":"B1"},{"word":"order","level":"A2"},{"word":"organize","level":"B1"},{"word":"original","level":"B1"},{"word":"other","level":"A1"},{"word":"otherwise","level":"B1"},{"word":"outside","level":"A1"},{"word":"over","level":"A1"},{"word":"own","level":"A1"},{"word":"pain","level":"A2"},{"word":"paper","level":"A1"},{"word":"parent","level":"A1"},{"word":"part","level":"A1"},{"word":"partner","level":"A2"},{"word":"pass","level":"A2"},{"word":"patient","level":"A2"},{"word":"pay","level":"A1"},{"word":"peace","level":"B1"},{"word":"people","level":"A1"},{"word":"period","level":"B1"},{"word":"personal","level":"A2"},{"word":"phone","level":"A1"},{"word":"photograph","level":"A2"},{"word":"picture","level":"A1"},{"word":"piece","level":"A2"},{"word":"place","level":"A1"},{"word":"plan","level":"A1"},{"word":"plant","level":"A1"},{"word":"play","level":"A1"},{"word":"please","level":"A1"},{"word":"police","level":"A2"},{"word":"political","level":"A2"},{"word":"poor","level":"A2"},{"word":"popular","level":"A2"},{"word":"position","level":"A2"},{"word":"positive","level":"B1"},{"word":"possible","level":"A1"},{"word":"power","level":"A2"},{"word":"prepare","level":"A2"},{"word":"present","level":"A2"},{"word":"press","level":"B1"},{"word":"price","level":"A1"},{"word":"problem","level":"A1"},{"word":"produce","level":"A2"},{"word":"product","level":"A2"},{"word":"program","level":"A2"},{"word":"progress","level":"B1"},{"word":"project","level":"A2"},{"word":"protect","level":"B1"},{"word":"prove","level":"B1"},{"word":"provide","level":"B1"},{"word":"public","level":"A2"},{"word":"pull","level":"A2"},{"word":"push","level":"A2"},{"word":"put","level":"A1"},{"word":"quality","level":"B1"},{"word":"question","level":"A1"},{"word":"quickly","level":"A2"},{"word":"quite","level":"A2"},{"word":"race","level":"B1"},{"word":"radio","level":"A1"},{"word":"raise","level":"A2"},{"word":"rate","level":"B1"},{"word":"reach","level":"A2"},{"word":"read","level":"A1"},{"word":"ready","level":"A1"},{"word":"real","level":"A1"},{"word":"reason","level":"A2"},{"word":"receive","level":"A2"},{"word":"recently","level":"A2"},{"word":"recognize","level":"B1"},{"word":"record","level":"A2"},{"word":"reduce","level":"B1"},{"word":"refuse","level":"B1"},{"word":"region","level":"B1"},{"word":"relationship","level":"A2"},{"word":"remember","level":"A1"},{"word":"remove","level":"B1"},{"word":"report","level":"A2"},{"word":"research","level":"B1"},{"word":"respect","level":"B1"},{"word":"result","level":"A2"},{"word":"return","level":"A1"},{"word":"rich","level":"A2"},{"word":"rise","level":"B1"},{"word":"river","level":"A1"},{"word":"road","level":"A1"},{"word":"rock","level":"A2"},{"word":"role","level":"B1"},{"word":"round","level":"A1"},{"word":"rule","level":"A2"},{"word":"run","level":"A1"},{"word":"safe","level":"A2"},{"word":"same","level":"A1"},{"word":"scene","level":"B1"},{"word":"school","level":"A1"},{"word":"science","level":"A2"},{"word":"screen","level":"A2"},{"word":"search","level":"A2"},{"word":"season","level":"A2"},{"word":"secret","level":"B1"},{"word":"see","level":"A1"},{"word":"seem","level":"A1"},{"word":"sell","level":"A2"},{"word":"send","level":"A1"},{"word":"serious","level":"A2"},{"word":"service","level":"A2"},{"word":"set","level":"A1"},{"word":"share","level":"B1"},{"word":"she","level":"A1"},{"word":"show","level":"A1"},{"word":"side","level":"A2"},{"word":"similar","level":"A2"},{"word":"simple","level":"A2"},{"word":"since","level":"A2"},{"word":"sing","level":"A2"},{"word":"situation","level":"A2"},{"word":"size","level":"A2"},{"word":"skill","level":"B1"},{"word":"sleep","level":"A1"},{"word":"slow","level":"A1"},{"word":"small","level":"A1"},{"word":"society","level":"B1"},{"word":"solution","level":"B1"},{"word":"some","level":"A1"},{"word":"son","level":"A1"},{"word":"sorry","level":"A1"},{"word":"sort","level":"B1"},{"word":"sound","level":"A1"},{"word":"south","level":"A1"},{"word":"space","level":"A2"},{"word":"speak","level":"A1"},{"word":"special","level":"A2"},{"word":"spend","level":"A2"},{"word":"sport","level":"A1"},{"word":"staff","level":"B1"},{"word":"start","level":"A1"},{"word":"state","level":"A2"},{"word":"stay","level":"A1"},{"word":"step","level":"A2"},{"word":"still","level":"A1"},{"word":"stop","level":"A1"},{"word":"story","level":"A1"},{"word":"street","level":"A1"},{"word":"strong","level":"A2"},{"word":"structure","level":"B2"},{"word":"study","level":"A1"},{"word":"success","level":"B1"},{"word":"suddenly","level":"A2"},{"word":"suffer","level":"B1"},{"word":"suggest","level":"A2"},{"word":"support","level":"A2"},{"word":"sure","level":"A1"},{"word":"system","level":"A2"},{"word":"take","level":"A1"},{"word":"talk","level":"A1"},{"word":"task","level":"B1"},{"word":"teach","level":"A1"},{"word":"team","level":"A2"},{"word":"technology","level":"A2"},{"word":"tell","level":"A1"},{"word":"than","level":"A1"},{"word":"thing","level":"A1"},{"word":"think","level":"A1"},{"word":"though","level":"A2"},{"word":"through","level":"A1"},{"word":"time","level":"A1"},{"word":"together","level":"A1"},{"word":"top","level":"A2"},{"word":"touch","level":"A2"},{"word":"town","level":"A1"},{"word":"trade","level":"B1"},{"word":"train","level":"A1"},{"word":"travel","level":"A1"},{"word":"tree","level":"A1"},{"word":"trust","level":"B1"},{"word":"truth","level":"B1"},{"word":"try","level":"A1"},{"word":"turn","level":"A1"},{"word":"type","level":"A2"},{"word":"typical","level":"B1"},{"word":"under","level":"A1"},{"word":"understand","level":"A1"},{"word":"until","level":"A1"},{"word":"use","level":"A1"},{"word":"usually","level":"A1"},{"word":"value","level":"B1"},{"word":"very","level":"A1"},{"word":"view","level":"A2"},{"word":"voice","level":"A2"},{"word":"vote","level":"B1"},{"word":"walk","level":"A1"},{"word":"want","level":"A1"},{"word":"war","level":"A2"},{"word":"water","level":"A1"},{"word":"way","level":"A1"},{"word":"weak","level":"B1"},{"word":"weapon","level":"B1"},{"word":"weather","level":"A1"},{"word":"week","level":"A1"},{"word":"well","level":"A1"},{"word":"west","level":"A1"},{"word":"white","level":"A1"},{"word":"wide","level":"B1"},{"word":"wife","level":"A1"},{"word":"window","level":"A1"},{"word":"wish","level":"A2"},{"word":"with","level":"A1"},{"word":"within","level":"B1"},{"word":"without","level":"A1"},{"word":"woman","level":"A1"},{"word":"wonder","level":"B1"},{"word":"word","level":"A1"},{"word":"work","level":"A1"},{"word":"world","level":"A1"},{"word":"worry","level":"A2"},{"word":"write","level":"A1"},{"word":"writer","level":"B1"},{"word":"writing","level":"B1"},{"word":"wrong","level":"A1"},{"word":"yard","level":"B1"},{"word":"yeah","level":"A1"},{"word":"year","level":"A1"},{"word":"yellow","level":"A1"},{"word":"yes","level":"A1"},{"word":"yesterday","level":"A1"},{"word":"yet","level":"A2"},{"word":"you","level":"A1"},{"word":"young","level":"A1"},{"word":"your","level":"A1"},{"word":"yours","level":"A2"},{"word":"yourself","level":"A2"},{"word":"youth","level":"B2"},{"word":"zero","level":"zéro"},{"word":"zone","level":"zone"}];

const BATCH_SIZE = 80;

export default function Oxford3000Translator() {
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [translations, setTranslations] = useState({});
  const [log, setLog] = useState([]);
  const [result, setResult] = useState(null);
  const translationsRef = useRef({});

  const addLog = (msg) => setLog(prev => [...prev.slice(-30), msg]);

  const translateBatch = async (words) => {
    const wordList = words.join("\n");
    const prompt = `Translate the following English words to French. Return ONLY a valid JSON object where keys are English words and values are the best French translation (one short translation per word, no explanations).

${wordList}

Rules:
- Return ONLY valid JSON, no markdown, no explanation
- One translation per word (the most common/useful one)
- Use infinitive for verbs (e.g., "run" → "courir")
- Include article for nouns only if essential for clarity
- For function words (a, the, and, etc.), give the French equivalent
- Example: {"run":"courir","beautiful":"beau/belle","the":"le/la"}`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 3000,
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "API error");

    let text = data.content.map(b => b.text || "").join("").trim();
    if (text.startsWith("```")) {
      text = text.replace(/^```json?\n?/, "").replace(/\n?```$/, "").trim();
    }
    return JSON.parse(text);
  };

  const runTranslation = async () => {
    setStatus("running");
    setProgress(0);
    setLog([]);
    setTranslations({});
    translationsRef.current = {};

    const allBatches = [];
    for (let i = 0; i < OXFORD_DATA.length; i += BATCH_SIZE) {
      allBatches.push(OXFORD_DATA.slice(i, i + BATCH_SIZE));
    }

    let done = 0;
    for (let i = 0; i < allBatches.length; i++) {
      const batch = allBatches[i];
      const words = batch.map(w => w.word);
      addLog(`📦 Batch ${i + 1}/${allBatches.length} (${words[0]} → ${words[words.length - 1]})`);

      try {
        const batchTranslations = await translateBatch(words);
        translationsRef.current = { ...translationsRef.current, ...batchTranslations };
        setTranslations({ ...translationsRef.current });
        done += batch.length;
        setProgress(Math.round((done / OXFORD_DATA.length) * 100));
        addLog(`  ✅ ${Object.keys(batchTranslations).length} mots traduits`);
      } catch (err) {
        addLog(`  ❌ Erreur: ${err.message}`);
        // Mark as missing
        words.forEach(w => {
          if (!translationsRef.current[w]) translationsRef.current[w] = null;
        });
      }

      // Small delay between batches
      if (i < allBatches.length - 1) await new Promise(r => setTimeout(r, 300));
    }

    // Build final JSON
    const final = OXFORD_DATA.map(item => ({
      word: item.word,
      level: item.level,
      translation: translationsRef.current[item.word] || null
    }));

    setResult(final);
    setStatus("done");
    addLog(`🎉 Terminé! ${final.length} mots, ${final.filter(w => w.translation).length} traduits`);
  };

  const downloadJSON = () => {
    if (!result) return;
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "oxford3000_fr.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateQualityReport = () => {
    if (!result) return;
    const total = result.length;
    const translated = result.filter(w => w.translation && w.translation.trim() !== "");
    const missing = result.filter(w => !w.translation || w.translation.trim() === "");
    const byLevel = { A1: {ok:0,miss:0}, A2: {ok:0,miss:0}, B1: {ok:0,miss:0}, B2: {ok:0,miss:0} };
    result.forEach(w => {
      const lvl = byLevel[w.level];
      if (lvl) {
        if (w.translation && w.translation.trim()) lvl.ok++;
        else lvl.miss++;
      }
    });

    const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Oxford 3000 – Rapport Qualité</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');
  
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  
  :root {
    --bg: #0f0e0d;
    --card: #1a1917;
    --border: #2e2c2a;
    --text: #e8e4df;
    --muted: #7a7470;
    --green: #4ade80;
    --red: #f87171;
    --amber: #fbbf24;
    --blue: #60a5fa;
    --accent: #e8c547;
  }
  
  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Mono', monospace;
    min-height: 100vh;
    padding: 3rem 2rem;
  }
  
  .container { max-width: 900px; margin: 0 auto; }
  
  header { margin-bottom: 3rem; border-bottom: 1px solid var(--border); padding-bottom: 2rem; }
  
  h1 {
    font-family: 'DM Serif Display', serif;
    font-size: 2.8rem;
    color: var(--accent);
    line-height: 1.1;
    margin-bottom: 0.5rem;
  }
  
  .subtitle { color: var(--muted); font-size: 0.8rem; letter-spacing: 0.08em; text-transform: uppercase; }
  .timestamp { color: var(--muted); font-size: 0.75rem; margin-top: 0.5rem; }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;
    margin-bottom: 2.5rem;
  }
  
  .stat-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 1.25rem 1.5rem;
  }
  
  .stat-label { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted); margin-bottom: 0.5rem; }
  .stat-value { font-size: 2rem; font-weight: 500; }
  .stat-value.green { color: var(--green); }
  .stat-value.red { color: var(--red); }
  .stat-value.amber { color: var(--amber); }
  .stat-value.blue { color: var(--blue); }
  
  .progress-bar {
    background: var(--border);
    border-radius: 4px;
    height: 6px;
    margin: 0.5rem 0;
    overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    background: var(--green);
    border-radius: 4px;
    transition: width 0.3s;
  }
  .progress-fill.warn { background: var(--amber); }
  
  h2 {
    font-family: 'DM Serif Display', serif;
    font-size: 1.4rem;
    color: var(--accent);
    margin-bottom: 1rem;
    margin-top: 2rem;
  }
  
  .level-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2.5rem;
  }
  
  .level-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 1.25rem;
  }
  
  .level-badge {
    display: inline-block;
    background: var(--accent);
    color: var(--bg);
    font-weight: 500;
    font-size: 0.85rem;
    padding: 0.2rem 0.6rem;
    border-radius: 4px;
    margin-bottom: 0.75rem;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.8rem;
    margin-bottom: 2.5rem;
  }
  
  th {
    text-align: left;
    padding: 0.6rem 1rem;
    background: var(--card);
    color: var(--muted);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    border-bottom: 1px solid var(--border);
  }
  
  td {
    padding: 0.5rem 1rem;
    border-bottom: 1px solid var(--border);
    font-family: 'DM Mono', monospace;
  }
  
  tr:hover td { background: var(--card); }
  
  .tag-missing { color: var(--red); font-size: 0.75rem; }
  .tag-ok { color: var(--green); font-size: 0.75rem; }
  
  .badge-level {
    display: inline-block;
    padding: 0.15rem 0.5rem;
    border-radius: 3px;
    font-size: 0.72rem;
    font-weight: 500;
  }
  .badge-A1 { background: #1a3a2a; color: var(--green); }
  .badge-A2 { background: #1a2f3a; color: var(--blue); }
  .badge-B1 { background: #3a2a1a; color: var(--amber); }
  .badge-B2 { background: #3a1a1a; color: var(--red); }
  
  .section-divider { border: none; border-top: 1px solid var(--border); margin: 2rem 0; }
  
  footer { color: var(--muted); font-size: 0.72rem; margin-top: 3rem; padding-top: 1rem; border-top: 1px solid var(--border); }
</style>
</head>
<body>
<div class="container">
  <header>
    <h1>Oxford 3000<br><em>Rapport Qualité FR</em></h1>
    <p class="subtitle">quality_check · oxford3000_fr.json</p>
    <p class="timestamp">Généré le ${new Date().toLocaleString('fr-FR')}</p>
  </header>
  
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-label">Total mots</div>
      <div class="stat-value blue">${total}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Traduits</div>
      <div class="stat-value green">${translated.length}</div>
      <div class="progress-bar"><div class="progress-fill" style="width:${(translated.length/total*100).toFixed(1)}%"></div></div>
      <small style="color:var(--muted);font-size:0.72rem">${(translated.length/total*100).toFixed(1)}%</small>
    </div>
    <div class="stat-card">
      <div class="stat-label">Manquants</div>
      <div class="stat-value ${missing.length > 0 ? 'red' : 'green'}">${missing.length}</div>
      <div class="progress-bar"><div class="progress-fill warn" style="width:${(missing.length/total*100).toFixed(1)}%"></div></div>
      <small style="color:var(--muted);font-size:0.72rem">${(missing.length/total*100).toFixed(1)}%</small>
    </div>
    <div class="stat-card">
      <div class="stat-label">Traductions vides</div>
      <div class="stat-value ${result.filter(w=>w.translation==="").length>0?'amber':'green'}">${result.filter(w=>w.translation==="").length}</div>
    </div>
  </div>
  
  <h2>Par niveau</h2>
  <div class="level-grid">
    ${Object.entries(byLevel).map(([lvl, counts]) => `
    <div class="level-card">
      <div class="level-badge">${lvl}</div>
      <div style="font-size:0.8rem;color:var(--muted);margin-bottom:0.4rem">${counts.ok + counts.miss} mots</div>
      <div style="color:var(--green);font-size:0.9rem">✓ ${counts.ok} traduits</div>
      ${counts.miss > 0 ? `<div style="color:var(--red);font-size:0.9rem">✗ ${counts.miss} manquants</div>` : ''}
      <div class="progress-bar" style="margin-top:0.6rem"><div class="progress-fill" style="width:${counts.ok+counts.miss>0?(counts.ok/(counts.ok+counts.miss)*100).toFixed(0):0}%"></div></div>
    </div>`).join('')}
  </div>
  
  ${missing.length > 0 ? `
  <h2>Traductions manquantes (${missing.length})</h2>
  <table>
    <thead>
      <tr><th>#</th><th>Mot</th><th>Niveau</th><th>Statut</th></tr>
    </thead>
    <tbody>
      ${missing.map((w, i) => `
      <tr>
        <td style="color:var(--muted)">${i+1}</td>
        <td>${w.word}</td>
        <td><span class="badge-level badge-${w.level}">${w.level}</span></td>
        <td><span class="tag-missing">● manquant</span></td>
      </tr>`).join('')}
    </tbody>
  </table>
  ` : '<div style="background:var(--card);border:1px solid #1a3a2a;border-radius:8px;padding:1.5rem;color:var(--green);margin-bottom:2rem">✅ Aucune traduction manquante — couverture 100%</div>'}
  
  <h2>Aperçu complet (${total} mots)</h2>
  <table>
    <thead>
      <tr><th>#</th><th>Mot anglais</th><th>Traduction française</th><th>Niveau</th><th>Statut</th></tr>
    </thead>
    <tbody>
      ${result.map((w, i) => `
      <tr>
        <td style="color:var(--muted)">${i+1}</td>
        <td style="color:var(--text);font-weight:500">${w.word}</td>
        <td style="color:${w.translation ? 'var(--text)' : 'var(--red)'}">${w.translation || '—'}</td>
        <td><span class="badge-level badge-${w.level}">${w.level}</span></td>
        <td>${w.translation ? '<span class="tag-ok">✓</span>' : '<span class="tag-missing">✗ manquant</span>'}</td>
      </tr>`).join('')}
    </tbody>
  </table>
  
  <footer>
    <p>oxford3000_fr.json · Oxford 3000 Word List · Généré automatiquement</p>
  </footer>
</div>
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quality_report.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadPythonScript = () => {
    const script = `#!/usr/bin/env python3
"""
quality_check.py — Oxford 3000 French Translation Quality Check
Usage: python quality_check.py [path/to/oxford3000_fr.json]
"""

import json
import sys
import os
from datetime import datetime
from pathlib import Path


def load_data(filepath):
    with open(filepath, encoding="utf-8") as f:
        return json.load(f)


def check_quality(data):
    total = len(data)
    missing = []
    empty = []
    valid = []

    for entry in data:
        word = entry.get("word", "")
        level = entry.get("level", "?")
        translation = entry.get("translation")

        if translation is None:
            missing.append(entry)
        elif isinstance(translation, str) and translation.strip() == "":
            empty.append(entry)
        else:
            valid.append(entry)

    by_level = {}
    for entry in data:
        lvl = entry.get("level", "?")
        if lvl not in by_level:
            by_level[lvl] = {"total": 0, "ok": 0, "missing": 0, "empty": 0}
        by_level[lvl]["total"] += 1
        t = entry.get("translation")
        if t is None:
            by_level[lvl]["missing"] += 1
        elif isinstance(t, str) and t.strip() == "":
            by_level[lvl]["empty"] += 1
        else:
            by_level[lvl]["ok"] += 1

    return {
        "total": total,
        "valid": len(valid),
        "missing": missing,
        "empty": empty,
        "by_level": by_level,
        "coverage_pct": round(len(valid) / total * 100, 2) if total else 0,
    }


def print_report(report, filepath):
    sep = "─" * 60
    print(f"\\n{'='*60}")
    print(f"  OXFORD 3000 FR — RAPPORT QUALITÉ")
    print(f"  Fichier : {filepath}")
    print(f"  Date    : {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"{'='*60}\\n")

    print(f"RÉSUMÉ")
    print(sep)
    print(f"  Total mots         : {report['total']}")
    print(f"  ✅ Traduits         : {report['valid']}  ({report['coverage_pct']}%)")
    print(f"  ❌ Manquants (null) : {len(report['missing'])}")
    print(f"  ⚠️  Vides (empty)   : {len(report['empty'])}")
    print()

    print(f"PAR NIVEAU")
    print(sep)
    for lvl in sorted(report["by_level"]):
        s = report["by_level"][lvl]
        pct = round(s["ok"] / s["total"] * 100, 1) if s["total"] else 0
        bar = "█" * int(pct // 5) + "░" * (20 - int(pct // 5))
        print(f"  {lvl}  [{bar}] {pct:5.1f}%  ({s['ok']}/{s['total']})", end="")
        if s["missing"]: print(f"  ❌ {s['missing']} manquants", end="")
        if s["empty"]:   print(f"  ⚠️  {s['empty']} vides", end="")
        print()
    print()

    if report["missing"]:
        print(f"TRADUCTIONS MANQUANTES ({len(report['missing'])})")
        print(sep)
        for e in report["missing"]:
            print(f"  ❌  [{e.get('level','?')}]  {e.get('word','?')}")
        print()

    if report["empty"]:
        print(f"TRADUCTIONS VIDES ({len(report['empty'])})")
        print(sep)
        for e in report["empty"]:
            print(f"  ⚠️  [{e.get('level','?')}]  {e.get('word','?')}")
        print()

    status = "✅ PASS" if not report["missing"] and not report["empty"] else "❌ ÉCHEC"
    print(f"STATUT GLOBAL : {status}")
    print(f"{'='*60}\\n")

    return len(report["missing"]) + len(report["empty"])


def generate_html_report(report, filepath, output_path="quality_report.html"):
    total = report["total"]
    missing_count = len(report["missing"])
    empty_count = len(report["empty"])
    valid_count = report["valid"]
    pct = report["coverage_pct"]

    missing_rows = "".join(
        f'<tr><td style="color:#9ca3af">{i+1}</td>'
        f'<td>{e.get("word","")}</td>'
        f'<td><span class="badge-{e.get("level","")}">{e.get("level","")}</span></td>'
        f'<td><span style="color:#f87171">● manquant</span></td></tr>'
        for i, e in enumerate(report["missing"])
    )

    empty_rows = "".join(
        f'<tr><td style="color:#9ca3af">{i+1}</td>'
        f'<td>{e.get("word","")}</td>'
        f'<td><span class="badge-{e.get("level","")}">{e.get("level","")}</span></td>'
        f'<td><span style="color:#fbbf24">● vide</span></td></tr>'
        for i, e in enumerate(report["empty"])
    )

    level_cards = "".join(
        f'''<div class="level-card">
          <div class="level-badge">{lvl}</div>
          <div style="color:#9ca3af;font-size:0.8rem;margin-bottom:0.4rem">{s["total"]} mots</div>
          <div style="color:#4ade80">✓ {s["ok"]} traduits</div>
          {'<div style="color:#f87171">✗ ' + str(s["missing"]) + ' manquants</div>' if s["missing"] else ""}
          {'<div style="color:#fbbf24">⚠ ' + str(s["empty"]) + ' vides</div>' if s["empty"] else ""}
          <div class="progress-bar"><div class="progress-fill" style="width:{round(s['ok']/s['total']*100,1) if s['total'] else 0}%"></div></div>
        </div>'''
        for lvl, s in sorted(report["by_level"].items())
    )

    html = f"""<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Quality Check – Oxford 3000 FR</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');
  *,*::before,*::after{{box-sizing:border-box;margin:0;padding:0}}
  :root{{--bg:#0f0e0d;--card:#1a1917;--border:#2e2c2a;--text:#e8e4df;--muted:#7a7470;--green:#4ade80;--red:#f87171;--amber:#fbbf24;--blue:#60a5fa;--accent:#e8c547}}
  body{{background:var(--bg);color:var(--text);font-family:'DM Mono',monospace;min-height:100vh;padding:3rem 2rem}}
  .container{{max-width:900px;margin:0 auto}}
  header{{margin-bottom:3rem;border-bottom:1px solid var(--border);padding-bottom:2rem}}
  h1{{font-family:'DM Serif Display',serif;font-size:2.8rem;color:var(--accent);line-height:1.1;margin-bottom:0.5rem}}
  .subtitle{{color:var(--muted);font-size:0.8rem;letter-spacing:0.08em;text-transform:uppercase}}
  .timestamp{{color:var(--muted);font-size:0.75rem;margin-top:0.5rem}}
  .stats-grid{{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:1rem;margin-bottom:2.5rem}}
  .stat-card{{background:var(--card);border:1px solid var(--border);border-radius:8px;padding:1.25rem 1.5rem}}
  .stat-label{{font-size:0.7rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--muted);margin-bottom:0.5rem}}
  .stat-value{{font-size:2rem;font-weight:500}}
  .stat-value.green{{color:var(--green)}}.stat-value.red{{color:var(--red)}}.stat-value.amber{{color:var(--amber)}}.stat-value.blue{{color:var(--blue)}}
  .progress-bar{{background:var(--border);border-radius:4px;height:6px;margin:0.5rem 0;overflow:hidden}}
  .progress-fill{{height:100%;background:var(--green);border-radius:4px}}
  h2{{font-family:'DM Serif Display',serif;font-size:1.4rem;color:var(--accent);margin-bottom:1rem;margin-top:2rem}}
  .level-grid{{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin-bottom:2.5rem}}
  .level-card{{background:var(--card);border:1px solid var(--border);border-radius:8px;padding:1.25rem}}
  .level-badge{{display:inline-block;background:var(--accent);color:var(--bg);font-weight:500;font-size:0.85rem;padding:0.2rem 0.6rem;border-radius:4px;margin-bottom:0.75rem}}
  table{{width:100%;border-collapse:collapse;font-size:0.8rem;margin-bottom:2.5rem}}
  th{{text-align:left;padding:0.6rem 1rem;background:var(--card);color:var(--muted);font-size:0.7rem;text-transform:uppercase;letter-spacing:0.08em;border-bottom:1px solid var(--border)}}
  td{{padding:0.5rem 1rem;border-bottom:1px solid var(--border)}}
  tr:hover td{{background:var(--card)}}
  .badge-A1{{background:#1a3a2a;color:#4ade80;padding:0.15rem 0.5rem;border-radius:3px;font-size:0.72rem}}
  .badge-A2{{background:#1a2f3a;color:#60a5fa;padding:0.15rem 0.5rem;border-radius:3px;font-size:0.72rem}}
  .badge-B1{{background:#3a2a1a;color:#fbbf24;padding:0.15rem 0.5rem;border-radius:3px;font-size:0.72rem}}
  .badge-B2{{background:#3a1a1a;color:#f87171;padding:0.15rem 0.5rem;border-radius:3px;font-size:0.72rem}}
  footer{{color:var(--muted);font-size:0.72rem;margin-top:3rem;padding-top:1rem;border-top:1px solid var(--border)}}
</style>
</head>
<body>
<div class="container">
  <header>
    <h1>Oxford 3000<br><em>Rapport Qualité</em></h1>
    <p class="subtitle">quality_check.py · {Path(filepath).name}</p>
    <p class="timestamp">Généré le {datetime.now().strftime('%d/%m/%Y à %H:%M:%S')}</p>
  </header>
  <div class="stats-grid">
    <div class="stat-card"><div class="stat-label">Total mots</div><div class="stat-value blue">{total}</div></div>
    <div class="stat-card"><div class="stat-label">Traduits</div><div class="stat-value green">{valid_count}</div>
      <div class="progress-bar"><div class="progress-fill" style="width:{pct}%"></div></div>
      <small style="color:var(--muted);font-size:0.72rem">{pct}%</small></div>
    <div class="stat-card"><div class="stat-label">Manquants</div><div class="stat-value {'red' if missing_count else 'green'}">{missing_count}</div></div>
    <div class="stat-card"><div class="stat-label">Vides</div><div class="stat-value {'amber' if empty_count else 'green'}">{empty_count}</div></div>
  </div>
  <h2>Par niveau</h2>
  <div class="level-grid">{level_cards}</div>
  {'<h2>Traductions manquantes (' + str(missing_count) + ')</h2><table><thead><tr><th>#</th><th>Mot</th><th>Niveau</th><th>Statut</th></tr></thead><tbody>' + missing_rows + '</tbody></table>' if missing_count else '<div style="background:var(--card);border:1px solid #1a3a2a;border-radius:8px;padding:1.5rem;color:var(--green);margin-bottom:2rem">✅ Aucune traduction manquante — couverture 100%</div>'}
  {'<h2>Traductions vides (' + str(empty_count) + ')</h2><table><thead><tr><th>#</th><th>Mot</th><th>Niveau</th><th>Statut</th></tr></thead><tbody>' + empty_rows + '</tbody></table>' if empty_count else ""}
  <footer><p>quality_check.py · Oxford 3000 Word List</p></footer>
</div>
</body>
</html>"""

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"  📄 Rapport HTML sauvegardé : {output_path}")


if __name__ == "__main__":
    filepath = sys.argv[1] if len(sys.argv) > 1 else "data/oxford3000_fr.json"

    if not os.path.exists(filepath):
        print(f"Erreur : fichier introuvable → {filepath}")
        sys.exit(1)

    data = load_data(filepath)
    report = check_quality(data)
    errors = print_report(report, filepath)
    generate_html_report(report, filepath, output_path="quality_report.html")

    sys.exit(1 if errors else 0)
`;
    const blob = new Blob([script], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quality_check.py";
    a.click();
    URL.revokeObjectURL(url);
  };

  const coverage = result
    ? Math.round((result.filter(w => w.translation).length / result.length) * 100)
    : 0;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f0e0d",
      color: "#e8e4df",
      fontFamily: "'DM Mono', 'Courier New', monospace",
      padding: "2rem",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');
        .btn { cursor: pointer; border: none; border-radius: 6px; padding: 0.7rem 1.4rem; font-family: inherit; font-size: 0.85rem; font-weight: 500; transition: all 0.15s; }
        .btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .btn-primary { background: #e8c547; color: #0f0e0d; }
        .btn-primary:not(:disabled):hover { background: #f0d060; transform: translateY(-1px); }
        .btn-secondary { background: #1a1917; color: #e8e4df; border: 1px solid #2e2c2a; }
        .btn-secondary:not(:disabled):hover { background: #252320; border-color: #4a4845; }
        .btn-green { background: #166534; color: #4ade80; border: 1px solid #14532d; }
        .btn-green:not(:disabled):hover { background: #15803d; }
      `}</style>

      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "2.5rem", borderBottom: "1px solid #2e2c2a", paddingBottom: "1.5rem" }}>
          <h1 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "2.4rem",
            color: "#e8c547",
            lineHeight: 1.1,
            marginBottom: "0.4rem"
          }}>
            Oxford 3000<br /><em>Traducteur FR</em>
          </h1>
          <p style={{ color: "#7a7470", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            {OXFORD_DATA.length} mots · API Claude · JSON + quality_check.py
          </p>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "2rem" }}>
          <button
            className="btn btn-primary"
            onClick={runTranslation}
            disabled={status === "running"}
          >
            {status === "running" ? `⏳ Traduction en cours... ${progress}%` : "▶ Lancer la traduction"}
          </button>

          {result && (
            <>
              <button className="btn btn-green" onClick={downloadJSON}>
                ↓ oxford3000_fr.json
              </button>
              <button className="btn btn-secondary" onClick={generateQualityReport}>
                ↓ quality_report.html
              </button>
              <button className="btn btn-secondary" onClick={downloadPythonScript}>
                ↓ quality_check.py
              </button>
            </>
          )}
        </div>

        {/* Progress */}
        {status === "running" && (
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#7a7470", marginBottom: "0.4rem" }}>
              <span>Progression</span>
              <span>{progress}%</span>
            </div>
            <div style={{ background: "#2e2c2a", borderRadius: 4, height: 6, overflow: "hidden" }}>
              <div style={{ height: "100%", background: "#e8c547", width: `${progress}%`, transition: "width 0.3s", borderRadius: 4 }} />
            </div>
          </div>
        )}

        {/* Stats when done */}
        {result && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0.75rem", marginBottom: "1.5rem" }}>
            {[
              { label: "Total", value: result.length, color: "#60a5fa" },
              { label: "Traduits", value: result.filter(w=>w.translation).length, color: "#4ade80" },
              { label: "Manquants", value: result.filter(w=>!w.translation).length, color: result.filter(w=>!w.translation).length > 0 ? "#f87171" : "#4ade80" },
            ].map(s => (
              <div key={s.label} style={{ background: "#1a1917", border: "1px solid #2e2c2a", borderRadius: 8, padding: "1rem" }}>
                <div style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#7a7470", marginBottom: "0.3rem" }}>{s.label}</div>
                <div style={{ fontSize: "1.8rem", fontWeight: 500, color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Log */}
        {log.length > 0 && (
          <div style={{
            background: "#1a1917",
            border: "1px solid #2e2c2a",
            borderRadius: 8,
            padding: "1rem",
            fontFamily: "monospace",
            fontSize: "0.75rem",
            maxHeight: 220,
            overflowY: "auto",
            marginBottom: "1.5rem",
            color: "#9a9490"
          }}>
            {log.map((l, i) => (
              <div key={i} style={{ lineHeight: 1.7 }}>{l}</div>
            ))}
          </div>
        )}

        {/* Instructions */}
        {status === "idle" && (
          <div style={{ background: "#1a1917", border: "1px solid #2e2c2a", borderRadius: 8, padding: "1.25rem", fontSize: "0.8rem", color: "#7a7470", lineHeight: 1.8 }}>
            <div style={{ color: "#e8c547", fontWeight: 500, marginBottom: "0.5rem" }}>Instructions</div>
            <ol style={{ paddingLeft: "1.2rem" }}>
              <li>Cliquer <strong style={{color:"#e8e4df"}}>Lancer la traduction</strong> — traduit les 2927 mots en ~30 batches</li>
              <li>Télécharger <strong style={{color:"#e8e4df"}}>oxford3000_fr.json</strong> → placer dans <code style={{color:"#e8c547"}}>data/</code></li>
              <li>Télécharger <strong style={{color:"#e8e4df"}}>quality_check.py</strong> → lancer avec <code style={{color:"#e8c547"}}>python quality_check.py data/oxford3000_fr.json</code></li>
              <li>Télécharger <strong style={{color:"#e8e4df"}}>quality_report.html</strong> pour vérifier en ligne</li>
            </ol>
          </div>
        )}

        {status === "done" && (
          <div style={{ background: "#1a3a2a", border: "1px solid #14532d", borderRadius: 8, padding: "1.25rem", fontSize: "0.85rem", color: "#4ade80" }}>
            ✅ Traduction terminée — {coverage}% de couverture. Téléchargez les fichiers ci-dessus.
          </div>
        )}
      </div>
    </div>
  );
}
