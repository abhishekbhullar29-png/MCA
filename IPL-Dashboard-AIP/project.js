// IPL Data Management System - Home Page JavaScript

// Data Storage
let teamsData = [
    { id: 1, name: "Chennai Super Kings (CSK)", matches: 220, wins: 135, losses: 82, winPercent: 61.4 },
    { id: 2, name: "Mumbai Indians (MI)", matches: 235, wins: 142, losses: 89, winPercent: 60.4 },
    { id: 3, name: "Royal Challengers Bangalore (RCB)", matches: 235, wins: 112, losses: 118, winPercent: 47.7 },
    { id: 4, name: "Kolkata Knight Riders (KKR)", matches: 225, wins: 119, losses: 103, winPercent: 52.9 },
    { id: 5, name: "Delhi Capitals (DC)", matches: 215, wins: 102, losses: 110, winPercent: 47.4 },
    { id: 6, name: "Punjab Kings (PBKS)", matches: 210, wins: 98, losses: 109, winPercent: 46.7 },
    { id: 7, name: "Rajasthan Royals (RR)", matches: 205, wins: 96, losses: 106, winPercent: 46.8 },
    { id: 8, name: "Sunrisers Hyderabad (SRH)", matches: 165, wins: 82, losses: 80, winPercent: 49.7 },
    { id: 9, name: "Gujarat Titans (GT)", matches: 45, wins: 30, losses: 15, winPercent: 66.7 },
    { id: 10, name: "Lucknow Super Giants (LSG)", matches: 45, wins: 26, losses: 19, winPercent: 57.8 }
];

let playersData = [
    { id: 1, name: "Virat Kohli", team: "RCB", runs: 7263, wickets: 4, matches: 237, role: "Batsman", average: 52.3, strikeRate: 135.2 },
    { id: 2, name: "Rohit Sharma", team: "MI", runs: 6211, wickets: 1, matches: 243, role: "Batsman", average: 31.2, strikeRate: 132.8 },
    { id: 3, name: "MS Dhoni", team: "CSK", runs: 5082, wickets: 0, matches: 250, role: "Wicketkeeper", average: 42.7, strikeRate: 137.4 },
    { id: 4, name: "Hardik Pandya", team: "GT", runs: 2304, wickets: 53, matches: 123, role: "All-rounder", average: 31.5, strikeRate: 145.3 },
    { id: 5, name: "Jasprit Bumrah", team: "MI", runs: 98, wickets: 145, matches: 120, role: "Bowler", economy: 7.2, bestBowling: "5/21" },
    { id: 6, name: "Ravindra Jadeja", team: "CSK", runs: 2680, wickets: 152, matches: 226, role: "All-rounder", average: 28.5, strikeRate: 129.4 },
    { id: 7, name: "KL Rahul", team: "LSG", runs: 4163, wickets: 0, matches: 118, role: "Batsman", average: 46.7, strikeRate: 138.2 },
    { id: 8, name: "Shubman Gill", team: "GT", runs: 2790, wickets: 0, matches: 98, role: "Batsman", average: 41.6, strikeRate: 142.5 },
    { id: 9, name: "Andre Russell", team: "KKR", runs: 2100, wickets: 95, matches: 105, role: "All-rounder", strikeRate: 175.2, economy: 9.1 },
    { id: 10, name: "David Warner", team: "DC", runs: 5884, wickets: 0, matches: 162, role: "Batsman", average: 41.2, strikeRate: 140.8 }
];

let nextPlayerId = 11;
let nextTeamId = 11;
let chartInstance = null;

