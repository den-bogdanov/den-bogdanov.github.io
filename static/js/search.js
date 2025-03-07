// Search functionality
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

let searchIndex = null;

// Fetch the search index
fetch('/index.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load search index');
        }
        return response.json();
    })
    .then(data => {
        searchIndex = data.posts;
        console.log('Search index loaded successfully');
    })
    .catch(error => {
        console.error('Error loading search index:', error);
        searchResults.innerHTML = '<li>Error loading search index. Please try again later.</li>';
    });

// Search function
function performSearch(query) {
    if (!searchIndex) {
        searchResults.innerHTML = '<li>Search index not loaded yet. Please try again.</li>';
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
        searchResults.innerHTML = '<li>No results found</li>';
        return;
    }

    results.forEach(result => {
        const li = document.createElement('li');
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
        searchResults.innerHTML = '';
    }
});

// Handle keyboard navigation
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        const firstResult = searchResults.firstElementChild;
        if (firstResult) {
            firstResult.focus();
        }
    }
});

searchResults.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextResult = e.target.nextElementSibling;
        if (nextResult) {
            nextResult.focus();
        }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevResult = e.target.previousElementSibling;
        if (prevResult) {
            prevResult.focus();
        }
    }
}); 