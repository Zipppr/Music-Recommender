document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    searchInput.addEventListener('input', async function() {
        const query = searchInput.value.trim();

        if (query.length === 0) {
            searchResults.innerHTML = '';
            return;
        }

        try {
            const response = await fetch(`/api/search-favorites/?q=${encodeURIComponent(query)}`);
            const data = await response.json();

            searchResults.innerHTML = '';

            if (data.results.length > 0) {
                data.results.forEach(artist => {
                    const card = document.createElement('div');
                    card.className = 'card';
                    card.innerHTML = `
                        <h3>${artist.artist_name}</h3>
                        <p>Saved on: ${artist.created_at}</p>
                    `;
                    searchResults.appendChild(card);
                });
            } else {
                searchResults.innerHTML = '<p>No results found.</p>';
            }
        } catch (error) {
            console.error('Error searching favorites:', error);
        }
    });
});
