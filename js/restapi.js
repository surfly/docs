
       document.getElementsByClassName("btn pull-left js-toolbar-action").addEventListener("click", stretchApi);
       console.log("hideMenu:"+ hideMenu);
       var apiFrame = document.getElementById("restapiFrame");

       function stretchApi() {
          apiFrame.style.margin="0px0px0px0px";
       }