// Helper Functions
function recalcWinPercent(team) {
    if (team.matches > 0) team.winPercent = parseFloat(((team.wins / team.matches) * 100).toFixed(1));
    else team.winPercent = 0;
    return team;
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-5`;
    toast.style.zIndex = '9999';
    toast.style.minWidth = '300px';
    toast.innerHTML = `${message}<button type="button" class="btn-close" data-bs-dismiss="alert"></button>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function syncToLocalStorage() {
    localStorage.setItem('iplTeamsData', JSON.stringify(teamsData));
    localStorage.setItem('iplPlayersData', JSON.stringify(playersData));
}

function loadFromLocalStorage() {
    const storedTeams = localStorage.getItem('iplTeamsData');
    const storedPlayers = localStorage.getItem('iplPlayersData');
    if (storedTeams) teamsData = JSON.parse(storedTeams);
    if (storedPlayers) playersData = JSON.parse(storedPlayers);
}

// Render Functions
function renderLeftStats() {
    const statsContainer = document.getElementById('statsPanel');
    if (!statsContainer) return;
    
    let topTeams = [...teamsData].sort((a, b) => b.winPercent - a.winPercent).slice(0, 3);
    let topBatsman = [...playersData].sort((a, b) => b.runs - a.runs).slice(0, 2);
    let topWicket = [...playersData].sort((a, b) => b.wickets - a.wickets).slice(0, 2);
    
    let html = `
        <div class="mb-3 p-2 border rounded"><h6><i class="bi bi-trophy"></i> 🏆 Top Performing Teams</h6><ul class="list-unstyled small">${topTeams.map(t => `<li><strong>${t.name.split('(')[0]}</strong> - Win%: ${t.winPercent}% (${t.wins}/${t.matches})</li>`).join('')}</ul></div>
        <div class="mb-3 p-2 border rounded"><h6><i class="bi bi-person-standing"></i> 🏏 Elite Batters</h6><ul class="list-unstyled small">${topBatsman.map(p => `<li>${p.name} (${p.team}) - ${p.runs} runs</li>`).join('')}</ul></div>
        <div class="p-2 border rounded"><h6><i class="bi bi-cricket"></i> 🎯 Top Wicket Takers</h6><ul class="list-unstyled small">${topWicket.map(p => `<li>${p.name} (${p.team}) - ${p.wickets} wkts</li>`).join('')}</ul></div>
    `;
    statsContainer.innerHTML = html;
}

function renderAllTeamsList() {
    const teamsListDiv = document.getElementById('iplTeamsList');
    if (!teamsListDiv) return;
    
    teamsListDiv.innerHTML = teamsData.map(team => `
        <div class="col"><div class="badge p-2 w-100 rounded-pill team-badge" data-team-name="${team.name}">${team.name.split('(')[0]} <span class="badge bg-light text-dark">${team.winPercent}%</span></div></div>
    `).join('');
    
    document.querySelectorAll('.team-badge').forEach(el => {
        el.addEventListener('click', () => {
            document.getElementById('searchInput').value = el.getAttribute('data-team-name');
            performSearch(el.getAttribute('data-team-name'));
        });
    });
}

function updateChart() {
    const ctx = document.getElementById('teamChart');
    if (!ctx) return;
    
    const canvas = ctx.getContext('2d');
    if (chartInstance) chartInstance.destroy();
    
    const labels = teamsData.slice(0, 8).map(t => t.name.split('(')[0].substring(0, 12));
    const winData = teamsData.slice(0, 8).map(t => t.winPercent);
    
    chartInstance = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Win Percentage (%)',
                data: winData,
                backgroundColor: 'rgba(249,194,60,0.7)',
                borderColor: '#f9c23c',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: { y: { beginAtZero: true, max: 100, title: { display: true, text: 'Win %' } } },
            plugins: { legend: { position: 'top' } }
        }
    });
}

function performSearch(query) {
    const searchDiv = document.getElementById('searchResult');
    if (!query.trim()) {
        searchDiv.classList.add('d-none');
        return;
    }
    
    const lowerQuery = query.toLowerCase();
    const matchedPlayers = playersData.filter(p => p.name.toLowerCase().includes(lowerQuery) || p.team.toLowerCase().includes(lowerQuery));
    const matchedTeams = teamsData.filter(t => t.name.toLowerCase().includes(lowerQuery));
    
    if (matchedPlayers.length === 0 && matchedTeams.length === 0) {
        searchDiv.innerHTML = '<i class="bi bi-exclamation-triangle"></i> No player or team found.';
    } else {
        let html = '';
        if (matchedPlayers.length) {
            html += `<strong>🏏 Players (${matchedPlayers.length}):</strong><ul class="mb-2">`;
            matchedPlayers.forEach(p => {
                html += `<li>${p.name} (${p.team}) | Runs: ${p.runs} | Wkts: ${p.wickets} | Matches: ${p.matches}</li>`;
            });
            html += `</ul>`;
        }
        if (matchedTeams.length) {
            html += `<strong>🏆 Teams (${matchedTeams.length}):</strong><ul>`;
            matchedTeams.forEach(t => {
                html += `<li>${t.name} | W/L: ${t.wins}/${t.losses} | Win%: ${t.winPercent}%</li>`;
            });
            html += `</ul>`;
        }
        searchDiv.innerHTML = html;
    }
    searchDiv.classList.remove('d-none');
}

function refreshAll() {
    renderLeftStats();
    renderAllTeamsList();
    updateChart();
    const searchVal = document.getElementById('searchInput')?.value;
    if (searchVal && searchVal.trim()) performSearch(searchVal);
    else document.getElementById('searchResult')?.classList.add('d-none');
    updateFormDropdowns();
    syncToLocalStorage();
}

