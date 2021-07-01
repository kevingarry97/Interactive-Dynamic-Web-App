const apiUrl = "https://jsonplaceholder.typicode.com/users";

const getUsers = async() => {
    const result = await fetch(apiUrl);
    return result.json();
}

const populateDom = async() => {
    try {
        const users = await getUsers();
        document.querySelector(".home").addEventListener('click', () => {
            location.reload();
        })
        users.forEach(user => {
            document.getElementsByClassName("row mt-5")[0].innerHTML += `
                    <div class="col-lg-4 col-md-6 my-2">
                        <div class="card border-0 shadow-sm">
                            <div class="card-body">
                                <div class="border-left mt-2">
                                    <div class="ml-2 mt-2">
                                        <h5 class="text-black-50 font-bold m-0 mt-2">${user.name}</h5>
                                        <p class="m-0"><small class="text-muted">${user.email}</small></p>
                                        <button id="see-posts" class="btn btn-success shadow-sm mt-5" value=${user.id}>See Posts</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            `
        })
    } catch(e) {
        console.log(e);
    }
};

window.addEventListener('load', () => {
    populateDom();
});

const loadPosts = async(id) => {
    const result = await fetch(`${apiUrl}/${id}/posts`);
    const posts = await result.json();
    return posts;
}

const loadOnDom = (posts) => {
    const row = document.querySelector(".row");
    row.innerHTML='';
    posts.forEach(post => {
        row.innerHTML += `<div class="col mt-1">
        <div class="card shadow-sm border-0">
            <div class="card-body">
                <div class="border-left mt-2">
                    <div class="ml-2 mt-2">
                        <h5 class="text-black-50 m-0">${post.title}</h5>
                        <p class="text-black-20 mt-2"><small>${post.body}</small></p>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    })
}

document.getElementsByTagName("body")[0].addEventListener('click', (e) => {
    if(e.target.id == "see-posts") {
        e.preventDefault();
        loadPosts(e.target.value)
        .then(posts => loadOnDom(posts))
        .catch(err => console.log(err))
    }
});



