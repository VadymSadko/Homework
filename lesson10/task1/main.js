'use strict';

function DomElement(selector, height, width, bg, fontSize, build) {
        this.selector = selector;
        this.height = height;
        this.width = width;
        this.bg = bg;
        this.fontSize = fontSize;
        this.build = window.onload = function(){
        
        
        let addClass = selector.split('');
        let _this=this;
            addClass.forEach(function(item){
            if (item === '.'){
                let elem = document.createElement('div');
                    elem.className = selector.replace(/\./g, "");
                    elem.textContent = 'Блок номер раз '; 
                    elem.style.width = width;
                    elem.style.height = height;
                    elem.style.background = bg;
                    elem.style.fontSize = fontSize;
                    document.body.appendChild(elem);
            }
            if (item === '#'){
                let elem = document.createElement('div');
                    elem.setAttribute( "id", selector.replace(/\#/g, "" ));
                    elem.textContent = 'Блок номер два ';
                    elem.style.width = width;
                    elem.style.height = height;
                    elem.style.background = bg;
                    elem.style.fontSize = fontSize;
                    document.body.appendChild(elem);
            }
            
    });
        
        
    };
}

    let elem = new DomElement('.block', '100px', '200px', 'grey', '25px');

    

 
  
    
