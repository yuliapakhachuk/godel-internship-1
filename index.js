const data = [
    {
        logo: "./images/figma.jpg",
        name: "Figma",
        link: "https://www.figma.com/",
        userTypeCard: "Visa",
        userCardNumber: "***** 2468",
        userName: "Itai Bracha",
        userEmail: "Itai Bracha31@gmail.com",
        lastTransactionDate: "Jan 12,2022",
        lastTransactionValue: "$783.22",
        status: "Done",
        endDate: "Aug 24,1991",
        totalUsed: "$1000.00"
    },
    {
        logo: "./images/adobe.jpg",
        name: "Adobe XD",
        link: "https://www.adobe.com/..",
        userTypeCard: "Visa",
        userCardNumber: "***** 2468",
        userName: "Itai Bracha",
        userEmail: "Itai Bracha31@gmail.com",
        lastTransactionDate: "Jan 2,2022",
        lastTransactionValue: "$783.22",
        status: "Done",
        endDate: "Jan 12,2022",
        totalUsed: "$783.22"
    },
    {
        logo: "./images/mailchimp.jpg",
        name: "Mailchimp ",
        link: "https://mailchimp.com/",
        userTypeCard: "Visa",
        userCardNumber: "***** 2468",
        userName: "Ron Wissley",
        userEmail: "Itai Bracha31@gmail.com",
        lastTransactionDate: "Jan 2,2022",
        lastTransactionValue: "$783.22",
        status: "Done",
        endDate: "Jan 12,2022",
        totalUsed: "$783.22"
    },
    {
        logo: "./images/wix.jpg",
        name: "WIX",
        link: "https://www.wix.com/",
        userTypeCard: "Visa",
        userCardNumber: "***** 2468",
        userName: "Minerva McGounuale",
        userEmail: "kitty@gmail.com",
        lastTransactionDate: "Jan 12,2022",
        lastTransactionValue: "$783.22",
        status: "Pending",
        endDate: "Jun 2,2022",
        totalUsed: "$83.22"
    },
    {
        logo: "./images/youtube.jpg",
        name: "Youtube",
        link: "https://www.youtube.com/",
        userTypeCard: "Visa",
        userCardNumber: "***** 2468",
        userName: "Harry Potter",
        userEmail: "Harry Potter31@gmail.com",
        lastTransactionDate: "Jan 12,2022",
        lastTransactionValue: "$783.22",
        status: "Done",
        endDate: "Oct 12,2021",
        totalUsed: "$83.22"
    },
    {
        logo: "./images/youtube.jpg",
        name: "Youtube",
        link: "https://www.youtube.com/",
        userTypeCard: "Visa",
        userCardNumber: "***** 2468",
        userName: "Harry Potter",
        userEmail: "Harry Potter31@gmail.com",
        lastTransactionDate: "Jan 2,2022",
        lastTransactionValue: "$783.22",
        status: "In Progress",
        endDate: "Jan 12,2022",
        totalUsed: "$711.67"
    },
    {
        logo: "./images/wix.jpg",
        name: "WIX",
        link: "https://www.wix.com/",
        userTypeCard: "Visa",
        userCardNumber: "***** 2468",
        userName: "Albus Dambldore",
        userEmail: "perselvall31@gmail.com",
        lastTransactionDate: "Jan 12,2022",
        lastTransactionValue: "$783.22",
        status: "Pending",
        endDate: "Jun 2,2022",
        totalUsed: "$783.22"
    },

];

const refs = {
    tableBody: document.querySelector('.table__body'),
    searchInput: document.querySelector(".search"),
    employeeFilter: document.querySelector(".employee__filter"),
    statusFilter: document.querySelector("#status"),
    firstDateInput: document.querySelector('.first__date'),
    lastDateInput: document.querySelector('.last__date'),
    sortInput: document.querySelector('.sort__type'),
    switchBtn: document.querySelector('.switch__btn')
}

const statusList = Array.from(new Set(data.map(item => item.status)));

refs.tableBody.innerHTML = createTableHTML(data);
refs.statusFilter.innerHTML = createListHTML(statusList);

function createListHTML(data) { 
    return "<option value=''>Status</option>" +
        data.map(elem => `<option value="${elem}">${elem}</option>`).join("");
}

function createTableHTML(data) { 
    return  data.map(data => 
        `
            <tr class="table__row main">
                <td rowspan="2">
                    <input type="checkbox" class="check">
                </td>    
                <td rowspan="2" class="favicon">
                    <div class="icon"> 
                        <img src= ${data.logo} alt="">
                    </div>    
                </td>    
                <td class="doctitle">${data.name}</td>
                <td class="card__type">${data.userTypeCard}</td>
                <td class="user__name">${data.userName}</td>
                <td class="last-trans-date">${data.lastTransactionDate}</td>
                <td rowspan="2" class="status">
                    <div class="getstatus ${data.status === "Done" ? "green" : "yellow"}">
                        <div class="pointer"></div>
                        <span class="status__value">${data.status}</span>
                    </div>    
                </td>    
                <td rowspan="2" class="end__data">${data.endDate}</td>
                <td rowspan="2" class="totalsum">${data.totalUsed}</td>
                <td rowspan="2">
                    <div class="dots">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>    
                </td>    
            </tr>    
            <tr class="table__row secondary">
                <td class="secondary__data">${data.link}</td>
                <td class="secondary__data">${data.userCardNumber}</td>
                <td class="secondary__data">${data.userEmail}</td>
                <td class="secondary__data">${data.lastTransactionValue}</td>
            </tr>    
        `
    )    
        .join('');
}    

