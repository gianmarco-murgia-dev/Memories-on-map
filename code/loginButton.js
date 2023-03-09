class Login {
    static askLogin() {
        var loginSection = document.getElementById("loginSection");
        loginSection.innerHTML = '        <div id="login-modal" class="modal">        <div class="modal-dialog">          <div class="modal-content">            <div class="modal-header">              <h5 class="modal-title">Log in</h5>              <button type="button" class="close" data-dismiss="modal">&times;</button>            </div>            <div class="modal-body">              <form>                <div class="form-group">                  <label for="username">Username:</label>                  <input type="text" id="username" name="username" class="form-control" required>                </div>                <div class="form-group">                  <label for="password">Password:</label>                  <input type="password" id="password" name="password" class="form-control" required>                </div>                <button type="submit" class="btn btn-primary">Log in</button>              </form>            </div>          </div>        </div>      </div>';
        // Get the modal element
        var modal = document.getElementById("login-modal");
        modal.style.display = "block";

        // Get the close button element
        var closeButton = document.getElementsByClassName("close")[0];

        // When the user clicks on the close button, close the modal
        closeButton.onclick = function () {
            modal.style.display = "none";
        }
    }
}