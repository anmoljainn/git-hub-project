const apiUrl = 'https://api.github.com/users/';

function getRepositories() {
    const username = document.getElementById('username').value;

    // Show loader
    document.getElementById('loader').style.display = 'block';

    // Clear previous results
    document.getElementById('repositories').innerHTML = '';
    document.getElementById('pagination').innerHTML = '';

    // Make API call to fetch repositories
    fetch(`${apiUrl}${username}/repos`)
        .then(response => response.json())
        .then(data => {
            // Hide loader
            document.getElementById('loader').style.display = 'none';

            // Process and display repositories
            displayRepositories(data);
        })
        .catch(error => {
            // Handle errors
            console.error('Error fetching repositories:', error);
            document.getElementById('loader').style.display = 'none';
            document.getElementById('repositories').innerHTML = 'Error fetching repositories.';
        });
}

function displayRepositories(repositories) {
    const repositoriesContainer = document.getElementById('repositories');

    if (repositories.length === 0) {
        repositoriesContainer.innerHTML = 'No repositories found.';
        return;
    }

    repositories.forEach(repo => {
        const repoElement = document.createElement('div');
        repoElement.className = 'repo';
        repoElement.innerHTML = `<strong>${repo.name}</strong> - ${repo.description || 'No description available'}`;
        repositoriesContainer.appendChild(repoElement);
    });


}