const values = { 
    name: "",
    status: "",
    userName: "",
    firstDate: "",
    lastDate: "",
}

let timer;
let FILTRED_DATA = data;
let SORTED_DATA = data;

function changeField(fieldName, value) { 
    values[fieldName] = value;
    if (timer) {
        clearTimeout(timer) } 
    timer = setTimeout(() => filterTable(data), 0);
}


function filterTable(data) {

    const regexpName = new RegExp(values.name, 'gi');
    const regexpStatus = new RegExp(values.status, 'gi');
    const regexpUserName = new RegExp(values.userName, 'gi');
    const timeOfSet = new Date().getTimezoneOffset() * 60000;
    const firstDate = new Date(values.firstDate).getTime() + timeOfSet;
    const lastDate = new Date(values.lastDate).getTime() + timeOfSet;

    const filtredData = data.filter(row => {
        const dataEndDate = new Date(row.endDate).getTime();
        return row.name.match(regexpName) &&
            row.status.match(regexpStatus) &&
            row.userName.match(regexpUserName) &&
            (isNaN(firstDate) || firstDate <= dataEndDate) &&
            (isNaN(lastDate) || dataEndDate <= lastDate);
    });

    FILTRED_DATA = filtredData;
    displayMatches(filtredData);
    // sortTable();
    refs.switchBtn.classList.contains("rotate") ? switchSortDirection() : sortTable()
}


function sortTable() { 
    switch(refs.sortInput.value) {
        case 'name': 
            SORTED_DATA = FILTRED_DATA.sort((a, b) => a.name.localeCompare(b.name));
            displayMatches(SORTED_DATA);
            break;
        case 'status':
            SORTED_DATA = FILTRED_DATA.sort((a, b) => a.status.localeCompare(b.status));
            displayMatches(SORTED_DATA);
            break;
        case 'user': 
            SORTED_DATA = FILTRED_DATA.sort((a, b) => a.userName.localeCompare(b.userName));
            displayMatches(SORTED_DATA);
            break;
        case 'date':
            SORTED_DATA = FILTRED_DATA.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
            displayMatches(SORTED_DATA);
            break;
        case 'total used':
            SORTED_DATA = FILTRED_DATA.sort((a, b) =>
                Number.parseFloat((a.totalUsed).slice(1, a.totalUsed.length)) - Number.parseFloat((b.totalUsed).slice(1, b.totalUsed.length)))
            displayMatches(SORTED_DATA);
            break;
        case '':
            
            filterTable(data);
            break;
    }
}

function switchSortDirection() { 
    switch(refs.sortInput.value) {
        case 'name': 
            SORTED_DATA = FILTRED_DATA.sort((a, b) => b.name.localeCompare(a.name));
            displayMatches(SORTED_DATA);
            break;
        case 'status':
            SORTED_DATA = FILTRED_DATA.sort((a, b) => b.status.localeCompare(a.status));
            displayMatches(SORTED_DATA);
            break;
        case 'user':
            SORTED_DATA = FILTRED_DATA.sort((a, b) => b.userName.localeCompare(a.userName));
            displayMatches(SORTED_DATA);
            break;
        case 'date':
            SORTED_DATA = FILTRED_DATA.sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime());
            displayMatches(SORTED_DATA);
            break;
        case 'total used':
            SORTED_DATA = FILTRED_DATA.sort((a, b) =>
                    Number.parseFloat((b.totalUsed).slice(1, b.totalUsed.length)) - Number.parseFloat((a.totalUsed).slice(1, a.totalUsed.length)))
            displayMatches(SORTED_DATA);
            break;
        case '':
            filterTable(data);
            break;
    }
}

function displayMatches(data) { 
    const newTable = createTableHTML(data);
    refs.tableBody.innerHTML = newTable;
}

//Event listners:
refs.statusFilter.addEventListener('input', (e) => changeField("status", e.target.value));
refs.searchInput.addEventListener('input', (e) => changeField("name", e.target.value));
refs.employeeFilter.addEventListener('input', (e) => changeField("userName", e.target.value));
refs.firstDateInput.addEventListener('input', (e) => changeField("firstDate", e.target.value));
refs.lastDateInput.addEventListener('input', (e) => changeField("lastDate", e.target.value));
refs.sortInput.addEventListener('input', () => sortTable());

refs.switchBtn.addEventListener('click', () => {
    refs.switchBtn.classList.toggle("rotate")
    refs.switchBtn.classList.contains("rotate") ? switchSortDirection() : sortTable()});
