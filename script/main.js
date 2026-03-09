let selectedTab = "all-btn";


//----------------search bar----------------

const searchBar = document.getElementById("search-bar");

searchBar.addEventListener('input',(event)=>{
  const searchText = event.target.value.trim();

  if(searchText == ""){

    switchTab(selectedTab);
    loadIssues();
  }else{
    spinnerManager(true);
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`)
    .then(res=>res.json())
    .then(data=>{
      document.getElementById("all-issues").innerHTML = "";
      document.getElementById("open-issues").innerHTML = "";
      document.getElementById("closed-issues").innerHTML = "";
      displayIssues(data.data)
      totalIssues = data.data.length;

      document.getElementById("issue-count").innerText = `${totalIssues} Searched`;
    })
  }

})


//-----date and badge function
      function date(dateString) {
        const date = new Date(dateString);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      }
      function color(priority) {
        if (priority == "high") {
          return "bg-error/20 text-error";
        } else if (priority == "medium") {
          return "bg-warning/20 text-warning";
        } else if (priority == "low") {
          return "bg-neutral/20 text-neutral";
        }
      }


// ---------------load Modal---------------
const loadModal=async(id)=>{
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  
  displayModal(details.data);

}
// {
//     "id": 1,
//     "title": "Fix navigation menu on mobile devices",
//     "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//     "status": "open",
//     "labels": [
//         "bug",
//         "help wanted"
//     ],
//     "priority": "high",
//     "author": "john_doe",
//     "assignee": "jane_smith",
//     "createdAt": "2024-01-15T10:30:00Z",
//     "updatedAt": "2024-01-15T10:30:00Z"
// }
const displayModal = (data) =>{
  console.log(data)

  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
      <div id="modal-container" class="space-y-6">
      <h2 class="font-bold text-2xl">${data.title}</h2>
      <div class="flex gap-4">
          <span class="badge ${data.status == "open" ? "badge-success" : "badge-primary"} text-white rounded-full">${data.status}</span>
        <ul class="flex text-gray-400 text-sm">
          <li>• Opened by ${data.author}</li>
          <li>• ${date(data.createdAt)}</li>
        </ul>
      </div>
      <div>
        ${labelMaker(data.labels)}
      </div>
      <p class="text-gray-400">${data.description}</p>
      <div class="flex w-full p-4">
        <div class="w-full">
          <p class="text-gray-400">Assignee:</p>
          <h4 class="font-semibold">${data.assignee ? data.assignee : "Not Yet Assigned"}</h4>
        </div>
        <div class="w-full">
          <p class="text-gray-400">Priority:</p>
          <button class="px-3 rounded-full ${color(data.priority)}">${data.priority}</button>
        </div>
      </div>

    </div>
  `;
  document.getElementById("my_modal_5").showModal();
}
// ---------------spinner function---------------

const spinnerManager = (status) => {
  if(status==true){
    document.getElementById('spinner').classList.remove('hidden')
    document.getElementById("issues-container").classList.add("hidden");
  }else{
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("issues-container").classList.remove("hidden");
  }
};

//-------------make labels function--------------
const labelMaker = (label) => {
  const labelColors = (type) => {
    const colors = {
      bug: "badge px-3 rounded-full bg-error/20 text-error",
      enhancement: "badge px-3 rounded-full bg-success/20 text-success",
      "help wanted": "badge px-3 rounded-full bg-warning/20 text-warning",
      documentation:
        "badge px-3 rounded-full bg-primary/20 text-primary",
      "good first issue": "badge px-3 rounded-full bg-info/20 text-info",
    };
    return colors[type];
  };
  const labelIcon = (type) => {
    const icons = {
      bug: "fa-bug",
      enhancement: "fa-star",
      "help wanted": "fa-life-ring",
      documentation: "fa-clipboard",
      "good first issue": "fa-thumbs-up",
    };
    return icons[type];
  };

  const labelBadge = label.map(
    (el) =>
      `<span class="text-xs ${labelColors(el)}"><i class="fa-solid ${labelIcon(el)}"></i>${el.toUpperCase()}</span>`,
  );
  return labelBadge.join(" ");
};

//-------calculate and display total issues count----------


fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
  .then((response) => response.json())
  .then((data) => {
    totalIssues = data.data.length;
    if (selectedTab == "all-btn") {
      document.getElementById("issue-count").innerText = totalIssues;
    }
  });

// -------------- Tab Switching Function --------------
function switchTab(tab) {
  spinnerManager(true);
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((response) => response.json())
    .then((data) => {
      totalIssues = data.data.length;
      totalOpenIssues = data.data.filter(
        (issue) => issue.status === "open",
      ).length;
      totalClosedIssues = data.data.filter(
        (issue) => issue.status === "closed",
      ).length;
      if (selectedTab == "all-btn") {
        document.getElementById("issue-count").innerText = totalIssues;
      } else if (selectedTab == "open-btn") {
        document.getElementById("issue-count").innerText = totalOpenIssues;
      } else if (selectedTab == "closed-btn") {
        document.getElementById("issue-count").innerText = totalClosedIssues;
      }
      spinnerManager(false);
    });
  // const totalIssues = data.data.length();
  // console.log("issues: ",totalIssues);

  if (tab == "all-btn") {
    //btn color change
    const allBtn = document.getElementById("all-btn");
    allBtn.classList.remove("btn-outline");
    const openBtn = document.getElementById("open-btn");
    openBtn.classList.add("btn-outline");
    const closedBtn = document.getElementById("closed-btn");
    closedBtn.classList.add("btn-outline");

    //content change
    const allIssues = document.getElementById("all-issues");
    allIssues.classList.remove("hidden");
    const openIssues = document.getElementById("open-issues");
    openIssues.classList.add("hidden");
    const closedIssues = document.getElementById("closed-issues");
    closedIssues.classList.add("hidden");

    selectedTab = "all-btn";
  } else if (tab == "open-btn") {
    //btn color change
    const allBtn = document.getElementById("all-btn");
    allBtn.classList.add("btn-outline");
    const openBtn = document.getElementById("open-btn");
    openBtn.classList.remove("btn-outline");
    const closedBtn = document.getElementById("closed-btn");
    closedBtn.classList.add("btn-outline");

    //content change
    const allIssues = document.getElementById("all-issues");
    allIssues.classList.add("hidden");
    const openIssues = document.getElementById("open-issues");
    openIssues.classList.remove("hidden");
    const closedIssues = document.getElementById("closed-issues");
    closedIssues.classList.add("hidden");


    selectedTab = "open-btn";
    
  } else if (tab == "closed-btn") {
    //btn color change
    const allBtn = document.getElementById("all-btn");
    allBtn.classList.add("btn-outline");
    const openBtn = document.getElementById("open-btn");
    openBtn.classList.add("btn-outline");
    const closedBtn = document.getElementById("closed-btn");
    closedBtn.classList.remove("btn-outline");

    //content change
    const allIssues = document.getElementById("all-issues");
    allIssues.classList.add("hidden");
    const openIssues = document.getElementById("open-issues");
    openIssues.classList.add("hidden");
    const closedIssues = document.getElementById("closed-issues");
    closedIssues.classList.remove("hidden");

    selectedTab = "closed-btn";
  }
}

// -------------- Load issues cards --------------

const loadIssues = () => {
  spinnerManager(true)
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((response) => response.json())
    .then((data) => displayIssues(data.data));
};


const displayIssues = (issues) => {
  const allIssuesContainer = document.getElementById("all-issues");
  const openIssuesContainer = document.getElementById("open-issues");
  const closedIssuesContainer = document.getElementById("closed-issues");

  allIssuesContainer.innerHTML = "";
  openIssuesContainer.innerHTML = "";
  closedIssuesContainer.innerHTML = "";

  issues.forEach((issue) => {
    const issueCard = document.createElement("div");
    if (issue.status == "open") {
      issueCard.innerHTML = `
            <div onclick="loadModal(${issue.id})" class="card transition-transform duration-300 hover:scale-105 h-full shadow-slate-400 shadow-sm p-4 space-y-4 border-t-4 border-success bg-white">
                <div class="flex justify-between">
                    <img src="./assets/Open-Status.png" alt="">
                    <!-- <img src="./assets/Closed- Status .png" alt=""> -->
                    <button class="px-3 rounded-full ${color(issue.priority)}">${issue.priority}</button>
                </div>
                <h4 class="font-semibold">${issue.title}</h4>
                <p class="text-[#64748B] text-[14px]">${issue.description}</p>
                <div>
                    ${labelMaker(issue.labels)}
                    
                </div>
                <div class="flex flex-col justify-end h-full">
                  <hr class="border-[#E2E8F0] pt-4">
                  <div class="grid justify-between">
                    <p class="text-[#64748B] text-[14px]">#${issue.id} by ${issue.author}</p>
                    <p class="text-[#64748B] text-[14px]">${date(issue.createdAt)}</p>
                  </div>
                </div>
            </div>
        `;

      allIssuesContainer.appendChild(issueCard);
      const copy = issueCard.cloneNode(true);
      openIssuesContainer.appendChild(copy);
    } else if (issue.status == "closed") {
      issueCard.innerHTML = `
             <div onclick="loadModal(${issue.id})" class="card transition-transform duration-300 hover:scale-105 h-full shadow-slate-400 shadow-sm p-4 space-y-4 border-t-4 border-primary bg-white">
                <div class="flex justify-between">
                    <img src="./assets/Closed- Status .png" alt="">
                    <button class="px-3 rounded-full  ${color(issue.priority)}">${issue.priority}</button>
                </div>
                <h4 class="font-semibold">${issue.title}</h4>
                <p class="text-[#64748B] text-[14px]">${issue.description}</p>
                <div>
                    ${labelMaker(issue.labels)}
                    
                </div>
                
                <div class="flex flex-col justify-end h-full">
                  <hr class="border-[#E2E8F0] pt-4">
                  <div class="grid justify-between">
                    <p class="text-[#64748B] text-[14px]">#${issue.id} by ${issue.author}</p>
                    <p class="text-[#64748B] text-[14px]">${date(issue.createdAt)}</p>
                  </div>
                </div>
             </div>
        `;
      allIssuesContainer.appendChild(issueCard);
      const copy = issueCard.cloneNode(true);
      closedIssuesContainer.appendChild(copy);
    }
  });
  spinnerManager(false)
};

loadIssues();
console.log("selected tab: ", selectedTab);
