// IPL Data Management System - Players Page JavaScript

let playersData = [];
let teamsData = [];
let comparisonList = [];
let comparisonChart = null;

// Load data from localStorage
function loadData() {
    const storedPlayers = localStorage.getItem('iplPlayersData');
    const storedTeams = localStorage.getItem('iplTeamsData');
    if (storedPlayers) playersData = JSON.parse(storedPlayers);
    if (storedTeams) teamsData = JSON.parse(storedTeams);
    
    if (playersData.length === 0) {
        playersData = [
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
    }
    if (teamsData.length === 0) {
        teamsData = [
            { id: 1, name: "Chennai Super Kings (CSK)" }, { id: 2, name: "Mumbai Indians (MI)" },
            { id: 3, name: "Royal Challengers Bangalore (RCB)" }, { id: 4, name: "Kolkata Knight Riders (KKR)" },
            { id: 5, name: "Delhi Capitals (DC)" }, { id: 6, name: "Punjab Kings (PBKS)" },
            { id: 7, name: "Rajasthan Royals (RR)" }, { id: 8, name: "Sunrisers Hyderabad (SRH)" },
            { id: 9, name: "Gujarat Titans (GT)" }, { id: 10, name: "Lucknow Super Giants (LSG)" }
        ];
    }
}

function updateHeroStats() {
    document.getElementById('totalPlayersCount').innerText = playersData.length;
    const topScorer = [...playersData].sort((a, b) => b.runs - a.runs)[0];
    const topWicket = [...playersData].sort((a, b) => b.wickets - a.wickets)[0];
    document.getElementById('topScorer').innerText = topScorer ? `${topScorer.name} (${topScorer.runs})` : '-';
    document.getElementById('topWicketTaker').innerText = topWicket ? `${topWicket.name} (${topWicket.wickets})` : '-';
}

function populateTeamFilter() {
    const teamSelect = document.getElementById('filterTeam');
    const teams = [...new Set(playersData.map(p => p.team))].sort();
    teamSelect.innerHTML = '<option value="all">All Teams</option>' + teams.map(t => `<option value="${t}">${t}</option>`).join('');
}

function renderPlayers() {
    let filteredPlayers = [...playersData];
    const searchTerm = document.getElementById('searchPlayer').value.toLowerCase();
    const teamFilter = document.getElementById('filterTeam').value;
    const roleFilter = document.getElementById('filterRole').value;
    const sortBy = document.getElementById('sortBy').value;
    const sortOrder = document.getElementById('sortOrder').value;
    
    if (searchTerm) filteredPlayers = filteredPlayers.filter(p => p.name.toLowerCase().includes(searchTerm));
    if (teamFilter !== 'all') filteredPlayers = filteredPlayers.filter(p => p.team === teamFilter);
    if (roleFilter !== 'all') filteredPlayers = filteredPlayers.filter(p => p.role === roleFilter);
    
    filteredPlayers.sort((a, b) => {
        let valA = a[sortBy], valB = b[sortBy];
        if (sortBy === 'name') { valA = a.name.toLowerCase(); valB = b.name.toLowerCase(); }
        if (sortOrder === 'desc') return valB - valA;
        return valA - valB;
    });
    
    const grid = document.getElementById('playersGrid');
    const noResults = document.getElementById('noResults');
    
    if (filteredPlayers.length === 0) {
        grid.innerHTML = '';
        noResults.classList.remove('d-none');
        return;
    }
    
    noResults.classList.add('d-none');
    grid.innerHTML = filteredPlayers.map(player => `
        <div class="col-md-4 col-lg-3">
            <div class="card player-card" data-player-id="${player.id}">
                <input type="checkbox" class="compare-checkbox" data-player-id="${player.id}" ${comparisonList.includes(player.id) ? 'checked' : ''}>
                <div class="card-body">
                    <div class="player-name">${player.name}</div>
                    <div class="player-team" style="background: linear-gradient(135deg, var(--csk-yellow), #e6b422); display: inline-block; padding: 0.2rem 0.8rem; border-radius: 20px; font-size: 0.75rem;">${player.team}</div>
                    <div class="player-stats">
                        <div class="stat"><div class="stat-value">${player.runs}</div><div class="stat-label">Runs</div></div>
                        <div class="stat"><div class="stat-value">${player.wickets}</div><div class="stat-label">Wickets</div></div>
                        <div class="stat"><div class="stat-value">${player.matches}</div><div class="stat-label">Matches</div></div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    document.querySelectorAll('.player-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.type !== 'checkbox') {
                const playerId = parseInt(card.dataset.playerId);
                showPlayerDetails(playerId);
            }
        });
    });
    
    document.querySelectorAll('.compare-checkbox').forEach(cb => {
        cb.addEventListener('change', (e) => {
            e.stopPropagation();
            const playerId = parseInt(cb.dataset.playerId);
            if (cb.checked) {
                if (comparisonList.length < 4) comparisonList.push(playerId);
                else { cb.checked = false; alert('You can compare up to 4 players at once!'); }
            } else comparisonList = comparisonList.filter(id => id !== playerId);
            updateComparisonBar();
        });
    });
}

function updateComparisonBar() {
    const bar = document.getElementById('comparisonBar');
    const listSpan = document.getElementById('comparisonList');
    if (comparisonList.length > 0) {
        bar.classList.remove('d-none');
        const players = playersData.filter(p => comparisonList.includes(p.id));
        listSpan.innerHTML = players.map(p => `<span class="badge bg-primary me-1">${p.name}</span>`).join('');
    } else bar.classList.add('d-none');
}

function showPlayerDetails(playerId) {
    const player = playersData.find(p => p.id === playerId);
    if (!player) return;
    
    const modalBody = document.getElementById('playerModalBody');
    const modalHeader = document.getElementById('playerModalHeader');
    modalHeader.style.background = 'linear-gradient(135deg, var(--csk-yellow), #e6b422)';
    modalHeader.style.color = '#1e293b';
    
    modalBody.innerHTML = `
        <div class="text-center mb-3">
            <div class="display-1"><i class="bi bi-person-circle"></i></div>
            <h3>${player.name}</h3>
            <span class="badge bg-primary">${player.team}</span>
            <span class="badge bg-warning text-dark">${player.role || 'Player'}</span>
        </div>
        <div class="row text-center">
            <div class="col-4"><div class="display-6 fw-bold text-primary">${player.runs}</div><div class="text-muted">Runs</div></div>
            <div class="col-4"><div class="display-6 fw-bold text-success">${player.wickets}</div><div class="text-muted">Wickets</div></div>
            <div class="col-4"><div class="display-6 fw-bold text-info">${player.matches}</div><div class="text-muted">Matches</div></div>
        </div>
        <hr>
        <div class="row">
            <div class="col-6"><strong>Batting Average:</strong> ${player.average || (player.runs / player.matches).toFixed(2)}</div>
            <div class="col-6"><strong>Strike Rate:</strong> ${player.strikeRate || 'N/A'}</div>
            ${player.economy ? `<div class="col-6"><strong>Economy:</strong> ${player.economy}</div>` : ''}
            ${player.bestBowling ? `<div class="col-6"><strong>Best Bowling:</strong> ${player.bestBowling}</div>` : ''}
        </div>
    `;
    
    new bootstrap.Modal(document.getElementById('playerModal')).show();
}

function viewComparison() {
    if (comparisonList.length < 2) {
        alert('Please select at least 2 players to compare');
        return;
    }
    
    const players = playersData.filter(p => comparisonList.includes(p.id));
    const ctx = document.getElementById('comparisonChart').getContext('2d');
    
    if (comparisonChart) comparisonChart.destroy();
    
    comparisonChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: players.map(p => p.name),
            datasets: [
                { label: 'Runs', data: players.map(p => p.runs), backgroundColor: 'rgba(249,194,60,0.7)', borderColor: '#f9c23c', borderWidth: 1 },
                { label: 'Wickets', data: players.map(p => p.wickets), backgroundColor: 'rgba(237,28,36,0.7)', borderColor: '#ed1c24', borderWidth: 1 }
            ]
        },
        options: { responsive: true, maintainAspectRatio: true, scales: { y: { beginAtZero: true } } }
    });
    
    const tableDiv = document.getElementById('comparisonTable');
    tableDiv.innerHTML = `
        <div class="col-12">
            <table class="table table-bordered">
                <thead><tr><th>Player</th><th>Team</th><th>Runs</th><th>Wickets</th><th>Matches</th><th>Avg</th></tr></thead>
                <tbody>${players.map(p => `<tr><td><strong>${p.name}</strong></td><td>${p.team}</td><td>${p.runs}</td><td>${p.wickets}</td><td>${p.matches}</td><td>${(p.runs / p.matches).toFixed(2)}</td></tr>`).join('')}</tbody>
            </table>
        </div>
    `;
    
    new bootstrap.Modal(document.getElementById('comparisonModal')).show();
}

function clearComparison() {
    comparisonList = [];
    updateComparisonBar();
    renderPlayers();
}

function resetFilters() {
    document.getElementById('searchPlayer').value = '';
    document.getElementById('filterTeam').value = 'all';
    document.getElementById('filterRole').value = 'all';
    document.getElementById('sortBy').value = 'name';
    document.getElementById('sortOrder').value = 'desc';
    renderPlayers();
}

// Theme Toggle
function initThemeToggle() {
    const btn = document.getElementById('themeToggleBtn');
    btn?.addEventListener('click', () => {
        document.body.classList.toggle('bw-theme');
        localStorage.setItem('iplBWTheme', document.body.classList.contains('bw-theme'));
    });
    if (localStorage.getItem('iplBWTheme') === 'true') document.body.classList.add('bw-theme');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    updateHeroStats();
    populateTeamFilter();
    renderPlayers();
    initThemeToggle();
    
    document.getElementById('searchPlayer').addEventListener('input', renderPlayers);
    document.getElementById('filterTeam').addEventListener('change', renderPlayers);
    document.getElementById('filterRole').addEventListener('change', renderPlayers);
    document.getElementById('sortBy').addEventListener('change', renderPlayers);
    document.getElementById('sortOrder').addEventListener('change', renderPlayers);
    document.getElementById('resetFilters').addEventListener('click', resetFilters);
    document.getElementById('viewComparison').addEventListener('click', viewComparison);
    document.getElementById('clearComparison').addEventListener('click', clearComparison);
});