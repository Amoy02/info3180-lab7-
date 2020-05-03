/* Add your Application JavaScript */
Vue.component('app-header', {
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="#">Lab 7</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>
            <li class="nav-item active">
                <router-link class="nav-link" to="/upload">Upload <span class="sr-only">(current)</span></router-link>
          </li>

        </ul>
      </div>
    </nav>
    `
});

Vue.component('app-footer', {
    template: `
    <footer>
        <div class="container">
            <p>Copyright &copy; Flask Inc.</p>
        </div>
    </footer>
    `
});

const Home = Vue.component('home', {
   template: `
    <div class="jumbotron">
        <h1>Lab 7</h1>
        <p class="lead">In this lab we will demonstrate VueJS working with Forms and Form Validation from Flask-WTF.</p>
    </div>
   `,
    data: function() {
       return {}
    }
});

const NotFound = Vue.component('not-found', {
    template: `
    <div>
        <h1>404 - Not Found</h1>
    </div>
    `,
    data: function () {
        return {}
    }
})

Vue.component('upload-form', {
     template: `
<h2>Upload Form</h2>
<br>
<form id = "uploadphoto" @submit.prevent="uploadPhoto" method="POST" enctype="multipart/form-data">
   <div class="form-group">
    <label for="textarea">Description</label>
    <textarea class="form-control" id="textarea" rows="3"></textarea>
  </div>
 <div class="form-group">
    <label for="fileinput">Photo Upload</label>
    <input type="file" class="form-control-file" id="fileinput">
  </div>
</form>
<div class="clear"></div>
    `,
    data: function () {
        return {
            error:[]
            description:'',
            photo:''
        }
    },   
 methods: {
    uploadphoto:function(e ) {
      e.preventDefault();
      this.errors = [];
      if(!this.description){this.errors.push("Name is required.");}
      if(!this.photo){this.errors.push("Photo is required.");}
      
      let uploadphoto = document.getElementById('uploadphoto');
      let form_data = new FormData(uploadphoto);
      fetch('/api/upload', {
        method: 'POST',
        body: form_data,
        headers: {
            'X-CSRFToken': token
          },
          credentials: 'same-origin'
      })
        .then(function (response) {
          if (!response.ok) {
    throw Error(response.statusText);
  }
     return response.json();
        })
        .then(function (jsonResponse) {
          if(jsonResponse.error) {
            this.errors.push(jsonResponse.error);
          }else{
            alert("Successfully uploaded");

          console.log(jsonResponse);
          }
          
      })
        .catch(function (error) {
          console.log(error);
        });
      }
    }
});

// Define Routes
const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: "/", component: Home},
        // Put other routes here
        {path: "/upload", component: Upload}

        // This is a catch all route in case none of the above matches
        {path: "*", component: NotFound}
    ]
});

// Instantiate our main Vue Instance
let app = new Vue({
    el: "#app",
    router
});