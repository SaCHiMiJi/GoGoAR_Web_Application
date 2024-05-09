<template>
    <div class="align-self: center;"> 
        <div class="columns-sm" v-if="!isAssignmentSubmit">
            <!-- Image container on 1st column -->
            <div class="img-container bg-slate-500">
                <img class="object-contain" src="/gogoboard.png" usemap="#image_map"/>
                <map name="image_map">
                    <area v-for="(area, index) in areas" :key="index" :alt="area.alt" :title="area.title" :coords="area.coords" :shape="area.shape" @click="handleAreaClick(index)" :class="{ 'selected-area': areaClicked === index }"/>
                </map>
            </div>

            <!-- Form container on 2nd column -->
            <div class="form-container md:container md:mx-auto max-w-sm mx-auto bg-slate-500">
                <!-- Assignment name -->
                <div class="mb-5 bg-slate-300 rounded-md p-8">
                    <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Assignment Name</label>
                    <input v-model="assignmentName" type="text" id="large-input" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <!-- Assignment Reference URL -->
                <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Reference Link</label>
                    <input v-model="ref_url" type="text" id="large-input" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </div>

                <!-- Assignment form -->
                <div class="mb-5 bg-slate-300 rounded-md p-8 overflow-scroll" className="instructionContainer">
                    <!-- Add form button -->
                    <div className="addInstructionButton" v-if="!formCreating">
                        <div v-for="[key] in steps" :key="key">
                            <div class="container mx-auto bg-slate-300 align-self: center;">
                                {{ getStepFunctionDetails(key) }}
                                <button v-on:click="openInstructionForm(key)">✏️</button>
                                <button v-on:click="deleteInstruction(key)">🗑️</button>
                                <button v-on:click="moveInstructionUp(key)">🔼</button>
                                <button v-on:click="moveInstructionDown(key)">🔽</button>
                            </div>
                        </div>
                        <button 
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" 
                            v-on:click="openInstructionForm(0)">
                            Create Instruction
                        </button>
                        <button 
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" 
                            v-on:click="submitAssignment">
                            Save Assignment
                        </button>
                    </div>
                    <!-- Instruction forms -->
                    <div className="instructionForm" class="overflow-auto" v-else>
                        <div class="mb-5">
                            <div>
                                Function
                            </div>
                            <select v-model="assignmentFunction">
                                <option selected disabled>Please choose...</option>
                                <option value="highlight">highlight</option>
                                <option value="context">context</option>
                                <option value="connect">connect</option>
                            </select>
                        </div>
                    
                        <!-- Component -->
                        <div class="mb-5" v-if="assignmentFunction !== 'context'">
                            <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Gogoboard's port
                            </label>
                            <input v-model="assignmentPort" type="text" id="base-input" 
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                        
                        <!-- Description -->
                        <div class="mb-5" v-if="assignmentFunction !== 'connect'">
                            <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Context
                            </label>
                            <input v-model="assignmentContext" type="textarea" id="small-input" 
                            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>

                        <!-- External Component -->
                        <div class="mb-5" v-if="assignmentFunction === 'connect'">
                            <div>
                                External Component
                            </div>
                            <select v-model="assignmentExternalComponent">
                                <option selected disabled>External Component</option>
                                <option value="leverSwitch">Lever Switch</option>
                                <option value="button">Button</option>
                                <option value="buttonSet">Button Set</option>
                                <option value="proximity">Proximity</option>
                                <option value="lightSensor">Light Sensor</option>
                                <option value="digitalTEMPSensor">Digital TEMP Sensor</option>
                                <option value="soilHumiditySensor">Soil Humidity Sensor</option>
                                <option value="biColorLED">Bi-color LED</option>
                                <option value="motorGear">Motor Gear</option>
                                <option value="plasticWheels">Plastic wheels</option>
                                <option value="servoMotor">Servo Motor</option>
                            </select>
                        </div>
                        
                        <!-- Buttons -->
                        <div class="mb-5">
                            <button 
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" 
                                @click="saveInstructionForm" :disabled="!isFormValid">Save</button>
                            <button @click="closeInstruction">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="columns-sm" v-else>
            <div className="url-appear">
                <div className="URL existed" v-if="mobileAppURL !== '' && mobileAppURL !== false ">
			<a v-bind:href="mobileAppURL">Here</a>
                </div>
                <div className="noURLDisplayed" v-else>
                    <p> 
                        This assignment didn't existed at the moment.
                        Please create url via mobile application or try again.
			<button v-on:click="getMobileAppURL()"> Re-fetch the URL</button>
			<br>
			{{ assignment_id }}
                    </p>
                </div>
            </div>
            <div className="side-menu">

            </div>
        </div>
    </div>
