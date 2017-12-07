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
    months: null,
    mondayFirst: null,
    days: null,
    giorno:adesso.getDate(),
    mese:adesso.getMonth(),
    anno:adesso.getFullYear(),
    primo: null,//Il primo giorno del mese che giorno era della settimana?
    populatedElement: null,
    titolo: (function(){var a=document.createElement("div");a.classList.add("cal-month");return a;})(),    
    init: function(element, buttons=true){
        //while(this.mondayFirst===null);
        this.giorno=adesso.getDate(),
        this.mese=adesso.getMonth(),
        this.anno=adesso.getFullYear(),
        this.primo=adesso.getDay();
        this.populatedElement=element;
        element.innerHTML="";
        this.titolo.innerHTML=this.months[this.mese]+" "+this.anno.toString();
        if(buttons){
            var button=document.createElement("div");
            button.classList.add("cal-button");
            button.innerHTML="<";
            button.onclick=function(){Calendar.prev();};
            element.appendChild(button);
            this.titolo.classList.add("cal-b-title");
        }
        element.appendChild(this.titolo);
        if(buttons){
            var button=document.createElement("div");
            button.classList.add("cal-button");
            button.innerHTML=">";
            button.onclick=function(){Calendar.next();};;
            element.appendChild(button);
        }
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
        giorno=document.createElement("div");
        giorno.className="cal-day";
        giorno.innerHTML="1";
        giorno.style.marginLeft=firstMargin;
        calWrapper.appendChild(giorno);
        var last=new Date(this.anno, this.mese+1,0).getDate();
        for(var i=2;i<=last;i++){
            giorno=document.createElement("div");
            giorno.className="cal-day";
            giorno.innerHTML=i.toString();
            calWrapper.appendChild(giorno);            
        }
        element.appendChild(calWrapper);
    },
    load: function(obj){
        console.log(this.init);
        getUrlPromise("lang/"+navigator.language.split("-")[0]+".lang").then(function(r){
            if(r==null){
                getUrlPromise("lang/en.lang").then(function(ra){
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
                this.Calendar.init(obj);
            }
        });
    },
    next: function(){
        this.mese++;
        adesso.setMonth(this.mese);
        if(this.mese==12)this.mese=0;
        this.init(this.populatedElement);
    },
    prev: function(){
        this.mese--;
        adesso.setMonth(this.mese);
        if(this.mese==-1)this.mese=11;
        this.init(this.populatedElement);
    }
};