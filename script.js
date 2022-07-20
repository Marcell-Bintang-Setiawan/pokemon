function showAllPokemon() {
  $.ajax({
    url: "https://api.pikaserve.xyz/pokemon/all",
    type: "get",
    dataType: "json",
    data: {},
    success: function (response) {
      // console.log(response);
      $.each(response, function (i, value) {
        let data = response[i];
        $("#pokemon-list").append(
          `<div class="col-lg-2 col-md-3">
            <div class="card mb-3 border-2 shadow">
              <img src="` +
            data.image.hires +
            `" class="card-img-top mx-auto mt-3 img-fluid" style="height: 150px; width: 150px;" alt="` +
            data.name.english +
            `">
              <div class="card-body">
                <h5 class="card-title">` +
            data.name.english +
            `</h5>
                <h5 class="card-subtitle text-muted">` +
            data.name.japanese +
            `</h5>
              </div>
              <a href="#" class="btn btn-info text-light mx-auto mb-2 see-detail card-link" data-bs-toggle="modal"  data-bs-target="#exampleModal" data-id="`+data.id+`">Detail</a>
            </div>
          </div>`
        );
      });
    },
  });
}

showAllPokemon();

function showSearch() {
  $("#pokemon-list").html("");
  let search = $("#search-input").val();

  $.ajax({
    url: "https://api.pikaserve.xyz/pokemon/" + search + "",
    type: "get",
    dataType: "json",
    data: {},
    success: function (data) {
      

      if (data.id > 0) {
        $("#pokemon-list").append(
          `<div class="col-lg-2 col-md-3">
          <div class="card mb-3 border-2 shadow">
            <img src="` +
            data.image.hires +
            `" class="card-img-top mx-auto mt-3 img-fluid" style="height: 150px; width: 150px;" alt="` +
            data.name.english +
            `">
            <div class="card-body">
              <h5 class="card-title">` +
            data.name.english +
            `</h5>
              <h5 class="card-subtitle text-muted">` +
            data.name.japanese +
            `</h5>
            </div>
            <a href="#" class="btn btn-info text-light mx-auto mb-2 see-detail card-link" data-bs-toggle="modal"  data-bs-target="#exampleModal" data-id="`+data.id+`">Detail</a>
          </div>
        </div>`
        );
      } else {
        $("#pokemon-list").html(`
          <div class="col">
            <h1 class="text-center">Pokemon Not Found</h1> 
          </div>`);
      }


      
    },
  });
}

$("#search-button").on("click", function () {
  showSearch();
});

$("#search-input").on("keyup", function (e) {
  if (e.which == 13) {
    showSearch();
  }
});

$("#pokemon-list").on("click", ".see-detail", function () {
  $.ajax({
    url: "https://api.pikaserve.xyz/pokemon/" + $(this).data("id") + "",
    type: "get",
    dataType: "json",
    data: {},
    success: function (data) {
      if (data.id > 0) {
        $(".modal-body").html(
          `
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-4 my-auto img-hover-zoom">
                <img src="${data.image.hires}" class="img-fluid" alt="">
              </div>
              
              <div class="col-md-8">
                <ul class="list-group list-group-horizontal">
                  <li class="list-group-item border-0"><h3>${data.name.english} / ${data.name.japanese}</h3></li>
                </ul>
                <ul class="list-group list-group-horizontal mb-1">
                  <li class="list-group-item"><b>Type </b>: ${data.type}</li>
                  <li class="list-group-item"><b>Species </b>: ${data.species}</li>
                </ul>
                <ul class="list-group list-group-horizontal mb-1">
                  <li class="list-group-item"><b>Height </b>: ${data.profile.height}</li>
                  <li class="list-group-item"><b>Weight </b>: ${data.profile.weight}</li>
                  <li class="list-group-item"><b>Egg </b>: ${data.profile.egg}</li>
                </ul>
                
                <ul class="list-group list-group-horizontal mb-1">
                  <li class="list-group-item me-2"><b>Description </b>: ${data.description}</li>
              </div>
            </div>
          </div>   
          `
        )
      }
    },
  });
});


{/* <ul class="list-group list-group-horizontal mb-1">
                  <li class="list-group-item me-2" style="background-color: #ff5957;"><b>HP </b>: ${data.base.HP}</li>
                  <li class="list-group-item me-2" style="background-color: #f6a260;"><b>Attack </b>: ${data.base.Attack}</li>
                  <li class="list-group-item me-2" style="background-color: #f6c966;"><b>Defense </b>: ${data.base.Defense}</li>
                  <li class="list-group-item me-2" style="background-color: #f6e466;"><b>Speed </b>: ${data.base.Speed}</li>
                </ul> */}