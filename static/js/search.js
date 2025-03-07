// Search functionality
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

let searchIndex = null;

// Fetch the search index
console.log('Fetching search index...');
fetch('/search/index.json')
    .then(response => {
        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error(`Failed to load search index: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Received data:', data);
        if (!data || !data.posts || !Array.isArray(data.posts)) {
            throw new Error('Invalid search index format');
        }
        searchIndex = data.posts;
        console.log('Search index loaded successfully with', searchIndex.length, 'items');
        showStatus('Start typing to search...');
    })
    .catch(error => {
        console.error('Error loading search index:', error);
        showStatus(`Error loading search index: ${error.message}`);
    });

// Show status message
function showStatus(message) {
    console.log('Status:', message);
    searchResults.innerHTML = `<div class="search-status">${message}</div>`;
}

// Search function
function performSearch(query) {
    console.log('Performing search for:', query);
    
    if (!searchIndex) {
        console.error('Search index not loaded');
        showStatus('Search index not loaded yet. Please try again.');
        return;
    }

    const results = searchIndex
        .filter(item => {
            const searchContent = (item.title + ' ' + item.content).toLowerCase();
            return searchContent.includes(query.toLowerCase());
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

    console.log('Found results:', results.length);
    displayResults(results);
}

// Display search results
function displayResults(results) {
    if (results.length === 0) {
        showStatus('No results found');
        return;
    }

    searchResults.innerHTML = '';
    results.forEach(result => {
        const div = document.createElement('div');
        div.className = 'search-result';
        const date = new Date(result.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        div.innerHTML = `
            <a href="${result.permalink}">
                <h3>${result.title}</h3>
                <time datetime="${result.date}">${date}</time>
            </a>
        `;
        searchResults.appendChild(div);
    });
    console.log('Displayed results:', results.length);
}

// Event listeners
let debounceTimeout;
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    clearTimeout(debounceTimeout);
    
    if (query.length > 0) {
        console.log('Search input:', query);
        debounceTimeout = setTimeout(() => performSearch(query), 300);
    } else {
        showStatus('Start typing to search...');
    }
});

// Handle keyboard navigation
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        const firstResult = searchResults.querySelector('.search-result');
        if (firstResult) {
            const link = firstResult.querySelector('a');
            if (link) link.focus();
        }
    }
});

searchResults.addEventListener('keydown', (e) => {
    if (!e.target.closest('a')) return;
    
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        const currentResult = e.target.closest('.search-result');
        const nextResult = currentResult.nextElementSibling;
        if (nextResult) {
            const link = nextResult.querySelector('a');
            if (link) link.focus();
        }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const currentResult = e.target.closest('.search-result');
        if (currentResult === currentResult.parentElement.firstElementChild) {
            searchInput.focus();
            return;
        }
        const prevResult = currentResult.previousElementSibling;
        if (prevResult) {
            const link = prevResult.querySelector('a');
            if (link) link.focus();
        }
    }
}); 