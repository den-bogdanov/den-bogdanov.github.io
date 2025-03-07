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
        searchResults.innerHTML = '<li class="search-status">Search index loaded. Start typing to search.</li>';
    })
    .catch(error => {
        console.error('Error loading search index:', error);
        searchResults.innerHTML = `<li class="search-status">Error loading search index: ${error.message}</li>`;
    });

// Search function
function performSearch(query) {
    if (!searchIndex) {
        searchResults.innerHTML = '<li class="search-status">Search index not loaded yet. Please try again.</li>';
        return;
    }

    const results = searchIndex.filter(item => {
        const searchContent = (item.title + ' ' + item.content).toLowerCase();
        return searchContent.includes(query.toLowerCase());
    });

    displayResults(results);
}

// Display search results
function displayResults(results) {
    searchResults.innerHTML = '';

    if (results.length === 0) {
        searchResults.innerHTML = '<li class="search-status">No results found</li>';
        return;
    }

    results.forEach(result => {
        const li = document.createElement('li');
        li.className = 'search-result';
        li.innerHTML = `
            <a href="${result.permalink}">
                <h3>${result.title}</h3>
                <p>${result.summary}</p>
                <small>${result.date}</small>
            </a>
        `;
        searchResults.appendChild(li);
    });
}

// Event listeners
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    if (query.length > 0) {
        performSearch(query);
    } else {
        searchResults.innerHTML = '<li class="search-status">Start typing to search...</li>';
    }
});

// Handle keyboard navigation
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        const firstResult = searchResults.querySelector('.search-result');
        if (firstResult) {
            firstResult.focus();
        }
    }
});

searchResults.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextResult = e.target.nextElementSibling;
        if (nextResult && nextResult.classList.contains('search-result')) {
            nextResult.focus();
        }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevResult = e.target.previousElementSibling;
        if (prevResult && prevResult.classList.contains('search-result')) {
            prevResult.focus();
        }
    }
}); 