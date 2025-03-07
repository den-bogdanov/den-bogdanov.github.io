// Search functionality
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

let searchIndex = null;

// Fetch the search index
async function fetchSearchIndex() {
    try {
        showStatus('Loading search index...');
        const response = await fetch('/search/index.json');
        console.log('Response:', response.status, response.statusText);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const text = await response.text();
        console.log('Raw response:', text);
        
        const data = JSON.parse(text);
        console.log('Parsed data:', data);
        
        if (!data || !data.posts) {
            throw new Error('Invalid search index format');
        }
        
        searchIndex = data.posts;
        console.log('Search index loaded with', searchIndex.length, 'posts');
        showStatus('Start typing to search...');
    } catch (error) {
        console.error('Error loading search index:', error);
        showStatus('Failed to load search index. Please refresh the page.');
    }
}

// Show status message
function showStatus(message) {
    console.log('Status:', message);
    searchResults.innerHTML = `<div class="search-status">${message}</div>`;
}

// Search function
function performSearch(query) {
    console.log('Searching for:', query);
    
    if (!searchIndex) {
        showStatus('Search index not loaded yet. Please try again.');
        return;
    }

    query = query.toLowerCase();
    const results = searchIndex
        .filter(post => {
            const titleMatch = post.title.toLowerCase().includes(query);
            console.log('Checking:', post.title, 'Match:', titleMatch);
            return titleMatch;
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

    console.log('Found results:', results);
    displayResults(results);
}

// Display search results
function displayResults(results) {
    if (!Array.isArray(results) || results.length === 0) {
        showStatus('No results found');
        return;
    }

    // Clear previous results
    searchResults.innerHTML = '';

    // Create container for results
    const container = document.createElement('div');
    container.className = 'search-results-container';

    // Add each result
    results.forEach(result => {
        const resultElement = document.createElement('div');
        resultElement.className = 'search-result';

        const link = document.createElement('a');
        link.href = result.permalink;

        const title = document.createElement('h3');
        title.textContent = result.title;

        const date = document.createElement('time');
        date.setAttribute('datetime', result.date);
        date.textContent = new Date(result.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        link.appendChild(title);
        link.appendChild(date);
        resultElement.appendChild(link);
        container.appendChild(resultElement);
    });

    // Add results to the page
    searchResults.appendChild(container);
    console.log('Results displayed:', results.length);
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

// Initialize search
fetchSearchIndex(); 