</template>

<script setup>
    import imgUrl from '/gogoboard.png'
</script>

<script>
import axios from 'axios';
import ImageMap from 'image-map';

export default {
    data() {
        return {
            assignment_id: null,
            areas: [
                { alt: 'output-4', title: 'output-4', coords: "603,175,743,294", shape: 'rect' },
                { alt: 'output-3', title: 'output-3', coords: "789,171,931,298", shape: 'rect' },
                { alt: 'output-2', title: 'output-2', coords: "972,171,1130,303", shape: 'rect' },
                { alt: 'output-1', title: 'output-1', coords: "1173,175,1323,305", shape: 'rect' },
                { alt: 'input-1', title: 'input-1', coords: "579,1601,767,1740", shape: 'rect' },
                { alt: 'input-2', title: 'input-2', coords: "774,1601,959,1746", shape: 'rect' },
                { alt: 'input-3', title: 'input-3', coords: "964,1603,1147,1742", shape: 'rect' },
                { alt: 'input-4', title: 'input-4', coords: "1156,1599,1340,1744", shape: 'rect' }
            ],
            areaClicked: null,
            formCreating: false,

            assignmentFunction: null,
            assignmentPort: null,
            assignmentContext: null,
            assignmentExternalComponent: null,

            currentIndex: 0,

            // POST datas
            assignmentName: "",
            ref_url: "",
            creator_id: "test12345",
            steps: new Map(),
            isExist: false,

            isAssignmentSubmit: false,
            mobileAppURL: ""
        };
    },
    methods: {
        // fetch assignment's detail
        getAssignmentDetail() {
            this.$http.get("/getassignment/" + this.assignment_id)
            .then(response => {
                const data = response.data;
                console.log(data);
                this.assignmentName = data.assignment_name;
                this.creator_mail = data.creator_email;
                this.steps = this.objectToMap(data.steps);

                console.log("fetched name as: " + this.assignmentName
                    + ", fetch creator's mail as : " + this.creator_mail);

                this.displayInstructions();
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        },
        // get subMap with Map's key as indicator on eaches.
        getSubValue(key, subKey) {
            if(this.steps.has(key)) {
                return this.steps.get(key).get(subKey);
            }
        },
        handleAreaClick(index) {
            this.assignmentPort = this.areas[index].alt;
            this.areaClicked = index;
        },

        // Manage Assignment's Instruction
        openInstructionForm(index) {
            this.currentIndex = index;
            this.formCreating = true;

            if(index > 0) {
                this.assignmentFunction = this.getSubValue(index, "function");
                this.assignmentPort = this.getSubValue(index, "port");
                this.assignmentContext = this.getSubValue(index, "context");
            }
        },
        closeInstruction() {
            this.formCreating = false;
            this.assignmentFunction = null;
            this.assignmentPort = null;
            this.assignmentContext = null;
            this.assignmentExternalComponent = null;

            this.currentIndex = 0;
        },
        saveInstructionForm() {
            var elementIndex = this.currentIndex;
            
            // create new subMap.
            if (elementIndex === 0) {
                elementIndex = this.getInstructionAmount() + 1;
            }

            let stepsInfo = new Map();
            stepsInfo.set("function", this.assignmentFunction);
            
            if(this.assignmentFunction === "highlight") {
                stepsInfo.set("component", this.assignmentPort);
                stepsInfo.set("context", this.assignmentContext);
            } else if (this.assignmentFunction === "connect") {
                stepsInfo.set("component", this.assignmentPort);
                stepsInfo.set("externalComponent", this.assignmentExternalComponent);
            } else {
                stepsInfo.set("context", this.assignmentContext);
            }

            // add map element
            this.steps.set(elementIndex, stepsInfo);
            
            // reset values in form.
            this.closeInstruction();
        },
        displayInstructions() {
            // display the map as object
            function mapToObject(map) {
                const out = {};
                map.forEach((value, key) => {
                    out[key] = value instanceof Map ? mapToObject(value) : value;
                });
                return out;
            }

            const stepsObject = mapToObject(this.steps);
            console.log(JSON.stringify({steps: stepsObject}, null, 2));
        },
        getInstructionAmount() {
            return this.steps.size;
        },
        // delete existing steps
        deleteInstruction(key) {
            this.steps.delete(key);
        },
        moveInstructionUp(key) {
            // the indicated key won't be the first and not the only one
            const entries = Array.from(this.steps.entries());
            const index = entries.findIndex(entry => entry[0] === key);
            if (index > 0) { // Ensure there is a previous item to swap with
                [entries[index], entries[index - 1]] = [entries[index - 1], entries[index]]; // Swap with previous
                this.steps = new Map(entries); // Convert array back to Map
                console.log("re-sorting");
            }
        },
        moveInstructionDown(key) {
            // the indicated key won't be the last and not the only one
            const entries = Array.from(this.steps.entries());
            const index = entries.findIndex(entry => entry[0] === key);

            if (index < entries.length - 1) { // Ensure there is a next item to swap with
                [entries[index], entries[index + 1]] = [entries[index + 1], entries[index]]; // Swap with next
                this.steps = new Map(entries); // Convert array back to Map
                console.log("re-sorting");
            }
        },
        submitAssignment() {
            // convert the "steps" map into nested object
            let stepsObject = {};
            this.steps.forEach((subMap, key) => {
                let subMapObject = {};
                subMap.forEach((value, subKey) => {
                    subMapObject[subKey] = value;
                });
                stepsObject[key] = subMapObject;
            });

            let data = JSON.stringify({
                "assignment_name": this.assignmentName,
                "creator_email": this.creator_mail,
                "ref_url": this.ref_url,
                "steps": stepsObject
            });

            // Edit the assignment in database.
            if(this.isExist) {
                this.$http.put("/modify/"+this.assignment_id, data)
                    .then(response => {
                        console.log("edited!", response.data);
                        this.getMobileAppURL();
                    })
                    .catch(error => {
                        console.error(error);
                    });    
            } else {

		this.$http.post("create", data)
                    .then(response => {
                        console.log("saved!", response.data);
			this.assignment_id = response.data;
                        this.getMobileAppURL();
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        },
        // Return them as text for overall displays.
        getStepFunctionDetails(index) {
            // Convert the step number to a string if it's passed as a number
            const step = this.steps.get(index);
            let stepInfo = "";
            if (step) {
                console.log(`Details of step ${index}:`);
                for (let [key, value] of step.entries()) {
                    stepInfo += `-${value}`;
                    console.log(`${key}: ${value}`);
                }

                return stepInfo;
            } else {
                console.log(`Step ${index} not found.`);
            }
        },
        objectToMap(obj) {
            const result = new Map();
            Object.keys(obj).forEach(key => {
                const value = obj[key];
                if (value && typeof value === 'object' && !Array.isArray(value) && value !== null) {
                result.set(key, this.objectToMap(value)); // Recursively convert nested objects
                } else {
                result.set(key, value);
                }
            });
            return result;
        },
        getMobileAppURL() {
            this.isAssignmentSubmit = true;
            this.$http.get('/getappurl/' + this.assignment_id)
                .then((response) => {
                    this.mobileAppURL = response.data;
		    console.log(this.mobileAppURL + " == " + response);
                })
                .catch((error) => {
                    console.log(error); 
                });
        },
        resizeImageMaps() {
            ImageMap('img[usemap]')
        }
    },
    computed: {
        isFormValid() {
            if(this.assignmentFunction === "highlight") {
                return (this.assignmentPort !== null) && (this.assignmentContext !== null);
            } else if (this.assignmentFunction === "connect") {
                return (this.assignmentPort !== null) && (this.assignmentExternalComponent !== null);
            } else if(this.assignmentFunction === "context") {
                return this.assignmentContext !== null;
            } else {
                return false;
            }
        }
    },
    mounted() {
        this.resizeImageMaps();
    },
    created() {
        if (this.$route.query.jsonData) {
            this.assignment_id = JSON.parse(this.$route.query.jsonData);
            this.getAssignmentDetail();
            this.isExist = true;
        }
    }
};
</script>

<style scoped>
area {
    display: block;
    background-color: #ff0000;
    fill: #ff0000;
}
</style>
