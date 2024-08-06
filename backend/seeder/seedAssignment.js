const assignment_repository = require('../repositories/AssignmentRepository.js');
const embeddedCreator = process.env.EMBEDDED_USER;

const date = new Date();
const createdDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))

const introAssignment = {
  assignment_name: 'Intro to the GoGo AR',
  description: "lorem ipsum sit ame",
  creator_id: embeddedCreator,
  created_date: createdDate,
  ref_url: null,
  steps: {
    "1": {
      "function": "context",
      "context": "yo6"
    },
    "2": {
      "function": "highlight",
      "component": "input1",
      "context": "this is input number 1"
    },
    "3": {
      "function": "connect",
      "component": "input1",
      "externalComponent": "button"
    }
  }
}

exports.seedAssignment = async () => {
  // get the assignment size if there are presence assignments.
  let assignmentAmount = 0;
  let assignments;
  try {
    assignments = await assignment_repository.findAll();
  } catch(error) {
    return;
  }

  if(assignments) {
    assignmentAmount = assignments.length; 
  }

  if(assignmentAmount === 0 || assignmentAmount === null) {
    console.log('The server have just started for the first time. The assignment will be seed.');
    return assignment_repository.create(introAssignment)
        .then((createdAssignment) => {
          const id = createdAssignment._id;
          assignment_repository.updateURL(id, "unitydl://mylink?" + id)
            .then(() => {
              console.log("successfully created the first set of assignment");
            }).catch((error) => {
              console.error("Unable to assign the initiated assignment's URL because:\n" + error.toString());
            })
        }).catch((error) => {
          console.error("Unable to create the initiated assignment because:\n" + error.toString());
        });
  }

  console.log('The assignments is already created. No need to create the seeded one.');
  return;
};
