// let navbar = document.getElementById("navbar")
// let hamburger = document.getElementById("hamburger")
// hamburger.addEventListener("click",(e)=>{
//     navbar.style.display = "none"
// })
function displayLastFiveEntries(entries) {
    const tableBody = document.getElementById('membershipTable').querySelector('tbody');
    tableBody.innerHTML = ''; // Clear any existing rows

    entries.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.id}</td>
            <td>${entry.name}</td>
            <td>${entry.gmail}</td>
            <td>${entry.whatsapp}</td>
            <td>${entry.membership_date}</td>
            <td>${entry.expiry}</td>
        `;
        tableBody.appendChild(row);
    });
}


let yValue = Array(12).fill(0); // Initialize an array with 12 zeros

function addMonth(month) {
    // Increment the value for the given month
    if (month >= 0 && month < 12) {
        yValue[month]++;
    }
}

function getExpiredMemberships(data) {
    const today = new Date();
    return data.filter(member => {
        const expiryDate = new Date(member.expiry);
        return expiryDate < today;
    });
}

function getPrice(r) {
    let price = 0;
    for (i = 0; i < r.length; i++) {
        // console.log(price)
        price += Number(r[i]["fees_paid"])
    }
    return price
}

function isMembershipExpiringSoon(expiryDate) {
    // Parse the expiry date string into a Date object
    const expiryDateObj = new Date(expiryDate);

    // Check if the expiry date is a valid date
    if (isNaN(expiryDateObj.getTime())) {
        console.error('Invalid expiry date');
        return false;
    }

    // Get the current date
    const currentDate = new Date();

    // Calculate the difference in time between the expiry date and current date
    const timeDifference = expiryDateObj - currentDate;

    // Calculate the difference in days
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    // Check if the expiry is within 30, 15, 10, or 3 days
    if ((daysDifference <= 30 && daysDifference >= 0) ||
        (daysDifference <= 15 && daysDifference >= 0) ||
        (daysDifference <= 10 && daysDifference >= 0) ||
        (daysDifference <= 3 && daysDifference >= 0)) {
        return true;
    }

    // Check if the expiry date is within the current month
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const expiryMonth = expiryDateObj.getMonth();
    const expiryYear = expiryDateObj.getFullYear();

    if (expiryMonth === currentMonth && expiryYear === currentYear) {
        return true;
    }

    // If neither condition is met, return false
    return false;
}



fetch(`${window.location.origin}/memberApi`)
    .then(data => data.json())
    .then(r => {
        let total_Pending = document.getElementById('total-Pending')
        let z = r.filter((f, i) => {
            return f["status"] === "Pending"
        })
        total_Pending.textContent = z.length - 1 + '🔴'


        let totalMembers = document.getElementById("totalMembers");
        totalMembers.innerHTML = "🪪" + r.length;

        const expiredMemberships = getExpiredMemberships(r);
        let totalExpiries = document.getElementById("totalExpiries");
        totalExpiries.innerHTML = "🕰️" + expiredMemberships.length;

        const totalPrice = document.getElementById("totalPrice")
        //  totalPrice.innerHTML = `********`
        function getRevenueByDuration(data, duration) {
            const now = new Date();
            let total = 0;

            data.forEach(entry => {
                const date = new Date(entry.membership_date);
                const paid = Number(entry.fees_paid) || 0;

                const diffTime = now - date;
                const diffDays = diffTime / (1000 * 60 * 60 * 24);

                switch (duration) {
                    case '1w':
                        if (diffDays <= 7) total += paid;
                        break;
                    case '1m':
                        if (diffDays <= 30) total += paid;
                        break;
                    case '2m':
                        if (diffDays <= 60) total += paid;
                        break;
                    case '6m':
                        if (diffDays <= 180) total += paid;
                        break;
                    case '1y':
                        if (diffDays <= 365) total += paid;
                        break;
                    case 'others':
                        if (diffDays > 365) total += paid;
                        break;
                    case 'total':
                    default:
                        total += paid;
                        break;
                }
            });

            return total;
        }
        let revenueFilter = document.getElementById("revenueFilter");
        revenueFilter.addEventListener("change", (e) => {
            const selected = e.target.value;
            const revenue = getRevenueByDuration(r, selected);
            totalPrice.style.fontWeight = "600"
            totalPrice.textContent = `${revenue} Rs only`;
        });


        //    let showFess = document.getElementById("showFess")
        //    showFess.addEventListener("click",(e)=>{
        //     if(e.target.value == "Show password")
        //     {
        //         e.target.value = "Hide password"
        //      totalPrice.innerHTML = getPrice(r)+" Rs only"
        //     }else{
        //         e.target.value = "Show password"
        //      totalPrice.innerHTML = `*******`
        //     }

        //    })
        let xValue = [];
        let barColors = [
            "#FF5733", "#33FF57", "#3357FF", "#F0F33F", "#FF33F6", "#33FFF0",
            "#F4A742", "#4A90E2", "#E94E77", "#B5E8E0", "#D4E157", "#E67E22"
        ];

        let yValue = Array(12).fill(0); // ✅ Initialize an array of 12 zeros

        function addMonth(month) {
            if (month >= 0 && month < 12) {
                yValue[month]++;
            }
        }

        let now = new Date();
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        // Populate xValue with month names
        for (let i = 0; i < 12; i++) {
            xValue[i] = monthNames[i];
        }

        // This block should be run after fetching `r` (your data)
        fetch(`${window.location.origin}/memberApi`)
            .then(data => data.json())
            .then(r => {
                let allDate = r.map(member => member.membership_date);
                let year = now.getFullYear();

                for (let i = 0; i < allDate.length; i++) {
                    let mon = new Date(allDate[i]);
                    if (mon.getFullYear() === year) {
                        let monthIndex = mon.getMonth();
                        if (monthIndex <= now.getMonth()) {
                            addMonth(monthIndex);
                        }
                    }
                }

                // Adjust colors based on yValue
                for (let i = 0; i < yValue.length; i++) {
                    if (yValue[i] < 5) {
                        barColors[i] = "tomato";
                    }
                }

                // Create the chart
                new Chart("myChart", {
                    type: "bar",
                    data: {
                        labels: xValue,
                        datasets: [{
                            backgroundColor: barColors,
                            data: yValue
                        }]
                    },
                    options: {
                        legend: { display: false },
                        title: {
                            display: true,
                            text: `Member per Month in ${now.getFullYear()}`
                        }
                    }
                });
            });

        const oneMonth = [];
        const threeMonths = [];
        const sixMonths = [];
        const oneYear = [];
        // Function to categorize membership
        function categorizeMembership(member) {
            const duration = member;

            switch (duration) {
                case '1-month':
                    oneMonth.push(member);
                    break;
                case '3-months':
                    threeMonths.push(member);
                    break;
                case '6-months':
                    sixMonths.push(member);
                    break;
                case '1-year':
                    oneYear.push(member);
                    break;
                default:
                //   console.log('Unknown membership duration:', duration);
            }
        }

        for (i = 0; i < r.length; i++) {
            categorizeMembership(r[i]["membership_duration"])
        }



        const xValues = ["1 Month", "3 Month", "6 Month", "1 Year"];
        const yValues = [oneMonth.length, threeMonths.length, sixMonths.length, oneYear.length];
        const DarColors = [
            "#b91d47",
            "#00aba9",
            "#2b5797",
            "#e8c3b9",

        ];
        // console.log(r[0])
        // Create a glowing effect plugin for doughnut chart with purple glow
        Chart.plugins.register({
            beforeDraw: function (chartInstance) {
                const ctx = chartInstance.chart.ctx;
                ctx.save();

                chartInstance.data.datasets.forEach(function (dataset, i) {
                    const meta = chartInstance.getDatasetMeta(i);
                    if (!meta.hidden) {
                        meta.data.forEach(function (element) {
                            ctx.save();
                            ctx.shadowColor = "rgba(128, 0, 128, 0.8)"; // Purple glow color
                            ctx.shadowBlur = 25; // Amount of glow
                            ctx.shadowOffsetX = 0;
                            ctx.shadowOffsetY = 0;

                            // Drawing the glowing effect for each segment
                            ctx.beginPath();
                            ctx.arc(element._model.x, element._model.y, element._model.outerRadius, element._model.startAngle, element._model.endAngle);
                            ctx.arc(element._model.x, element._model.y, element._model.innerRadius, element._model.endAngle, element._model.startAngle, true);
                            ctx.closePath();
                            ctx.fillStyle = element._model.backgroundColor;
                            ctx.fill();
                            ctx.restore();
                        });
                    }
                });

                ctx.restore();
            }
        });

        // Configuration for doughnut chart with glowing effect
        new Chart("myChart2", {
            type: "doughnut",
            data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: DarColors,
                    data: yValues
                }]
            },
            options: {
                title: {
                    display: true,
                    text: "Membership duration"
                }
            }
        });


        const pValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        let qValues = []
        const membershipCounts = {
            'January': 0,
            'February': 0,
            'March': 0,
            'April': 0,
            'May': 0,
            'June': 0,
            'July': 0,
            'August': 0,
            'September': 0,
            'October': 0,
            'November': 0,
            'December': 0
        };

        // Function to categorize membership dates
        r.forEach(member => {
            // console.log(member["membership_date"])
            const date = new Date(member["membership_date"]);
            const month = date.toLocaleString('default', { month: 'long' }); // Get month name
            membershipCounts[month]++;

        });


        qValues = [
            Number(membershipCounts["January"]),
            Number(membershipCounts["February"]),
            Number(membershipCounts["March"]),
            Number(membershipCounts["April"]),
            Number(membershipCounts["May"]),
            Number(membershipCounts["June"]),
            Number(membershipCounts["July"]),
            Number(membershipCounts["August"]),
            Number(membershipCounts["September"]),
            Number(membershipCounts["October"]),
            Number(membershipCounts["November"]),
            Number(membershipCounts["December"])
        ];

        // console.log(qValues)
        const minY = Math.min(...qValues);
        const maxY = Math.max(...qValues);

        // Transforming pValues and qValues into xyValues format
        const xyValues = pValues.map((p, index) => {
            return { x: p, y: qValues[index] };
        });

        // Create a glowing effect plugin for scatter chart
        Chart.plugins.register({
            beforeDraw: function (chartInstance) {
                const ctx = chartInstance.chart.ctx;
                ctx.save();

                chartInstance.data.datasets.forEach(function (dataset, i) {
                    const meta = chartInstance.getDatasetMeta(i);
                    if (!meta.hidden) {
                        meta.data.forEach(function (element) {
                            ctx.save();
                            ctx.shadowColor = "rgba(0, 0, 255, 0.8)"; // Color of the glow
                            ctx.shadowBlur = 10; // Amount of glow
                            ctx.shadowOffsetX = 0;
                            ctx.shadowOffsetY = 0;

                            // Drawing the glowing circle
                            ctx.beginPath();
                            ctx.arc(element._model.x, element._model.y, element._model.radius, 0, Math.PI * 2, false);
                            ctx.fillStyle = element._model.backgroundColor;
                            ctx.fill();
                            ctx.restore();
                        });
                    }
                });

                ctx.restore();
            }
        });

        // Configuration for scatter chart with glowing effect
        new Chart("myChart3", {
            type: "scatter",
            data: {
                datasets: [{
                    pointRadius: 4,
                    pointBackgroundColor: "rgb(0,0,255)", // Color of the points
                    data: xyValues // Data for scatter points
                }]
            },
            options: {
                title: {
                    display: true,
                    text: "Members Per Month Scatter"
                },
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            min: 1,
                            max: 12
                        },
                        scaleLabel: {
                            display: true,
                            labelString: "Current Year" // Label for the x-axis
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            min: minY, // Dynamic minimum value
                            max: maxY  // Dynamic maximum value
                        },
                        scaleLabel: {
                            display: true,
                            labelString: "Members Per Month" // Label for the y-axis
                        }
                    }]
                }
            }
        });



        // Function to display the data in the table
        let slicedata = r

        const lastFiveEntries = slicedata.slice(-5);

        // Display the last five entries in the table
        displayLastFiveEntries(lastFiveEntries);


    });

let entryCount = document.getElementById("entryCount")
entryCount.addEventListener("input", (e) => {
    fetch(`${window.location.origin}/memberApi`).then(data => data.json()).then((r) => {

        if (e.target.value > 0 && e.target.value <= r.length) {
            let slicedata = r

            const lastFiveEntries = slicedata.slice(-e.target.value);
            document.getElementById("entry").innerHTML = "Last " + e.target.value + " MemberShip Entry"
            displayLastFiveEntries(lastFiveEntries);
        }

    })
});
let copy = document.getElementById("copy")
copy.style.display = "none"
let getWhatsappReminder = document.getElementById("getWhatsappReminder")
getWhatsappReminder.addEventListener("click", (e) => {
    copy.style.display = "inline"
    fetch(`${window.location.origin}/memberApi`).then(data => data.json()).then((r) => {

        let arr = []
        for (i = 0; i < r.length; i++) {
            if (isMembershipExpiringSoon(r[i]["expiry"])) {
                arr.push("+91" + r[i]["whatsapp"])
            }
        }
        document.getElementById("reminderDisplay").innerHTML = arr.join(",");
    })
});

function copyIt() {
    // Get the text element
    copy.style.backgroundColor = "#333333"
    var text = document.getElementById("reminderDisplay").innerText;

    // Create a temporary input element to copy the text
    var tempInput = document.createElement("input");
    tempInput.value = text;
    document.body.appendChild(tempInput);

    // Select the text and copy it
    tempInput.select();
    document.execCommand("copy");

    // Remove the temporary input element
    document.body.removeChild(tempInput);

    // Show feedback message
    // document.getElementById("commaNumber").innerText = "Text copied to clipboard!";

    copy.style.display = "none"

    document.getElementById("reminderDisplay").innerHTML = 'whatsapp number Copied to Clipboard';
}

const backup = document.getElementById('backup');

backup.addEventListener('click', async (e) => {
    try {
        console.log("Backup button clicked");

        // Disable the button to prevent multiple clicks
        e.target.disabled = true;
        e.target.textContent = "Processing...";

        const response = await fetch('/backup');
        const result = await response.json();

        if (result.flag) {
            alert("✅ Backup completed successfully!");
        } else {
            alert("⚠️ Backup already performed recently. Try again in 1 hour.");
        }

    } catch (err) {
        console.error("Error while performing backup:", err);
        alert("❌ Something went wrong. Please try again later.");
    } finally {
        // Re-enable the button
        e.target.disabled = false;
        e.target.textContent = "Send Backup";
    }
});
