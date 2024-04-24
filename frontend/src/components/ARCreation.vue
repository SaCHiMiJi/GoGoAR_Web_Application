<template>
    <div class="items-center">
        <div class="columns-sm">
            <!-- Image container on 1st column -->
            <div class="img-container">
                <img class="object-contain" src="../assets/gogoboard.png" usemap="#image_map"/>
                <map name="image_map">
                    <area v-for="(area, index) in areas" :key="index" :alt="area.alt" :title="area.title" :coords="area.coords" :shape="area.shape" @click="handleAreaClick(index)" :class="{ 'selected-area': areaClicked === index }"/>
                </map>
            </div>
            <!-- Form container on 2nd column -->
            <div class="form-container md:container md:mx-auto">
                <div class="max-w-sm mx-auto">
                    <!-- Assignment name -->
                    <div class="mb-5 bg-slate-300 rounded-md p-8">
                        <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content name</label>
                        <input type="text" id="large-input" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                    <!-- Assignment form -->
                    <div class="mb-5 bg-slate-300 rounded-md p-8" className="instructionContainer">
                        <!-- Add form button -->
                        <div className="addInstructionButton" v-if="formCreating">
                            <button class="bg-slate-300 w-auto" v-on:click="formCreating = false"> AY</button>
                        </div>
                        <!-- Instruction forms -->
                        <div className="instructionForm" v-else>
                            <div class="mb-5">
                                <input type="button" id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                                    functions
                                    <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                                </svg>
                            </button>
                            
                            <!-- Dropdown menu -->
                            <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                    <li>
                                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                                    </li>
                                    <li>
                                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                                    </li>
                                    <li>
                                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                                    </li>
                                    <li>
                                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="mb-5">
                            <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gogoboard's port</label>
                            <input v-model="arComp" type="text" id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                        
                        <div class="mb-5">
                            <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <input type="text" id="small-input" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>

                            <div class="mb-5">
                                <button v-on:click="formCreating = true">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import 'image-map-resizer';
import '../js/imageMapResizer.min.js';

export default {
    data() {
        return {
            arComp: null,
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
            formCreating: true,

            assignmentFunction: "",
            assignmentPort: "",
            assignmentContext: "",

            // POST datas
            assignmentName: "",
            creator_mail: "apachara2@gmail.com",
            steps: new Map()
        };
    },
    methods: {
        handleAreaClick(index) {
            console.log(this.areas[index].alt);
            this.arComp = this.areas[index].alt;
            this.areaClicked = index;
        },
        openInstructionForm() {
            formCreating = true;
        },
        cancelInstruction() {
            formCreating = false;
        },
        saveInstructionForm() {
            formCreating = false;
        },
        displaySteps() {
            console.log(steps.entries());
        }
    },
    mounted() {
        imageMapResize();
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