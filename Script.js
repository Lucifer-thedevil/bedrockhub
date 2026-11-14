// ADD YOUR FARMS HERE

const FARMS = [

    {
        name: "Compact Iron Farm",
        type: "Iron",
        version: "1.21+",
        size: "2 MB",
        description: "A compact iron farm for your survival world.",
        image: "images/iron-farm.jpg",
        file: "downloads/iron-farm.mcworld"
    },

    {
        name: "Fast Gold Farm",
        type: "Gold",
        version: "1.21+",
        size: "3 MB",
        description: "A gold farm for collecting resources and XP.",
        image: "images/gold-farm.jpg",
        file: ""
    },

    {
        name: "Auto Wheat Farm",
        type: "Crops",
        version: "1.21+",
        size: "1 MB",
        description: "An automatic wheat farm for survival players.",
        image: "",
        file: ""
    }

];


const filters = document.getElementById("filters");
const grid = document.getElementById("grid");
const search = document.getElementById("search");

let active = "All";


const categories = [
    "All",
    ...new Set(FARMS.map(farm => farm.type))
];


function render() {

    filters.innerHTML = categories.map(category => `
        <button
            class="${active === category ? "active" : ""}"
            data-category="${category}">
            ${category}
        </button>
    `).join("");


    const query = search.value.toLowerCase();

    const results = FARMS.filter(farm => {

        const matchesCategory =
            active === "All" || farm.type === active;

        const matchesSearch =
            farm.name.toLowerCase().includes(query);

        return matchesCategory && matchesSearch;

    });


    if (results.length === 0) {

        grid.innerHTML = `
            <p>No farms found. Try another search.</p>
        `;

        return;
    }


    grid.innerHTML = results.map(farm => {

        const available = farm.file !== "";

        const button = available
            ? `<a class="dl"
                 href="${farm.file}"
                 download>
                 DOWNLOAD WORLD ↓
               </a>`
            : `<span class="dl coming">
                 COMING SOON
               </span>`;


        return `

            <article class="card">

                ${
                    farm.image
                    ? `<img src="${farm.image}"
                           alt="${farm.name}"
                           loading="lazy">`
                    : `<div style="height:180px;
                         display:grid;
                         place-items:center;
                         background:#283729;
                         color:#75d66c;
                         font-weight:bold;">
                         ${farm.type} FARM
                       </div>`
                }

                <div class="card-body">

                    <h3>${farm.name}</h3>

                    <div class="meta">
                        ${farm.type} • Minecraft ${farm.version} • ${farm.size}
                    </div>

                    <p>${farm.description}</p>

                    ${button}

                </div>

            </article>

        `;

    }).join("");

}


filters.addEventListener("click", event => {

    if (event.target.tagName !== "BUTTON") return;

    active = event.target.dataset.category;

    render();

});


search.addEventListener("input", render);


render();