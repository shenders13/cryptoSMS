<script>
  export default {
    name: 'navbar'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .navbar {
    height:10vh;
    width: 100%;
    background-image: linear-gradient(-180deg, #FCFCFC 0%, #EEEEEE 100%);
    box-shadow: 0px 1px 3px 0px rgba(120,83,83,0.50);
    margin-bottom:0px;
  }

  p {
    margin: 0px;
  }

  .logo-text {
    font-size: 16px;
    font-weight: 400;
    margin-right: 3%;
    color: #f7692a;
    display: inline-block;
    margin-top: 3vh;
  }

  .navbar-button {
    background: #FFFFFF;
    border: 1px solid #DCDCDC;
    box-shadow: 0px 1px 1px 0px rgba(0,0,0,0.50);
    border-radius: 5px;
    text-align: center;
    color: #f96448;
    margin-top: 13px;
    display: inline-block;
    padding: 8px 10px 7px;
    font-size: 12px;
  }

  .navbar-button:hover {
    cursor:pointer;
    background: #f9f9f9;
  }

  .navbar-logo {
    width: 32px;
    height: 33px;
/*    display: inline;
*/    margin-top: 0px;
    display: inline-block;
    }

</style>