function updateFormDropdowns() {
    const teamOptions = teamsData.map(t => `<option value="${t.name.split('(')[0].trim()}">${t.name}</option>`).join('');
    
    const playerTeamSelect = document.getElementById('playerTeam');
    if (playerTeamSelect) playerTeamSelect.innerHTML = '<option value="">Select Team</option>' + teamOptions;
    
    const updatePlayerTeam = document.getElementById('updatePlayerTeam');
    if (updatePlayerTeam) updatePlayerTeam.innerHTML = '<option value="">Keep Current</option>' + teamOptions;
    
    const updatePlayerSelect = document.getElementById('updatePlayerSelect');
    if (updatePlayerSelect) updatePlayerSelect.innerHTML = '<option value="">Choose Player</option>' + playersData.map(p => `<option value="${p.id}">${p.name} (${p.team})</option>`).join('');
    
    const deletePlayerSelect = document.getElementById('deletePlayerSelect');
    if (deletePlayerSelect) deletePlayerSelect.innerHTML = '<option value="">Choose Player</option>' + playersData.map(p => `<option value="${p.id}">${p.name} (${p.team})</option>`).join('');
    
    const updateTeamSelect = document.getElementById('updateTeamSelect');
    if (updateTeamSelect) updateTeamSelect.innerHTML = '<option value="">Choose Team</option>' + teamsData.map(t => `<option value="${t.id}">${t.name}</option>`).join('');
    
    const deleteTeamSelect = document.getElementById('deleteTeamSelect');
    if (deleteTeamSelect) deleteTeamSelect.innerHTML = '<option value="">Choose Team</option>' + teamsData.map(t => `<option value="${t.id}">${t.name}</option>`).join('');
}

// CRUD Operations
function addPlayer(name, teamShort, runs, wickets, matches) {
    const newId = nextPlayerId++;
    const newPlayer = {
        id: newId,
        name: name,
        team: teamShort,
        runs: parseInt(runs) || 0,
        wickets: parseInt(wickets) || 0,
        matches: parseInt(matches) || 0,
        role: "Batsman",
        average: parseInt(runs) / (parseInt(matches) || 1),
        strikeRate: 130
    };
    playersData.push(newPlayer);
    refreshAll();
    showToast(`✅ Player "${name}" added successfully!`);
    return true;
}

function addTeam(name, matches, wins, losses) {
    const newId = nextTeamId++;
    const matchesInt = parseInt(matches) || 0;
    const winsInt = parseInt(wins) || 0;
    const winPercent = matchesInt > 0 ? (winsInt / matchesInt) * 100 : 0;
    const newTeam = {
        id: newId,
        name: name,
        matches: matchesInt,
        wins: winsInt,
        losses: parseInt(losses) || 0,
        winPercent: parseFloat(winPercent.toFixed(1))
    };
    teamsData.push(newTeam);
    refreshAll();
    showToast(`✅ Team "${name}" added successfully!`);
    return true;
}

function updatePlayerById(id, updates) {
    const index = playersData.findIndex(p => p.id == id);
    if (index !== -1) {
        playersData[index] = { ...playersData[index], ...updates };
        if (updates.runs !== undefined && updates.matches !== undefined) {
            playersData[index].average = playersData[index].runs / playersData[index].matches;
        }
        refreshAll();
        showToast(`✏️ Player updated successfully!`);
        return true;
    }
    return false;
}

function updateTeamById(id, updates) {
    const index = teamsData.findIndex(t => t.id == id);
    if (index !== -1) {
        teamsData[index] = { ...teamsData[index], ...updates };
        if (updates.matches !== undefined || updates.wins !== undefined) recalcWinPercent(teamsData[index]);
        refreshAll();
        showToast(`✏️ Team updated successfully!`);
        return true;
    }
    return false;
}

function deletePlayerById(id) {
    const player = playersData.find(p => p.id == id);
    playersData = playersData.filter(p => p.id != id);
    refreshAll();
    showToast(`🗑️ Player "${player?.name}" deleted successfully!`, 'danger');
    return true;
}

