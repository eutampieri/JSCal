var adesso=new Date();
var Calendar={
    months: (function(){var a=["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug","Set","Oct","Nov","Dec"];
    if(navigator.language=="it-IT"){
        a=["Gen", "Feb", "Mar", "Apr", "Mag", "Giu","Lug", "Ago","Set","Ott","Nov","Dic"];
    }return a;})(),
    days: (function(){var a=["S","M","T","W","T","F","S"];
    if(navigator.language=="it-IT"){
        a=["L","M","M","G","V","S","D"];
    }return a;})(),
    giorno:adesso.getDate(),
    mese:adesso.getMonth(),
    anno:adesso.getFullYear(),
    primo: null,//Il primo giorno del mese che giorno era della settimana?
    populatedElement: null,
    titolo: (function(){var a=document.createElement("div");a.classList.add("cal-month");return a;})(),    
    init: function(element){
        this.giorno=adesso.getDate(),
        this.mese=adesso.getMonth(),
        this.anno=adesso.getFullYear(),
        this.primo=adesso.getDay();
        this.populatedElement=element;
        element.innerHTML="";
        this.titolo.innerHTML=this.months[this.mese]+" "+this.anno.toString();
        element.appendChild(this.titolo);
        this.titolo=document.getElementsByClassName("cal-month")[0];
        var tmp=this.giorno;
        while(tmp!=1){
            this.primo--;
            if(this.primo==-1)this.primo=6;
            tmp--;
        }
        if(navigator.language=="it-IT"){
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