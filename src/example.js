var glob_model;
var glob_mservice;

// 1. Connect to the domain anonymously.
Convergence.connectAnonymously(DOMAIN_URL)
  .then(initApp)
  .catch((error) => {
    console.log("Could not connect: " + error);
  });

// 2. Initializes the application after connecting by opening a model.
function initApp(domain) {
  const modelService = domain.models();
  glob_mservice = modelService;
  modelService.openAutoCreate({
    collection: "example",
    id: "getting-started",
    data: { clicked: false }
  })
  .then(initModel)
  .catch((error) => {
    console.log("Could not open model: " + error);
  });
}

// 3. Initializes the model once the model is open.
function initModel(model) { // model is RealTimeModel object
  glob_model = model;
  const booleanModel = model.elementAt("clicked");
  // const textArea = document.getElementById("textarea");

  var button = document.getElementById("MyButton");

  button.addEventListener("click", buttonHandler);

  // listen for remote change
  booleanModel.on(Convergence.RealTimeBoolean.Events.MODEL_CHANGED, drawLine);

  // Sets the value of the text area and performs a two-way-binding.
  // ConvergenceInputElementBinder.bindTextInput(textArea, booleanModel);
}

function buttonHandler() {
  const booleanModel = glob_model.elementAt("clicked");
  console.log(glob_model.elementAt("clicked").value());
  booleanModel.value(true);
  drawLine();
}

function drawLine() {
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  ctx.moveTo(0, 0);
  ctx.lineTo(200, 100);
  ctx.stroke();

}

(function() {
  function resetModel() {
    glob_mservice.remove("getting-started");
    // glob_mservice.openAutoCreate({
    //   collection: "example",
    //   id: "getting-started",
    //   data: { clicked: false }
    // });
  }

  window.onload = function() {
    document.getElementById('resetButton').onclick = resetModel;
  };
})();
