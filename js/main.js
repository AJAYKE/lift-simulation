const GenearteSimulation = () => {
  const NumberOfFloors = document.getElementById("floors").value;
  const NumberOfLifts = document.getElementById("lists").value;

  let liftsPosition = {};

  for (let liftId = 0; liftId < NumberOfLifts; liftId++) {
    liftsPosition[liftId] = 0;
  }

  const CallLift = (floorId) => {
    let nearestLift = ClosestLift(floorId);
    SimulateLiftMovement(nearestLift, floorId);
  };

  const ClosestLift = (floorId) => {
    let nearest = -1;
    for (let liftId = 0; liftId < NumberOfLifts; liftId++) {
      if (
        nearest === -1 ||
        Math.abs(liftsPosition[nearest] - floorId) >
          Math.abs(liftsPosition[liftId] - floorId)
      ) {
        nearest = liftId;
      }
    }
    return nearest;
  };

  const SimulateLiftMovement = (liftId, targetFloor) => {
    let liftElement = document.getElementById(`lift-${liftId}`);

    let distanceToMove = -targetFloor * 200;
    liftElement.style.transform = `translateY(${distanceToMove}px)`;

    liftsPosition[liftId] = targetFloor;
  };

  let simulation = document.getElementsByClassName("simulation")[0];
  simulation.innerHTML = "";

  for (let i = NumberOfFloors; i >= 0; i--) {
    let upButton = document.createElement("button");
    upButton.textContent = "Up";
    upButton.addEventListener("click", () => CallLift(i));

    let downButton = document.createElement("button");
    downButton.textContent = "Down";
    downButton.addEventListener("click", () => CallLift(i));

    let floorElement = document.createElement("div");
    floorElement.className = "my-floor";
    floorElement.id = `floor-${i}`;
    floorElement.textContent = `Floor ${i}`;

    let buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";

    if (i < NumberOfFloors) {
      buttonContainer.appendChild(upButton);
    }
    if (i > 0) {
      buttonContainer.appendChild(downButton);
    }
    floorElement.appendChild(buttonContainer);
    simulation.appendChild(floorElement);
  }

  let grondFloorElement = document.getElementById("floor-0");

  let liftContainer = document.createElement("div");
  liftContainer.className = "lift-container";

  for (let j = 0; j < NumberOfLifts; j++) {
    let liftElement = document.createElement("div");
    liftElement.className = "lift";
    liftElement.id = `lift-${j}`;
    liftContainer.appendChild(liftElement);
  }
  grondFloorElement.appendChild(liftContainer);
};
