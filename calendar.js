//indexOf polyfill: https://gist.github.com/atk/1034425/raw/93da7f8b7834025da1f536496c9b1dffabedfe18/index.js
var adesso=new Date();
function getUrlPromise(url) {
    return new Promise(function(resolve,reject){
    var webrequest = new XMLHttpRequest();
    webrequest.open('GET', url, true);
    webrequest.onload=function(){
        resolve(webrequest.responseText);
    };
    webrequest.send(null);});
}
var Calendar={
    markedDates: [],
    fullSizeText: false,
    months: null,
    mondayFirst: null,
    days: null,
    giorno:adesso.getDate(),
    mese:adesso.getMonth(),
    anno:adesso.getFullYear(),
    primo: null,//Il primo giorno del mese che giorno era della settimana?
    populatedElement: null,
    displayButtons: null,
    titolo: (function(){var a=document.createElement("div");a.onclick=function(){Calendar.today();};a.classList.add("cal-month");return a;})(),    
    init: function(element, buttons){
        //while(this.mondayFirst===null);
        this.giorno=adesso.getDate(),
        this.mese=adesso.getMonth(),
        this.anno=adesso.getFullYear(),
        this.primo=adesso.getDay();
        this.populatedElement=element;
        var head=document.createElement("div");
        head.classList.add("cal-head");
        element.innerHTML="";
        this.titolo.innerHTML=this.months[this.mese]+" "+this.anno.toString();
        if(buttons){
            var button=document.createElement("div");
            button.classList.add("cal-button");
            button.classList.add("cal-button-l");
            button.onclick=function(){Calendar.prev();};
            head.appendChild(button);
            this.titolo.classList.add("cal-b-title");
        }
        head.appendChild(this.titolo);
        if(buttons){
            var button=document.createElement("div");
            button.classList.add("cal-button");
            button.classList.add("cal-button-r");
            button.onclick=function(){Calendar.next();};
            head.appendChild(button);
        }
        element.appendChild(head);
        this.titolo=document.getElementsByClassName("cal-month")[0];
        var tmp=this.giorno;
        while(tmp!=1){
            this.primo--;
            if(this.primo==-1)this.primo=6;
            tmp--;
        }
        if(this.mondayFirst){
            this.primo--;
            if(this.primo==-1)this.primo=6;
        }
        var calWrapper=document.createElement("div");
        var giorno;
        for(var i=0;i<7;i++){
            giorno=document.createElement("div");
            giorno.classList.add("cal-h-day");
            giorno.innerHTML=this.days[i];
            calWrapper.appendChild(giorno);            
        }
        calWrapper.className="cal-wrapper";
        var firstMargin=((this.primo)/7*100).toString()+"%";
        var oggi=new Date();
        giorno=document.createElement("div");
        giorno.className="cal-day";
        giorno.innerHTML="1";
        giorno.style.marginLeft=firstMargin;
        if(1==oggi.getDate()&&this.anno==oggi.getFullYear()&&this.mese==oggi.getMonth()){
            giorno.classList.add("cal-today");
        }
        if(this.markedDates.indexOf(new Date(this.anno, this.mese, 1))!=-1){
            giorno.classList.add("cal-marked");
        }
        calWrapper.appendChild(giorno);
        var last=new Date(this.anno, this.mese+1,0).getDate();
        for(var i=2;i<=last;i++){
            giorno=document.createElement("div");
            giorno.classList.add("cal-day");
            if(i==oggi.getDate()&&this.anno==oggi.getFullYear()&&this.mese==oggi.getMonth()){
                giorno.classList.add("cal-today");
            }
            if(this.markedDates.indexOf(new Date(this.anno, this.mese, i).getTime())!=-1){
                giorno.classList.add("cal-marked");
            }
            giorno.innerHTML=i.toString();
            calWrapper.appendChild(giorno);            
        }
        element.appendChild(calWrapper);
    },
    load: function(obj, btn){
    	btn=(btn===undefined?true:btn);
        getUrlPromise("lang/"+(this.fullSizeText?"full-":"")+navigator.language.split("-")[0]+".lang").then(function(r){
            if(r==null){
                getUrlPromise("lang/"+(this.fullSizeText?"full-":"")+"en.lang").then(function(ra){
                    var loc=JSON.parse(ra);
                    this.Calendar.mondayFirst=loc.MondayFirst;
                    this.Calendar.months=loc.months;
                    this.Calendar.days = loc.days;
                    this.Calendar.init(obj);
                });
            }
            else{
                var loc=JSON.parse(r);
                this.Calendar.mondayFirst=loc.MondayFirst;
                this.Calendar.months=loc.months;
                this.Calendar.days = loc.days;
                this.Calendar.init(obj,btn);
            }
        });
        this.displayButtons=btn;
    },
    next: function(){
        this.mese++;
        adesso.setMonth(this.mese);
        if(this.mese==12)this.mese=0;
        this.init(this.populatedElement, this.displayButtons);
    },
    prev: function(){
        this.mese--;
        adesso.setMonth(this.mese);
        if(this.mese==-1)this.mese=11;
        this.init(this.populatedElement, this.displayButtons);
    },
    today: function(){
        adesso=new Date();
        this.init(this.populatedElement, this.displayButtons);
    }
};
