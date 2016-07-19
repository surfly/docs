<html>

   <iframe src="https://www.surfly.com/cobrowsing-api/" style="position:fixed; top:75px; left:350px; bottom:0px; right:0px; width:100%; height:100%; border:none; margin:0; padding:0;" id="restapiFrame">
 Your browser is not compatible with iframes
    </iframe>

  <script type="text/javascript">
       var hideMenu = document.getElementsByClassName("btn pull-left js-toolbar-action");
       console.log("hideMenu:"+ hideMenu);
       var apiFrame = document.getElementById("restapiFrame");
       
       hideMenu.addEventListener("click", stretchApi);

       function stretchApi() {
          apiFrame.style.margin="0px0px0px0px";
       }
  </script>

</html>





