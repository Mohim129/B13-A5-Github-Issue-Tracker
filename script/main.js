// calculate and display total issues count----------
let selectedTab = "all-btn";

fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
  .then((response) => response.json())
    .then((data) => {
      totalIssues = data.data.length;
      if (selectedTab == "all-btn") {
        document.getElementById("issue-count").innerText = totalIssues;
      } 
      }
    );





// -------------- Tab Switching Function --------------
function switchTab(tab) {
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
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((response) => response.json())
    .then((data) => displayIssues(data.data));
};

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

const displayIssues = (issues) => {
  // console.log(issues);
  const allIssuesContainer = document.getElementById("all-issues");
  const openIssuesContainer = document.getElementById("open-issues");
  const closedIssuesContainer = document.getElementById("closed-issues");

  issues.forEach((issue) => {
    const issueCard = document.createElement("div");
    if (issue.status == "open") {
      issueCard.innerHTML = `
            <div class="card transition-transform duration-300 hover:scale-105 h-full shadow-lg p-4 space-y-4 border-t-4 border-success bg-white">
                <div class="flex justify-between">
                    <img src="./assets/Open-Status.png" alt="">
                    <!-- <img src="./assets/Closed- Status .png" alt=""> -->
                    <button class="px-3 rounded-full bg-error/20 text-error">${issue.priority}</button>
                </div>
                <h4 class="font-semibold">${issue.title}</h4>
                <p class="text-[#64748B] text-[14px]">${issue.description}</p>
                <div>
                    <div class=" btn px-3 rounded-full bg-error/20 text-error"><i class="fa-solid fa-bug"></i>Bug</div>
                    <div class="btn px-3 rounded-full bg-warning/20 text-warning"><i class="fa-regular fa-life-ring"></i>Help Wanted</div>
                    
                </div>
                <div class="flex flex-col justify-end h-full">
                  <hr class="border-[#E2E8F0] pt-4">
                  <div class="grid justify-between">
                    <p class="text-[#64748B] text-[14px]">#${issue.id} by ${issue.author}</p>
                    <p class="text-[#64748B] text-[14px]">1/15/2024</p>
                  </div>
                </div>
            </div>
        `;

        allIssuesContainer.appendChild(issueCard);
        const copy = issueCard.cloneNode(true);
        openIssuesContainer.appendChild(copy);
    }
    else if(issue.status == "closed"){
        issueCard.innerHTML = `
                    <div class="card transition-transform duration-300 hover:scale-105 h-full shadow-lg p-4 space-y-4 border-t-4 border-primary bg-white">
                <div class="flex justify-between">
                    <img src="./assets/Closed- Status .png" alt="">
                    <button class="px-3 rounded-full bg-error/20 text-error">${issue.priority}</button>
                </div>
                <h4 class="font-semibold">${issue.title}</h4>
                <p class="text-[#64748B] text-[14px]">${issue.description}</p>
                <div>
                    <div class=" btn px-3 rounded-full bg-error/20 text-error"><i class="fa-solid fa-bug"></i>Bug</div>
                    <div class="btn px-3 rounded-full bg-warning/20 text-warning"><i class="fa-regular fa-life-ring"></i>Help Wanted</div>
                    
                </div>
                
                <div class="flex flex-col justify-end h-full">
                  <hr class="border-[#E2E8F0] pt-4">
                  <div class="grid justify-between">
                    <p class="text-[#64748B] text-[14px]">#${issue.id} by ${issue.author}</p>
                    <p class="text-[#64748B] text-[14px]">1/15/2024</p>
                  </div>
                </div>
            </div>
        `;
        allIssuesContainer.appendChild(issueCard);
        const copy = issueCard.cloneNode(true);
        closedIssuesContainer.appendChild(copy);
    }

    
  });
};
 

loadIssues();
console.log("selected tab: ", selectedTab);