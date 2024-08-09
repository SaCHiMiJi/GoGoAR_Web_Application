const assignment_repository = require('../repositories/AssignmentRepository.js');
const embeddedCreator = process.env.EMBEDDED_USER;

const date = new Date();
const createdDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))

const seedAssignments = [
  {
    "assignment_name": "Learn to read sensor values (Input).",
    "description": "Learn to read sensor values (Input).",
    "creator_id": embeddedCreator,
    "creator_name": "GoGo Board AR",
    "created_date": createdDate,
    "ref_url": null,
    "steps": {
      "1": {
        "function": "connect",
        "component": "input1",
        "context": "Please conenct Light Sensor to InputPort1",
        "externalComponent": "lightsensor"
      },
      "2": {
        "function": "context",
        "context": "Now you can read a value from Gogocode.",
      }
    }
  },
  {
    "assignment_name": "Learn to operate equipment (Output).",
    "description": "Learn to operate equipment (Output).",
    "creator_id": embeddedCreator,
    "creator_name": "GoGo Board AR",
    "created_date": createdDate,
    "ref_url": null,
    "steps": {
      "1": {
        "function": "context",
        "context": "Learn to operate equipment (Output)."
      },
      "2": {
        "function": "connect",
        "component": "output1",
        "context": "Please conenct Light Sensor to Output Port1",
        "externalComponent": "lightsensor"
      },
      "3": {
        "function": "context",
        "context": "Now you can operate a equipment from Gogocode.",
      }
    }
  },
  {
    "assignment_name": "Automatic street light",
    "description": "Creating an automatic lighting control system that is highly sensitive and can respond quickly and accurately to changes in light.",
    "creator_id": embeddedCreator,
    "creator_name": "GoGo Board AR",
    "created_date": createdDate,
    "ref_url": null,
    "steps": {
      "1": {
        "function": "context",
        "context": "Connect the GoGo Board to your computer or tablet via USB-C cable or Wi-Fi."
      },
      "2": {
        "function": "connect",
        "component": "input1",
        "context": "Connect the light sensor to input port number 1.",
        "externalComponent": "lightsensor"
      },
      "3": {
        "function": "connect",
        "component": "output1",
        "context": "Connect the LED bulb to output port number 1.",
        "externalComponent": "led"
      },
      "4": {
        "function": "context",
        "context": "You can simulate day and night. Cover the light sensor with your hand. Then observe the sensor values during the day and at night. Consider each case and record the threshold value."
      }
    }
  }
];

exports.seedAssignment = async () => {
try {
    const assignments = await assignment_repository.findAll();
    const assignmentAmount = assignments.length; 

    if (assignmentAmount === 0 || assignmentAmount === null) {
      console.log('The server has just started for the first time. The assignments will be seeded.');
      for (const assignment of seedAssignments) {
        try {
          const createdAssignment = await assignment_repository.create(assignment);
          const id = createdAssignment._id;
          await assignment_repository.updateURL(id, "unitydl://mylink?" + id);
          console.log("Successfully created the assignment.");
        } catch (error) {
          console.error("Unable to create the initiated assignment because:\n" + error.toString());
        }
      }
    } else {
      console.log('The assignments are already created. No need to create the seeded ones.');
    }
  } catch (error) {
    console.error("Unable to fetch assignments because:\n" + error.toString());
  }
};
