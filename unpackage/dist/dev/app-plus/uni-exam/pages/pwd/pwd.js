
      !(function(){
        var uniAppViewReadyCallback = function(){
          setCssToHead([".",[1],"hint { text-align: center; }\n",])();
document.dispatchEvent(new CustomEvent("generateFuncReady", { detail: { generateFunc: $gwx('./pages/pwd/pwd.wxml') } }));
        }
        if(window.__uniAppViewReady__){
          uniAppViewReadyCallback()
        }else{
          document.addEventListener('uniAppViewReady',uniAppViewReadyCallback)
        }
      })();
      