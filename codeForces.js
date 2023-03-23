export class codeForces extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    const username = this.getAttribute("data");
    fetch(`https://codeforces.com/api/user.info?handles=${username}`)
      .then((res) => {
        if(!res.ok){
            alert("User not found! ");
        }
        return res.json()
      }
      )
      .then((data) => {
        if (data.status === "OK") {
          const user = data.result[0];

          const result = document.createElement("div");
          result.id = "result";

          const img_result = document.createElement("div");
          img_result.id = "img-result";

          const img = document.createElement("img");
          img.src = `${user.titlePhoto}`;
          img.height = 80;
          img.width = 80;

          img_result.appendChild(img);
          result.appendChild(img_result);

          const detail_result = document.createElement("div");
          detail_result.id = "detail-result";
          detail_result.innerHTML = `<p>Username : ${user.handle}</p>`;
          detail_result.innerHTML += `<p>First Name : ${user.firstName}</p>`;
          detail_result.innerHTML += `<p>Last Name : ${user.lastName}</p>`;
          detail_result.innerHTML += `<p>Rank : ${user.rank}</p>`;
          detail_result.innerHTML += `<p>Rating : ${user.rating}</p>`;
          detail_result.innerHTML += `<p>MaxRating : ${user.maxRating}</p>`;

          result.appendChild(detail_result);

          const styles = document.createElement("style");
          var st = `#result{
                    border: 5px solid blue;
                    max-width: -moz-fit-content;
                    max-width: fit-content;
                    padding: 2em;
                    background-color: aliceblue;
                    margin-top: 2%;
                    display: flex;
                    flex-direction: column;
                    margin-left: auto;
                    margin-right: auto;
                    }
                    #img-result{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    #img-result img{
                        border-radius: 50%;
                    }
                    #detail-result{
                        font-weight: 700;
                        font-size: 1em;
                        color: blue;
                    }`;
          styles.innerText = st;
          document.head.appendChild(styles);

          shadowRoot.appendChild(result);
          shadowRoot.appendChild(styles);
        }
      })
      .catch((err) => { console.error(err);
      });
  }
}

customElements.define("code-forces", codeForces);
