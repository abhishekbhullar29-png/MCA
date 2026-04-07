document.addEventListener("DOMContentLoaded", function () {
    const teams = [
        { name: "CSK", matches: 10, won: 7, lost: 3, nr: 0, points: 14, nrr: "+0.85", form: "WWLWW" },
        { name: "MI", matches: 10, won: 6, lost: 4, nr: 0, points: 12, nrr: "+0.65", form: "WLWWW" },
        { name: "RCB", matches: 10, won: 5, lost: 5, nr: 0, points: 10, nrr: "+0.10", form: "LWLWW" },
        { name: "KKR", matches: 10, won: 6, lost: 4, nr: 0, points: 12, nrr: "+0.45", form: "WWWLL" },
        { name: "SRH", matches: 10, won: 4, lost: 6, nr: 0, points: 8, nrr: "-0.20", form: "LLWLW" },
        { name: "DC", matches: 10, won: 3, lost: 7, nr: 0, points: 6, nrr: "-0.50", form: "LLLWW" },
        { name: "GT", matches: 10, won: 5, lost: 5, nr: 0, points: 10, nrr: "+0.30", form: "WLWLW" },
        { name: "RR", matches: 10, won: 7, lost: 3, nr: 0, points: 14, nrr: "+0.90", form: "WWWWW" }
    ];

    const orangeCap = [
        { player: "Faf du Plessis", team: "RCB", runs: 520, avg: 52.0, sr: 140.5 },
        { player: "Shubman Gill", team: "GT", runs: 480, avg: 48.0, sr: 135.2 },
        { player: "Ruturaj Gaikwad", team: "CSK", runs: 460, avg: 46.0, sr: 138.1 },
        { player: "Ishan Kishan", team: "MI", runs: 430, avg: 43.0, sr: 142.0 },
        { player: "Devdutt Padikkal", team: "RR", runs: 400, avg: 40.0, sr: 134.8 }
    ];

    const purpleCap = [
        { player: "Rashid Khan", team: "GT", wickets: 18, eco: 6.8, best: "4/22" },
        { player: "Jasprit Bumrah", team: "MI", wickets: 17, eco: 7.1, best: "3/15" },
        { player: "Shardul Thakur", team: "CSK", wickets: 16, eco: 7.0, best: "4/28" },
        { player: "Yuzvendra Chahal", team: "RCB", wickets: 15, eco: 7.2, best: "3/19" },
        { player: "Kagiso Rabada", team: "DC", wickets: 14, eco: 7.5, best: "3/25" }
    ];

    function renderPointsTable() {
        const tbody = document.getElementById("pointsTableBody");
        tbody.innerHTML = "";
        teams.sort((a,b)=>b.points-a.points);
        teams.forEach((team,index)=>{
            const nrrValue=parseFloat(team.nrr)||0;
            tbody.innerHTML+=`<tr>
                <td>${index+1}</td>
                <td>${team.name}</td>
                <td>${team.matches}</td>
                <td>${team.won}</td>
                <td>${team.lost}</td>
                <td>${team.nr}</td>
                <td>${team.points}</td>
                <td>${nrrValue.toFixed(2)}</td>
                <td>${team.form}</td>
            </tr>`;
        });
        document.getElementById("topTeam").innerText=teams[0].name;
        document.getElementById("playoffCount").innerText=teams.filter(t=>t.points>=10).length;
        document.getElementById("lastUpdated").innerText=new Date().toLocaleTimeString();
    }

    function renderTeamChart(){
        const ctx=document.getElementById("teamPerformanceChart");
        new Chart(ctx,{type:"bar",data:{labels:teams.map(t=>t.name),datasets:[{label:"Points",data:teams.map(t=>t.points),backgroundColor:["#FF5733","#33FF57","#3357FF","#FF33A8","#FFC300","#DAF7A6","#8E44AD","#FF8C00"]}]},options:{responsive:true,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true}}}});
    }

    function renderLeaders(){
        const orangeTbody=document.getElementById("orangeCapList");
        orangeTbody.innerHTML="";
        orangeCap.forEach((p,i)=>{orangeTbody.innerHTML+=`<tr>
            <td>${i+1}</td><td>${p.player}</td><td>${p.team}</td><td>${p.runs}</td><td>${p.avg}</td><td>${p.sr}</td>
        </tr>`;});

        const purpleTbody=document.getElementById("purpleCapList");
        purpleTbody.innerHTML="";
        purpleCap.forEach((p,i)=>{purpleTbody.innerHTML+=`<tr>
            <td>${i+1}</td><td>${p.player}</td><td>${p.team}</td><td>${p.wickets}</td><td>${p.eco}</td><td>${p.best}</td>
        </tr>`;});

        const ctx=document.getElementById("topPerformersChart");
        new Chart(ctx,{type:"bar",data:{labels:orangeCap.map(p=>p.player),datasets:[{label:"Runs",data:orangeCap.map(p=>p.runs),backgroundColor:"#FFA500"},{label:"Wickets",data:purpleCap.map(p=>p.wickets),backgroundColor:"#800080"}]},options:{responsive:true,scales:{y:{beginAtZero:true}}}});
    }

    function renderMatches(){
        document.getElementById("upcomingMatches").innerHTML=`<p>CSK vs MI - Tomorrow</p><p>RCB vs KKR - Friday</p><p>GT vs RR - Sunday</p>`;
        document.getElementById("recentResults").innerHTML=`<p>RR beat DC by 20 runs</p><p>MI beat SRH by 5 wickets</p><p>CSK beat KKR by 15 runs</p>`;
    }

    function renderScenarios(){
        const select=document.getElementById("scenarioTeam");
        select.innerHTML="";
        teams.forEach(team=>{select.innerHTML+=`<option>${team.name}</option>`;});
        select.addEventListener("change",()=>{
            const percent=Math.floor(Math.random()*100);
            const bar=document.getElementById("qualificationBar");
            bar.style.width=percent+"%";
            bar.innerText=percent+"%";
            document.getElementById("scenarioResult").innerHTML=`<strong>${select.value}</strong> has a ${percent}% chance to qualify for playoffs.`;
        });
    }

    document.getElementById("refreshPoints")?.addEventListener("click",()=>{renderPointsTable();alert("Points table refreshed!");});

    renderPointsTable();
    renderTeamChart();
    renderLeaders();
    renderMatches();
    renderScenarios();
});