function deleteTeamById(id) {
    const team = teamsData.find(t => t.id == id);
    teamsData = teamsData.filter(t => t.id != id);
    refreshAll();
    showToast(`🗑️ Team "${team?.name}" deleted successfully!`, 'danger');
    return true;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    refreshAll();
    
    // Search Input
    document.getElementById('searchInput')?.addEventListener('input', (e) => performSearch(e.target.value));
    
    // Add Player Form
    document.getElementById('addPlayerForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('playerName').value;
        const team = document.getElementById('playerTeam').value;
        if (!name || !team) { alert('Please enter player name and select team'); return; }
        addPlayer(name, team, document.getElementById('playerRuns').value, document.getElementById('playerWickets').value, document.getElementById('playerMatches').value);
        bootstrap.Modal.getInstance(document.getElementById('addModal')).hide();
        document.getElementById('addPlayerForm').reset();
    });
    
    // Add Team Form
    document.getElementById('addTeamForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('teamName').value;
        if (!name) { alert('Team name required'); return; }
        addTeam(name, document.getElementById('teamMatches').value, document.getElementById('teamWins').value, document.getElementById('teamLosses').value);
        bootstrap.Modal.getInstance(document.getElementById('addModal')).hide();
        document.getElementById('addTeamForm').reset();
    });
    
    // Update Player Form
    document.getElementById('updatePlayerForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const playerId = document.getElementById('updatePlayerSelect').value;
        if (!playerId) { alert('Select a player'); return; }
        let updates = {};
        if (document.getElementById('updatePlayerName').value) updates.name = document.getElementById('updatePlayerName').value;
        if (document.getElementById('updatePlayerTeam').value) updates.team = document.getElementById('updatePlayerTeam').value;
        if (document.getElementById('updatePlayerRuns').value !== '') updates.runs = parseInt(document.getElementById('updatePlayerRuns').value);
        if (document.getElementById('updatePlayerWickets').value !== '') updates.wickets = parseInt(document.getElementById('updatePlayerWickets').value);
        if (document.getElementById('updatePlayerMatches').value !== '') updates.matches = parseInt(document.getElementById('updatePlayerMatches').value);
        if (Object.keys(updates).length === 0) { alert('No fields to update'); return; }
        updatePlayerById(playerId, updates);
        bootstrap.Modal.getInstance(document.getElementById('updateModal')).hide();
    });
    
    // Update Team Form
    document.getElementById('updateTeamForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const teamId = document.getElementById('updateTeamSelect').value;
        if (!teamId) { alert('Select a team'); return; }
        let updates = {};
        if (document.getElementById('updateTeamName').value) updates.name = document.getElementById('updateTeamName').value;
        if (document.getElementById('updateTeamMatches').value !== '') updates.matches = parseInt(document.getElementById('updateTeamMatches').value);
        if (document.getElementById('updateTeamWins').value !== '') updates.wins = parseInt(document.getElementById('updateTeamWins').value);
        if (document.getElementById('updateTeamLosses').value !== '') updates.losses = parseInt(document.getElementById('updateTeamLosses').value);
        if (Object.keys(updates).length === 0) { alert('No fields to update'); return; }
        updateTeamById(teamId, updates);
        bootstrap.Modal.getInstance(document.getElementById('updateModal')).hide();
    });
    
    // Delete Player Form
    document.getElementById('deletePlayerForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const playerId = document.getElementById('deletePlayerSelect').value;
        if (!playerId) { alert('Select player to delete'); return; }
        if (confirm('Are you sure you want to delete this player?')) deletePlayerById(playerId);
        bootstrap.Modal.getInstance(document.getElementById('deleteModal')).hide();
    });
    
    // Delete Team Form
    document.getElementById('deleteTeamForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const teamId = document.getElementById('deleteTeamSelect').value;
        if (!teamId) { alert('Select team to delete'); return; }
        if (confirm('⚠️ Deleting team may affect data. Continue?')) deleteTeamById(teamId);
        bootstrap.Modal.getInstance(document.getElementById('deleteModal')).hide();
    });
    
    // Open Modals
    document.getElementById('openAddFormBtn')?.addEventListener('click', () => { updateFormDropdowns(); new bootstrap.Modal(document.getElementById('addModal')).show(); });
    document.getElementById('openUpdateFormBtn')?.addEventListener('click', () => { updateFormDropdowns(); new bootstrap.Modal(document.getElementById('updateModal')).show(); });
    document.getElementById('openDeleteFormBtn')?.addEventListener('click', () => { updateFormDropdowns(); new bootstrap.Modal(document.getElementById('deleteModal')).show(); });
    
    // Theme Toggle
    const themeBtn = document.getElementById('themeToggleBtn');
    themeBtn?.addEventListener('click', () => {
        document.body.classList.toggle('bw-theme');
        localStorage.setItem('iplBWTheme', document.body.classList.contains('bw-theme'));
    });
    if (localStorage.getItem('iplBWTheme') === 'true') document.body.classList.add('bw-theme');
});

