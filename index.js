class GitHub {

findUser(event) {
  event.preventDefault();
  const userInput = document.getElementById('user-input')
  const user = userInput.value
  document.getElementById('repos').innerHTML = '';
  document.getElementById('info-box').style.display = 'none';
  document.getElementById('alert').style.display = 'none';
  document.getElementById('repo-box').style.display = 'none';
  document.querySelector('#alert p').innerHTML = 'Does not exist';
  if (user === '') {
    document.querySelector('#alert p').innerHTML = 'Please write a username';
    document.getElementById('alert').style.display = 'block';
  } else {
    this.getData(`https://api.github.com/users/${user}`, this.showUserData);
    this.getData(`https://api.github.com/users/${user}/repos`, this.showRepoData );
  }
  userInput.value = '';
}

getData(URL, showData) {
  fetch(URL)
    .then(response => response.json())
    .then(data => {
      if(data.message) {
        document.getElementById('alert').style.display = 'block';
      } else {
        showData(data);
        return data
      }
    })
    .catch(error => console.log(error))
}

showUserData(passData) {
  document.getElementById('info-box').style.display = 'block';
  document.getElementById('user-info-img').src = passData.avatar_url;
  document.getElementById('username').innerHTML = `@${passData.login}`;
  document.getElementById('name').innerHTML = passData.name;
  document.getElementById('bio').innerHTML = passData.bio;
}

showRepoData(passData) {
  document.getElementById('repo-box').style.display = 'block';

    if(passData.length === 0) {
      const noRepo = document.createElement('div');
      noRepo.setAttribute('id', 'repos-alert');
      noRepo.innerHTML = `<p>This user has no repositories yet</p>`
      document.getElementById('repos').appendChild(noRepo);
    } else {
      const ul = document.createElement('ul');
      ul.className = 'repo-box-list';
      passData.map(repo => {
        const li = document.createElement('li');
        li.className = 'repo-box-list-item';
        li.innerHTML = `
          <div class="repo-name-box">
            <a href=${repo.html_url} target="_blank" class="repo-name">${repo.name[0].toUpperCase() + repo.name.slice(1)}</a>
          </div>
          <div class="repo-counts-box">
            <div class="repo-counts-box-item">
              <svg height="16" width="14" viewBox="0 0 14 16">
                <path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z"></path>
              </svg>

              <p>${repo.forks_count}</p>
            </div>
            <div class="repo-counts-box-item">
              <svg height="16" width="10" viewBox="0 0 10 16">
                <path fill-rule="evenodd" d="M10 5c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v.3c-.02.52-.23.98-.63 1.38-.4.4-.86.61-1.38.63-.83.02-1.48.16-2 .45V4.72a1.993 1.993 0 0 0-1-3.72C.88 1 0 1.89 0 3a2 2 0 0 0 1 1.72v6.56c-.59.35-1 .99-1 1.72 0 1.11.89 2 2 2 1.11 0 2-.89 2-2 0-.53-.2-1-.53-1.36.09-.06.48-.41.59-.47.25-.11.56-.17.94-.17 1.05-.05 1.95-.45 2.75-1.25S8.95 7.77 9 6.73h-.02C9.59 6.37 10 5.73 10 5zM2 1.8c.66 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2C1.35 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2zm0 12.41c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm6-8c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path>
              </svg>
              <p>${repo.stargazers_count}</p>
            </div>
          </div>
        `;
        ul.appendChild(li);
      })
      document.getElementById('repos').appendChild(ul);
    }
}

}

const github = new GitHub();
