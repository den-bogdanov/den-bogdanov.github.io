// Search functionality
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

let searchIndex = null;

// Fetch the search index
async function fetchSearchIndex() {
    try {
        const response = await fetch('/search/index.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!data || !data.posts) {
            throw new Error('Invalid search index format');
        }
        searchIndex = data.posts;
        showStatus('Start typing to search...');
    } catch (error) {
        console.error('Error loading search index:', error);
        showStatus('Failed to load search index. Please refresh the page.');
    }
}

// Show status message
function showStatus(message) {
    searchResults.innerHTML = `<div class="search-status">${message}</div>`;
}

// Search function
function performSearch(query) {
    if (!searchIndex) {
        showStatus('Search index not loaded yet. Please try again.');
        return;
    }

    query = query.toLowerCase();
    const results = searchIndex
        .filter(post => post.title.toLowerCase().includes(query))
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

    displayResults(results);
}

// Display search results
function displayResults(results) {
    if (!Array.isArray(results) || results.length === 0) {
        showStatus('No results found');
        return;
    }

    const html = `
        <ul class="search-results-list">
            ${results.map(result => `
                <li class="search-result">
                    <a href="${result.permalink}">
                        <h3 class="search-result-title">${result.title}</h3>
                    </a>
                </li>
            `).join('')}
        </ul>
    `;

    searchResults.innerHTML = html;
}

// Event listeners
let debounceTimeout;
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    clearTimeout(debounceTimeout);
    
    if (query.length > 0) {
        debounceTimeout = setTimeout(() => performSearch(query), 300);
    } else {
        showStatus('Start typing to search...');
    }
});

// Handle keyboard navigation
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        const firstResult = searchResults.querySelector('.search-result a');
        if (firstResult) {
            firstResult.focus();
        }
    }
});

searchResults.addEventListener('keydown', (e) => {
    if (!e.target.closest('a')) return;
    
    const currentResult = e.target.closest('.search-result');
    
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextResult = currentResult.nextElementSibling;
        if (nextResult) {
            nextResult.querySelector('a').focus();
        }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevResult = currentResult.previousElementSibling;
        if (prevResult) {
            prevResult.querySelector('a').focus();
        } else {
            searchInput.focus();
        }
    }
});

// Close search results when clicking outside
document.addEventListener('click', (e) => {
    if (!searchResults.contains(e.target) && !searchInput.contains(e.target)) {
        showStatus('Start typing to search...');
    }
});

// Initialize search
fetchSearchIndex(); 