async function loadBlogs() {
    const query = `
  query Publication {
    publication(host: "blog.ashu.fun") {
      posts(first: 20) {
        edges {
          node {
            title
            brief
            publishedAt
            url
          }
        }
      }
    }
  }`;

    try {
        const res = await fetch("https://gql.hashnode.com/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query })
        });

        const data = await res.json();
        const posts = data.data.publication.posts.edges;

        const container = document.getElementById("blog-list");

        container.innerHTML = posts.map(({ node }) => {
            const date = new Date(node.publishedAt).toDateString();

            return `
        <div class="blog-item">
          <div class="blog-text">
            <h3>${node.title}</h3>
            <span class="date">${date}</span>
            <p>${node.brief}</p>
            <a href="${node.url}" target="_blank">
              <button>Read More</button>
            </a>
          </div>
        </div>
      `;
        }).join("");

    } catch (error) {
        console.log(error);
    }
}

loadBlogs();
